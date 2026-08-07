/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-table-filter", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be view list page", () => {
    cy.resourceList();
  });

  it("the table should be filterable by form", () => {
    cy.wait("@getPosts");
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.fixture("categories.json").then((categories) => {
      const firstCategory = categories[0];

      cy.get("#q").type(firstCategory.title);
      cy.get("#status").click().get("#status-option-0").click();
      cy.get("#category")
        .click()
        .get("#category-option-0", { timeout: 3000 })
        .click();

      cy.get("button[type=submit]").click();

      cy.wait("@getPosts").then((interception) => {
        const { query } = interception.request;

        expect(query.q).to.equal(firstCategory.title);
        expect(query.status).to.equal("published");
        expect(query["category.id"]).not.to.be.undefined;
      });
    });
  });
});
