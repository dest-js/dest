import { MiddlewareConfig } from '../middleware/config'

export function Middleware(config: MiddlewareConfig): ClassDecorator {
  return (target: any) => {
    const metadata: MiddlewareConfig = {
      name: config.name,
      method: config.method,
    }
    return Reflect.defineMetadata('middleware:config', metadata, target)
  }
}
