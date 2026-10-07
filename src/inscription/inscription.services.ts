import { getEm } from '../shared/db/orm.js'
import { Inscription } from './inscription.entity.js'
import { RequiredEntityData, EntityData } from '@mikro-orm/core'
import { Course } from '../course/course.entity.js'
import { UniqueConstraintViolationException } from '@mikro-orm/core'

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

export async function removeInscription(courseId: number, clientId: number) {
    const em = getEm()
    const inscription = await em.findOneOrFail(Inscription, { course: courseId, client: clientId })
    em.remove(inscription)
    await em.flush()
}

/*export async function addInscription(data: RequiredEntityData<Inscription>) {
    const em = getEm()
    const inscription = em.create(Inscription, data)
    await em.flush()
    return inscription
}*/


// Errores y Validacion de la Inscripcion

//creo los tipo de error
export class ScheduleConflictError extends Error {}
export class DuplicateInscriptionError extends Error {}

//Compara si dos intervalos de tiempo se pisan
function timeRangesOverlap(startA: string, endA: string, startB: string, endB: string): boolean {
    return startA < endB && startB < endA
}

//Compara si dos arrays de dias se pisan
function daysOverlap(daysA: string[], daysB: string[]): boolean {
    return daysA.some(d => daysB.includes(d))
}


async function validateNoScheduleConflict(clientId: number, newCourse: Course) {
    const em = getEm()
    // Obtengo todas las inscripciones del cliente
    const existingInscriptions = await em.find(
        Inscription,
        { client: clientId },
        { populate: ['course'] }
    )

    //Itero sobre las inscripciones existentes y comparo los horarios y dias con el nuevo curso
    for (const insc of existingInscriptions) {
        const existingCourse = insc.course
        if (
            daysOverlap(existingCourse.days, newCourse.days) &&
            timeRangesOverlap(newCourse.start_time, newCourse.end_time, existingCourse.start_time, existingCourse.end_time)
        ) {
            throw new ScheduleConflictError(
                `Choca de horario con el curso "${existingCourse.course_no}" (${existingCourse.days.join(', ')} ${existingCourse.start_time}-${existingCourse.end_time})`
            )
        }
    }
}

export async function addInscription(data: RequiredEntityData<Inscription>) {
    const em = getEm()

    const course = await em.findOneOrFail(Course, { id: data.course as unknown as number })
    await validateNoScheduleConflict(data.client as unknown as number, course)

    try {
        const inscription = em.create(Inscription, data)
        await em.flush()
        return inscription
    } catch (error) {
        if (error instanceof UniqueConstraintViolationException) {
            throw new DuplicateInscriptionError("El cliente ya está inscripto a este curso")
        }
        throw error
    }
}
///////////////////////////