import type { Field } from 'payload/types'

import type { PluginConfig, Required } from '../types'
import { GenerateButton } from '../ui/generate-button'

const getMessageField = (pluginConfig: Required<PluginConfig>): Field => {
  const MessageTypeField: Field = {
    name: 'role',
    label: 'Role',
    type: 'select',
    defaultValue: pluginConfig.defaults.messageRole,
    options: [
      { label: 'System', value: 'system' },
      { label: 'User', value: 'user' },
      { label: 'Assistant', value: 'assistant' },
    ],
    required: true,
  }

  const MessageContentField: Field = {
    name: 'content',
    label: 'Content',
    type: 'textarea',
    required: true,
  }

  const MessageTimestampField: Field = {
    name: 'timestamp',
    label: 'Timestamp',
    type: 'date',
    defaultValue: () => new Date().toISOString(),
    admin: {
      readOnly: true,
      date: {
        displayFormat: 'dd/MM/yyyy HH:mm:ss',
      },
    },
  }

  const MessagesField: Field = {
    name: 'messages',
    label: 'Messages',
    type: 'array',
    fields: [MessageTypeField, MessageContentField, MessageTimestampField],
  }
  return MessagesField
}

export const getAiGroupeField = (pluginConfig: Required<PluginConfig>): Field[] => {
  return [
    {
      name: pluginConfig?.groupName,
      label: pluginConfig?.groupLabel,
      type: 'group',
      fields: [
        {
          name: 'model',
          label: 'Model',
          type: 'select',
          options: [
            { label: 'gpt-4', value: 'gpt-4' },
            { label: 'gpt-4-0613', value: 'gpt-4-0613' },
            { label: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' },
            { label: 'gpt-3.5-turbo-16k', value: 'gpt-3.5-turbo-16k' },
          ],
          defaultValue: pluginConfig.defaults.model,
        },
        {
          name: 'temperature',
          label: 'Temperature',
          type: 'number',
          defaultValue: pluginConfig.defaults.temperature,
          min: 0,
          max: 1,
        },
        {
          name: 'max_tokens',
          label: 'Max Tokens',
          type: 'number',
          defaultValue: pluginConfig.defaults.maxToken,
          min: 1,
          max: 2048,
        },
        {
          name: 'totalTokens',
          label: 'Total Tokens Used',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
        {
          admin: {
            hidden: true,
          },
          name: 'frequency_penalty',
          label: 'frequency_penalty',
          type: 'number',
          defaultValue: pluginConfig.defaults.frequencyPenalty,
          min: 0,
          max: 2,
        },
        {
          admin: {
            hidden: true,
          },
          defaultValue: pluginConfig.defaults.presencePenalty,
          name: 'presence_penalty',
          label: 'presence_penalty',
          type: 'number',
        },
        getMessageField(pluginConfig),
        {
          type: 'ui',
          name: 'button',
          admin: {
            position: 'sidebar',
            components: {
              Field: () => GenerateButton(pluginConfig),
            },
          },
        },
      ],
    },
  ]
}
