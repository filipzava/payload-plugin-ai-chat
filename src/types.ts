export interface PluginConfig {
  /**
   * Enable or disable plugin
   * @default false
   */
  enabled?: boolean
  /**
   * Collections to add AI Chat fields
   *
   */
  collections?: string[]
  groupName?: string // default: 'ai'
  groupLabel?: string // default: 'ai'
  defaults?: {
    maxToken?: number // default: 2,048
    messageRole?: string // default: 'user'
    model?: string // default: 'gpt-3.5-turbo-16k'
    temperature?: number // default: 1
    frequencyPenalty?: number // default: 0
    presencePenalty?: number // default: 0
  }
}

export type Required<T> = {
  [P in keyof T]-?: T[P]
}
