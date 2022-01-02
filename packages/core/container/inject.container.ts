import { Container } from './container'
import * as hash from 'object-hash'

export class InjectContainer {
  private static container = new Container<{ new () }>()

  public static set(value: { new () }) {
    const token = hash(value)
    const injectable = Reflect.getMetadata('injectable', value)

    if (!injectable) {
      throw new Error('This class is not injectable')
    }
    if (this.container.get(token)) {
      throw new Error('Inject already exists')
    }

    this.container.set(token, value)
  }

  public static get(value: { new () }) {
    const token = hash(value)
    return this.container.get(token)
  }
}
