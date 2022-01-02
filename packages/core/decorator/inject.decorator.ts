export function Inject(type: { new () }): PropertyDecorator {
  return (target: any, propertyKey: string | symbol) => {
    const token = Reflect.getMetadata('injectable:token', type)
    const injectable = Reflect.getMetadata('injectable', type)
    if (!injectable || !token) {
      throw new Error(`${type.name} is not injectable.`)
    }
    target[propertyKey] = new type()
  }
}
