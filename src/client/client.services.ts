import { EntityData, RequiredEntityData } from '@mikro-orm/core'
import { getEm } from '../shared/db/orm.js'
import { Client } from './clients.entity.js'

export async function getAllClients(filters?: { name?: string, doc?: string }) { //contempla tabien busqueda por doc y nombre
    const em = getEm()
    const where: any = {}

    if (filters?.doc) {
        where.doc = filters.doc
    }

    if (filters?.name) {
        where.name = { $like: `%${filters.name}%` }
    }
    return await em.find(Client, where)
}

export async function getOneClient(id: number) {
    const em = getEm()
    return await em.findOneOrFail(Client, {id}, {populate: ['inscriptions']})
}

export async function addClient(data: RequiredEntityData<Client>) {
    const em = getEm()
    const client = em.create(Client, data)
    await em.flush()
    return client
}

export async function updateClient(id: number, data: EntityData<Client>) {
    const em = getEm()
    const clientToUpdate = await em.findOneOrFail(Client, {id})
    em.assign(clientToUpdate, data)
    await em.flush()
    return clientToUpdate
}

export async function removeClient(id: number) {
    const em = getEm()
    const client = em.getReference(Client, id)
    em.remove(client)
    await em.flush()
}
