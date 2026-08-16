import { Request, Response, NextFunction } from 'express'
import { getEm, orm } from '../shared/db/orm.js'
import { Price } from './price.entity.js'
import { RequestContext } from '@mikro-orm/core'

//const em = orm.em

function sanitizePriceInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        "value": req.body.value,
        "sport": req.body.sport,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })

    const input = req.body.sanitizedInput
    const errores: string[] = []

    if (input.value !== undefined) {
        if (typeof input.value !== 'number' || input.value <= 0) {
            errores.push("value debe ser un número mayor a 0.")
        }
    }

    if (input.sport === undefined) {
        errores.push("sport es obligatorio.")
    }

    if (errores.length > 0) {
        return res.status(400).json({ mensaje: "Errores de validación", detalles: errores })
    }

    next()
}

async function findAll(req: Request, res: Response) {
    try{
        const em = getEm()
        const sportId = Number(req.query.sportId)
        console.log('findAll')
        const where = sportId ? { sport: Number(sportId) } : {}
        const prices = await em.find(Price, where, { populate: ['sport'] }) //Mikro-orm entiende al pasarle un número a esa propiedad, estás buscando por el ID de la clave foránea
        res.status(200).json({message: 'find all prices', data: prices})
        } catch (error: any){
            res.status(500).send({message: error.message})
        }
};


async function findOne(req: Request, res: Response){
   try{
        const em = getEm()
        const id = Number(req.params.id)
        console.log('findOne')
        const price = await em.findOneOrFail(Price, {id: id}, { populate: ['sport'] }) //Mikro-orm entiende al pasarle un número a esa propiedad, estás buscando por el ID de la clave foránea
        res.status(200).json({message: 'found price', data: price})
        } catch (error: any){
            res.status(500).send({message: error.message})
        }
};

async function add(req: Request, res: Response){
   try{
        const em = getEm()
        const price = em.create(Price, req.body.sanitizedInput) //operacion sincronica
        await em.flush() //commit hacia la bd
        res.status(201).json({message: 'price created', data: price})
       } catch (error: any){
           res.status(500).send({message: error.message})
       }
};


export {sanitizePriceInput, findAll, findOne, add}