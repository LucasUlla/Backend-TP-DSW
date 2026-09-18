import { getEm } from '../shared/db/orm.js';
import { Course } from './course.entity.js';
export async function getAllCourses(sportId) {
    const em = getEm();
    const where = sportId ? { sport: sportId } : {};
    return await em.find(Course, where, { populate: ['sport'] });
}
export async function getOneCourse(id) {
    const em = getEm();
    return await em.findOneOrFail(Course, { id }, { populate: ['sport', 'inscriptions'] });
}
export async function addCourse(data) {
    const em = getEm();
    const course = em.create(Course, data);
    await em.flush();
    return course;
}
export async function updateCourse(id, data) {
    const em = getEm();
    const courseToUpdate = await em.findOneOrFail(Course, { id });
    em.assign(courseToUpdate, data);
    await em.flush();
    return courseToUpdate;
}
export async function removeCourse(id) {
    const em = getEm();
    const course = em.getReference(Course, id);
    em.remove(course);
    await em.flush();
}
//# sourceMappingURL=course.services.js.map