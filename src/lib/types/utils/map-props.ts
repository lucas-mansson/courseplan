// Map all properties of a type to the same type U
export type MapProps<T, U> = {
  [K in keyof T]: U
}

export type MapFieldsToStringArray<T> = MapProps<T, string[]>
