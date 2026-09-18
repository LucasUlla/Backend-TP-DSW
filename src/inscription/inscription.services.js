import { getEm } from '../shared/db/orm.js';
import { Inscription } from './inscription.entity.js';
export async function getAllInscriptions(courseId, clientId) {
    const em = getEm();
    const where = {};
    if (courseId)
        where.course = courseId;
    if (clientId)
        where.client = clientId;
    return await em.find(Inscription, where, { populate: ['course', 'client'] });
}
export async function getOneInscription(courseId, clientId) {
    const em = getEm();
    return await em.findOneOrFail(Inscription, { course: courseId, client: clientId }, { populate: ['course', 'client'] });
}
export async function addInscription(data) {
    const em = getEm();
    const inscription = em.create(Inscription, data);
    await em.flush();
    return inscription;
}
export async function removeInscription(courseId, clientId) {
    const em = getEm();
    const inscription = await em.findOneOrFail(Inscription, { course: courseId, client: clientId });
    em.remove(inscription);
    await em.flush();
}
//# sourceMappingURL=inscription.services.js.map