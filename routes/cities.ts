import express from 'express'
import { getCities } from '../controllers/getCities'



export const router = express.Router()

router.get("/", getCities)