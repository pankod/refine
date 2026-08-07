/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe.skip("auth-keycloak", () => {
  const login = () => {
    cy.get("button")
      .contains(/sign in/i)
      .click();

    cy.fixture("keycloak-credentials").then((auth) => {
      cy.get("#username").type(auth.email);
      cy.get("#password").type(auth.password);
    });

    cy.get("[type=submit]").click();
  };

  beforeEach(() => {
    cy.origin("https://lemur-0.cloud-iam.com", () => {
      cy.on("uncaught:exception", (e) => {
        console.error(["Error from Keycloak origin"], e);
        return false;
      });
    });

    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.interceptGETPosts();
    cy.interceptGETCategories();

    cy.visit("/");
  });

  describe("login", () => {
    it("should login", () => {
      login();
      cy.location("pathname").should("eq", "/posts");
    });

    it("should redirect to /login if user not authenticated", () => {
      login();
      cy.visit("/test-route");
      cy.clearAllCookies();
      cy.reload();
      cy.location("pathname").should("eq", "/login");
      cy.location("search").should("contains", "?to=%2Ftest-route");
    });
  });

  describe("logout", () => {
    it("should logout", () => {
      login();
      cy.get(".ant-menu-title-content")
        .contains(/logout/i)
        .click();
      cy.location("pathname").should("eq", "/login");
    });
  });

  describe("get identity", () => {
    it("should render getIdentity response on header", () => {
      login();
      cy.fixture("keycloak-credentials").then((auth) => {
        cy.get(".ant-typography").contains(auth.email);
      });
    });
  });
});
