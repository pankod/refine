/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("auth-mantine", () => {
  const submitAuthForm = () => {
    return cy.get("button[type=submit]").click();
  };

  const login = () => {
    cy.fixture("demo-auth-credentials").then((auth) => {
      cy.get('input[name="email"]').clear().type(auth.email);
      cy.get('input[name="password"]').clear().type(auth.password);
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
      cy.getAllLocalStorage().then((ls) => {
        expect(ls[Cypress.config("baseUrl")!]).to.have.property("email");
      });
    });

    it("should throw error if login email is wrong", () => {
      cy.get('input[name="email"]').clear().type("test@test.com");
      cy.get('input[name="password"]').clear().type("test");
      submitAuthForm();
      cy.getMantineNotification().contains(/invalid email/i);
      cy.location("pathname").should("eq", "/login");
    });

    it("should has 'to' param on URL after redirected to /login", () => {
      login();
      cy.location("pathname").should("eq", "/posts");

      cy.visit("/test");
      cy.location("pathname").should("eq", "/test");
      cy.clearAllLocalStorage();
      cy.reload();
      cy.location("search").should("contains", "to=%2Ftest");
      cy.location("pathname").should("eq", "/login");

      login();
      cy.location("pathname").should("eq", "/test");
    });

    it("should redirect to /login?to= if user not authenticated", () => {
      cy.visit("/test-route");
      cy.get(".mantine-Title-root").contains(/sign in to your account/i);
      cy.location("search").should("contains", "to=%2Ftest");
      cy.location("pathname").should("eq", "/login");
    });
  });

  describe("register", () => {
    it("should register", () => {
      cy.get("a")
        .contains(/sign up/i)
        .click();

      cy.location("pathname").as("registerPath");

      cy.get("@registerPath").should("eq", "/register");

      login();

      cy.location("pathname").should("eq", "/posts");
      cy.getAllLocalStorage().then((ls) => {
        expect(ls[Cypress.config("baseUrl")!]).to.have.property("email");
      });
    });

    it("should throw error if register email is wrong", () => {
      cy.get("a")
        .contains(/sign up/i)
        .click();

      cy.get('input[name="email"]').as("emailInput").clear();

      cy.get("@emailInput").type("test@test.com");

      cy.get('input[name="password"]').as("passwordInput").clear();

      cy.get("@passwordInput").type("test");

      submitAuthForm();

      cy.getMantineNotification().contains(/invalid email/i);
      cy.location("pathname").should("eq", "/register");
    });
  });

  describe("forgot password", () => {
    it("should throw error if forgot password email is wrong", () => {
      cy.visit("/forgot-password");
      cy.get('input[name="email"]').clear().type("test@test.com");
      submitAuthForm();
      cy.getMantineNotification().contains(/invalid email/i);
      cy.location("pathname").should("eq", "/forgot-password");
    });
  });

  describe("update password", () => {
    it("should throw error if update password is wrong", () => {
      cy.visit("/update-password");
      cy.get('input[name="password"]').clear().type("123456");
      cy.get('input[name="confirmPassword"]').clear().type("123456");
      submitAuthForm();
      cy.getMantineNotification().contains(/invalid password/i);
      cy.location("pathname").should("eq", "/update-password");
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

  describe("get identity", () => {
    it("should render getIdentity response on header", () => {
      login();
      cy.get(".mantine-Text-root").contains(/jane doe/i);
      cy.get(".mantine-Avatar-image").should("have.attr", "src");
    });
  });
});
