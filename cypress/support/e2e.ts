/// <reference types="cypress" />
/// <reference types="./index.d.ts" />

import {
  getAntdNotification,
  setAntdSelect,
  setAntdDropdown,
  getAntdFormItemError,
  getAntdLoadingOverlay,
  getAntdPopoverDeleteButton,
  getAntdColumnSorter,
  getAntdFilterTrigger,
  getAntdPaginationItem,
  getTableRowExpandButton,
  setAntdRangeDatePickerToToday,
  fillAntdForm,
} from "./commands/antd";
import {
  getChakraUIPopoverDeleteButton,
  getChakraUIFormItemError,
  getChakraUILoadingOverlay,
  getChakraUINotification,
  getChakraUIToast,
  fillChakraUIForm,
} from "./commands/chakra-ui";
import {
  fillMantineForm,
  getMantineFormItemError,
  getMantineLoadingOverlay,
  getMantineNotification,
  getMantinePopoverDeleteButton,
} from "./commands/mantine";
import {
  getCreateButton,
  getDeleteButton,
  getEditButton,
  getPageHeaderTitle,
  getSaveButton,
  getShowButton,
} from "./commands/refine";
import { list, create, edit, show, resourceDelete } from "./commands/resource";
import { assertDocumentTitle } from "./commands/document-title-handler";

// add commands to the Cypress chain
import "./commands/intercepts";
import {
  fillMaterialUIForm,
  getMaterialUIColumnHeader,
  getMaterialUIDeletePopoverButton,
  getMaterialUIFormItemError,
  getMaterialUILoadingCircular,
  getMaterialUINotifications,
} from "./commands/material-ui";

Cypress.Keyboard.defaults({
  keystrokeDelay: 0,
});

Cypress.config("defaultCommandTimeout", 20000);
Cypress.config("requestTimeout", 20000);

Cypress.Commands.add("assertDocumentTitle", assertDocumentTitle);

Cypress.Commands.add("resourceList", list);
Cypress.Commands.add("resourceCreate", create);
Cypress.Commands.add("resourceEdit", edit);
Cypress.Commands.add("resourceShow", show);
Cypress.Commands.add("resourceDelete", resourceDelete);

Cypress.Commands.add("getSaveButton", getSaveButton);
Cypress.Commands.add("getCreateButton", getCreateButton);
Cypress.Commands.add("getDeleteButton", getDeleteButton);
Cypress.Commands.add("getEditButton", getEditButton);
Cypress.Commands.add("getShowButton", getShowButton);
Cypress.Commands.add("getPageHeaderTitle", getPageHeaderTitle);

Cypress.Commands.add("fillAntdForm", fillAntdForm);
Cypress.Commands.add("getAntdNotification", getAntdNotification);
Cypress.Commands.add("setAntdSelect", setAntdSelect);
Cypress.Commands.add("setAntdDropdown", setAntdDropdown);
Cypress.Commands.add("getAntdFormItemError", getAntdFormItemError);
Cypress.Commands.add("getAntdLoadingOverlay", getAntdLoadingOverlay);
Cypress.Commands.add("getAntdPopoverDeleteButton", getAntdPopoverDeleteButton);
Cypress.Commands.add("getAntdColumnSorter", getAntdColumnSorter);
Cypress.Commands.add("getAntdFilterTrigger", getAntdFilterTrigger);
Cypress.Commands.add("getAntdPaginationItem", getAntdPaginationItem);
Cypress.Commands.add("getTableRowExpandButton", getTableRowExpandButton);
Cypress.Commands.add(
  "setAntdRangeDatePickerToToday",
  setAntdRangeDatePickerToToday,
);

Cypress.Commands.add("fillChakraUIForm", fillChakraUIForm);
Cypress.Commands.add("getChakraUINotification", getChakraUINotification);
Cypress.Commands.add("getChakraUIToast", getChakraUIToast);
Cypress.Commands.add("getChakraUIFormItemError", getChakraUIFormItemError);
Cypress.Commands.add(
  "getChakraUIPopoverDeleteButton",
  getChakraUIPopoverDeleteButton,
);
Cypress.Commands.add("getChakraUILoadingOverlay", getChakraUILoadingOverlay);

Cypress.Commands.add("getMaterialUINotification", getMaterialUINotifications);
Cypress.Commands.add(
  "getMaterialUIDeletePopoverButton",
  getMaterialUIDeletePopoverButton,
);
Cypress.Commands.add("getMaterialUIFormItemError", getMaterialUIFormItemError);
Cypress.Commands.add(
  "getMaterialUILoadingCircular",
  getMaterialUILoadingCircular,
);
Cypress.Commands.add("getMaterialUIColumnHeader", getMaterialUIColumnHeader);

Cypress.Commands.add("fillMantineForm", fillMantineForm);
Cypress.Commands.add("getMantineNotification", getMantineNotification);
Cypress.Commands.add(
  "getMantinePopoverDeleteButton",
  getMantinePopoverDeleteButton,
);
Cypress.Commands.add("getMantineFormItemError", getMantineFormItemError);
Cypress.Commands.add("getMantineLoadingOverlay", getMantineLoadingOverlay);
Cypress.Commands.add("fillMaterialUIForm", fillMaterialUIForm);

/**
 * Disable telemetry calls
 */
beforeEach(() => {
  cy.intercept("https://telemetry.refine.dev/**", {
    body: "Disabled telemetry to avoid unwanted entries in the database",
    statusCode: 200,
  }).as("telemetry");

  cy.interceptGETPosts();
  cy.interceptGETPost();
  cy.interceptPOSTPost();
  cy.interceptPATCHPost();
  cy.interceptDELETEPost();
  cy.interceptGETBlogPosts();
  cy.interceptGETBlogPost();
  cy.interceptPOSTBlogPost();
  cy.interceptPATCHBlogPost();
  cy.interceptDELETEBlogPost();
  cy.interceptGETCategories();
  cy.interceptGETCategory();
});

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("NEXT_REDIRECT")) {
    return false;
  }

  if (err.message.includes("NEXT_NOT_FOUND")) {
    return false;
  }

  return true;
});
