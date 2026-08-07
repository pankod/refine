import { createNestjsxCrudDataProvider } from "../";

export const { dataProvider: nestjsxCrudDataProvider } =
  createNestjsxCrudDataProvider({
    apiURL: "https://api.nestjsx-crud.refine.dev",
  });
