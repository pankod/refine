/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-mantine-use-form", () => {
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

    cy.getMantineFormItemError({ id: "title" }).contains(/short/gi);
    cy.getMantineFormItemError({ id: "status" }).contains(/required/gi);
    cy.getMantineFormItemError({ id: "categoryId" }).contains(/required/gi);
    cy.get(".mantine-Text-root").contains(/too short content/i);
  });

  it("should edit form render errors", () => {
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");
    cy.getMantineLoadingOverlay().should("not.exist");

    cy.get("#content textarea").clear();
    cy.get("#title").clear();
    cy.get("#categoryId").clear();

    submitForm();

    cy.getMantineFormItemError({ id: "title" }).contains(/short/gi);
    cy.getMantineFormItemError({ id: "categoryId" }).contains(/required/gi);
    cy.get(".mantine-Text-root").contains(/too short content/i);
  });

  it("should create form warn when unsaved changes", () => {
    cy.wait("@getPosts");
    cy.getCreateButton().click();
    cy.get("#title").type("any value");
    cy.getPageHeaderTitle().siblings().first().click();
    cy.on("window:confirm", (str) => {
      expect(str).to.includes("You have unsaved changes");
    });
  });

  it("should edit form warn when unsaved changes", () => {
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");
    cy.getMantineLoadingOverlay().should("not.exist");

    cy.get("#title").clear();
    cy.get("#title").type("any value");
    cy.getPageHeaderTitle().siblings().first().click();
    cy.on("window:confirm", (str) => {
      expect(str).to.includes("You have unsaved changes");
    });
  });
});
