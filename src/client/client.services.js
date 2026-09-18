import { getEm } from '../shared/db/orm.js';
import { Client } from './clients.entity.js';
export async function getAllClients(filters) {
    const em = getEm();
    const where = {};
    if (filters?.doc) {
        where.doc = filters.doc;
    }
    if (filters?.name) {
        where.name = { $like: `%${filters.name}%` };
    }
    return await em.find(Client, where);
}
export async function getOneClient(id) {
    const em = getEm();
    return await em.findOneOrFail(Client, { id }, { populate: ['inscriptions'] });
}
export async function addClient(data) {
    const em = getEm();
    const client = em.create(Client, data);
    await em.flush();
    return client;
}
export async function updateClient(id, data) {
    const em = getEm();
    const clientToUpdate = await em.findOneOrFail(Client, { id });
    em.assign(clientToUpdate, data);
    await em.flush();
    return clientToUpdate;
}
export async function removeClient(id) {
    const em = getEm();
    const client = em.getReference(Client, id);
    em.remove(client);
    await em.flush();
}
//# sourceMappingURL=client.services.js.map