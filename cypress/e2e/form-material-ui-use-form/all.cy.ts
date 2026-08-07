/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-material-ui-use-form", () => {
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

    cy.getMaterialUIFormItemError({ id: "title" }).contains(/required/gi);
    cy.getMaterialUIFormItemError({ id: "status" }).contains(/required/gi);
    cy.getMaterialUIFormItemError({ id: "category" }).contains(/required/gi);
    cy.getMaterialUIFormItemError({ id: "content" }).contains(/required/gi);

    cy.fillMaterialUIForm();

    cy.getMaterialUIFormItemError({ id: "title" }).should("not.exist");
    cy.getMaterialUIFormItemError({ id: "status" }).should("not.exist");
    cy.getMaterialUIFormItemError({ id: "content" }).should("not.exist");
    cy.getMaterialUIFormItemError({ id: "category" }).should("not.exist");
  });

  it("should edit form render errors", () => {
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.wait("@getCategories");
    cy.getSaveButton().should("not.be.disabled");

    cy.get("#title").should("not.have.value", "").clear();
    cy.get("#content").should("not.have.value", "").clear();
    cy.get("#status").should("not.have.value", "").clear({ force: true });
    cy.get("#category").should("not.have.value", "").clear({ force: true });
    cy.get("#category").blur();

    submitForm();

    cy.getMaterialUIFormItemError({ id: "title" }).contains(/required/gi);
    cy.getMaterialUIFormItemError({ id: "content" }).contains(/required/gi);
    cy.getMaterialUIFormItemError({ id: "status" }).contains(/required/gi);
    cy.getMaterialUIFormItemError({ id: "category" }).contains(/required/gi);

    cy.fillMaterialUIForm();

    cy.getMaterialUIFormItemError({ id: "title" }).should("not.exist");
    cy.getMaterialUIFormItemError({ id: "content" }).should("not.exist");
  });

  it("should create form warn when unsaved changes", () => {
    cy.wait("@getPosts");
    cy.getCreateButton().click();
    cy.get("#title").type("any value");
    cy.get(".MuiCardHeader-avatar > .MuiButtonBase-root").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.includes("You have unsaved changes");
    });
  });

  it("should edit form warn when unsaved changes", () => {
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.wait("@getCategories");
    cy.getSaveButton().should("not.be.disabled");

    cy.get("#title").clear();
    cy.get("#title").type("any value");
    cy.get(".MuiCardHeader-avatar > .MuiButtonBase-root").click();
    cy.on("window:confirm", (str) => {
      expect(str).to.includes("You have unsaved changes");
    });
  });
});
