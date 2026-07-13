/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("inferencer-mantine", () => {
  const login = () => {
    cy.fixture("demo-auth-credentials").then((auth) => {
      cy.get("input[name=email]").clear();
      cy.get("input[name=email]").type(auth.email);
      cy.get("input[name=password]").clear();
      cy.get("input[name=password]").type(auth.password);
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
    cy.getMantineLoadingOverlay().should("not.exist");

    cy.url().should("include", "/blog-posts");
    cy.getPageHeaderTitle().should("contain", "Blog Posts");

    cy.assertDocumentTitle("Blog Posts", "list");
  });

  it("should show resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getMantineLoadingOverlay().should("not.exist");

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
    cy.getMantineLoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();

    cy.wait("@getBlogPost");
    cy.getMantineLoadingOverlay().should("not.exist");
    cy.getSaveButton().should("not.be.disabled");

    cy.getDeleteButton().first().click();
    cy.getMantinePopoverDeleteButton().click({ force: true });

    cy.wait("@deleteBlogPost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getMantineNotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/blog-posts");
      });
    });
  });

  it("should create resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getMantineLoadingOverlay().should("not.exist");

    cy.getCreateButton().click();
    cy.location("pathname").should("contain", "/blog-posts/create");
    cy.assertDocumentTitle("Blog Post", "create");
    cy.wait("@getCategories");

    cy.fixture("mock-post").then((mockPost) => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      cy.get("input").eq(0).type(mockPost.title);
      cy.get("textarea").eq(0).type(mockPost.content);
      cy.get("input").eq(3).type("status");
      cy.get("input").eq(4).type(todayString);
      cy.get(".mantine-Select-input").click();
      cy.get(".mantine-Select-item").eq(0).click();

      cy.getSaveButton().click();

      cy.wait("@postBlogPost").then((interception) => {
        const body = interception?.response?.body;

        expect(body).to.have.property("id");
        expect(body.title).to.equal(mockPost.title);
        expect(body.content).to.equal(mockPost.content);
        expect(body.status).to.equal("status");
        expect(body.createdAt).to.equal(todayString);
        expect(body.category.id).to.equal(1);

        cy.getMantineNotification().should("contain", "Success");
        cy.location("pathname").should("eq", "/blog-posts");
      });
    });
  });

  it("should edit resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getMantineLoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();
    cy.location("pathname").should("contain", "/blog-posts/edit");
    cy.assertDocumentTitle("Blog Post", "edit");
    cy.wait("@getCategories");

    // assert response values are equal to the form values
    cy.wait("@getBlogPost").then((interception) => {
      const body = interception?.response?.body;

      cy.get("input").eq(1).should("have.value", body?.title);
      cy.get("textarea").eq(0).should("have.value", body?.content);
      cy.get("input").eq(4).should("have.value", body?.status);
      cy.get("input").eq(5).should("have.value", body?.createdAt);
      cy.fixture("categories").then((categories) => {
        const category = categories.find((c) => c.id === body?.category.id);
        cy.get(".mantine-Select-input").should("have.value", category?.title);
      });
    });

    // fill form
    cy.fixture("mock-post").then((mockPost) => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      cy.get("input").eq(1).clear().type(mockPost.title);
      cy.get("textarea").eq(0).clear().type(mockPost.content);
      cy.get("input").eq(4).clear().type("status");
      cy.get("input").eq(5).clear().type(todayString);
      cy.get(".mantine-Select-input").clear();
      cy.get(".mantine-Select-item").eq(1).click();

      cy.getSaveButton().click();

      cy.wait("@patchBlogPost").then((interception) => {
        const body = interception?.response?.body;

        expect(body).to.have.property("id");
        expect(body.title).to.equal(mockPost.title);
        expect(body.content).to.equal(mockPost.content);
        expect(body.status).to.equal("status");
        expect(body.createdAt).to.equal(todayString);
        expect(body.category.id).to.equal(2);

        cy.getMantineNotification().should("contain", "Success");
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
    cy.getMantineLoadingOverlay().should("not.exist");

    // find initial  theme from localStorage
    cy.getAllLocalStorage().then((ls) => {
      const initialTheme =
        ls[Cypress.config("baseUrl")!]["mantine-color-scheme"]?.toString();

      console.log(initialTheme);

      // assert default theme is working
      if (initialTheme === "dark") {
        expect(cy.get(".tabler-icon-sun").should("exist"));
      } else {
        expect(cy.get(".tabler-icon-moon-stars").should("exist"));
      }

      // click the theme switch
      cy.get("button[title='Toggle color scheme']").click();
      cy.getAllLocalStorage().then((ls) => {
        // assert the theme is changed, it should be reversed from initial theme
        if (initialTheme === "dark") {
          expect(cy.get(".tabler-icon-moon-stars").should("exist"));
          expect(
            ls[Cypress.config("baseUrl")!]["mantine-color-scheme"],
          ).to.contains("light");
        } else {
          expect(cy.get(".tabler-icon-sun").should("exist"));
          expect(
            ls[Cypress.config("baseUrl")!]["mantine-color-scheme"],
          ).to.contains("dark");
        }
      });

      // reload the page and assert the theme is persisted
      cy.reload();
      cy.wait("@getCategories");
      cy.wait("@getBlogPosts");
      cy.getMantineLoadingOverlay().should("not.exist");
      // should be reversed from initial theme
      if (initialTheme?.includes("dark") || initialTheme === undefined) {
        expect(cy.get(".tabler-icon-sun").should("exist"));
      } else {
        expect(cy.get(".tabler-icon-moon-stars").should("exist"));
      }
    });
  });

  it("should work with pagination", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getMantineLoadingOverlay().should("not.exist");

    cy.get(".mantine-Pagination-item").contains("2").click();
    cy.url().should("include", "currentPage=2");
    cy.getMantineLoadingOverlay().should("not.exist");
    cy.wait("@getBlogPosts").then((interception) => {
      const { request } = interception;
      const { _start, _end } = request.query;

      expect(_start).to.equal("10");
      expect(_end).to.equal("20");
    });

    cy.get(".mantine-Pagination-item").contains("1").click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getBlogPosts").then((interception) => {
      const { request } = interception;
      const { _start, _end } = request.query;

      expect(_start).to.equal("0");
      expect(_end).to.equal("10");
    });
  });
});
