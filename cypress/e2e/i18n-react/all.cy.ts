/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("i18n-react", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should change", () => {
    cy.wait("@getPosts");

    // check the elements are in English which is the default language
    cy.get(".ant-menu > .ant-menu-item")
      .contains("Posts")
      .get(".ant-page-header-heading-left")
      .contains("Posts")
      .get(".refine-create-button")
      .contains("Create")
      .get(".ant-table-thead > tr > :nth-child(2)")
      .contains("Title")
      .get(".ant-table-thead > tr > :nth-child(3)")
      .contains("Category")
      .get(".ant-table-thead > tr > :nth-child(4)")
      .contains("Actions");

    // find the language button
    cy.get(".ant-layout-header > .ant-btn")
      // should contain English which is the default language
      .contains("English")
      // hover over the button to show the dropdown
      .trigger("mouseover")
      // click on the German language
      .get(".ant-dropdown-menu-title-content")
      .contains("German")
      .click()
      // should contain German
      .get(".ant-layout-header > .ant-btn")
      .contains("German");

    // check the elements are translated
    cy.get(".ant-menu > .ant-menu-item")
      .contains("Einträge")
      .get(".ant-page-header-heading-left")
      .contains("Einträge")
      .get(".refine-create-button")
      .contains("Erstellen")
      .get(".ant-table-thead > tr > :nth-child(2)")
      .contains("Titel")
      .get(".ant-table-thead > tr > :nth-child(3)")
      .contains("Kategorie")
      .get(".ant-table-thead > tr > :nth-child(4)")
      .contains("Aktionen");
  });
});
