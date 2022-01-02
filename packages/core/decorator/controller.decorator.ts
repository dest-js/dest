import { ControllerConfig } from '../controller/config'

export function Controller(config: ControllerConfig): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('controller', true, target)
    Reflect.defineMetadata('controller:config', config, target)

    Reflect.defineMetadata(
      'controller:constuctor',
      target['constructor'],
      target
    )
  }
}
