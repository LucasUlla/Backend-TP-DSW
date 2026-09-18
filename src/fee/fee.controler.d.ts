import { Request, Response, NextFunction } from 'express';
declare function sanitizeFeeUpdateInput(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
declare function findAll(req: Request, res: Response): Promise<void>;
declare function findOne(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function generateOne(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
declare function generateAll(req: Request, res: Response): Promise<void>;
declare function update(req: Request, res: Response): Promise<void>;
export { sanitizeFeeUpdateInput, findAll, findOne, generateOne, generateAll, update };
