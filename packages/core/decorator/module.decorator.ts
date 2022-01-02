import { ModuleConfig } from '../module/config'

export function Module(config: ModuleConfig): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('module:config', config, target)
  }
}
