/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("inferencer-chakra-ui", () => {
  const login = () => {
    cy.fixture("demo-auth-credentials").then((auth) => {
      cy.get("#email").clear();
      cy.get("#email").type(auth.email);
      cy.get("#password").clear();
      cy.get("#password").type(auth.password);
    });

    cy.get("button[type=submit]").click();
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
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.url().should("include", "/blog-posts");
    cy.getPageHeaderTitle().should("contain", "Blog Posts");

    cy.assertDocumentTitle("Blog Posts", "list");
  });

  it("should show resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getShowButton().first().click();

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

    cy.wait("@getCategory").then((interception) => {
      const response = interception?.response;

      const category = response?.body;
      cy.get("body").should("contain", category?.title);
    });
  });

  it("should delete resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();

    cy.wait("@getBlogPost");
    cy.getChakraUILoadingOverlay().should("not.exist");
    cy.getSaveButton().should("not.be.disabled");

    cy.getDeleteButton().first().click();
    cy.getChakraUIPopoverDeleteButton().click({ force: true });

    cy.wait("@deleteBlogPost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getChakraUINotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/blog-posts");
      });
    });
  });

  it("should create resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getCreateButton().click();
    cy.location("pathname").should("contain", "/blog-posts/create");
    cy.assertDocumentTitle("Blog Post", "create");
    cy.wait("@getCategories");

    cy.fixture("mock-post").then((mockPost) => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      cy.get("input[name=title]").type(mockPost.title);
      cy.get("input[name=content]").type(mockPost.content);
      cy.get("input[name=status]").type("status");
      cy.get("input[name=createdAt]").type(todayString);
      cy.get('select[name="category.id"]').select("1");

      cy.getSaveButton().click();

      cy.wait("@postBlogPost").then((interception) => {
        const body = interception?.response?.body;

        expect(body).to.have.property("id");
        expect(body.title).to.equal(mockPost.title);
        expect(body.content).to.equal(mockPost.content);
        expect(body.status).to.equal("status");
        expect(body.createdAt).to.equal(todayString);
        expect(body.category.id).to.equal("1");

        cy.getChakraUINotification().should("contain", "Success");
        cy.location("pathname").should("eq", "/blog-posts");
      });
    });
  });

  it("should edit resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();
    cy.location("pathname").should("contain", "/blog-posts/edit");
    cy.assertDocumentTitle("Blog Post", "edit");
    cy.wait("@getCategories");

    // assert response values are equal to the form values
    cy.wait("@getBlogPost").then((interception) => {
      const body = interception?.response?.body;

      cy.get("input[name=title]").should("have.value", body?.title);
      cy.get("input[name=content]").should("have.value", body?.content);
      cy.get("input[name=status]").should("have.value", body?.status);
      cy.get("input[name=createdAt]").should("have.value", body?.createdAt);
    });

    cy.fixture("mock-post").then((mockPost) => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      cy.get("input[name=title]").clear().type(mockPost.title);
      cy.get("input[name=content]").clear().type(mockPost.content);
      cy.get("input[name=status]").clear().type("status");
      cy.get("input[name=createdAt]").clear().type(todayString);
      cy.get('select[name="category.id"]').select("2");

      cy.getSaveButton().click();

      cy.wait("@patchBlogPost").then((interception) => {
        const body = interception?.response?.body;

        expect(body).to.have.property("id");
        expect(body.title).to.equal(mockPost.title);
        expect(body.content).to.equal(mockPost.content);
        expect(body.status).to.equal("status");
        expect(body.createdAt).to.equal(todayString);
        expect(body.category.id).to.equal("2");

        cy.getChakraUINotification().should("contain", "Success");
        cy.location("pathname").should("eq", "/blog-posts");
      });
    });
  });

  it("should change language", () => {
    cy.wait("@getBlogPosts");
    cy.getChakraUILoadingOverlay().should("not.exist");

    // click on the language switch
    cy.get('[data-test-id="language-button"]').click();

    // find the dropdown trigger and click it
    cy.get("button[value=de]").click();

    // assert localStoage has changed
    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config("baseUrl")!]["i18nextLng"]).to.eq("de");
    });

    // reload the page and assert the language is persisted
    cy.reload();

    cy.getChakraUILoadingOverlay().should("exist");

    cy.wait("@getBlogPosts");

    cy.getChakraUILoadingOverlay().should("not.exist");
    // assert the dropdown value has changed
    cy.get('[data-test-id="language-button"]').should(
      "have.attr",
      "aria-label",
      "de",
    );
  });

  it("should change theme", () => {
    cy.wait("@getBlogPosts");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.get("html").then(($html) => {
      const initialThemeFromHTML = $html.attr("data-theme")?.toString();

      cy.getAllLocalStorage().then((ls) => {
        const initialThemeFromLS =
          ls[Cypress.config("baseUrl")!]["chakra-ui-color-mode"];

        expect(initialThemeFromHTML).to.equal(initialThemeFromLS);

        cy.get('[aria-label="Toggle theme"]').click();

        // assert theme is changed in html
        cy.get("html").then(($html) => {
          const theme = $html.attr("data-theme");
          if (initialThemeFromHTML === "dark") {
            expect(theme).to.equal("light");
          } else {
            expect(theme).to.equal("dark");
          }
        });

        // assert theme is changed in local storage
        cy.getAllLocalStorage().then((ls) => {
          const theme = ls[Cypress.config("baseUrl")!]["chakra-ui-color-mode"];
          if (initialThemeFromLS === "dark") {
            expect(theme).to.equal("light");
          } else {
            expect(theme).to.equal("dark");
          }
        });

        // reload page and assert theme is persisted
        cy.reload();

        cy.getChakraUILoadingOverlay().should("exist");

        cy.wait("@getBlogPosts");

        cy.getChakraUILoadingOverlay().should("not.exist");

        // assert theme is persisted in html
        cy.get("html").then(($html) => {
          const theme = $html.attr("data-theme");
          if (initialThemeFromHTML === "dark") {
            expect(theme).to.equal("light");
          } else {
            expect(theme).to.equal("dark");
          }
        });

        // assert theme is persisted in local storage
        cy.getAllLocalStorage().then((ls) => {
          const theme = ls[Cypress.config("baseUrl")!]["chakra-ui-color-mode"];
          if (initialThemeFromLS === "dark") {
            expect(theme).to.equal("light");
          } else {
            expect(theme).to.equal("dark");
          }
        });
      });
    });
  });

  it("should work with pagination", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getChakraUILoadingOverlay().should("not.exist");

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

    cy.get("button").contains(2).click();

    cy.url().should("include", "currentPage=2");

    cy.wait("@getSecondPagePosts").then((interception) => {
      const { request } = interception;
      const { _start, _end } = request.query;

      expect(_start).to.equal("10");
      expect(_end).to.equal("20");
    });

    cy.get("button").contains(1).click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getBlogPosts").then((interception) => {
      const { request } = interception;
      const { _start, _end } = request.query;

      expect(_start).to.equal("0");
      expect(_end).to.equal("10");
    });
  });
});
