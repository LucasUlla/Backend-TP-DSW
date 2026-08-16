import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Course } from './course.entity.js'
import { RequestContext } from '@mikro-orm/core'

const em = orm.em

function sanitizeCourseInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        "course_no": req.body.course_no,
        "sched": req.body.sched,
        "professor": req.body.professor,
        "start_date": req.body.start_date ? new Date(req.body.start_date) : undefined,
        "finish_date": req.body.finish_date ? new Date(req.body.finish_date) : undefined,
        "quota": req.body.quota,
        "sport": req.body.sport, // id del Sport al que pertenece
    }

    // Solo dejamos las keys no undefined (soporta PATCH parcial)
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })

    const input = req.body.sanitizedInput
    const errores: string[] = []

    if (input.quota !== undefined) {
        if (typeof input.quota !== 'number' || input.cupo <= 0) {
            errores.push("cupo debe ser un número mayor a 0.")
        }
    }

    if (input.start_date !== undefined && isNaN(input.start_date.getTime())) {
        errores.push("fecha_ini debe ser una fecha válida.")
    }

    if (input.finish_date !== undefined && isNaN(input.finish_date.getTime())) {
        errores.push("fecha_fin debe ser una fecha válida.")
    }

    if (input.start_date && input.finish_date && input.start_date > input.finish_date) {
        errores.push("fecha_ini no puede ser posterior a fecha_fin.")
    }

    const stringFields = ['sched', 'professor']
    stringFields.forEach(field => {
        if (input[field] !== undefined) {
            if (typeof input[field] !== 'string' || input[field].trim() === '') {
                errores.push(`El campo ${field} no puede estar vacío y debe ser texto.`)
            }
        }
    })

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", details: errores })
    }

    next()
}


async function findAll(req: Request, res: Response) {
   try {
      const sportId = Number(req.query.sportId)
      console.log('findAll')
      const where = sportId ? { sport: Number(sportId) } : {}
      const courses = await em.find(Course, where, { populate: ['sport'] })
      res.status(200).json({ message: 'find all courses', data: courses })
   } catch (error: any) {
      res.status(500).send({message: error.message})
   }}

async function findOne(req: Request, res: Response){
   try {
      const id = Number(req.params.id)
      const course = await em.findOneOrFail(Course, {id}, { populate: ['sport', 'inscriptions'] })
      res.status(200).json({ message: 'find course', data: course })
   } catch (error: any) {
      res.status(500).send({message: error.message})
   }
};

async function add(req: Request, res: Response){
   try {
      const course = em.create(Course, req.body.sanitizedInput)
      await em.flush()
      res.status(201).json({ message: 'course created', data: course })
   } catch (error: any) {
      res.status(500).send({message: error.message})
   }
};

async function update(req: Request, res: Response){ 
   try {
      const id = Number(req.params.id)
      const courseToUpdate = await em.findOneOrFail(Course, {id})
      em.assign(courseToUpdate, req.body.sanitizedInput)
      await em.flush()
      res.status(200).json({ message: 'Course Updated', data: courseToUpdate})
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
};

async function remove(req: Request, res: Response){ 
   try {
      const id = Number(req.params.id)
      const course = em.getReference(Course, id)
      em.remove(course)
      await em.flush()
      res.status(200).json({ message: 'Course Deleted'})
   } catch (error: any) {
      res.status(500).send({message: error.message})
   }
};


export {sanitizeCourseInput ,findAll, findOne, add, remove, update}