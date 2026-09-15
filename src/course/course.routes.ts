import { Router } from "express";
import {findAll, findOne, add, update, remove, sanitizeCourseInput} from "./course.controler.js";
import { verifyToken, requireAdmin} from "../shared/middlewares/auth.middleware.js";

export const courseRouter:Router = Router()

courseRouter.get('/', verifyToken, findAll) // soport ?sportId= opcional
courseRouter.get('/:id', verifyToken, findOne) // busca por id solo, no necesita sportId
courseRouter.post('', verifyToken, requireAdmin, sanitizeCourseInput, add)
courseRouter.put('/:id', verifyToken, requireAdmin, sanitizeCourseInput, update)
courseRouter.delete('/:id', verifyToken, requireAdmin, remove)