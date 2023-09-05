import type { Server } from 'http'
import mongoose from 'mongoose'
import payload from 'payload'

import { start } from './src/server'

describe('Plugin tests', () => {
  let server: Server
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let newCollection: any

  beforeAll(async () => {
    server = await start()
  }, 10000)

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    server.close()
  })

  // Add tests to ensure that the plugin works as expected

  // Example test to check for seeded data
  it('seeds data accordingly', async () => {
    const newCollectionQuery = await payload.find({
      collection: 'posts',
    })

    newCollection = newCollectionQuery.docs?.[0]

    expect(newCollection.aiChat).toEqual({})
  })

  it('add aiChat messages', async () => {
    const result = await payload.update({
      collection: 'posts',
      id: newCollection.id,
      data: {
        aiChat: {
          messages: [
            {
              role: 'system',
              content: 'finish sentece',
            },
            {
              role: 'user',
              content: 'I like dogs and dogs like',
            },
          ],
        },
      },
    })
    expect(result.aiChat.messages.length).toEqual(2)
  }, 10000)
  /*
// WE WILL NEED OPENAI API KEY TO RUN THIS TEST
  it('Should generate content', async () => {
    const result = await fetch(
      `http://localhost:3000/api/posts/${newCollection.id}/chat-complete`,
      {
        method: 'GET',
      },
    )
    const data = await result.json()
    expect(data.aiChat.messages.length).toEqual(3)
  }, 10000) */
})
