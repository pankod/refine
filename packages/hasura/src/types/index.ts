export type IDType = "uuid" | "Int" | "String" | "Numeric";

export type NamingConvention = "hasura-default" | "graphql-default";

export type HasuraProviderOptions = {
  idType?: IDType | ((resource: string) => IDType);
  namingConvention?: NamingConvention;
};

export const getIdType = (
  resource: string,
  idType?: IDType | ((resource: string) => IDType),
) => {
  if (typeof idType === "function") {
    return idType(resource);
  }
  return idType ?? "uuid";
};
