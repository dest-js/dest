import { DestApplication } from './dest-application'
import { ClientOptions } from '.'

class DestFactory {
  public create(module: { new () }, options?: ClientOptions): DestApplication {
    const app = new DestApplication(options)
    return app
  }
}

export const destFactory = new DestFactory()
