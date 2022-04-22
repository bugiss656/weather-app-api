import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { roundTemperatureValue } from '../utils'



const prisma = new PrismaClient()

export const getLastFourteenDaysTemp = async (req: Request, res: Response) => {
    const { city } = req.params

    const query = await prisma.city.findMany({
        select: {
            Temperature: {
                select: {
                    dateTime: true,
                    value: true
                },
                where: {
                    dateTime: {
                        gte: new Date("2022-01-17"),
                        lte: new Date("2022-01-31")
                    }
                }
            }
        },
        where: {
            name: city
        }
    })

    console.log(query[0]['Temperature'])

    const measurements = query[0]['Temperature'].map((measurement: any) => {
        return {
            'dateTime': measurement.dateTime,
            'value': roundTemperatureValue(Number(measurement.value))
        }
    })

    return res.json(measurements)
}