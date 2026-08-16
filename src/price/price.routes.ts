import { Router } from "express";
import {findAll, findOne, add, sanitizePriceInput} from "./price.controler.js";

export const priceRouter:Router = Router()


priceRouter.get('/', findAll);// soporta ?sportId= opcional
priceRouter.get('/:id', findOne); //En nuestra BD pusimos que cada precio tenga ID
priceRouter.post('',sanitizePriceInput , add);