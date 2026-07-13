/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-antd-use-update-many", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should select all rows when click the checkbox in the table header", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-table-thead .ant-checkbox-input").first().click();

    cy.get(".ant-table-row-selected").should("have.length", 10);
  });

  it("update button should be disabled when no row is selected", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-btn-primary").eq(0).should("be.disabled");
  });

  it("should be able to update all selected rows", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-table-row .ant-checkbox-input").eq(1).click();
    cy.get(".ant-table-row .ant-checkbox-input").eq(2).click();

    cy.get(".ant-table-row-selected").should("have.length", 2);

    cy.get(".ant-btn-primary").contains("Update").click();

    cy.wait("@patchPost").then((interception) => {
      const { body } = interception.request;

      expect(body).to.have.property("status", "draft");
    });

    cy.wait("@patchPost").then((interception) => {
      const { body } = interception.request;

      expect(body).to.have.property("status", "draft");
    });
  });
});
