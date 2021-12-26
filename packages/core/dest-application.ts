import { Client, ClientOptions } from 'discord.js'
import { MiddlewareModule } from './middleware/middleware-moddule'

export class DestApplication extends Client {
  private middlewareModule = new MiddlewareModule()
  private context: { [type: string]: any } = {
    client: this,
  }

  public constructor(option?: ClientOptions) {
    super(option)
  }

  /**
   * The context object will be passed to the middleware.
   *
   * @default
   * { client: DestApplication }
   *
   * @example client.setContext({ client: app, token: "04b1df..." })
   *
   */
  public setContext(context: { [type: string]: any }) {
    this.context = context
  }

  public applyMiddleware(middleware: { new () }) {
    this.middlewareModule.apply(middleware)
  }

  public login(token: string): Promise<string> {
    return super.login(token).then((t) => {
      const tokens = Object.keys(
        this.middlewareModule.getMiddlewareByMethod('ready')
      )

      tokens.map((token) => {
        return this.middlewareModule.execute(token, this.context)
      })

      return t
    })
  }
}
