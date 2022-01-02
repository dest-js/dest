export interface ModuleConfig {
  /**
   * The imports of the module.
   * Usually, this is filled with other module.
   */
  imports: { new () }[]
  /**
   * The controllers of the module.
   * This can register the other controllers
   */
  controllers: { new () }[]
  /**
   * The proviers of the module.
   * This can register the other providers
   * Usually, providers is used for DI
   */
  providers: { new () }[]
}

export interface ModuleTree {
  id: string
  parentId: string | null
  priority: number
  value: ModuleConfig
  children: ModuleTree[]
}
