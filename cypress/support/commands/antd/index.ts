/// <reference types="cypress" />
/// <reference types="../../index.d.ts" />

export const getAntdNotification = () => {
  return cy.get(".ant-notification-notice");
};

export const setAntdDropdown = ({
  id,
  selectIndex,
}: ISetAntdDropdownParams) => {
  return cy
    .get(`#${id}`)
    .click({ force: true })
    .get(".ant-select-item-option")
    .eq(selectIndex || 0)
    .click({ force: true })
    .get(`#${id}`)
    .blur();
};

export const setAntdSelect = ({ id, value }: ISetAntdSelectParams) => {
  return cy
    .get(`#${id}`)
    .click({ force: true })
    .get(`.ant-select-item[title="${value}"]`)
    .click({ force: true })
    .get(`#${id}`)
    .blur();
};

export const setAntdRangeDatePickerToToday = ({
  id,
}: ISetAntdRangeDatePickerToTodayParams) => {
  return cy
    .get(`#${id}`)
    .click({ force: true })
    .get(".ant-picker-cell-today")
    .eq(0)
    .click({ force: true })
    .click({ force: true });
};

export const getAntdFormItemError = ({ id }: IGetAntdFormItemErrorParams) => {
  return cy.get(`#${id}_help > .ant-form-item-explain-error`);
};

export const getAntdLoadingOverlay = () => {
  return cy.get(".ant-spin");
};

export const getAntdPopoverDeleteButton = () => {
  return cy.get(".ant-popconfirm-buttons button").contains(/delete/gi);
};

export const getAntdColumnSorter = (index: number) => {
  return cy.get(".ant-table-column-sorters").eq(index);
};

export const getAntdFilterTrigger = (index: number) => {
  return cy.get(".ant-table-filter-trigger").eq(index);
};

export const getAntdPaginationItem = (index: number) => {
  return cy.get(`.ant-pagination-item-${index}`);
};

export const getTableRowExpandButton = (index: number) => {
  return cy.get(".ant-table-row-expand-icon").eq(index);
};

export const fillAntdForm = () => {
  cy.fixture("mock-post").then((mockPost) => {
    cy.get("#title").clear();
    cy.get("#title").type(mockPost.title);
    cy.get("#content textarea").clear();
    cy.get("#content textarea").type(mockPost.content);
    cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
    cy.setAntdSelect({ id: "status", value: mockPost.status });
  });
};
