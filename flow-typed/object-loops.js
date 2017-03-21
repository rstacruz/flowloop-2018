declare module 'object-loops/filter' {
  declare type Callback = (item: any) => boolean
  declare module.exports: <T>(input: T, callback: Callback) => T
}

declare module 'object-loops/map' {
  declare type Callback = (item: any) => any
  declare module.exports: <T>(input: T, callback: Callback) => T
}

declare module 'object-loops/values' {
  declare module.exports: (input: Object) => Array<any>
}
