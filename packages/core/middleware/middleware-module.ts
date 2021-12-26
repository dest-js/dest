import { MiddlewareMethod } from './config'
import { MiddlewareContainer, MiddlewareReturn } from './midleware-container'
import * as hash from 'object-hash'

export class MiddlewareModule {
  private readonly container = new MiddlewareContainer()

  public apply(middleware: { new (): any }) {
    const config = Reflect.getOwnMetadata('middleware:config', middleware)
    const token = hash(middleware)

    if (!config) {
      throw new Error('Middleware must have @Middleware decorator')
    }

    if (this.container.get(token).mid_class) {
      throw new Error('Middleware already exists')
    }

    const c = new middleware()

    const execute = Reflect.getMetadata('execute', c)

    this.container.apply(token, middleware, { ...config, execute })
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

    array[contextIndex] = context[0]

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
