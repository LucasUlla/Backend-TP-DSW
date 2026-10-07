import { Request, Response, NextFunction } from 'express'
import { getEm, orm } from '../shared/db/orm.js'
import { Course } from './course.entity.js'
import * as courseService from './course.services.js'


function sanitizeCourseInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        "course_no": req.body.course_no,
        "days": req.body.days,
        "start_date": req.body.start_date ? new Date(req.body.start_date) : undefined,
        "finish_date": req.body.finish_date ? new Date(req.body.finish_date) : undefined,
        "start_time": req.body.start_time,
        "end_time": req.body.end_time,
        "professor": req.body.professor,
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
    const VALID_DAYS = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

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

    if (input.professor !== undefined) {
            if (typeof input.professor !== 'string' || input.professor.trim() === '') {
                errores.push(`El campo professor no puede estar vacío y debe ser texto.`)
            }
        }

    if (input.days !== undefined) {
        if (!Array.isArray(input.days) || input.days.length === 0) {
            errores.push("days debe ser un array con al menos un día.")
        } else if (!input.days.every((d: string) => VALID_DAYS.includes(d))) {
            errores.push(`days solo puede contener: ${VALID_DAYS.join(', ')}.`)
        }
    }

    if (input.start_time !== undefined && !timeRegex.test(input.start_time)) {
        errores.push("start_time debe tener formato HH:MM.")
    }
    if (input.end_time !== undefined && !timeRegex.test(input.end_time)) {
        errores.push("end_time debe tener formato HH:MM.")
    }
    if (input.start_time && input.end_time && input.start_time >= input.end_time) {
        errores.push("start_time debe ser anterior a end_time.")
    }

    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", data: errores })
    }

    next()
}


async function findAll(req: Request, res: Response) {
   try {
      const sportId = req.query.sportId ? Number(req.query.sportId) : undefined
      const courses = await courseService.getAllCourses(sportId)
      res.status(200).json({ message: 'find all courses', data: courses })
   } catch (error: any) {
      res.status(500).send({message: error.message})
   }}

async function findOne(req: Request, res: Response){ 
   try {
      const id = Number(req.params.id)
      const course = await courseService.getOneCourse(id)
      res.status(200).json({ message: 'find course', data: course })
   } catch (error: any) {
      res.status(500).send({message: error.message})
   }
};

async function add(req: Request, res: Response){
    
   try {
      const course = await courseService.addCourse(req.body.sanitizedInput)
      res.status(201).json({ message: 'course created', data: course })
   } catch (error: any) {
      res.status(500).send({message: error.message})
   }
};

async function update(req: Request, res: Response){
   
   try {
      const id = Number(req.params.id)
      const courseToUpdate = await courseService.updateCourse(id, req.body.sanitizedInput)
      res.status(200).json({ message: 'Course Updated', data: courseToUpdate})
    } catch (error: any) {
      res.status(500).send({ message: error.message })
    }
};

async function remove(req: Request, res: Response){ 
   try {
      const id = Number(req.params.id)
      await courseService.removeCourse(id)
      res.status(200).json({ message: 'Course Deleted'})
   } catch (error: any) {
      res.status(500).send({message: error.message})
   }
};


export {sanitizeCourseInput ,findAll, findOne, add, remove, update}