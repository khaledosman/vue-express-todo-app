import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db'

export class Todo extends Model {}
Todo.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: DataTypes.STRING,
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, { sequelize, modelName: 'user' })
