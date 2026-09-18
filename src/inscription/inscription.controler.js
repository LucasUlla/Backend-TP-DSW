import { orm } from '../shared/db/orm.js';
import * as inscriptionService from './inscription.services.js';
const em = orm.em;
function sanitizeInscriptionInput(req, res, next) {
    req.body.sanitizedInput = {
        course: req.body.course,
        client: req.body.client,
    };
    const input = req.body.sanitizedInput;
    const errores = [];
    if (input.course === undefined) {
        errores.push("course es obligatorio.");
    }
    if (input.client === undefined) {
        errores.push("client es obligatorio.");
    }
    if (errores.length > 0) {
        return res.status(400).json({ mensaje: "Errores de validación", detalles: errores });
    }
    next();
}
async function findAll(req, res) {
    try {
        const courseId = req.query.courseId ? Number(req.query.courseId) : undefined;
        const clientId = req.query.clientId ? Number(req.query.clientId) : undefined;
        const inscriptions = await inscriptionService.getAllInscriptions(courseId, clientId);
        res.status(200).json({ message: 'find all inscriptions', data: inscriptions });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const courseId = Number(req.params.courseId);
        const clientId = Number(req.params.clientId);
        const inscription = await inscriptionService.getOneInscription(courseId, clientId);
        res.status(200).send({ message: "Found Inscription", data: inscription });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const inscription = await inscriptionService.addInscription(req.body.sanitizedInput);
        res.status(201).json({ message: 'Inscription created', data: inscription });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const courseId = Number(req.params.courseId);
        const clientId = Number(req.params.clientId);
        await inscriptionService.removeInscription(courseId, clientId);
        res.status(200).json({ message: 'Inscription Deleted' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
export { sanitizeInscriptionInput, findAll, findOne, add, remove };
//# sourceMappingURL=inscription.controler.js.map