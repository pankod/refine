import { GraphQLClient } from "graphql-request";

// const API_URL = "https://api.nestjs-query.refine.dev/graphql";
export const API_URL = "http://localhost:3003/graphql";

const client = new GraphQLClient(API_URL);

export default client;
