'use client'

import React, { ReactNode } from 'react'
import { Button } from 'payload/components/elements'
import { useField, useForm } from 'payload/components/forms'
import { useDocumentInfo } from 'payload/components/utilities'

import { PluginConfig, Required } from '../types'

export const GenerateButton: React.FC<Required<PluginConfig>> = ({ groupName }) => {
  const docInfo = useDocumentInfo()
  const { setModified, addFieldRow, getData } = useForm()
  const { setValue: setTotalTokens } = useField<number>({
    path: `${groupName}.totalTokens`,
  })
  const [loading, setLoading] = React.useState<boolean>(false)
  const [message, setMessage] = React.useState<ReactNode>(null)

  const handleOnClick = async () => {
    setMessage(null)
    setLoading(true)
    const aiData = getData()?.[groupName]

    if (
      aiData === undefined ||
      !Array.isArray(aiData.messages) ||
      aiData.messages.length === 0 ||
      !aiData.messages.every((message_: any) => message_.content && message_.role)
    ) {
      setMessage(
        <p style={{ color: 'red' }}>You need to add at least one message with content and role</p>,
      )
      setLoading(false)
      return
    }

    const response = await fetch(`/api/${docInfo.slug}/${docInfo.id}/admin-chat-completion`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: aiData.model,
        messages: aiData.messages.map((message_: any) => ({
          content: message_.content,
          role: message_.role,
        })),
        temperature: aiData.temperature,
        max_tokens: aiData.max_tokens,
        frequency_penalty: aiData.frequency_penalty,
        presence_penalty: aiData.presence_penalty,
      }),
    })
    const data = await response.json()

    const aiMessage = data?.choices?.[0].message

    if (aiMessage) {
      addFieldRow({
        path: `${groupName}.messages`,
        rowIndex: aiData.messages.length,
        data: {
          content: aiMessage.content,
          role: aiMessage.role,
        },
      })
      if (data.usage.total_tokens) {
        setTotalTokens(data.usage.total_tokens)
      }
      setModified(true)
    } else {
      setMessage(<p style={{ color: 'red' }}>{data.error}</p>)
    }

    setLoading(false)
  }

  return (
    <div
      style={{
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          marginBottom: '5px',
          position: 'relative',
          right: '0',
        }}
      >
        <div>
          <Button onClick={handleOnClick} size="small" disabled={loading}>
            {!loading ? 'GENERATE' : 'loading...'}
          </Button>
          <div>{message}</div>
        </div>
      </div>
    </div>
  )
}

export const getGenerateButton = (props: any, pluginConfig: Required<PluginConfig>) => (
  <GenerateButton {...props} groupName={pluginConfig.groupName} />
)
