/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-antd-use-delete-many", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should select all rows when click the checkbox in the table header", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-table-thead .ant-checkbox-input").first().click();

    cy.get(".ant-table-row-selected").should("have.length", 10);
  });

  it("delete button should be disabled when no row is selected", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-btn-primary").eq(0).should("be.disabled");
  });

  it("should be able to delete all selected rows", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-table-row .ant-checkbox-input").eq(1).click();
    cy.get(".ant-table-row .ant-checkbox-input").eq(2).click();

    cy.get(".ant-table-row-selected").should("have.length", 2);

    cy.get(".ant-btn-primary").contains("Delete").click();

    cy.wait("@deletePost");
    cy.wait("@deletePost");
  });
});
