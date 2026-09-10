import { Router } from "express";
import { sanitizeClientInput, findAll, findOne, add, update, remove, login} from "./client.controler.js";

export const clientRouter: Router = Router()

clientRouter.get('/', findAll)
clientRouter.get('/:id', findOne)
clientRouter.post('',sanitizeClientInput, add)
clientRouter.post('/login', login)
clientRouter.put('/:id',sanitizeClientInput, update)
clientRouter.patch('/:id',sanitizeClientInput, update)
clientRouter.delete('/:id',remove)
