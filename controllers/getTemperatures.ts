import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'



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

    const temperatures = query[0]['Temperature']

    return res.json(temperatures)
}