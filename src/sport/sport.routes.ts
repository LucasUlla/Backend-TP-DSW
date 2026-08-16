import { Router } from "express";
import {sanitizeSportInput, findAll, findOne, add, update, remove} from "./sport.controler.js";

export const sportRouter:Router = Router()

sportRouter.get('/', findAll)
sportRouter.get('/:id', findOne)
sportRouter.post('', sanitizeSportInput, add)
sportRouter.put('/:id',sanitizeSportInput , update)
sportRouter.delete('/:id',remove)