import { getEm } from '../shared/db/orm.js'
import { Price } from './price.entity.js'
import { RequiredEntityData } from '@mikro-orm/core'

export async function getAllPrices(sportId?: number){
    const em = getEm()
    const where = sportId ? { sport: Number(sportId) } : {}
    return await em.find(Price, where, { populate: ['sport'] })
}

export async function getOnePrice(id: number) {
    const em = getEm()
    return await em.findOneOrFail(Price, { id }, { populate: ['sport'] })
}

export async function addPrice(data: RequiredEntityData<Price>) {
    const em = getEm()
    const price = em.create(Price, data) //create es síncrona
    await em.flush()
    return price
}