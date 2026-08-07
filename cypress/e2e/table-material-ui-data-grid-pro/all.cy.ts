/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-data-grid-pro", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work with sorter", () => {
    cy.wait("@getPosts");
    cy.wait("@getCategories");
    cy.getMaterialUILoadingCircular().should("not.exist");

    // sort by title
    cy.getMaterialUIColumnHeader(2).click();
    // url should contain the sorter with asc
    cy.url().should("include", "sorters[0][field]=title&sorters[0][order]=asc");
    // request should have sorter
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.eq("title");
      expect(query._order).to.eq("asc");
    });

    // click the title column header again to sort desc
    cy.getMaterialUIColumnHeader(2).click();
    // url should contain the sorter with desc
    cy.url().should(
      "include",
      "sorters[0][field]=title&sorters[0][order]=desc",
    );
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.eq("title");
      expect(query._order).to.eq("desc");
    });

    // click again to remove the sorter
    cy.getMaterialUIColumnHeader(2).click();
    cy.url().should("not.include", "sorters[0][field]=title");
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.be.undefined;
      expect(query._order).to.be.undefined;
    });
  });

  it("should work with multiple filter", () => {
    // wait for requests
    cy.wait("@getPosts");
    cy.wait("@getCategories");
    // wait for loadings
    cy.getMaterialUILoadingCircular().should("not.exist");
    cy.get("[data-field='category.id']").should("not.contain", "Loading...");

    // open the column menu of title
    cy.getMaterialUIColumnHeader(2).within(() =>
      cy.get(".MuiDataGrid-menuIcon > button").click({ force: true }),
    );
    // click the filter menu item
    cy.contains("Filter").click({ force: true });
    // type the filter value
    cy.get("[placeholder='Filter value']").type("lorem");
    // url should contain the filter
    cy.url().should(
      "include",
      "filters[0][field]=title&filters[0][value]=lorem&filters[0][operator]=contains",
    );
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
    cy.contains("Filter").click();
    // wait for the filter dialog to be visible
    cy.get(".MuiDataGrid-panel").should("be.visible");
    // open select menu
    cy.get(".MuiFormLabel-root").last().siblings().first().click();
    // select the filter value
    cy.get(".MuiMenuItem-root[data-value='published']").click();
    // url should contain the filter
    cy.url().should(
      "include",
      "filters[1][field]=status&filters[1][value]=published&filters[1][operator]=eq",
    );
    // request should have filter
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query.title_like).to.eq("lorem");
      expect(query.status).to.eq("published");
    });

    // reload the page and check if the filters are still there
    cy.reload();
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query.title_like).to.eq("lorem");
      expect(query.status).to.eq("published");
    });
    cy.url().should(
      "include",
      "filters[0][field]=title&filters[0][value]=lorem&filters[0][operator]=contains",
    );
    cy.url().should(
      "include",
      "filters[1][field]=status&filters[1][value]=published&filters[1][operator]=eq",
    );
  });
});
