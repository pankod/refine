/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("base-chakra-ui", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should list resource", () => {
    cy.resourceList();
  });

  it("should create resource", () => {
    cy.resourceCreate({
      ui: "chakra-ui",
    });
  });

  it("should edit resource", () => {
    cy.resourceEdit({ ui: "chakra-ui" });
  });

  it("should show resource", () => {
    cy.resourceShow();
  });

  it("should delete resource", () => {
    cy.resourceDelete({ ui: "chakra-ui" });
  });
});
