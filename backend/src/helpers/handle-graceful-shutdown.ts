const endSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT']

// close the server to avoid more incomin requests after the existing ones are fullfilled then close
// db connection to avoid race conditions / potential response errors or unfulfilled requests
export function handleGracefulShutdown (server, sequelize) {
  endSignals.forEach((signal) => process.on(signal, () => {
    console.log(`end signal ${signal} received, closing server`)
    server.close((err) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log('server closed, closing db connection')
      sequelize.close(() => {
        console.log('db connection closed successfully')
        process.exit(0)
      })
    })
  }))
}
