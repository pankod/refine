/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("server-side-form-validation-chakra-ui", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should render edit form errors ", () => {
    cy.wait("@getPosts");
    cy.getChakraUILoadingOverlay().should("not.exist");
    cy.wait("@getCategories");

    cy.getEditButton().first().click();
    cy.wait("@getPost");
    cy.wait("@getCategories");
    cy.getChakraUILoadingOverlay().should("not.exist");
    cy.getSaveButton().should("not.be.disabled");

    cy.getSaveButton().click();

    cy.contains("Title is required");
    cy.contains("Category is required");
    cy.contains("Content is required");
    cy.contains("Field is not valid");
  });

  it("should render create form errors ", () => {
    cy.wait("@getPosts");
    cy.getChakraUILoadingOverlay().should("not.exist");
    cy.wait("@getCategories");

    cy.getCreateButton().click();
    cy.wait("@getCategories");
    cy.getChakraUILoadingOverlay().should("not.exist");
    cy.getSaveButton().should("not.be.disabled");

    cy.getSaveButton().click();

    cy.contains("Title is required");
    cy.contains("Category is required");
    cy.contains("Content is required");
    cy.contains("Field is not valid");
  });
});
