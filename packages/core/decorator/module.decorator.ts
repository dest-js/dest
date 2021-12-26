export function Module(config: object): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('module:config', config, target)
  }
}
