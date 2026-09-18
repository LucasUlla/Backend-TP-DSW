import { getEm } from '../shared/db/orm.js'
import { Inscription } from './inscription.entity.js'
import { RequiredEntityData, EntityData } from '@mikro-orm/core'

export async function getAllInscriptions(courseId?: number, clientId?: number) {
    const em = getEm()
    const where: any = {}
    if (courseId) where.course = courseId
    if (clientId) where.client = clientId
    return await em.find(Inscription, where, { populate: ['course', 'client'] })
}

export async function getOneInscription(courseId: number, clientId: number) {
    const em = getEm()
    return await em.findOneOrFail(Inscription, { course: courseId, client: clientId }, { populate: ['course', 'client'] })
}

export async function addInscription(data: RequiredEntityData<Inscription>) {
    const em = getEm()
    const inscription = em.create(Inscription, data)
    await em.flush()
    return inscription
}

export async function removeInscription(courseId: number, clientId: number) {
    const em = getEm()
    const inscription = await em.findOneOrFail(Inscription, { course: courseId, client: clientId })
    em.remove(inscription)
    await em.flush()
}