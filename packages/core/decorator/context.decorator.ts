export function Ctx(): ParameterDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    const metadata = {
      contextIndex: parameterIndex,
    }
    return Reflect.defineMetadata(
      'context:parameter',
      metadata,
      target,
      propertyKey
    )
  }
}
