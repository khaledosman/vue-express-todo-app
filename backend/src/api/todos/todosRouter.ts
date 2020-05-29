import { Router } from 'express'
import { Todo } from '../../models/Todo'
export const todosRouter: Router = Router()

todosRouter.get('/', async (req, res) => {
  let {limit, offset} = req.query
if(!limit || !offset) {
  res.status(400).json({error: "Limit and Offset query params are required"})
}
  const todos = await Todo.findAndCountAll({ 
    limit: Number(limit), 
    offset: Number(offset) 
  })
  res.send(todos)
})

todosRouter.post('/', async (req, res) => {
const todo = req.body
const newTodo = await Todo.create(todo)
res.send(newTodo)
})

todosRouter.patch('/:todoId', async (req, res) => {
  const update = req.body
  console.log(req.params)
 await Todo.update(update, {
  where: {
    id: req.params.todoId
  }
})
const updated = await Todo.findByPk(req.params.todoId)
  res.send(updated)
})