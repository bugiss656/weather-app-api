import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { roundTemperatureValue } from '../utils'


const prisma = new PrismaClient()

export const getLatestTemperature = async (req: Request, res: Response) => {
    const { city } = req.params

    const query = await prisma.city.findMany({
        select: {
            displayName: true,
            Temperature: {
                select: {
                    dateTime: true,
                    value: true
                },
                orderBy: {
                    dateTime: 'desc'
                },
                take: 1
            }
        },
        where: {
            name: city
        }
    })

    const latestTemperature = {
        displayName: query[0].displayName,
        dateTime: query[0].Temperature[0].dateTime,
        value: roundTemperatureValue(Number(query[0].Temperature[0].value)) 
    }

    return res.json(latestTemperature)
}