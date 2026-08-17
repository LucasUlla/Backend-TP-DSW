import { getEm } from '../shared/db/orm.js'
import { Fee } from './fee.entity.js'
import { Client } from '../client/clients.entity.js'
import { Inscription } from '../inscription/inscription.entity.js'
import { Price } from '../price/price.entity.js'
import { EntityData, RequiredEntityData } from '@mikro-orm/core'


const BASE_AMOUNT = 3000 // valor fijo de socio, por ahora, en furuto Clase Flotante

export class DuplicateFeeError extends Error {}

export async function getAllFees(clientId?: number, period?: string) {
    const em = getEm()
    const where: any = {}
    if (clientId) where.client = clientId
    if (period) where.period = period
    return await em.find(Fee, where, { populate: ['client'] })
}

export async function getOneFee(id: number) {
    const em = getEm()
    return await em.findOneOrFail(Fee, { id }, { populate: ['client'] })
}

export async function updateFee(id: number, data: EntityData<Fee>) {
    const em = getEm()
    const fee = em.getReference(Fee, id)
    em.assign(fee, data)
    await em.flush()
    return fee
}

////////////////////////////////Revisar////////////////////////////////////////////
// Calcula cuánto le corresponde pagar a UN cliente por sus cursos vigentes
async function calculateCoursesAmount(clientId: number){
    const em = getEm()
    const inscriptions = await em.find(
        Inscription,
        { client: clientId },
        { populate: ['course', 'course.sport'] }
    )

    let coursesAmount = 0
    for (const insc of inscriptions) {
        const lastPrice = await em.findOne(
            Price,
            { sport: insc.course.sport.id },
            { orderBy: { id: 'desc' } } // el precio más reciente cargado para ese sport o tambien puede ser date
        )
        coursesAmount += lastPrice?.value ?? 0
    }

    return coursesAmount
}

// Genera la cuota de UN cliente para un período dado
export async function generateFeeForClient(clientId: number, period: string) {
    const em = getEm()
    const coursesAmount = await calculateCoursesAmount(clientId)
    const total = BASE_AMOUNT + coursesAmount

    const fee = em.create(Fee, {
            client: clientId,
            period,
            base_amount: BASE_AMOUNT,
            courses_amount: coursesAmount,
            total,
        }as RequiredEntityData<Fee>)
        await em.flush()
        return fee
}

// Genera la cuota de TODOS los clientes para un período dado
export async function generateFeesForAllClients(period: string) {
    const em = getEm()
    const clients = await em.find(Client, {})

    const results: { clientId: number, status: 'created' | 'skipped', reason?: string }[] = []

    for (const client of clients) {
        try {
            
            results.push({ clientId: client.id, status: 'created' })
        } catch (error:any) {
            if (error instanceof DuplicateFeeError) {
                results.push({ clientId: client.id, status: 'skipped', reason: 'ya existía' })
            } else {
                throw error
            }
        }
    }

    return results
}
////////////////////////////////////////////////////////////////////////////////////////