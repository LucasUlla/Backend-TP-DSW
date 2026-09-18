import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'club_deportivo_jwt_secret_key_2026';

export interface TokenPayload {
  id: number;
  email: string;
  type_user: 'Admin' | 'Socio';
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado: Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

export function verifyRole(allowedRoles: ('Admin' | 'Socio')[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as TokenPayload | undefined;
    if (!user || !allowedRoles.includes(user.type_user)) {
      return res.status(403).json({ message: 'Acceso denegado: No tienes permisos suficientes' });
    }
    next();
  };
}

