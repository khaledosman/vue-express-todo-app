
import compression from 'compression'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
config()
import { apiRouter } from './api/apiRouter'

export const app = express()

// Middleware
app.use(compression())
app.use(helmet())
app.use(express.json())

app.use('/api', apiRouter)
app.get('/', (req, res) => res.send({ message: 'Hello world!' }))

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}!`))

const endSignals: any = ['SIGINT', 'SIGTERM', 'SIGQUIT']

// If the Node process ends, close the db connection
endSignals.forEach((signal) => process.on(signal, () => {
  // db.close(() => {
  //   console.log('Mongoose default connection disconnected through app termination')
  //   process.exit(0)
  // })
}))
