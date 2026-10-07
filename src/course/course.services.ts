import { getEm } from '../shared/db/orm.js'
import { Course } from './course.entity.js'
import { RequiredEntityData, EntityData } from '@mikro-orm/core'

export async function getAllCourses(sportId?: number): Promise<any[]>{
    const em = getEm()
    const where = sportId ? { sport: sportId } : {}
    const courses = await em.find(Course, where, { populate: ['sport'] })
    const data = await Promise.all(
     courses.map(async (c) => {
      const inscriptionsCount = await c.inscriptions.loadCount()
      return { ...c, inscriptionsCount }
    })
  )
  return data
}

export async function getOneCourse(id: number) {
    const em = getEm()
    return await em.findOneOrFail(Course, { id }, { populate: ['sport', 'inscriptions'] })
}

export async function addCourse(data: RequiredEntityData<Course>) {
    const em = getEm()
    const course = em.create(Course, data)
    await em.flush()
    return course
}

export async function updateCourse(id: number, data: EntityData<Course>) {
    const em = getEm()
    const courseToUpdate = await em.findOneOrFail(Course, { id })
    em.assign(courseToUpdate, data)
    await em.flush()
    return courseToUpdate
}

export async function removeCourse(id: number) {
    const em = getEm()
    const course = em.getReference(Course, id)
    em.remove(course)
    await em.flush()
}