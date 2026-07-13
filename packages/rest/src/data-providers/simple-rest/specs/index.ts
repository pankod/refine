import { createSimpleRestDataProvider } from "..";

export const { dataProvider: simpleRestDataProvider } =
  createSimpleRestDataProvider({
    apiURL: "https://api.fake-rest.refine.dev",
  });
