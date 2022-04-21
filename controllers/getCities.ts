import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient()

export const getCities = async (req: Request, res: Response) => {
    const cities = await prisma.city.findMany({
        select: {
            name: true,
            displayName: true
        }
    })
    
    return res.json(cities)
}