import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeClientInput(req, res, next) {
    req.body.sanitizedInput = {
        "id": req.body.id,
        "name": req.body.name,
        "surname": req.body.surname,
        "email": req.body.email,
        "doc": req.body.doc,
        "type_doc": req.body.type_doc,
        "password": req.body.password,
        "birth_date": req.body.birth_date ? new Date(req.body.birth_date) : undefined, //Si no viene en el body no da undefined
        "type_user": req.body.type_user
    };
    //Uso solo las keys(propiedades) no nulas (para el patch)
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    const input = req.body.sanitizedInput;
    const errores = [];
    // Validar Email (expresión regular básica)
    if (input.email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
            errores.push("El formato del email es inválido.");
        }
    }
    // Validar Enums (tipo_documento y tipo_usuario)
    if (input.tipo_documento !== undefined) {
        const validDocs = ['DNI', 'Pasaporte', 'CUIT', 'CUIL'];
        if (!validDocs.includes(input.tipo_documento)) {
            errores.push(`tipo_documento debe ser uno de: ${validDocs.join(', ')}.`);
        }
    }
    if (input.tipo_usuario !== undefined) {
        const validUsers = ['Admin', 'Cliente', 'Invitado'];
        if (!validUsers.includes(input.tipo_usuario)) {
            errores.push(`tipo_usuario debe ser uno de: ${validUsers.join(', ')}.`);
        }
    }
    // Validar que la fecha de nacimiento sea una fecha válida
    if (input.fecha_nacimiento !== undefined) {
        const parsedDate = Date.parse(input.fecha_nacimiento);
        if (isNaN(parsedDate)) {
            errores.push("fecha_nacimiento debe ser una fecha válida (ej: YYYY-MM-DD).");
        }
        else {
            // Opcional: Convertir el string a un objeto Date real para que el controlador lo use
            input.fecha_nacimiento = new Date(input.fecha_nacimiento);
        }
    }
    // Validar que los textos no vengan vacíos
    const stringFields = ['name', 'surname', 'documento', 'contrasena'];
    stringFields.forEach(field => {
        if (input[field] !== undefined) {
            if (typeof input[field] !== 'string' || input[field].trim() === '') {
                errores.push(`El campo ${field} no puede estar vacío y debe ser texto.`);
            }
        }
    });
    // 4. Si hay errores, cortamos la petición y devolvemos un 400 (Bad Request)
    if (errores.length > 0) {
        return res.status(400).json({
            mensaje: "Errores de validación",
            detalles: errores
        });
    }
    // 5. Si todo está perfecto, avanzamos al siguiente middleware o controlador
    next();
}
async function findAll(_, res) {
    return res.status(500).send({ message: "Not Implemented" }); //devuelvo un ARRAY de clientes
}
;
async function findOne(req, res) {
    return res.status(500).send({ message: "Not Implemented" });
}
;
async function add(req, res) {
    //req.body (puede venir por partes) -> se usa un middleware 
    return res.status(500).send({ message: "Not Implemented" });
}
;
//uso la misma funcion para put & patch
async function update(req, res) {
    return res.status(500).send({ message: "Not Implemented" });
}
;
//Es delete pero ese nombre no deja ponerlo
async function remove(req, res) {
    return res.status(500).send({ message: "Not Implemented" });
}
export { sanitizeClientInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=client.controler.js.map