import * as RefineRestRoot from "@refinedev/rest";
import * as RefineRestSimpleRest from "@refinedev/rest/simple-rest";
import * as RefineRestNestjsxCrud from "@refinedev/rest/nestjsx-crud";
import * as RefineRestStrapiV4 from "@refinedev/rest/strapi-v4";

export const RefineRest = {
  ...RefineRestRoot,
  ...RefineRestSimpleRest,
  ...RefineRestNestjsxCrud,
  ...RefineRestStrapiV4,
};

const RefineRestScope = {
  RefineRest,
};

export default RefineRestScope;
