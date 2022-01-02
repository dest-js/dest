import { Container } from '../container/container'
import { ModuleConfig, ModuleTree } from './config'
import { ControllerConfig } from '../controller/config'
import { DestApplication } from '../dest-application'
import * as hash from 'object-hash'

export class ModuleManager {
  private commandContainer = new Container<{ new () }>()
  private eventContainer = new Container<{ new () }[]>()
  private modules = new Set<any>()

  public register(
    rootModule: { new () },
    parentId?: string,
    priority: number = 0
  ) {
    const config: ModuleConfig = Reflect.getMetadata(
      'module:config',
      rootModule
    )

    const value: ModuleTree = {
      id: hash(rootModule),
      parentId,
      priority,
      value: config,
      children: [],
    }

    if (!config) throw new Error(`${rootModule.name} is not a module`)

    this.modules.add(value)

    priority += 1

    config.controllers.forEach((controller) => {
      this.registerController(controller)
    })

    config.providers.forEach((provider) => {
      this.registerProviders(provider)
    })

    config.imports.forEach((module) => {
      this.register(module, hash(rootModule), priority)
    })

    console.log(this.modules)
  }

  public registerProviders(service: { new () }) {
    const injectable: boolean = Reflect.getMetadata('injectable', service)

    if (!injectable) throw new Error(`${service.name} is not injectable`)
  }

  public registerController(controller: { new () }) {
    const isController: boolean = Reflect.getMetadata('controller', controller)
    const config: ControllerConfig = Reflect.getMetadata(
      'controller:config',
      controller
    )

    if (!isController) throw new Error(`${controller.name} is not a controller`)

    switch (config.method) {
      case 'command':
        this.commandContainer.set(config.name, controller)
        break
      case 'event':
        const events = this.eventContainer.get(config.name)
        this.eventContainer.set(config.name, [...events, controller])
        break
      default:
        throw new Error(`${controller.name} is not a valid method`)
    }
  }

  public registerEvents(client: DestApplication) {}

  public executeController(controller: { new () }): Function {
    const config: ControllerConfig = Reflect.getMetadata(
      'controller:config',
      controller
    )

    return () => {}
  }
}
