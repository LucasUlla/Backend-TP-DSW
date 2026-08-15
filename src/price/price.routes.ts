import { Router } from "express";
import {findAll, findOne, add} from "./price.controler.js";

export const priceRouter:Router = Router()

// Modificamos las rutas GET para que exijan el parámetro idSport
priceRouter.get('/sport/:sportId', findAll);
priceRouter.get('/sport/:sportId/:id', findOne);
priceRouter.post('', add)
/*priceRouter.put('/:id', update)
priceRouter.delete('/:id',remove)*/