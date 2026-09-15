import { Router } from "express";
import {sanitizeSportInput, findAll, findOne, add, update, remove} from "./sport.controler.js";
import { verifyToken, requireAdmin } from "../shared/middlewares/auth.middleware.js";

export const sportRouter:Router = Router()

sportRouter.get('/', verifyToken, findAll)
sportRouter.get('/:id', verifyToken, findOne)
sportRouter.post('', verifyToken, requireAdmin, sanitizeSportInput, add)
sportRouter.put('/:id', verifyToken, requireAdmin, sanitizeSportInput, update)
sportRouter.delete('/:id', verifyToken, requireAdmin, remove)