import { Router } from "express";
import {findAll, findOne, add, remove, sanitizeInscriptionInput} from "./inscription.controler.js";

export const inscriptionRouter:Router = Router()

//En esta clase la clave es compuesta: courseId + clientId
inscriptionRouter.get('/', findAll)                      // soporta ?courseId= y/o ?clientId=
inscriptionRouter.get('/:courseId/:clientId', findOne)   // clave compuesta en la URL
inscriptionRouter.post('/',sanitizeInscriptionInput, add)
inscriptionRouter.delete('/:courseId/:clientId', remove)