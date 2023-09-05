import dotenv from 'dotenv'
import express from 'express'
import type { Server } from 'http'
import payload from 'payload'

import { seed } from './seed'

dotenv.config()
const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

// Initialize Payload
export const start = async (args: { local: boolean } = { local: false }): Promise<Server> => {
  const { local } = args
  await payload.init({
    local,
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
  }

  return app.listen(3000)
}

if (module.id === require.main?.id) {
  start()
}
