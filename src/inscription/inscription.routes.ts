import { Router } from "express";
import {findAll, findOne, add, remove, sanitizeInscriptionInput} from "./inscription.controler.js";
import { verifyToken, requireAdmin, requireOwnerOrAdmin } from "../shared/middlewares/auth.middleware.js";

export const inscriptionRouter:Router = Router()

//En esta clase la clave es compuesta: courseId + clientId
// si no mandás clientId, solo Admin puede ver "todas"; si mandás tu propio clientId, te ves a vos mismo
inscriptionRouter.get('/', verifyToken, requireOwnerOrAdmin(req => Number(req.query.clientId)), findAll)

inscriptionRouter.get('/:courseId/:clientId', verifyToken, requireOwnerOrAdmin(req => Number(req.params.clientId)), findOne)

// anotarse a un curso: el propio cliente (siendo él mismo el "client" del body) o un Admin en su representación
inscriptionRouter.post('/', verifyToken, requireOwnerOrAdmin(req => Number(req.body.client)), sanitizeInscriptionInput, add)

inscriptionRouter.delete('/:courseId/:clientId', verifyToken, requireOwnerOrAdmin(req => Number(req.params.clientId)), remove)



