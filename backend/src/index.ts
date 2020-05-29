
import compression from 'compression'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
config()
import { apiRouter } from './api/apiRouter'
import { sequelize } from './db'

export const app = express()

// Middleware
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', apiRouter)
app.get('/', (req, res) => res.send({ message: 'Hello world!' }))

const server = http.createServer(app)
console.log('connecting to db')
// graceful start
sequelize.authenticate()
  .then(async () => {
    await sequelize.sync({ force: true })
    console.log('connected to db successfully')
    server.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}!`))
  })

// graceful shutdown
const endSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT']
endSignals.forEach((signal) => process.on(signal, () => {
  console.log(`end signal ${signal} received, closing server`)
  server.close(() => {
    console.log('server closed, closing db')
    sequelize.close(() => {
      console.log('db closed successfully')
      process.exit(0)
    })
  })
}))
