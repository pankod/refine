/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-chakra-ui-use-form", () => {
  const submitForm = () => {
    return cy.getSaveButton().click();
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should create form render errors", () => {
    cy.getCreateButton().click();

    submitForm();

    cy.getChakraUIFormItemError({ id: "title" }).contains(/required/gi);
    cy.getChakraUIFormItemError({ id: "status", type: "select" }).contains(
      /required/gi,
    );
    cy.getChakraUIFormItemError({
      id: "categoryId",
      type: "select",
    }).contains(/required/gi);
  });

  it("should edit form render errors", () => {
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.get("#title").should("not.have.value", "").clear();
    cy.get("#status").select([]);
    cy.get("#categoryId").select([]);

    submitForm();

    cy.getChakraUIFormItemError({ id: "title" }).contains(/required/gi);
    cy.getChakraUIFormItemError({ id: "status", type: "select" }).contains(
      /required/gi,
    );
    cy.getChakraUIFormItemError({
      id: "categoryId",
      type: "select",
    }).contains(/required/gi);
  });

  it("should create form warn when unsaved changes", () => {
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getCreateButton().click();
    cy.get("#title").type("any value");
    cy.getPageHeaderTitle().siblings().first().click();
    cy.on("window:confirm", (str) => {
      expect(str).to.includes("You have unsaved changes");
    });
  });

  it("should edit form warn when unsaved changes", () => {
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();
    // wait loading state and render to be finished
    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.get("#title").clear();
    cy.get("#title").type("any value");
    cy.getPageHeaderTitle().siblings().first().click();
    cy.on("window:confirm", (str) => {
      expect(str).to.includes("You have unsaved changes");
    });
  });
});
