import { Router } from "express";
import { sanitizeClientInput, findAll, findOne, add, update, remove, login} from "./client.controler.js";
import { verifyToken } from "../shared/auth.middleware.js";

export const clientRouter: Router = Router()

clientRouter.get('/', verifyToken, findAll)
clientRouter.get('/:id', verifyToken, findOne)
clientRouter.post('', sanitizeClientInput, add)
clientRouter.put('/:id', verifyToken, sanitizeClientInput, update)
clientRouter.patch('/:id', verifyToken, sanitizeClientInput, update)
clientRouter.delete('/:id', verifyToken, remove)
clientRouter.post('/login', login)