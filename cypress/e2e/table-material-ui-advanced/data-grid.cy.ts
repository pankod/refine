/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-advanced", () => {
  beforeEach(() => {
    cy.visit("/posts/data-grid");
  });

  it("should work with filter", () => {
    // wait for requests
    cy.wait("@getPosts");
    cy.wait("@getCategories");
    // wait for loadings
    cy.getMaterialUILoadingCircular().should("not.exist");
    cy.get("[data-field='category.id']").should("have.length", 16);
    cy.get("[data-field='category.id']").should("not.contain", "Loading...");

    // open the column menu of title
    cy.getMaterialUIColumnHeader(2).within(() =>
      cy.get(".MuiDataGrid-menuIcon > button").click({ force: true }),
    );
    // click the filter menu item
    cy.get(".MuiDataGrid-menu > div > .MuiList-root").children().eq(3).click({
      force: true,
    });
    // type the filter value
    cy.get("[placeholder='Filter value']").type("lorem");
    // url should contain the filter
    cy.url().should(
      "include",
      "filters[0][field]=title&filters[0][value]=lorem&filters[0][operator]=contains",
    );
    cy.wait(1000);
    // request should have filter
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query.title_like).to.eq("lorem");
    });

    // simulate outside click to close the filter dialog
    cy.get(".MuiCardHeader-content > .MuiTypography-root").click();

    // open the column menu of status
    cy.getMaterialUIColumnHeader(4).within(() =>
      cy.get(".MuiDataGrid-menuIcon > button").click({ force: true }),
    );
    // click the filter menu item
    cy.get(".MuiDataGrid-menu > div > .MuiList-root").children().eq(3).click();
    // opening the filter dialog resets filters. we need to wait for again
    cy.wait("@getPosts");
    // open select menu
    cy.get(".MuiFormLabel-root").contains("Value").siblings().first().click();
    // select the filter value
    cy.get(".MuiMenuItem-root[data-value='published']").click();
    // url should contain the filter
    cy.url().should(
      "include",
      "filters[0][field]=status&filters[0][value]=published&filters[0][operator]=eq",
    );
    // request should have filter
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query.status).to.eq("published");
    });
  });

  it("should work with sorters", () => {
    // wait for loading
    cy.wait("@getPosts");
    cy.getMaterialUILoadingCircular().should("not.exist");

    // click the ID column header to sort ascending
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("ID")
      .click({ force: true });
    cy.url().should("include", "sorters[0][field]=id&sorters[0][order]=asc");

    cy.wait(1000);
    // request should have filter
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.eq("id");
      expect(query._order).to.eq("asc");
    });
    // click the ID column header to sort descending
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("ID")
      .click({ force: true });
    cy.url().should("include", "sorters[0][field]=id&sorters[0][order]=desc");
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.eq("id");
      expect(query._order).to.eq("desc");
    });
    // click to remove
    cy.get(".MuiDataGrid-columnHeaderTitle")
      .contains("ID")
      .click({ force: true });
    cy.url().should("not.include", "sorters[0][field]=id");
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.be.undefined;
      expect(query._order).to.be.undefined;
    });
  });
});
