import { Request, Response, NextFunction } from 'express'
import { NotFoundError } from '@mikro-orm/core'
import * as feeService from './fee.services.js'
import { DuplicateFeeError } from './fee.services.js'

function sanitizeFeeUpdateInput(req: Request, res: Response, next: NextFunction) {
    req.body.sanitizedInput = {
        paid: req.body.paid,
    }

    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key]
        }
    })

    const input = req.body.sanitizedInput
    const errores: string[] = []

    if (input.paid !== undefined && typeof input.paid !== 'boolean') {
        errores.push("paid debe ser true o false.")
    }

    if (errores.length > 0) {
        return res.status(400).json({ mensaje: "Errores de validación", detalles: errores })
    }

    next()
}

async function findAll(req: Request, res: Response) {
    try {
        const clientId = req.query.clientId ? Number(req.query.clientId) : undefined
        const period = req.query.period ? String(req.query.period) : undefined
        const fees = await feeService.getAllFees(clientId, period)
        res.status(200).json({ message: 'find all fees', data: fees })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const fee = await feeService.getOneFee(id)
        res.status(200).send({ message: "Found Fee", data: fee })
    } catch (error: any) {
        if (error instanceof NotFoundError) {
            return res.status(404).send({ message: "Fee not found" })
        }
        res.status(500).send({ message: error.message })
    }
}

// Genera la cuota de UN cliente puntual: POST /api/fees/generate/:clientId?period=2026-08
async function generateOne(req: Request, res: Response) {
    try {
        const clientId = Number(req.params.clientId)
        const period = String(req.query.period)
        const fee = await feeService.generateFeeForClient(clientId, period)
        res.status(201).json({ message: 'Fee generated', data: fee })
    } catch (error: any) {
        if (error instanceof DuplicateFeeError) {
            return res.status(409).send({ message: error.message })
        }
        res.status(500).send({ message: error.message })
    }
}

// Genera la cuota de TODOS los clientes: POST /api/fees/generate?period=2026-08
async function generateAll(req: Request, res: Response) {
    try {
        const period = String(req.query.period)
        const results = await feeService.generateFeesForAllClients(period)
        res.status(201).json({ message: 'Fees generation finished', data: results })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id)
        const fee = await feeService.updateFee(id, req.body.sanitizedInput)
        res.status(200).json({ message: 'Fee Updated', data: fee })
    } catch (error: any) {
        res.status(500).send({ message: error.message })
    }
}

export { sanitizeFeeUpdateInput, findAll, findOne, generateOne, generateAll, update }