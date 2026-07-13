/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-material-ui-use-update-many", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should select all rows when click the checkbox in the table header", () => {
    cy.wait("@getPosts");

    cy.getMaterialUILoadingCircular().should("not.exist", {
      timeout: 60000,
    });

    cy.get(".MuiDataGrid-columnHeaderTitleContainer .MuiCheckbox-root").click();

    cy.get(".MuiDataGrid-virtualScrollerContent .MuiCheckbox-root").each(
      (checkbox) => {
        expect(checkbox).to.have.class("Mui-checked");
      },
    );
  });

  it("update button should be disabled when no row is selected", () => {
    cy.wait("@getPosts");

    cy.getMaterialUILoadingCircular().should("not.exist", {
      timeout: 60000,
    });

    cy.get("#update-selected").eq(0).should("be.disabled");
  });

  it("should be able to update all selected rows", () => {
    cy.wait("@getPosts");

    cy.getMaterialUILoadingCircular().should("not.exist", {
      timeout: 60000,
    });

    cy.get(".MuiDataGrid-row")
      .eq(0)
      .find(".MuiDataGrid-cellCheckbox")
      .first()
      .click();
    cy.get(".MuiDataGrid-row")
      .eq(1)
      .find(".MuiDataGrid-cellCheckbox")
      .first()
      .click();

    cy.get(".MuiDataGrid-virtualScrollerContent .Mui-checked").should(
      "have.length",
      2,
    );

    cy.get("#update-selected").click();

    cy.wait("@patchPost").then((interception) => {
      const { body } = interception.request;

      expect(body).to.have.property("status", "approved");
    });

    cy.wait("@patchPost").then((interception) => {
      const { body } = interception.request;

      expect(body).to.have.property("status", "approved");
    });
  });
});
