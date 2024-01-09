export type PublicOnly<T> = { [K in keyof T]: T[K] };
