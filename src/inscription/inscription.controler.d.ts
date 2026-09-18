import { Request, Response, NextFunction } from 'express';
declare function sanitizeInscriptionInput(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
declare function findAll(req: Request, res: Response): Promise<void>;
declare function findOne(req: Request, res: Response): Promise<void>;
declare function add(req: Request, res: Response): Promise<void>;
declare function remove(req: Request, res: Response): Promise<void>;
export { sanitizeInscriptionInput, findAll, findOne, add, remove };
