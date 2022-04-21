import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

import { DateTime } from 'luxon'
import _ from 'lodash'



const prisma = new PrismaClient()


export const getLastFourteenDaysMaxTemp = async (req: Request, res: Response) => {
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


    const measurements = query[0]['Temperature']


    // Convert dateTime in each measurement from ISO to string in format 'yyyy-mm-dd'
    const convertedMeasurements = measurements.map((item: any) => {
        return {
            "dateTime": item.dateTime = DateTime.fromJSDate(item.dateTime).toISODate(),
            "value": Number(item.value)
        }
    })


    // Group measurements by date
    const measurementsByDate = _.groupBy(convertedMeasurements, date => date.dateTime)


    // Get max temperature value from grouped measurements for each day
    const getMaxTemperatures = (data: any) => {
        let results: any = []

        for(const object in data) {
            results.push(_.maxBy(data[object], 'value'))
        }

        return results
    }

    return res.json(getMaxTemperatures(measurementsByDate))
}