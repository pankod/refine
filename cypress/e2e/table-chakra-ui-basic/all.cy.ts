/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-chakra-ui-basic", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work with sorter", () => {
    cy.wait("@getPosts");

    cy.intercept(
      {
        url: "/posts*",
        query: {
          _sort: "id",
          _order: "asc",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getAscPosts");

    cy.get(".tabler-icon-chevron-down").first().click();

    cy.url().should("include", "sorters[0][field]=id&sorters[0][order]=asc");

    cy.wait("@getAscPosts");

    cy.get(".tabler-icon-chevron-down").first().click();

    cy.url().should(
      "not.include",
      "sorters[0][field]=id&sorters[0][order]=desc",
    );

    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;

      expect(request.query).not.to.ownProperty("_sort");
    });

    cy.intercept(
      {
        url: "/posts*",
        query: {
          _sort: "id",
          _order: "desc",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getDescPosts");

    cy.get(".tabler-icon-selector").first().click();

    cy.url().should("include", "sorters[0][field]=id&sorters[0][order]=desc");

    cy.wait("@getDescPosts");
  });

  it("should work with filter", () => {
    cy.wait("@getPosts");

    cy.intercept(
      {
        url: "/posts*",
        query: {
          title_like: "lorem",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getFilteredPosts");

    cy.get(".tabler-icon-filter").eq(0).click();
    cy.get("#title").type("lorem");
    cy.get(".tabler-icon-check").click();

    cy.url().should(
      "include",
      "filters[0][field]=title&filters[0][operator]=contains&filters[0][value]=lorem",
    );

    cy.wait("@getFilteredPosts");
  });

  it("should work with pagination", () => {
    cy.wait("@getPosts");

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

    cy.get("#next-page").click();

    cy.url().should("include", "currentPage=2");

    cy.wait("@getSecondPagePosts").then((interception) => {
      const { request } = interception;
      const { _start, _end } = request.query;

      expect(_start).to.equal("10");
      expect(_end).to.equal("20");
    });

    cy.get("#prev-page").click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;
      const { _start, _end } = request.query;

      expect(_start).to.equal("0");
      expect(_end).to.equal("10");
    });
  });

  it("should set current `1` when filter changed", () => {
    cy.wait("@getPosts");

    cy.get("#next-page").click();

    cy.get(".tabler-icon-filter").eq(0).click();
    cy.get("#title").type("lorem");
    cy.get(".tabler-icon-check").click();

    cy.url().should("include", "currentPage=1");
  });
});
