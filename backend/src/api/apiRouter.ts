import { Router } from 'express'
import { todosRouter } from './todos/todosRouter'
export const apiRouter: Router = Router()

apiRouter.get('/', (req, res) => {
  res.send("Hello?")
})
apiRouter.use('/todos', todosRouter)