import { Router } from 'express'
import { Todo } from '../../models/Todo'
export const todosRouter: Router = Router()

todosRouter.get('/', async (req, res) => {
  try {

    let { limit, offset, showCompleted } = req.query
    console.log({ showCompleted })
    let _showCompleted = showCompleted === "false" ? false : true
    if (!limit || !offset) {
      res.status(400).json({ error: "Limit and Offset query params are required" })
    }
    console.log({ _showCompleted })
    const todos = await Todo.findAndCountAll({
      limit: Number(limit),
      offset: Number(offset),
      order: ["createdAt", "DESC"],
      ...(_showCompleted === false && {
        where: {
          isCompleted: false
        }
      }),
    })
    res.send(todos)
  } catch (err) {
    res.status(500).send(err)
  }
})

todosRouter.post('/', async (req, res) => {
  try {

    const todo = req.body
    const newTodo = await Todo.create(todo)
    res.send(newTodo)
  } catch (err) {
    res.status(500).send(err)
  }
})

todosRouter.patch('/:todoId', async (req, res) => {
  try {

    const update = req.body
    console.log(req.params)
    await Todo.update(update, {
      where: {
        id: req.params.todoId
      }
    })
    const updated = await Todo.findByPk(req.params.todoId)
    res.send(updated)
  } catch (err) {
    res.status(500).send(err)
  }
})

todosRouter.delete('/:todoId', async (req, res) => {
  try {

    await Todo.destroy({
      where: {
        id: req.params.todoId
      }
    })
    res.send("deleted successfully")

  } catch (err) {
    res.status(500).send(err)
  }
})