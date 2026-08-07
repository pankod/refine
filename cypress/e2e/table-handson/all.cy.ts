/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("table-handson", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("the cell should be update", () => {
    cy.wait("@getPosts");

    cy.get("tbody tr").eq(0).find("td").eq(1).dblclick();

    cy.get(".handsontableInput").clear();
    cy.get(".handsontableInput").type(
      "Autem excepturi quae inventore esse eveniet.",
    );
    cy.get(".handsontableInput").type("{enter}");

    cy.wait("@patchPost").then((interception) => {
      const { body } = interception.request;

      expect(body.title).to.equal(
        "Autem excepturi quae inventore esse eveniet.",
      );
    });
  });
});
