import { Request, Response, NextFunction } from 'express';
declare function sanitizeSportInput(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
declare function findAll(_: Request, res: Response): Promise<void>;
declare function findOne(req: Request, res: Response): Promise<void>;
declare function add(req: Request, res: Response): Promise<void>;
declare function update(req: Request, res: Response): Promise<void>;
declare function remove(req: Request, res: Response): Promise<void>;
export { sanitizeSportInput, findAll, findOne, add, update, remove };
