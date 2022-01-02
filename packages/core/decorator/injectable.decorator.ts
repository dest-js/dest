import * as hash from 'object-hash'

export function Injectable(): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata('injectable', true, target)
    Reflect.defineMetadata('injectable:token', hash(target), target)
  }
}
