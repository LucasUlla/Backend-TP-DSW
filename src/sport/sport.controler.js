import * as sportService from './sport.services.js';
function sanitizeSportInput(req, res, next) {
    req.body.sanitizedInput = {
        "name": req.body.name,
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    const input = req.body.sanitizedInput;
    const errores = [];
    if (input.name !== undefined) {
        if (typeof input.name !== 'string' || input.name.trim() === '') {
            errores.push("El campo name no puede estar vacío y debe ser texto.");
        }
    }
    if (errores.length > 0) {
        return res.status(400).json({ mensaje: "Errores de validación", detalles: errores });
    }
    next();
}
async function findAll(_, res) {
    try {
        const sports = await sportService.getAllSports();
        res.status(200).json({ message: 'Find all Sports', data: sports });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
;
async function findOne(req, res) {
    try {
        const id = Number(req.params.id);
        const sport = await sportService.getOneSport(id);
        res.status(200).send({ message: "Found Sport", data: sport });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
;
async function add(req, res) {
    try {
        const sport = await sportService.addSport(req.body.sanitizedInput);
        res.status(201).json({ message: 'Sport Created', data: sport });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
;
async function update(req, res) {
    try {
        const id = Number(req.params.id);
        const sport = await sportService.updateSport(id, req.body.sanitizedInput);
        res.status(200).json({ message: 'Sport Updated', data: sport });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
;
async function remove(req, res) {
    try {
        const id = Number(req.params.id);
        await sportService.removeSport(id);
        res.status(200).json({ message: 'Sport Deleted' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}
export { sanitizeSportInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=sport.controler.js.map