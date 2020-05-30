import { Router } from 'express'
import { todosRouter } from './todos/todos-router'

export const apiRouter: Router = Router()
apiRouter.get('/', (req, res) => {
  res.sendStatus(200)
})
apiRouter.use('/todos', todosRouter)
