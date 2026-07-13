/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("form-core-use-form", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.visit("/");
  });

  it("should edit resource with autosave", () => {
    cy.wait("@getPosts");

    cy.get("button:contains('Edit')").first().click();

    cy.wait("@getPost");

    cy.get("input[name='title']")
      .first()
      .should(
        "have.value",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      );
    cy.get("textarea[name='content']")
      .first()
      .should(
        "have.value",
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      );
    cy.get("button[type='submit']").first().should("not.be.disabled");

    cy.get("span:has(+ form)").should("have.text", "waiting for changes");

    cy.fixture("mock-post").then((mockPost) => {
      cy.get("input[name='title']").type(`{selectAll}${mockPost.title}`);
      cy.get("textarea[name='content']").type(`{selectAll}${mockPost.content}`);
    });

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;

      cy.get("span:has(+ form)").should("have.text", "saved");

      cy.get("button[type='submit']").first().should("not.be.disabled");

      cy.location("pathname").should("include", "/posts/edit/1");

      cy.get("input[name='title']").should("have.value", response?.body?.title);
      cy.get("textarea[name='content']").should(
        "have.value",
        response?.body?.content,
      );
    });
  });

  it("should clone resource", () => {
    cy.wait("@getPosts");

    cy.get("button:contains('Clone')").first().click();

    cy.wait("@getPost");

    cy.get("input[name='title']")
      .first()
      .should(
        "have.value",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      );
    cy.get("textarea[name='content']")
      .first()
      .should(
        "have.value",
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      );
    cy.get("button[type='submit']").first().should("not.be.disabled");

    cy.fixture("mock-post").then((mockPost) => {
      cy.get("input[name='title']").type(`{selectAll}${mockPost.title}`);
      cy.get("textarea[name='content']").type(`{selectAll}${mockPost.content}`);

      cy.get("button[type='submit']").first().click();

      cy.wait("@postPost").then((interception) => {
        const response = interception?.response;
        const body = response?.body;

        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);

        cy.location("pathname").should((loc) => {
          expect(loc).to.eq("/posts");
        });
      });
    });
  });

  it("should edit resource with save button", () => {
    cy.wait("@getPosts");

    cy.get("button:contains('Edit')").first().click();

    cy.wait("@getPost");

    cy.get("input[name='title']")
      .first()
      .should(
        "have.value",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      );
    cy.get("textarea[name='content']")
      .first()
      .should(
        "have.value",
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      );
    cy.get("button[type='submit']").first().should("not.be.disabled");

    cy.fixture("mock-post").then((mockPost) => {
      cy.get("input[name='title']").type(`{selectAll}${mockPost.title}`);
      cy.get("textarea[name='content']").type(`{selectAll}${mockPost.content}`);

      cy.wait(1100);

      cy.get("button[type='submit']").first().click();

      cy.wait("@patchPost").then((interception) => {
        const response = interception?.response;
        const body = response?.body;

        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);

        cy.location("pathname").should((loc) => {
          expect(loc).to.eq("/posts");
        });
      });
    });
  });

  it("should create resource", () => {
    cy.wait("@getPosts");

    cy.get("button:contains('Create Post')").first().click();

    cy.get("button[type='submit']").first().should("not.be.disabled");

    cy.fixture("mock-post").then((mockPost) => {
      cy.get("input[name='title']").type(`${mockPost.title}`);
      cy.get("textarea[name='content']").type(`${mockPost.content}`);

      cy.get("button[type='submit']").first().click();

      cy.wait("@postPost").then((interception) => {
        const response = interception?.response;
        const body = response?.body;

        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);

        cy.location("pathname").should((loc) => {
          expect(loc).to.eq("/posts");
        });
      });
    });
  });
});
