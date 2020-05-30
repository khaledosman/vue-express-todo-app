import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('' + process.env.PGDATABASE, '' + process.env.PGUSER, '' + process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres'
})

export async function initDb(): Promise<Sequelize> {
  await sequelize.authenticate()
  await sequelize.sync({ force: process.env.NODE_ENV !== 'production' })
  return sequelize
}
