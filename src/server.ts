/* eslint-disable prettier/prettier */
/* eslint-disable no-console */

import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function server() {
  try {
    await mongoose.connect(config.db_url as string)

    app.listen(config.port, () => {
      console.log(`Server is listening on port: ${config.port}`)
    })
  } catch (error) {
    console.error(error)
  }
}

server()
