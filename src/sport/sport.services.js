import { getEm } from '../shared/db/orm.js';
import { Sport } from './sport.entity.js';
export async function getAllSports() {
    const em = getEm();
    return await em.find(Sport, {});
}
export async function getOneSport(id) {
    const em = getEm();
    return await em.findOneOrFail(Sport, { id });
}
export async function addSport(data) {
    const em = getEm();
    const sport = em.create(Sport, data);
    await em.flush();
    return sport;
}
export async function updateSport(id, data) {
    const em = getEm();
    const sport = em.getReference(Sport, id);
    em.assign(sport, data);
    await em.flush();
    return sport;
}
export async function removeSport(id) {
    const em = getEm();
    const sport = em.getReference(Sport, id);
    em.remove(sport);
    await em.flush();
}
//# sourceMappingURL=sport.services.js.map