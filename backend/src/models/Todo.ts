import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db'

export class Todo extends Model {}
Todo.init({
  text: DataTypes.STRING,
  isCompleted: DataTypes.BOOLEAN
}, { sequelize, modelName: 'user' })
