import { Router } from "express";
import {findAll, findOne, add, update, remove} from "./sport.controler.js";

export const sportRouter:Router = Router()

sportRouter.get('/', findAll)
sportRouter.get('/:id', findOne)
sportRouter.post('', add)
sportRouter.put('/:id', update)
sportRouter.delete('/:id',remove)