/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("i18n-nextjs", () => {
  const login = () => {
    cy.fixture("demo-auth-credentials").then((auth) => {
      cy.get("#email").clear();
      cy.get("#email").type(auth.email);
      cy.get("#password").clear();
      cy.get("#password").type(auth.password);
    });
    return cy.get("button[type=submit]").click();
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should change", () => {
    login();
    cy.location("pathname").should("eq", "/blog-posts");

    cy.wait("@getBlogPosts");

    // check the elements are in English which is the default language
    cy.get(".ant-menu > .ant-menu-item")
      .contains("Blog Posts")
      .get(".ant-page-header-heading-left")
      .contains("Posts")
      .get(".refine-create-button")
      .contains("Create")
      .get(".ant-table-thead > tr > :nth-child(2)")
      .contains("Title")
      .get(".ant-table-thead > tr > :nth-child(3)")
      .contains("Content")
      .get(".ant-table-thead > tr > :nth-child(4)")
      .contains("Category")
      .get(".ant-table-thead > tr > :nth-child(5)")
      .contains("Status")
      .get(".ant-table-thead > tr > :nth-child(6)")
      .contains("Created At")
      .get(".ant-table-thead > tr > :nth-child(7)")
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
      .contains("Inhalh")
      .get(".ant-table-thead > tr > :nth-child(4)")
      .contains("Kategorie")
      .get(".ant-table-thead > tr > :nth-child(5)")
      .contains("Status")
      .get(".ant-table-thead > tr > :nth-child(6)")
      .contains("Erstellt am")
      .get(".ant-table-thead > tr > :nth-child(7)")
      .contains("Aktionen");
  });

  it("should translate notifications", () => {
    login();
    cy.location("pathname").should("eq", "/blog-posts");

    cy.visit("/blog-posts/edit/123");

    cy.wait("@getBlogPost");

    cy.get(".refine-delete-button").click();
    cy.getAntdPopoverDeleteButton().click();
    cy.get(".ant-notification-notice-description").contains(
      "Successfully deleted Blog Posts",
    );
  });
});
