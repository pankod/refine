/// <reference types="cypress" />

type UITypes = "antd" | "material-ui" | "chakra-ui" | "mantine";

interface ISetAntdDropdownParams {
  id: string;
  selectIndex?: number;
}

interface ISetAntdSelectParams {
  id: string;
  value: string;
}

interface ISetAntdRangeDatePickerToTodayParams {
  id: string;
}

interface IGetAntdFormItemErrorParams {
  id: string;
}

interface IGetChakraUIFormItemErrorParams {
  id: string;
  type?: "text" | "select";
}

interface IGetMaterialUIFormItemErrorParams {
  id: string;
}

interface IGetMantineFormItemErrorParams {
  id: string;
}

interface IResourceCreateParams {
  ui: UITypes;
}

interface IResourceEditParams {
  ui: UITypes;
}

interface IResourceDeleteParams {
  ui: UITypes;
}

type IAction = "list" | "edit" | "show" | "create" | "clone" | "default";

declare namespace Cypress {
  interface Chainable {
    resourceList(): Chainable<void>;
    resourceCreate(
      params: IResourceCreateParams,
    ): Chainable<JQuery<HTMLElement>>;
    resourceEdit(params: IResourceCreateParams): Chainable<JQuery<HTMLElement>>;
    resourceShow(): Chainable<void>;
    resourceDelete(params: IResourceCreateParams): Chainable<void>;

    assertDocumentTitle(resource: string, action?: IAction): Chainable<void>;

    getSaveButton(): Chainable<JQuery<HTMLElement>>;
    getCreateButton(): Chainable<JQuery<HTMLElement>>;
    getDeleteButton(): Chainable<JQuery<HTMLElement>>;
    getEditButton(): Chainable<JQuery<HTMLElement>>;
    getShowButton(): Chainable<JQuery<HTMLElement>>;
    getPageHeaderTitle(): Chainable<JQuery<HTMLElement>>;

    getAntdNotification(): Chainable<JQuery<HTMLElement>>;
    getAntdLoadingOverlay(): Chainable<JQuery<HTMLElement>>;
    getAntdPopoverDeleteButton(): Chainable<JQuery<HTMLElement>>;
    getAntdColumnSorter(index: number): Chainable<JQuery<HTMLElement>>;
    getAntdFilterTrigger(index: number): Chainable<JQuery<HTMLElement>>;
    getAntdPaginationItem(index: number): Chainable<JQuery<HTMLElement>>;
    getTableRowExpandButton(index: number): Chainable<JQuery<HTMLElement>>;
    setAntdDropdown(
      params: ISetAntdDropdownParams,
    ): Chainable<JQuery<HTMLElement>>;
    setAntdSelect(params: ISetAntdSelectParams): Chainable<JQuery<HTMLElement>>;
    setAntdRangeDatePickerToToday(
      params: ISetAntdRangeDatePickerToTodayParams,
    ): Chainable<JQuery<HTMLElement>>;
    getAntdFormItemError(
      params: IGetAntdFormItemErrorParams,
    ): Chainable<JQuery<HTMLElement>>;
    fillAntdForm: () => void;

    getChakraUINotification(): Chainable<JQuery<HTMLElement>>;
    getChakraUIToast(): Chainable<JQuery<HTMLElement>>;
    getChakraUIFormItemError(
      params: IGetChakraUIFormItemErrorParams,
    ): Chainable<JQuery<HTMLElement>>;
    getChakraUIDeletePopoverButton(): Chainable<JQuery<HTMLElement>>;
    getChakraUILoadingOverlay(): Chainable<JQuery<HTMLElement>>;
    getChakraUIPopoverDeleteButton(): Chainable<JQuery<HTMLElement>>;
    fillChakraUIForm: () => void;

    getMantineNotification(): Chainable<JQuery<HTMLElement>>;
    getMantinePopoverDeleteButton(): Chainable<JQuery<HTMLElement>>;
    getMantineFormItemError(
      params: IGetMantineFormItemErrorParams,
    ): Chainable<JQuery<HTMLElement>>;
    getMantineLoadingOverlay(): Chainable<JQuery<HTMLElement>>;
    fillMantineForm: () => void;

    getMaterialUINotification(): Chainable<JQuery<HTMLElement>>;
    getMaterialUIDeletePopoverButton(): Chainable<JQuery<HTMLElement>>;
    getMaterialUIFormItemError(
      params: IGetChakraUIFormItemErrorParams,
    ): Chainable<JQuery<HTMLElement>>;
    getMaterialUILoadingCircular(): Chainable<JQuery<HTMLElement>>;
    getMaterialUIColumnHeader(index: number): Chainable<JQuery<HTMLElement>>;
    fillMaterialUIForm: () => void;

    interceptGETBlogPost(): Chainable<null>;
    interceptGETBlogPosts(): Chainable<null>;
    interceptPOSTBlogPost(): Chainable<null>;
    interceptPATCHBlogPost(): Chainable<null>;
    interceptDELETEBlogPost(): Chainable<null>;

    interceptGETPost(): Chainable<null>;
    interceptGETPosts(): Chainable<null>;
    interceptPOSTPost(): Chainable<null>;
    interceptPATCHPost(): Chainable<null>;
    interceptDELETEPost(): Chainable<null>;
    interceptGETCategories(): Chainable<null>;
    interceptGETCategory(): Chainable<null>;

    interceptSupabaseGETPosts(): Chainable<null>;
    interceptSupabasePOSTPost(): Chainable<null>;
    interceptSupabasePATCHPost(): Chainable<null>;
    interceptSupabaseDELETEPost(): Chainable<null>;
    interceptSupabaseGETCategories(): Chainable<null>;

    interceptStrapiV4Login(): Chainable<null>;
    interceptStrapiV4GETPost(): Chainable<null>;
    interceptStrapiV4GETPosts(): Chainable<null>;
    interceptStrapiV4POSTPost(): Chainable<null>;
    interceptStrapiV4PUTPost(): Chainable<null>;
    interceptStrapiV4DELETEPost(): Chainable<null>;
    interceptStrapiV4GETCategories(): Chainable<null>;
    interceptStrapiV4GETCategory(): Chainable<null>;

    interceptHasura(): Chainable<null>;
  }
}
