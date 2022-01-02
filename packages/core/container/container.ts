export class Container<T = any> {
  private container = new Map<string, T>()

  public get(key: string): T {
    return this.container.get(key)
  }

  public set(key: string, value: T): void {
    this.container.set(key, value)
  }
}
