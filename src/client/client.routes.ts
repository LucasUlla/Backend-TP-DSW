import { Router } from "express";
import { sanitizeClientInput, findAll, findOne, add, update, remove, login} from "./client.controler.js";
import { verifyToken, requireAdmin, requireOwnerOrAdmin } from "../shared/middlewares/auth.middleware.js";

export const clientRouter: Router = Router()

clientRouter.get('/', verifyToken, requireAdmin, findAll)
clientRouter.get('/:id', verifyToken, requireOwnerOrAdmin(req => Number(req.params.id)), findOne)
clientRouter.post('', sanitizeClientInput, add)
clientRouter.post('/login', login)
clientRouter.put('/:id', verifyToken, requireOwnerOrAdmin(req => Number(req.params.id)), sanitizeClientInput, update)
clientRouter.patch('/:id', verifyToken, requireOwnerOrAdmin(req => Number(req.params.id)), sanitizeClientInput, update)
clientRouter.delete('/:id', verifyToken, requireOwnerOrAdmin(req => Number(req.params.id)), remove)



