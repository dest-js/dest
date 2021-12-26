import {
  MiddlewareConfig,
  MiddlewareMetadata,
  MiddlewareMethod,
} from './config'
import { MiddlewareContainer, MiddlewareReturn } from './midleware-container'
import { hash } from 'object-hash'

export class MiddlewareModule {
  private readonly container = new MiddlewareContainer()

  public apply(middleware: { new (): any }) {
    const config = Reflect.getOwnMetadata('middleware', middleware)
    const token = hash(middleware)

    if (!config) {
      throw new Error('Middleware must have @Middleware decorator')
    }

    if (!(config instanceof MiddlewareConfig)) {
      throw new Error('Middleware must has middleware options')
    }

    if (!(config instanceof MiddlewareMetadata)) {
      throw new Error('Middleware must has @Execute decorator')
    }

    this.container.apply(token, middleware, config)
  }

  public getMiddlewareByMethod(method: MiddlewareMethod): {
    [token: string]: MiddlewareReturn
  } {
    const result = {}
    const all = this.container.getAll()
    for (const [token, { mid_class, config }] of Object.entries(all)) {
      if (config.method === method) {
        result[token] = { mid_class, config }
      }
    }
    return result
  }

  public async execute(token: string, context: { [key: string]: any }) {
    const { mid_class: MidClass, config } = this.container.get(token)

    const mid_class = new MidClass()

    const { contextIndex } = config.execute

    const array = []

    if (Array.isArray(contextIndex)) {
      contextIndex.forEach((index) => {
        array[index] = context
      })
    } else {
      array[contextIndex] = context
    }

    try {
      const result = await (mid_class[config.execute.name] as Function).call(
        mid_class,
        array
      )

      if (result === false) return process.exit(1)

      return result
    } catch (e) {
      throw e
    }
  }
}
