import { DestApplication } from './dest-application'
import { ClientOptions } from '.'
import { ModuleManager } from './module/module-manager'

class DestFactory {
  public create(
    rootModule: { new () },
    clientOptions?: DestClientOptions
  ): DestApplication {
    const app = new DestApplication(clientOptions)
    const modulesManager = new ModuleManager()

    modulesManager.register(rootModule)

    return app
  }
}

interface DestClientOptions extends ClientOptions {}

export const destFactory = new DestFactory()
