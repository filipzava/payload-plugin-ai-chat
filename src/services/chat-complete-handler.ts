import type { Response } from 'express'
import type { ChatCompletionMessageParam } from 'openai/resources/chat'
import type { PayloadRequest } from 'payload/types'

import { chatComplete } from './openai-create-completions'

// eslint-disable-next-line
export default async function chatCompleteHandler(
  req: PayloadRequest,
  res: Response<any, Record<string, any>>,
  options: {
    slug: string
    groupName: string
  },
) {
  const { slug, groupName } = options

  const collectionItem = await req.payload.findByID({ collection: slug, id: req.params.id })

  const aiResultMessage = await chatComplete({
    messages: collectionItem?.[groupName]?.messages.map((message: ChatCompletionMessageParam) => ({
      content: message.content,
      role: message.role,
    })),
    model: collectionItem?.[groupName]?.model,
    temperature: collectionItem?.[groupName]?.temperature,
    max_tokens: collectionItem?.[groupName]?.max_tokens,
    frequency_penalty: collectionItem?.[groupName]?.frequency_penalty,
    presence_penalty: collectionItem?.[groupName]?.presence_penalty,
  })

  const completion = aiResultMessage?.choices[0].message

  const result = await req.payload.update({
    collection: slug,
    id: req.params.id,
    data: {
      [options.groupName]: {
        totalTokes: aiResultMessage?.usage?.total_tokens,
        messages: [
          ...(collectionItem?.[groupName].messages ?? []),
          {
            ...completion,
          },
        ],
      },
    },
  })
  return res.status(200).json(result)
}
