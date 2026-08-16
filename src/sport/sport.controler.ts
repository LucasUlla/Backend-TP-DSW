import { Request, Response, NextFunction } from 'express'
import { getEm, orm } from '../shared/db/orm.js'
import { Sport } from './sport.entity.js'
import { RequestContext } from '@mikro-orm/core'

//const em = orm.em

function sanitizeSportInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        "name": req.body.name,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })

    const input = req.body.sanitizedInput
    const errores: string[] = []

    if (input.name !== undefined) {
        if (typeof input.name !== 'string' || input.name.trim() === '') {
            errores.push("El campo name no puede estar vacío y debe ser texto.")
        }
    }

    if (errores.length > 0) {
        return res.status(400).json({ mensaje: "Errores de validación", detalles: errores })
    }

    next()
}

async function findAll(_: Request, res: Response) {
    try{
        const em = getEm()
        const sports = await em.find(Sport, {})
        res.status(200).json({message: 'find all sports', data: sports})
    } catch (error: any){
        res.status(500).send({message: error.message})
    }
};

async function findOne(req: Request, res: Response){
    try{
        const em = getEm()
        const id = Number(req.params.id)
        const sport = await em.findOneOrFail(Sport, {id}, { populate: ['prices', 'courses']}) 
        res.status(200).send({message: "Found Sport", data: sport})
    } catch (error:any){
        res.status(500).send({message: error.message})
    }
};

async function add(req: Request, res: Response){
    try{
        const em = getEm()
        const sport = em.create(Sport, req.body.sanitizedInput)
        await em.flush() //commit hacia la bd
        res.status(201).json({message: 'sport created', data: sport})
    } catch (error: any){
        res.status(500).send({message: error.message})
    }

   
};


async function update(req: Request, res: Response){
    try{
        const em = getEm()
        const id = Number(req.params.id)
        const sport = em.getReference(Sport, id) //No busca en la BD, me da una referencia (solo se puede hacer si el objeto no tiene una coleccion dentro a actualizar)
        em.assign(sport, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'Sport Updated'})
    } catch (error: any){
        res.status(500).send({message: error.message})
    }

};


async function remove(req: Request, res: Response){
    try{
        const em = getEm()
        const id = Number(req.params.id)
        const sport = em.getReference(Sport, id)
        em.remove(sport)
        await em.flush()
        res.status(200).json({message: 'Sport Deleted'})
    } catch (error: any){
        res.status(500).send({message: error.message})
    }
}


export {sanitizeSportInput, findAll, findOne, add, update, remove}