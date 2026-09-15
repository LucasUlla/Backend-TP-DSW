import { Router } from "express";
import {findAll, findOne, add, sanitizePriceInput} from "./price.controler.js";
import { verifyToken, requireAdmin } from "../shared/middlewares/auth.middleware.js";

export const priceRouter:Router = Router()


priceRouter.get('/', verifyToken, findAll);// soporta ?sportId= opcional
priceRouter.get('/:id', verifyToken, findOne); //En nuestra BD pusimos que cada precio tenga ID
priceRouter.post('', verifyToken, requireAdmin, sanitizePriceInput, add);