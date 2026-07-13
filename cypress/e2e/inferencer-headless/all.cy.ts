/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("inferencer-headless", () => {
  const waitForLoading = () => {
    cy.contains(/loading/).should("not.exist");
  };

  const login = () => {
    cy.fixture("demo-auth-credentials").then((auth) => {
      cy.get("input[name=email]").clear();
      cy.get("input[name=email]").type(auth.email);
      cy.get("input[name=password]").clear();
      cy.get("input[name=password]").type(auth.password);
    });

    cy.get("input[type=submit]").click();
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");

    login();
  });

  it("should list resource", () => {
    cy.wait("@getBlogPosts");
    waitForLoading();

    cy.url().should("include", "/blog-posts");
    cy.get("h1").should("contain", "Blog Posts");
    cy.assertDocumentTitle("Blog Posts", "list");
  });

  it("should show resource", () => {
    waitForLoading();

    cy.get("td > div > button").contains("Show").first().click();
    waitForLoading();
    cy.assertDocumentTitle("Blog Post", "show");

    cy.wait("@getBlogPost").then((interception) => {
      const response = interception?.response;

      const id = response?.body?.id;
      cy.location("pathname").should("include", `/blog-posts/show/${id}`);

      // should be visible id,title,content
      ["Id", "Title", "Content"].forEach((field) => {
        cy.get("body").should("contain", field);
      });
      // should be visible id,title,content values
      const title = response?.body?.title;
      const content = response?.body?.content;
      [id, title, content].forEach((value) => {
        cy.get("body").should("contain", value);
      });
    });
  });

  it("should create resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    waitForLoading();

    cy.get("button").contains("Create").click();
    cy.wait("@getCategories");
    waitForLoading();
    cy.location("pathname").should("contain", "/blog-posts/create");
    cy.assertDocumentTitle("Blog Post", "create");

    cy.fixture("mock-post").then((mockPost) => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      cy.get("input[name=title]").type(mockPost.title);
      cy.get("textarea[name=content]").type(mockPost.content);
      cy.get("input[name=status]").type("status");
      cy.get("input[name=createdAt]").type(todayString);
      cy.get('select[name="category.id"]').select("1");

      cy.get("input[type=submit]").click();

      cy.wait("@postBlogPost").then((interception) => {
        const body = interception?.response?.body;

        expect(body).to.have.property("id");
        expect(body.title).to.equal(mockPost.title);
        expect(body.content).to.equal(mockPost.content);
        expect(body.status).to.equal("status");
        expect(body.createdAt).to.equal(todayString);
        expect(body.category.id).to.equal("1");

        cy.location("pathname").should("eq", "/blog-posts");
      });
    });
  });

  it("should edit resource", () => {
    cy.wait("@getBlogPosts");
    waitForLoading();
    cy.wait("@getCategories");

    cy.get("button").contains("Edit").click();
    waitForLoading();
    cy.location("pathname").should("contain", "/blog-posts/edit");
    cy.assertDocumentTitle("Blog Post", "edit");

    // assert response values are equal to the form values
    cy.wait("@getBlogPost").then((interception) => {
      const body = interception?.response?.body;

      cy.get("input[name=title]").should("have.value", body?.title);
      cy.get("textarea[name=content]").should("have.value", body?.content);
      cy.get("input[name=status]").should("have.value", body?.status);
      cy.get("input[name=createdAt]").should("have.value", body?.createdAt);
    });

    // fill form
    cy.fixture("mock-post").then((mockPost) => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      cy.get("input[name=title]").clear().type(mockPost.title);
      cy.get("textarea[name=content]").clear().type(mockPost.content);
      cy.get("input[name=status]").clear().type("status");
      cy.get("input[name=createdAt]").clear().type(todayString);
      cy.get('select[name="category.id"]').select("2");

      cy.get("input[type=submit]").click();

      cy.wait("@patchBlogPost").then((interception) => {
        const body = interception?.response?.body;

        expect(body).to.have.property("id");
        expect(body.title).to.equal(mockPost.title);
        expect(body.content).to.equal(mockPost.content);
        expect(body.status).to.equal("status");
        expect(body.createdAt).to.equal(todayString);
        expect(body.category.id).to.equal("2");

        cy.location("pathname").should("eq", "/blog-posts");
      });
    });
  });

  it("should work with pagination", () => {
    cy.wait("@getBlogPosts");

    cy.intercept(
      {
        url: "/blog_posts*",
        query: {
          _start: "10",
          _end: "20",
        },
      },
      {
        fixture: "blog-posts.json",
      },
    ).as("getSecondPagePosts");

    cy.get("button").contains(">").click();

    cy.url().should("include", "currentPage=2");

    cy.wait("@getSecondPagePosts");

    cy.intercept(
      {
        url: "/blog_posts*",
        query: {
          _start: "0",
          _end: "10",
        },
      },
      {
        fixture: "blog-posts.json",
      },
    ).as("getFirstPagePosts");

    cy.get("button").contains("<").click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getFirstPagePosts");
  });
});
