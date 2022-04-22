import express from 'express'
import cors from 'cors'

import { router as citiesRouter } from '../routes/cities'
import { router as cityRouter } from '../routes/city'



const app = express()
const PORT = 8000

app.use(cors())

app.use("/cities", citiesRouter)
app.use("/chartData/temperature", cityRouter)


app.listen(PORT, () => {
    console.log(`Application listening at http://localhost:${PORT}`)
})