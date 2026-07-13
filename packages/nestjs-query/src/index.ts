import dataProvider from "./dataProvider/index.js";

export * from "./dataProvider/index.js";
export * from "./interfaces.js";
export * from "./liveProvider/index.js";
export * as qqlQueryBuilder from "gql-query-builder";
export type {
  BatchRequestDocument,
  BatchRequestsExtendedOptions,
  BatchRequestsOptions,
  ClientError,
  GraphQLWebSocketClient,
  RawRequestExtendedOptions,
  RawRequestOptions,
  RequestDocument,
  RequestExtendedOptions,
  RequestOptions,
  Variables,
} from "graphql-request";
export {
  batchRequests,
  gql,
  GraphQLClient,
  rawRequest,
  request,
  resolveRequestDocument,
} from "graphql-request";
export * as graphqlWS from "graphql-ws";

export default dataProvider;
