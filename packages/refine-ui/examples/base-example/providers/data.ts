import simpleRestDataProvider from "@refinedev/simple-rest";

export const createDataProvider = (apiUrl: string) =>
  simpleRestDataProvider(apiUrl);
