import { Router } from "express";
import { sanitizeFeeUpdateInput, findAll, findOne, generateOne, generateAll, update } from "./fee.controler.js";

export const feeRouter: Router = Router()

feeRouter.get('/', findAll)                          // soporta ?clientId= y/o ?period=
feeRouter.get('/:id', findOne)
feeRouter.post('/generate', generateAll)              // ?period=2026-08 → genera para TODOS
feeRouter.post('/generate/:clientId', generateOne)    // ?period=2026-08 → genera para UNO
feeRouter.patch('/:id', sanitizeFeeUpdateInput, update) // marcar como pagada, por ejemplo