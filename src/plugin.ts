import deepmerge from 'deepmerge'
import type { Response } from 'express'
import type { Config } from 'payload/config'
import type { PayloadRequest } from 'payload/types'

import { getAiGroupeField } from './fields'
import adminChatCompletionHandler from './services/admin-chat-completion-handler'
import chatCompleteHandler from './services/chat-complete-handler'
import type { PluginConfig, Required } from './types'

const defaultPluginConfig: Required<PluginConfig> = {
  enabled: true,
  collections: [],
  groupName: 'aiChat',
  groupLabel: 'AI Chat',
  defaults: {
    maxToken: 2_048,
    messageRole: 'user',
    model: 'gpt-3.5-turbo-16k',
    temperature: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
}

export const aiChat =
  (incomingPluginConfig: PluginConfig) =>
  (config: Config): Config => {
    const pluginConfig: Required<PluginConfig> = deepmerge(
      defaultPluginConfig,
      incomingPluginConfig,
    )

    if (!process.env.OPENAI_API_KEY) {
      // eslint-disable-next-line no-console
      console.error(
        'WARNING: No OPENAI_API_KEY found in environment variables. Add OPENAI_API_KEY to .env file. Skipping AI Chat plugin.',
      )
    }

    return {
      ...config,
      collections: config.collections?.map(collection => {
        const { slug } = collection
        const isEnabled = pluginConfig.enabled && pluginConfig?.collections?.includes(slug)
        if (isEnabled) {
          return {
            ...collection,
            fields: [...(collection?.fields ?? []), ...getAiGroupeField(pluginConfig)],
            endpoints: [
              ...(collection?.endpoints ?? []),
              {
                path: '/:id/chat-complete',
                method: 'get',
                handler: (req: PayloadRequest, res: Response) => {
                  chatCompleteHandler(req, res, {
                    slug,
                    groupName: pluginConfig.groupName,
                  })
                },
              },
              {
                path: '/:id/admin-chat-completion',
                method: 'post',
                handler: (req: PayloadRequest, res: Response) => {
                  adminChatCompletionHandler(req, res)
                },
              },
            ],
          }
        }
        return collection
      }),
    }
  }
