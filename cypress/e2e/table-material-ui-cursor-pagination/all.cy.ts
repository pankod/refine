/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-cursor-pagination", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work with pagination", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");
    cy.get(".MuiDataGrid-root").should("be.visible");
    cy.get(".MuiDataGrid-row").should("have.length.at.least", 1);

    cy.intercept({
      url: "https://api.github.com/repos/refinedev/refine/commits*",
      query: {
        per_page: "5",
      },
    }).as("getSecondPageCommits");

    cy.get("[title='Go to next page']").should("not.be.disabled");
    cy.get("[title='Go to next page']").click();

    cy.url().should("include", "currentPage=2");

    cy.wait("@getSecondPageCommits");

    cy.intercept({
      url: "https://api.github.com/repos/refinedev/refine/commits*",
      query: {
        per_page: "5",
      },
    }).as("getFirstPageCommits");

    // Wait for the previous page button to be enabled before clicking
    cy.get("[title='Go to previous page']").should("not.be.disabled");
    cy.get("[title='Go to previous page']").click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getFirstPageCommits");
  });
});
