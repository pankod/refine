/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-chakra-ui-advanced", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("the row should be expandable", () => {
    cy.wait("@getPosts");

    cy.get("tbody tr").should("exist");

    cy.get("#expanded-row").should("not.exist");

    cy.get(".tabler-icon-chevron-right").first().click();

    cy.get("#expanded-row").should("exist");
  });

  it("should select all rows when click the checkbox in the table header", () => {
    cy.wait("@getPosts");

    cy.get("thead tr th .chakra-checkbox").click();

    cy.get("#row-select").each((checkbox) => {
      expect(checkbox).to.be.checked;
    });
  });

  it("delete button should only be showed when at least one row is selected", () => {
    cy.wait("@getPosts");

    cy.get("#delete-selected").should("not.exist");

    cy.get("tbody tr td .chakra-checkbox").first().click();

    cy.get("#delete-selected").should("exist");
  });

  it("should fill the form with the row data when click the edit button and save the form", () => {
    cy.wait("@getPosts");

    cy.getEditButton().first().click();

    cy.get("#title-input").should("exist");

    cy.wait("@getPost").then((interception) => {
      const { response } = interception;
      const data = response!.body;

      cy.get("#title-input").should("have.value", data.title);
    });

    cy.get("#title-input").clear().type("Fuga eos enim autem eos.");

    cy.getSaveButton().click();

    cy.wait("@patchPost").then((interception) => {
      const { request } = interception;
      const data = request.body;

      expect(data.title).to.equal("Fuga eos enim autem eos.");
    });
  });
});
