/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-antd-advanced", () => {
  beforeEach(() => {
    cy.visit("/categories");
  });

  it("expanded row should be display the table with the posts data", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getTableRowExpandButton(0).click();

    cy.wait("@getPosts").then((interception) => {
      const { request } = interception;

      const { "category.id": categoryId } = request.query;

      expect(categoryId).to.not.be.undefined;
    });

    cy.get(".ant-table-expanded-row").first().should("exist");

    cy.get(".ant-table-expanded-row .ant-table").should("exist");
  });
});
