/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("with-remix-vite-headless", () => {
  const submitAuthForm = () => {
    return cy.get("[type=submit]").click();
  };

  const login = () => {
    cy.fixture("demo-auth-credentials").then((auth) => {
      cy.get('input[name="email"]').clear();
      cy.get('input[name="email"]').type(auth.email);
      cy.get('input[name="password"]').clear();
      cy.get('input[name="password"]').type(auth.password);
    });
    submitAuthForm();
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit("/");
  });

  describe("login", () => {
    it("should login", () => {
      login();
      cy.location("pathname").should("eq", "/posts");
      cy.getAllCookies().then((cookies) => {
        expect(cookies[0]).to.have.property("name", "user");
      });
    });

    it("should has 'to' param on URL after redirected to /login", () => {
      login();
      cy.location("pathname").should("eq", "/posts");

      cy.visit("/test");
      cy.location("pathname").should("eq", "/test");
      cy.clearAllCookies();
      cy.reload();
      cy.location("search").should("contains", "to=%2Ftest");
      cy.location("pathname").should("eq", "/login");

      login();
      cy.location("pathname").should("eq", "/test");
    });

    it("should redirect to /login?to= if user not authenticated", () => {
      cy.visit("/test-route");
      cy.get("h1").contains(/sign in to your account/i);
      cy.location("search").should("contains", "to=%2Ftest");
      cy.location("pathname").should("eq", "/login");
    });
  });

  describe("register", () => {
    it("should register", () => {
      cy.get("a")
        .contains(/sign up/i)
        .click();
      cy.location("pathname").should("eq", "/register");
      login();
      cy.location("pathname").should("eq", "/posts");
      cy.getAllCookies().then((cookies) => {
        expect(cookies[0]).to.have.property("name", "user");
      });
    });
  });

  describe("logout", () => {
    it("should logout", () => {
      login();
      cy.get("button")
        .contains(/logout/i)
        .click();
      cy.location("pathname").should("eq", "/login");
    });
  });
});
