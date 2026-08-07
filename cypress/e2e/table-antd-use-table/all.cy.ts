/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-antd-use-table", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be view list page", () => {
    cy.resourceList();
  });

  it("should work with sorter", () => {
    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;
      const { _sort, _order } = request.query;

      expect(_sort).to.eq("title");
      expect(_order).to.eq("asc");
    });

    cy.getAntdLoadingOverlay().should("not.exist", { timeout: 10000 });
    cy.getAntdColumnSorter(0).click();
    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;
      const { _sort, _order } = request.query;

      expect(_sort).to.eq("id");
      expect(_order).to.eq("asc");
    });
    cy.url().should("include", "sorters[0][field]=id&sorters[0][order]=asc");

    cy.getAntdColumnSorter(0).click();
    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;
      const { _sort, _order } = request.query;

      expect(_sort).to.eq("id");
      expect(_order).to.eq("desc");
    });
    cy.url().should("include", "sorters[0][field]=id&sorters[0][order]=desc");

    cy.getAntdColumnSorter(0).click();
    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;
      const { _sort, _order } = request.query;

      expect(_sort).to.undefined;
      expect(_order).to.undefined;
    });
    cy.url().should("not.include", "sorters");
  });

  it("should work with filter", () => {
    cy.getAntdFilterTrigger(0).click();

    cy.get(".ant-input").type("lorem");

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

    cy.get(".ant-btn-primary").click();

    cy.url().should(
      "include",
      "filters[2][field]=title&filters[2][operator]=contains&filters[2][value]=lorem",
    );

    cy.wait("@getFilteredPosts");
  });

  it("should work with pagination", () => {
    cy.wait("@getPosts");

    cy.getAntdLoadingOverlay().should("not.exist");

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

    cy.getAntdPaginationItem(2).click();

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

    cy.get(".ant-pagination-prev").first().click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getFirstPagePosts");
  });

  it("should set current `1` when filter changed", () => {
    cy.wait("@getPosts");

    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getAntdPaginationItem(2).click();

    cy.getAntdFilterTrigger(0).click();

    cy.get(".ant-input").type("lorem");

    cy.get(".ant-btn-primary").click();

    cy.url().should("include", "currentPage=1");
  });
});
