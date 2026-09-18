import { getEm } from '../shared/db/orm.js';
import { Price } from './price.entity.js';
export async function getAllPrices(sportId) {
    const em = getEm();
    const where = sportId ? { sport: Number(sportId) } : {};
    return await em.find(Price, where, { populate: ['sport'] });
}
export async function getOnePrice(id) {
    const em = getEm();
    return await em.findOneOrFail(Price, { id }, { populate: ['sport'] });
}
export async function addPrice(data) {
    const em = getEm();
    const price = em.create(Price, data); //create es síncrona
    await em.flush();
    return price;
}
//# sourceMappingURL=price.services.js.map