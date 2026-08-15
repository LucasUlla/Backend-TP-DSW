import { Request, Response, NextFunction } from 'express'
import { orm } from '../shared/db/orm.js'
import { Sport } from './sport.entity.js'
import { RequestContext } from '@mikro-orm/core'

const em = orm.em

async function findAll(_: Request, res: Response) {
    try{
        const sports = await em.find(Sport, {})
        res.status(200).json({message: 'find all sports', data: sports})
    } catch (error: any){
        res.status(500).send({message: error.message})
    }
};

async function findOne(req: Request, res: Response){ //
    try{
        const id = Number(req.params.id)
        const sport = await em.findOneOrFail(Sport, {id}) //{ populate: ['prices'] } si quiero mostrar los precios tambien
        res.status(200).send({message: "Found Sport", data: sport})
    } catch (error:any){
        res.status(500).send({message: error.message})
    }
};

async function add(req: Request, res: Response){ //El nuevo recurso viene en el body de la peticion
    try{//deberiamos sanitizar el body aca!!
        const sport = em.create(Sport, req.body) //operacion sincronica
        await em.flush() //commit hacia la bd
        res.status(201).json({message: 'sport created', data: sport})
    } catch (error: any){
        res.status(500).send({message: error.message})
    }

   
};


//ACTUALIZAR POR LA RELACION *A* CON CLIENT ???
async function update(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        const sport = em.getReference(Sport, id) //No busca en la BD, me da una referencia (solo se puede hacer si el objeto no tiene una coleccion dentro a actualizar)
        em.assign(sport, req.body)
        await em.flush()
        res.status(200).json({message: 'Sport Updated'})
    } catch (error: any){
        res.status(500).send({message: error.message})
    }

};


async function remove(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        const sport = em.getReference(Sport, id)
        em.remove(sport)
        await em.flush()
        res.status(200).json({message: 'Sport Deleted'})
    } catch (error: any){
        res.status(500).send({message: error.message})
    }
}


export {findAll, findOne, add, update, remove}