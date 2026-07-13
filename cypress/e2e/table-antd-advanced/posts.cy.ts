/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-antd-advanced", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("the row should be expandable", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getTableRowExpandButton(0).click();

    cy.get(".ant-table-expanded-row").first().should("exist");
  });

  it("should select all rows when click the checkbox in the table header", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-table-thead .ant-checkbox-input").first().click();

    cy.get(".ant-table-row-selected").should("have.length", 10);
  });

  it("should select the row when click the checkbox in the row", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-table-row .ant-checkbox-input").first().click();

    cy.get(".ant-table-row-selected").should("have.length", 1);
  });

  it("delete button should only be showed when at least one row is selected", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.get(".ant-btn-dangerous").should("not.exist");

    cy.get(".ant-table-thead .ant-checkbox-input").first().click();

    cy.get(".ant-btn-dangerous").should("exist");
  });

  it("should fill the form with the row data when click the edit button and save the form", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();

    cy.get(".ant-input").should("exist");
    cy.get(".ant-select").should("exist");

    cy.wait("@getPost").then((interception) => {
      const { response } = interception;
      const data = response?.body;

      cy.get("#title").should("have.value", data.title);
    });

    cy.get("#title").clear().type("Fuga eos enim autem eos.");

    cy.getSaveButton().first().click();

    cy.wait("@patchPost").then((interception) => {
      const { request } = interception;
      const data = request.body;

      expect(data.title).to.equal("Fuga eos enim autem eos.");
    });
  });

  it("expanded row should be display the post content", () => {
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getTableRowExpandButton(0).click();

    cy.get(".ant-table-expanded-row").first().should("exist");

    cy.wait("@getPosts").then((interception) => {
      const { response } = interception;
      const data = response?.body;

      cy.get(".ant-table-expanded-row > .ant-table-cell")
        .first()
        .should("contain", data[0].content);
    });
  });
});
