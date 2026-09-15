import { Router } from "express";
import { sanitizeFeeUpdateInput, findAll, findOne, generateOne, generateAll, update } from "./fee.controler.js";
import { verifyToken, requireAdmin, requireOwnerOrAdmin} from "../shared/middlewares/auth.middleware.js";

export const feeRouter: Router = Router()

// mismo patrón: sin clientId, solo Admin ve todo; con tu propio clientId, ves las tuyas
feeRouter.get('/', verifyToken, requireOwnerOrAdmin(req => Number(req.query.clientId)), findAll)                          // soporta ?clientId= y/o ?period=
feeRouter.get('/:id', verifyToken, requireAdmin, findOne) // simplificado: el dueño de una Fee puntual requiere resolverla primero, lo dejamos admin-only por ahora
feeRouter.post('/generate', verifyToken, requireAdmin, generateAll)             // ?period=2026-08 → genera para TODOS
feeRouter.post('/generate/:clientId', verifyToken, requireAdmin, generateOne)    // ?period=2026-08 → genera para UNO
feeRouter.patch('/:id', verifyToken, requireAdmin, sanitizeFeeUpdateInput, update) // marcar como pagada: acción administrativa // marcar como pagada, por ejemplo REVISAR



