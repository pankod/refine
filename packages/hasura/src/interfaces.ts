export type GetFieldsFromList<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Array<infer U> ? U : never;
}[keyof T];

export type GetFields<T extends Record<any, any>, K = keyof T> = {
  [P in keyof NonNullable<T[K]>]: NonNullable<T[K]>[P];
};

// get "object" field from given type
export type GetVariables<T extends Record<any, any>> = GetFields<T, "object">;
