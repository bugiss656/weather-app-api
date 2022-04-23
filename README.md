# Weather app API
## Description
This project is an REST API for a Weather app: [https://github.com/mbugiel656/weather-app](https://github.com/mbugiel656/weather-app). It's written in `express.js` and `typescript`. Data is stored in SQLite3 database in `data.db` file. `Prisma` is used to making queries to database.

**Tech stack**:

 - express.js
 - typescript
 - prisma/prisma client
 - lodash
 - luxon

## Details
API has the following routes:

 - `/cities` - fetch list of all cities for which weather data is available

 - `/chartData/temperature/latest/:city` - fetch the latest recorded temperature data for a given city

 - `/chartData/temperature/:city` - fetch temperature data for the last 14 days for a given city

 - `/chartData/temperature/max/:city` - fetch max temperatures data for the last 14 days for a given city
