import { Request, Response, NextFunction } from 'express'
import { getEm, orm } from '../shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import { Inscription } from './inscription.entity.js'

const em = orm.em

function sanitizeInscriptionInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        course: req.body.course,
        client: req.body.client,
    }

    const input = req.body.sanitizedInput
    const errores: string[] = []

    if (input.course === undefined) {
        errores.push("course es obligatorio.")
    }
    if (input.client === undefined) {
        errores.push("client es obligatorio.")
    }

    if (errores.length > 0) {
        return res.status(400).json({ mensaje: "Errores de validación", detalles: errores })
    }

    next()
}

async function findAll(req: Request, res: Response) {
    try {
        const em = getEm()
        const courseId = Number(req.query.courseId)
        const clientId = Number(req.query.Id)
        console.log('FindAll')

        const where: any = {}
        //agrego propiedades para el filtro si hiciera falta
        if (courseId) where.course = Number(courseId)
        if (clientId) where.client = Number(clientId)
        

        const inscriptions = await em.find(Inscription, where, { populate: ['course', 'client'] })
        res.status(200).json({ message: 'find all inscriptions', data: inscriptions })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const em = getEm()
        const courseId = Number(req.params.courseId)
        const clientId = Number(req.params.clientId)

        console.log('course: ', courseId, ' & client: ', clientId)

        const inscription = await em.findOneOrFail(
            Inscription,
            { course: courseId, client: clientId },
            { populate: ['course', 'client'] }
        ) //'course.sport'
        res.status(200).send({ message: "Found Inscription", data: inscription })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

async function add(req: Request, res: Response) {
    try {
        const em = getEm()
        const inscription = em.create(Inscription, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({ message: 'Inscription created', data: inscription })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const em = getEm()
        const courseId = Number(req.params.courseId)
        const clientId = Number(req.params.clientId)
        
        //Uso FindOne porque getReference no me deja buscar con clave primaria compuesta
        const inscription = await em.findOneOrFail(Inscription, {course: courseId, client: clientId})

        em.remove(inscription)
        await em.flush()
        res.status(200).json({ message: 'Inscription Deleted' })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export { sanitizeInscriptionInput, findAll, findOne, add, remove }