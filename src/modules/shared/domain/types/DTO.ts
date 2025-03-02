type IsOptional<T> = Extract<T, undefined> extends never ? false : true
export type Func = (...args: any[]) => any
type IsFunction<T> = T extends Func ? true : false
type IsValueType<T> = T extends
  | string
  | number
  | boolean
  | null
  | undefined
  | Func
  | Set<any>
  | Map<any, any>
  | Date
  | Array<any>
  ? true
  : false

type ReplaceDate<T> = T extends Date ? string : T
type ReplaceSet<T> = T extends Set<infer X> ? X[] : T
type ReplaceMap<T> = T extends Map<infer K, infer I>
  ? Record<
      K extends string | number | symbol ? K : string,
      IsValueType<I> extends true
        ? I
        : { [K in keyof ExcludeFuncsFromObj<I>]: DTO<I[K]> }
    >
  : T
type ReplaceArray<T> = T extends Array<infer X> ? DTO<X>[] : T

type ExcludeFuncsFromObj<T> = Pick<
  T,
  { [K in keyof T]: IsFunction<T[K]> extends true ? never : K }[keyof T]
>

type Dtoified<T> = IsValueType<T> extends true
  ? ReplaceDate<ReplaceMap<ReplaceSet<ReplaceArray<T>>>>
  : { [K in keyof ExcludeFuncsFromObj<T>]: DTO<T[K]> }

export type DTO<T> = IsFunction<T> extends true
  ? never
  : IsOptional<T> extends true
  ? Dtoified<Exclude<T, undefined>> | null
  : Dtoified<T>

export type Serializable<T> = T & { serialize(): DTO<T> }
