import express from 'express'
import cors from 'cors'

import { getCities } from '../controllers/getCities'
import { getLastFourteenDaysTemp } from '../controllers/getTemperatures'
import { getLastFourteenDaysMaxTemp } from '../controllers/getMaxTemperatures'
import { getLatestTemperature } from '../controllers/getLatestTemperature'



const app = express()
const PORT = 8000

app.use(cors())

app.get("/cities", getCities)
app.get("/:city/chartData/temperature/", getLastFourteenDaysTemp)
app.get("/:city/chartData/temperature/max", getLastFourteenDaysMaxTemp)
app.get("/:city/chartData/temperature/latest", getLatestTemperature)


app.listen(PORT, () => {
    console.log(`Application listening at http://localhost:${PORT}`)
})