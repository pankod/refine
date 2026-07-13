/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-react-table-basic", () => {
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
          _order: "desc",
        },
      },
      {
        fixture: "posts.json",
      },
    ).as("getDescPosts");

    cy.get("thead th div").contains("ID").click();

    cy.url().should("include", "sorters[0][field]=id&sorters[0][order]=desc");

    cy.wait("@getDescPosts");

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

    cy.get("thead th div").contains("ID").click();

    cy.url().should("include", "sorters[0][field]=id&sorters[0][order]=asc");

    cy.wait("@getAscPosts");

    cy.get("thead th div").contains("ID").click();

    cy.url().should(
      "not.include",
      "sorters[0][field]=id&sorters[0][order]=desc",
    );

    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;
      const { _sort, _order } = request.query;

      expect(_sort).to.undefined;
      expect(_order).to.undefined;
    });
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

    cy.get("#title").type("lorem");

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

    cy.get("#next-button").click();

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

    cy.get("#previous-button").click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getFirstPagePosts");
  });

  it("should set current `1` when filter changed", () => {
    cy.wait("@getPosts");

    cy.get("#next-button").click();

    cy.get("#title").type("lorem");

    cy.url().should("include", "currentPage=1");
  });
});
