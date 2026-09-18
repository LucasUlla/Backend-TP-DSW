import { Request, Response, NextFunction } from 'express'
import { Client } from "./client.entity.js"
import { getEm, orm } from '../shared/db/orm.js'
import * as clientService from './client.services.js'


//Sanitize: whitelist + validación + filtrado de undefined
function sanitizeClientInput (req:Request, res:Response, next:NextFunction){ //funcion que actua como middleware
    req.body.sanitizedInput = {
        "id": req.body.id,
        "name": req.body.name,
        "surname": req.body.surname,
        "email": req.body.email,
        "doc": req.body.doc,
        "password": req.body.password,
        "birth_date": req.body.birth_date? new Date(req.body.birth_date): undefined, //Si no viene en el body no da undefined
        "type_user": req.body.type_user}

    //Uso solo las keys(propiedades) no nulas
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })

    const input = req.body.sanitizedInput;
    const errores: string[] = [];

    // Validar Email (expresión regular básica)
    if (input.email !== undefined) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.email)) {
            errores.push("El formato del email es inválido.");
        }
    }

    if (input.doc !== undefined) {
    const docRegex = /^\d{7,8}$/
    if (!docRegex.test(String(input.doc))) {
        errores.push("doc debe contener solo números, entre 7 y 8 dígitos.")
    }
    }

    if (input.type_user !== undefined) {
        const validUsers = ['Admin', 'Socio'];
        if (!validUsers.includes(input.type_user)) {
            errores.push(`type_user debe ser uno de: ${validUsers.join(', ')}.`);
        }
    }

    // Validar birth_date
    if (input.birth_date !== undefined) {
        const parsedDate = Date.parse(req.body.birth_date); // ojo: acá ya convertiste a Date arriba
        if (isNaN(parsedDate)) {
            errores.push("birth_date debe ser una fecha válida (ej: YYYY-MM-DD).");
        }
    }

    // Validar textos no vacíos
    const stringFields = ['name', 'surname', 'password'];
    stringFields.forEach(field => {
        if (input[field] !== undefined) {
            if (typeof input[field] !== 'string' || input[field].trim() === '') {
                errores.push(`El campo ${field} no puede estar vacío y debe ser texto.`);
            }
        }
    });

    // 4. Si hay errores, cortamos la petición y devolvemos un 400 (Bad Request)
    if (errores.length > 0) {
        return res.status(400).json({ message: "Errores de validación", data: errores });
    }

    // 5. Si todo está perfecto, avanzamos al siguiente middleware o controlador

    next()
}


async function findAll(req: Request, res: Response) {
    try{
        const name = req.query.name ? String(req.query.name) : undefined
        const doc = req.query.doc ? String(req.query.doc) : undefined
        const clients = await clientService.getAllClients()
        res.status(200).send({message: "Found Clients", data: clients})
    } catch (error:any){
        res.status(500).send({message: error.message})
    }
};

async function findOne(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        const client = await clientService.getOneClient(id)
        res.status(200).send({message: "Found Client", data: client})

    } catch (error:any){
        res.status(500).send({message: error.message})
    }
};

async function add(req: Request, res: Response){
    try{
        const client = await clientService.addClient(req.body.sanitizedInput)
        res.status(201).send({message: "Client Created", data: client})
    } catch (error:any){
        res.status(500).send({message: error.message})
    }
    
};


async function update(req: Request, res: Response){
    try {
        const id = Number(req.params.id)
        const clientToUpdate = await clientService.updateClient(id, req.body.sanitizedInput)
        res.status(200).json({message: 'Client Updated', data: clientToUpdate})
    } catch (error: any) {
        res.status(500).send({message: error.message})
    }

};

async function remove(req: Request, res: Response){
    try{
        const id = Number(req.params.id)
        await clientService.removeClient(id)
        res.status(201).send({message: "Client Deleted"})
    } catch (error:any){
        res.status(500).send({message: error.message})
    }
}

async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        const result = await clientService.validateClientCredentials(email, password)

        if (!result) {
            return res.status(401).send({ message: "Email o contraseña incorrectos" })
        }

        res.status(200).send({ message: "Login exitoso", data: result })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export {sanitizeClientInput, findAll, findOne, add, update, remove, login}