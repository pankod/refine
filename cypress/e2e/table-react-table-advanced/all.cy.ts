/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-react-table-advanced", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("the row should be expandable", () => {
    cy.wait("@getPosts");

    cy.get("#expand-toggle").click();

    cy.get("#expanded-row").should("exist");
  });

  it("delete button should only be showed when at least one row is selected", () => {
    cy.wait("@getPosts");

    cy.get("#delete-selected").should("not.exist");

    cy.get("tbody tr td input").first().click();

    cy.get("#delete-selected").should("exist");
  });

  it("should fill the form with the row data when click the edit button and save the form", () => {
    cy.wait("@getPosts");

    cy.get("button").contains("Edit").first().click();

    cy.get("#title-input").should("exist");
    cy.get("#category-select").should("exist");

    cy.wait("@getPost").then((interception) => {
      const { response } = interception;
      const data = response?.body;

      cy.get("#title-input").should("have.value", data.title);
      cy.get("#category-select").should("have.value", data.category.id);
    });

    cy.get("#title-input").clear().type("Fuga eos enim autem eos.");

    cy.get("button").contains("Save").first().click();

    cy.wait("@patchPost").then((interception) => {
      const { request } = interception;
      const data = request.body;

      expect(data.title).to.equal("Fuga eos enim autem eos.");
    });
  });
});
