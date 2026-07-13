export const checkPackage = (code = "") => {
  const set = new Set<string>();

  const hasAntd =
    code.includes("@refinedev/antd") ||
    code.includes("RefineAntd") ||
    code.includes(`from "antd"`) ||
    code.includes("@ant-design/icons") ||
    code.includes("@uiw/react-md-editor");
  const hasMui =
    code.includes("@refinedev/mui") ||
    code.includes("RefineMui") ||
    code.includes("@emotion/react") ||
    code.includes("@emotion/styled") ||
    code.includes("@mui/lab") ||
    code.includes("@mui/material/styles") ||
    code.includes("@mui/icons-material") ||
    code.includes("@mui/material") ||
    code.includes("@mui/x-data-grid") ||
    code.includes(`from "react-hook-form"`);
  const hasMantine =
    code.includes("@refinedev/mantine") ||
    code.includes("RefineMantine") ||
    code.includes("@mantine/core") ||
    code.includes("@mantine/hooks") ||
    code.includes("@mantine/form") ||
    code.includes("@mantine/notifications");
  const hasChakra =
    code.includes("@refinedev/chakra-ui") ||
    code.includes("RefineChakra") ||
    code.includes("@chakra-ui/react") ||
    code.includes(`from "react-hook-form"`);
  const hasAntdInferencer =
    code.includes("@refinedev/inferencer/antd") ||
    code.includes("RefineAntdInferencer");
  const hasMuiInferencer =
    code.includes("@refinedev/inferencer/mui") ||
    code.includes("RefineMuiInferencer");
  const hasMantineInferencer =
    code.includes("@refinedev/inferencer/mantine") ||
    code.includes("RefineMantineInferencer");
  const hasChakraInferencer =
    code.includes("@refinedev/inferencer/chakra-ui") ||
    code.includes("RefineChakraInferencer");
  const hasHeadlessInferencer =
    code.includes("@refinedev/inferencer/headless") ||
    code.includes("RefineHeadlessInferencer");

  const hasCasbin = code.includes("casbin");
  const hasI18n = code.includes("react-i18next") || code.includes("i18next");
  const hasTablerIcons =
    code.includes("@tabler/icons") || code.includes("@tabler/icons-react");
  const hasKbar = code.includes("@refinedev/kbar");
  const hasAirtable = code.includes("@refinedev/airtable");
  const hasAppwrite = code.includes("@refinedev/appwrite");
  const hasHasura = code.includes("@refinedev/hasura");
  const hasNestjsxCrud = code.includes("@refinedev/nestjsx-crud");
  const hasNestjsQuery = code.includes("@refinedev/nestjs-query");
  const hasStrapiV4 = code.includes("@refinedev/strapi-v4");
  const hasStrapiGraphql = code.includes("@refinedev/strapi-graphql");
  const hasSupabase = code.includes("@refinedev/supabase");
  const hasDevtools = code.includes("@refinedev/devtools");
  const hasAxios = code.includes("axios");
  const hasAuth0 = code.includes("@auth0/auth0-react");
  const hasKeycloak =
    code.includes("@react-keycloak/web") || code.includes("keycloak-js");

  const hasReactDom = code.includes("react-dom/client");
  const hasWebVitals = code.includes("./reportWebVitals");

  if (hasReactDom) {
    set.add("react-dom");
  }

  if (hasWebVitals) {
    set.add("web-vitals");
  }

  if (hasI18n) {
    set.add("i18n");
  }

  if (hasTablerIcons) {
    set.add("tabler-icons");
  }

  if (hasKbar) {
    set.add("kbar");
  }

  if (hasAirtable) {
    set.add("airtable");
  }

  if (hasAppwrite) {
    set.add("appwrite");
  }

  if (hasHasura) {
    set.add("hasura");
  }

  if (hasNestjsxCrud) {
    set.add("nestjsx-crud");
  }

  if (hasNestjsQuery) {
    set.add("nestjs-query");
  }

  if (hasStrapiV4) {
    set.add("strapi-v4");
  }

  if (hasStrapiGraphql) {
    set.add("strapi-graphql");
  }

  if (hasSupabase) {
    set.add("supabase");
  }

  if (hasDevtools) {
    set.add("devtools");
  }

  if (hasAxios) {
    set.add("axios");
  }

  if (hasAuth0) {
    set.add("auth0");
  }

  if (hasKeycloak) {
    set.add("keycloak");
  }

  if (hasAntd) {
    set.add("antd");
  }
  if (hasAntdInferencer) {
    set.add("antd-inferencer");
  }

  if (hasMui) {
    set.add("mui");
  }
  if (hasMuiInferencer) {
    set.add("mui-inferencer");
  }

  if (hasMantine) {
    set.add("mantine");
  }
  if (hasMantineInferencer) {
    set.add("mantine-inferencer");
  }

  if (hasChakra) {
    set.add("chakra");
  }
  if (hasChakraInferencer) {
    set.add("chakra-inferencer");
  }

  if (hasHeadlessInferencer) {
    set.add("headless-inferencer");
  }

  if (hasCasbin) {
    set.add("casbin");
  }

  return set;
};
