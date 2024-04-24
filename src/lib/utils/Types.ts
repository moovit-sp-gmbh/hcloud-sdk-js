export type Select<T, Mandatory extends keyof T, Optional extends keyof T> = Pick<T, Mandatory> & Partial<Pick<T, Optional>>;
