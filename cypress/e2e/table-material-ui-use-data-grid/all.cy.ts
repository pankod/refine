/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-use-data-grid", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work with sorter", () => {
    // check the request for default sort order
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.eq("title");
      expect(query._order).to.eq("asc");
    });
    // check the default url
    cy.url().should("include", "sorters[0][field]=title&sorters[0][order]=asc");

    // wait for loading
    cy.getMaterialUILoadingCircular().should("not.exist");

    // click the title column header to sort desc
    cy.getMaterialUIColumnHeader(2).click();
    // check the request for desc sort order
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.eq("title");
      expect(query._order).to.eq("desc");
    });
    // url should contain the sorter with desc
    cy.url().should(
      "include",
      "sorters[0][field]=title&sorters[0][order]=desc",
    );

    // click the title column header again to remove the sorter
    cy.getMaterialUIColumnHeader(2).click();
    // check the request for default sort order
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query._sort).to.be.undefined;
      expect(query._order).to.be.undefined;
    });
    // url should not contain the sorter
    cy.url().should("not.include", "sorters[0][field]=title&sorters[0]");
  });

  it("should work with filter", () => {
    // wait for requests
    cy.wait("@getPosts");
    cy.wait("@getCategories");
    // wait for loadings
    cy.getMaterialUILoadingCircular().should("not.exist");
    cy.get("[data-field='category.id']").should("have.length", 16);
    cy.get("[data-field='category.id']").should("not.contain", "Loading...");

    // find the filter button
    cy.getMaterialUIColumnHeader(2).within(() =>
      cy.get(".MuiDataGrid-menuIcon > button").click({ force: true }),
    );
    // find the filter option
    cy.get(".MuiDataGrid-menu > div > .MuiList-root").children().eq(3).click({
      force: true,
    });
    // wait for the request again because initial filter is removed and MUI is refreshing the data.
    cy.wait("@getPosts");
    // type the filter value
    cy.get("[placeholder='Filter value']").type("lorem");

    // url should contain the filter
    cy.url().should(
      "include",
      "filters[0][field]=title&filters[0][value]=lorem&filters[0][operator]=contains",
    );
    // check the request for the filter
    cy.wait("@getPosts").then((interception) => {
      const request = interception.request;
      const query = request.query;
      expect(query.title_like).to.eq("lorem");
    });
  });

  it("should work with pagination", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.intercept(
      {
        url: "/posts*",
        query: {
          _start: "10",
          _end: "20",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getSecondPagePosts");

    cy.get("[title='Go to next page']").click();

    cy.url().should("include", "currentPage=2");

    cy.wait("@getSecondPagePosts");

    cy.intercept(
      {
        url: "/posts*",
        query: {
          _start: "0",
          _end: "10",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getFirstPagePosts");

    cy.get("[title='Go to previous page']").click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getFirstPagePosts");
  });

  it("should set current `1` when filter changed", () => {
    cy.intercept(
      {
        url: "/posts*",
        query: {
          _start: "10",
          _end: "20",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getSecondPagePosts");

    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.get("[title='Go to next page']").click();

    cy.wait("@getSecondPagePosts");

    cy.getMaterialUIColumnHeader(2).within(() =>
      cy.get(".MuiDataGrid-menuIcon > button").click({ force: true }),
    );

    cy.get(".MuiDataGrid-menu > div > .MuiList-root")
      .children()
      .eq(3)
      .click({ force: true });

    cy.get("[placeholder='Filter value']").type("lorem");

    cy.url().should("include", "currentPage=1");
  });

  it("should update a cell", () => {
    cy.wait("@getPosts");
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.getMaterialUIColumnHeader(1).click();

    cy.get(".MuiDataGrid-cell").eq(1).dblclick();

    cy.get(
      ".MuiDataGrid-cell--editing > .MuiInputBase-root > .MuiInputBase-input",
    )
      .clear()
      .type("Lorem ipsum refine!")
      .focus()
      .type("{enter}");

    cy.wait("@patchPost").then((interception) => {
      const request = interception.request;
      const body = request.body;
      expect(body.title).to.eq("Lorem ipsum refine!");
    });

    cy.get(".MuiDataGrid-cell").eq(1).should("contain", "Lorem ipsum refine!");
  });

  it("should not update a cell", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.intercept("PATCH", "/posts/*", (request) => {
      request.reply({
        statusCode: 500,
      });
    }).as("patchRequest");

    cy.getMaterialUIColumnHeader(1).click();

    cy.get(".MuiDataGrid-cell").eq(1).dblclick();

    cy.get(
      ".MuiDataGrid-cell--editing > .MuiInputBase-root > .MuiInputBase-input",
    )
      .clear()
      .type("Lorem ipsum fail!")
      .type("{enter}");

    cy.wait("@patchRequest");

    cy.get(".MuiDataGrid-cell")
      .eq(1)
      .should("not.contain", "Lorem ipsum fail!");
  });
});
