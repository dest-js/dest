import { ClientEvents } from '../index'

export type EventList = keyof ClientEvents
export type ControllerConfig = CommandConfig | EventConfig

interface CommandConfig {
  name: string
  method: 'command'
}

interface EventConfig {
  name: EventList
  method: 'event'
}
