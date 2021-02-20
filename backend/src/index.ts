
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'

import './helpers/load-env'
import { sequelize, initDb } from './db'
import { apiRouter } from './api/api-router'
import { handleGracefulShutdown } from './helpers/handle-graceful-shutdown'

export const app = express()

// Middleware
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api', apiRouter)
app.get('/', (req, res) => res.send({ message: 'Hello world!' }))

const server = http.createServer(app)

// graceful start
console.log('connecting to db')
initDb()
  .then(() => {
    console.log('connected to db successfully')

    server.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}!`))
  })

// graceful shutdown
handleGracefulShutdown(server, sequelize)
