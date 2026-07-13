import { GraphQLClient } from "graphql-request";
const ApiUrlHasuraDefault = "https://flowing-mammal-24.hasura.app/v1/graphql";
const ApiUrlGrpahqlDefault = "https://ruling-redbird-23.hasura.app/v1/graphql";

const createClient = (namingConvention: string) => {
  const client = new GraphQLClient(
    namingConvention === "hasura-default"
      ? ApiUrlHasuraDefault
      : ApiUrlGrpahqlDefault,
  );

  client.setHeader("x-hasura-role", "public");
  client.setHeader("Accept-Encoding", "identity");

  return client;
};

const getApiUrl = (namingConvention: string) => {
  return namingConvention === "hasura-default"
    ? ApiUrlHasuraDefault
    : ApiUrlGrpahqlDefault;
};

export { createClient, getApiUrl };
