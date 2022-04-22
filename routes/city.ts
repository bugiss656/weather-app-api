import express from 'express'
import { getLatestTemperature } from '../controllers/getLatestTemperature'
import { getLastFourteenDaysTemp } from '../controllers/getTemperatures'
import { getLastFourteenDaysMaxTemp } from '../controllers/getMaxTemperatures'



export const router = express.Router()

router.get("/:city", getLastFourteenDaysTemp)   
router.get("/max/:city", getLastFourteenDaysMaxTemp)   
router.get("/latest/:city", getLatestTemperature)