import { getEm } from '../shared/db/orm.js'
import { Sport } from './sport.entity.js'
import { RequiredEntityData, EntityData } from '@mikro-orm/core'

export async function getAllSports() {
    const em = getEm()
    return await em.find(Sport, {})
}

export async function getOneSport(id: number) {
    const em = getEm()
    return await em.findOneOrFail(Sport, { id })
}

export async function addSport(data: RequiredEntityData<Sport>) {
    const em = getEm()
    const sport = em.create(Sport, data)
    await em.flush()
    return sport
}

export async function updateSport(id: number, data: EntityData<Sport>) {
    const em = getEm()
    const sport = em.getReference(Sport, id)
    em.assign(sport, data)
    await em.flush()
    return sport
}

export async function removeSport(id: number) {
    const em = getEm()
    const sport = em.getReference(Sport, id)
    em.remove(sport)
    await em.flush()
}