import { EntityData, RequiredEntityData, wrap } from '@mikro-orm/core'
import { getEm } from '../shared/db/orm.js'
import { Client } from './client.entity.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = '2h'
const SALT_ROUNDS = 10

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
    const hashedPassword = await bcrypt.hash(data.password as string, SALT_ROUNDS)
    const client = em.create(Client, {
            ...data,
            password: hashedPassword,
        })
    await em.flush()
    return client

    /*const { password, ...clientWithoutPassword } = client
    return clientWithoutPassword*/
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


export async function validateClientCredentials(email: string, plainPassword: string) {
    const em = getEm()
    const client = await em.findOne(Client, { email })

    if (!client) return null

    const isValid = await bcrypt.compare(plainPassword, client.password)
    if (!isValid) return null

    const token = jwt.sign(
        { id: client.id, email: client.email, type_user: client.type_user },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    )

    const { password, ...clientData } = wrap(client).toObject() // ← wrap() en vez de .toObject() directo VERRR
    return { client: clientData, token }
}
