//Middleware que proteje las rutas que requieren autorizacion
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export interface AuthRequest extends Request { //"Molde"
    user?: { id: number, email: string, type_user: string }
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization //es por donde se manda el token (en la cabecera)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ message: "Token no provisto" })
    }

    const token = authHeader.split(' ')[1] //nos quedamos con la segunda parte del header (el token)

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest['user']
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).send({ message: "Token inválido o expirado" })
    }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.user?.type_user !== 'Admin') {
        return res.status(403).send({ message: "Requiere permisos de administrador" })
    }
    next()
} //Para recursos que requieran si o si ser admin

export function requireOwnerOrAdmin(getResourceClientId: (req: AuthRequest) => number) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const resourceClientId = getResourceClientId(req)
        const isOwner = req.user?.id === resourceClientId
        const isAdmin = req.user?.type_user === 'Admin'

        if (!isOwner && !isAdmin) {
            return res.status(403).send({ message: "No tenés permiso para acceder a este recurso" })
        }
        next()
    }
} //Para recursos que requieran ser admin o el dueño del recurso
