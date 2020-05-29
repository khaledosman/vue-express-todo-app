import { Router } from 'express'
export const todosRouter: Router = Router()

todosRouter.get('/', (req, res) => {
  res.send("Wat")
})