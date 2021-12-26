export function Execute(): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const { contextIndex } = Reflect.getOwnMetadata(
      'context:parameter',
      target,
      propertyKey
    )

    const metadata = {
      name: propertyKey.toString(),
      contextIndex: contextIndex,
    }

    return Reflect.defineMetadata('execute', metadata, target)
  }
}
