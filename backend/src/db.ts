import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('' + process.env.POSTGRES_DATABASE, '' + process.env.POSTGRES_USER, '' + process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  dialect: 'postgres'
})

export async function initDb(): Promise<Sequelize> {
  await sequelize.authenticate()
  await sequelize.sync({ force: process.env.NODE_ENV !== 'production' })
  return sequelize
}
