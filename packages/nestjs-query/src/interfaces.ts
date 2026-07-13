export type GetFieldsFromList<Q extends Record<string, any>> =
  Q[keyof Q]["nodes"][0];

export type GetFields<Q extends Record<string, any>> = Q[keyof Q];

export type GetVariables<Q extends Record<"input", any>> =
  Q["input"]["update"] extends object
    ? Q["input"]["update"]
    : Q["input"][keyof Q["input"]];
