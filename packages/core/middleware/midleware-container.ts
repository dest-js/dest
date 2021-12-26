import { MiddlewareMetadata } from './config'

export class MiddlewareContainer {
  private readonly container = new Map<string, { new () }>()
  private readonly configContainer = new Map<string, MiddlewareMetadata>()

  public get(token: string): MiddlewareReturn {
    const mid_class = this.container.get(token)
    const config = this.configContainer.get(token)
    return { mid_class, config }
  }

  public getAll(): { [token: string]: MiddlewareReturn } {
    let result = {}
    this.container.forEach((v, k) => {
      result[k] = { mid_class: v, config: this.configContainer.get(k) }
    })
    return result
  }

  public apply(
    token: string,
    middleware: { new (): any },
    config: MiddlewareMetadata
  ) {
    this.container.set(token, middleware)
    this.configContainer.set(token, config)
  }
}

export interface MiddlewareReturn {
  mid_class: { new () }
  config: MiddlewareMetadata
}
