import { Router } from 'express'
import { Todo } from '../../models/Todo'
export const todosRouter: Router = Router()

todosRouter.get('/', async (req, res) => {
  try {
    const { limit, offset, showCompleted } = req.query
    const _showCompleted = showCompleted !== 'false'
    if (!limit || !offset) {
      res.status(400).json({ error: 'Limit and Offset query params are required' })
    }
    const todos = await Todo.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      // order: ["createdAt", "DESC"],
      ...(_showCompleted === false && {
        where: {
          isCompleted: false
        }
      })
    })
    res.send(todos)
  } catch (err) {
    res.status(500).send({ error: err })
  }
})

todosRouter.post('/', async (req, res) => {
  try {
    const todo = req.body
    const newTodo = await Todo.create(todo)
    res.send(newTodo)
  } catch (err) {
    res.status(500).send({ error: err })
  }
})

todosRouter.patch('/:todoId', async (req, res) => {
  try {
    const update = req.body
    console.log(req.params)
    const updateResult = await Todo.update(update, {
      where: {
        id: req.params.todoId
      }
    })
    console.log({ updateResult })
    if (updateResult[0] > 0) {
      const updated = await Todo.findByPk(req.params.todoId)
      res.send(updated)
    } else {
      res.status(400).send({ error: 'update failed' })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
})

todosRouter.delete('/:todoId', async (req, res) => {
  try {
    const deleteResult = await Todo.destroy({
      where: {
        id: req.params.todoId
      }
    })
    console.log({ deleteResult })
    if (deleteResult > 0) {
      res.send({ message: 'todo deleted successfully' })
    } else {
      res.status(400).send({ error: 'item not found' })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
})
