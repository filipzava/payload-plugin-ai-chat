import OpenAI from 'openai'
import type { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions'

export async function chatComplete({
  messages,
  model,
  temperature,
  max_tokens,
  frequency_penalty,
}: ChatCompletionCreateParamsBase): Promise<OpenAI.Chat.Completions.ChatCompletion | null> {
  if (!process.env.OPENAI_API_KEY) {
    // eslint-disable-next-line no-console
    console.error(
      'WARNING: No OPENAI_API_KEY found in environment variables. Add OPENAI_API_KEY to .env file. Skipping AI Chat plugin.',
    )
    return null
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    messages,
    model,
    temperature,
    max_tokens,
    frequency_penalty,
    // stream: true
  })
  return completion
}
