export const REFINE_PACKAGE_FILEPATH_REGEXP =
  __DEV_CONDITION__ !== "development"
    ? /node_modules\/refinedev\/(.*?)\//
    : /\/refine\/packages\/(.*?)\//;
