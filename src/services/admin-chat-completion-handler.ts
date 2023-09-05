import type { Response } from 'express'
import type { PayloadRequest } from 'payload/types'

import { chatComplete } from './openai-create-completions'

// eslint-disable-next-line
export default async function adminChatCompletionHandler(
  req: PayloadRequest,
  res: Response<any, Record<string, any>>,
) {
  const { messages, model, temperature, max_tokens, frequency_penalty, presence_penalty } = req.body
  const aiResultMessage = await chatComplete({
    messages,
    model,
    temperature,
    max_tokens,
    frequency_penalty,
    presence_penalty,
  })
  const data = aiResultMessage?.choices?.[0]?.message

  if (data?.content) {
    return res.status(200).json(aiResultMessage)
  }
  return res.status(400).json({
    error: 'AI response is empty. Did you provide a OpenAI API key?',
  })
}
