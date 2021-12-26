export interface MiddlewareConfig {
  /**
   * The order in which the middleware should be executed.
   * name should be unique.
   */
  name?: string
  /**
   * The type of the middleware.
   * The type should be one of the following:
   * `command, event, message, ready`
   * If the type is not valid, the middleware wil throw error.
   * @default 'command'
   */
  method: MiddlewareMethod
}

export interface MiddlewareMetadata extends MiddlewareConfig {
  execute: {
    name: string
    contextIndex: number[] | number
  }
}

export class MiddlewareConfig {
  public name?: string
  public method: MiddlewareMethod

  constructor(config: MiddlewareConfig) {
    this.name = config.name
    this.method = config.method
  }
}

export class MiddlewareMetadata extends MiddlewareConfig {
  public execute: {
    name: string
    contextIndex: number[] | number
  }

  constructor(config: MiddlewareMetadata) {
    super(config)
    this.execute = config.execute
  }
}

export type MiddlewareMethod = 'command' | 'event' | 'ready'
