import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Price } from './price.entity.js'
import { RequestContext } from '@mikro-orm/core'

const em = orm.em

//Devuelve NaN
async function findAll(req: Request, res: Response) {
    try{
        const sportId = Number(req.params.sportId)
        console.log('findAll')
        const prices = await em.find(Price, { sport: sportId }) //Mikro-orm entiende al pasarle un número a esa propiedad, estás buscando por el ID de la clave foránea
        res.status(200).json({message: 'find all prices', data: prices})
        } catch (error: any){
            res.status(500).send({message: error.message})
        }
};

//Devuelve NaN
async function findOne(req: Request, res: Response){ //
   try{
        const sportId = Number(req.params.sportId)
        const id = Number(req.params.id)
        console.log('findOne')
        const price = await em.findOneOrFail(Price, {id: id, sport: sportId }) //Mikro-orm entiende al pasarle un número a esa propiedad, estás buscando por el ID de la clave foránea
        res.status(200).json({message: 'find all price', data: price})
        } catch (error: any){
            res.status(500).send({message: error.message})
        }
};

async function add(req: Request, res: Response){ //El nuevo recurso viene en el body de la peticion
   try{//deberiamos sanitizar el body aca!!
           const price = em.create(Price, req.body) //operacion sincronica
           await em.flush() //commit hacia la bd
           res.status(201).json({message: 'price created', data: price})
       } catch (error: any){
           res.status(500).send({message: error.message})
       }
};


export {findAll, findOne, add}