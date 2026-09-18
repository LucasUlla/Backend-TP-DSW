import { Request, Response, NextFunction } from 'express';
declare function sanitizeCourseInput(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
declare function findAll(req: Request, res: Response): Promise<void>;
declare function findOne(req: Request, res: Response): Promise<void>;
declare function add(req: Request, res: Response): Promise<void>;
declare function update(req: Request, res: Response): Promise<void>;
declare function remove(req: Request, res: Response): Promise<void>;
export { sanitizeCourseInput, findAll, findOne, add, remove, update };
