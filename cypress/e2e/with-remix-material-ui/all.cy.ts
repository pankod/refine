/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("with-remix-material-ui", () => {
  const submitAuthForm = () => {
    return cy.get("button[type=submit]").click();
  };

  const login = () => {
    cy.fixture("demo-auth-credentials").then((auth) => {
      cy.get("#email", { timeout: 10000 }).clear();
      cy.get("#email").type(auth.email);
      cy.get("#password").clear();
      cy.get("#password").type(auth.password);
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
      cy.location("pathname").should("eq", "/blog-posts");
      cy.getAllCookies().then((cookies) => {
        expect(cookies[0]).to.have.property("name", "user");
      });
    });

    it("should throw error if login email is wrong", () => {
      cy.get("#email").clear().type("test@test.com");
      cy.get("#password").clear().type("test");
      submitAuthForm();
      cy.getMaterialUINotification().contains(/login failed/i);
      cy.location("pathname").should("eq", "/login");
    });

    it.skip("should has 'to' param on URL after redirected to /login", () => {
      login();
      cy.location("pathname").should("eq", "/blog-posts");

      cy.visit("/test");
      cy.location("pathname").should("eq", "/test");
      cy.clearAllCookies();
      cy.reload();
      cy.location("search").should("contains", "to=%2Ftest");
      cy.location("pathname").should("eq", "/login");
      cy.get(".MuiTypography-root").contains(/sign in to your account/i);

      login();
      cy.location("pathname").should("eq", "/test");
    });

    it("should redirect to /login?to= if user not authenticated", () => {
      cy.visit("/test-route");
      cy.get(".MuiTypography-root").contains(/sign in to your account/i);
      cy.location("search").should("contains", "to=%2Ftest");
      cy.location("pathname").should("eq", "/login");
    });
  });

  describe.skip("register", () => {
    it("should register", () => {
      cy.get("a")
        .contains(/sign up/i)
        .click();
      cy.location("pathname").should("eq", "/register");
      login();
      cy.location("pathname").should("eq", "/blog-posts");
      cy.getAllCookies().then((cookies) => {
        expect(cookies[0]).to.have.property("name", "user");
      });
    });

    it("should throw error if register email is wrong", () => {
      cy.get("a")
        .contains(/sign up/i)
        .click();
      cy.location("pathname").should("eq", "/register");

      cy.get("#email").clear();
      cy.get("#email").type("test@test.com");
      cy.get("#password").clear();
      cy.get("#password").type("test");

      submitAuthForm();
      cy.getMaterialUINotification().contains(/register failed/i);
      cy.location("pathname").should("eq", "/register");
    });
  });

  describe.skip("forgot password", () => {
    it("should throw error if forgot password email is wrong", () => {
      cy.get("a")
        .contains(/forgot password/i)
        .click();
      cy.location("pathname").should("eq", "/forgot-password");

      cy.get("#email", { timeout: 10000 }).type("test@test.com");
      submitAuthForm();
      cy.getMaterialUINotification().contains(/forgot password failed/i);
      cy.location("pathname").should("eq", "/forgot-password");
    });
  });

  describe("update password", () => {
    it("should throw error if update password is wrong", () => {
      cy.visit("/update-password").wait(1000);
      cy.location("pathname").should("eq", "/update-password");
      cy.get("#password").type("123456");
      cy.get("#confirmPassword").type("123456");
      submitAuthForm();
      cy.getMaterialUINotification().contains(/update password failed/i);
      cy.location("pathname").should("eq", "/update-password");
    });
  });

  describe("logout", () => {
    it("should logout", () => {
      login();
      cy.get(".MuiTypography-root")
        .contains(/logout/i)
        .click();
      cy.location("pathname").should("eq", "/login");
    });
  });

  describe("get identity", () => {
    it("should render getIdentity response on header", () => {
      login();
      cy.get(".MuiTypography-root").contains(/jane doe/i);
      cy.get(".MuiAvatar-img").should("have.attr", "src");
    });
  });
});
