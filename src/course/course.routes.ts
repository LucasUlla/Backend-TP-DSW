import { Router } from "express";
import {findAll, findOne, add, update, remove, sanitizeCourseInput} from "./course.controler.js";

export const courseRouter:Router = Router()

courseRouter.get('/', findAll) // soporta ?sportId= opcional
courseRouter.get('/:id', findOne) // busca por id solo, no necesita sportId
courseRouter.post('', sanitizeCourseInput, add)
courseRouter.put('/:id', sanitizeCourseInput, update)
courseRouter.delete('/:id',remove)