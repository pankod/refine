/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("inferencer-material-ui", () => {
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
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.url().should("include", "/blog-posts");
    cy.getPageHeaderTitle().should("contain", "Blog Posts");

    cy.assertDocumentTitle("Blog Posts", "list");
  });

  it("should show resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getMaterialUILoadingCircular().should("not.exist");

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
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.getEditButton().first().click();

    cy.wait("@getBlogPost");
    cy.getMaterialUILoadingCircular().should("not.exist");
    cy.getSaveButton().should("not.be.disabled");

    cy.getDeleteButton().first().click();
    cy.getMaterialUIDeletePopoverButton().click({ force: true });

    cy.wait("@deleteBlogPost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getMaterialUINotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/blog-posts");
      });
    });
  });

  it("should create resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.getCreateButton().click();
    cy.location("pathname").should("contain", "/blog-posts/create");
    cy.assertDocumentTitle("Blog Post", "create");
    cy.wait("@getCategories");

    cy.fixture("mock-post").then((mockPost) => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      cy.get("input[name=title]").type(mockPost.title);
      cy.get("textarea[name=content]").type(mockPost.content);
      cy.get("input[name=status]").type("status");
      cy.get("input[name=createdAt]").type(todayString);
      cy.get('input[role="combobox"]')
        .click()
        .get("li[role=option]")
        .first()
        .click();

      cy.getSaveButton().click();

      cy.wait("@postBlogPost").then((interception) => {
        const response = interception?.response;
        const body = response?.body;

        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);
        expect(body?.status).to.eq("status");
        expect(body?.createdAt).to.eq(todayString);

        cy.fixture("categories").then((categories) => {
          const category = categories.find(
            (category) => category.id === body?.category?.id,
          );
          expect(body?.category).to.deep.eq(category);
        });

        cy.getMaterialUINotification().should("contain", "Success");
        cy.location("pathname").should("eq", "/blog-posts");
      });
    });
  });

  it("should edit resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.getEditButton().first().click();
    cy.location("pathname").should("contain", "/blog-posts/edit");

    // assert form values have been set
    cy.wait("@getBlogPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      cy.getMaterialUILoadingCircular().should("not.exist");
      cy.getSaveButton().should("not.be.disabled");

      cy.get("input[name=title]").should("have.value", body?.title);
      cy.get("textarea[name=content]").should("have.value", body?.content);
      cy.get("input[name=status]").should("have.value", body?.status);
      cy.get("input[name=createdAt]").should("have.value", body?.createdAt);
      cy.fixture("categories").then((categories) => {
        const category = categories.find(
          (category) => category.id === body?.category?.id,
        );
        cy.get('input[role="combobox"]').should("have.value", category.title);
      });
    });

    // fill form
    cy.fixture("mock-post").then((mockPost) => {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0];

      cy.get("input[name=title]").clear().type(mockPost.title);
      cy.get("textarea[name=content]").clear().type(mockPost.content);
      cy.get("input[name=status]").clear().type("status");
      cy.get("input[name=createdAt]").clear().type(todayString);
      cy.get('input[role="combobox"]')
        .click()
        .get("li[role=option]")
        .eq(1)
        .click();

      cy.getSaveButton().click();

      cy.wait("@patchBlogPost").then((interception) => {
        const response = interception?.response;
        const body = response?.body;

        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);
        expect(body?.status).to.eq("status");
        expect(body?.createdAt).to.eq(todayString);

        cy.fixture("categories").then((categories) => {
          const category = categories.find(
            (category) => category.id === body?.category?.id,
          );
          expect(body?.category).to.deep.eq(category);
        });

        cy.getMaterialUINotification().should("contain", "Success");
        cy.location("pathname").should("eq", "/blog-posts");
      });
    });
  });

  it("should change theme", () => {
    const getDarkModeIcon = () =>
      cy.get('button > svg[data-testid="DarkModeOutlinedIcon"]');
    const getLightModeIcon = () =>
      cy.get('button > svg[data-testid="LightModeOutlinedIcon"]');

    cy.wait("@getBlogPosts");
    cy.getMaterialUILoadingCircular().should("not.exist");

    // find initial theme from localStorage
    cy.getAllLocalStorage().then((ls) => {
      const initialTheme =
        ls[Cypress.config("baseUrl")!]["colorMode"]?.toString() || "dark";

      // click the theme switch
      if (initialTheme === "dark") {
        getLightModeIcon().click();
      } else {
        getDarkModeIcon().click();
      }

      cy.getAllLocalStorage().then((ls) => {
        if (initialTheme === "dark") {
          expect(ls[Cypress.config("baseUrl")!]["colorMode"]).to.eq("light");
        } else {
          expect(ls[Cypress.config("baseUrl")!]["colorMode"]).to.eq("dark");
        }
      });

      // reload the page and assert the theme is persisted
      cy.reload();
      cy.wait("@getCategories");
      cy.wait("@getBlogPosts");
      cy.getMaterialUILoadingCircular().should("not.exist");
      // should be reversed from initial theme
      if (initialTheme === "dark") {
        getDarkModeIcon().should("exist");
      } else {
        getLightModeIcon().should("exist");
      }
    });
  });

  it("should change language", () => {
    cy.wait("@getBlogPosts");
    cy.getMaterialUILoadingCircular().should("not.exist");

    // find the dropdown trigger and click it
    cy.get("header").within(() => {
      cy.get(".MuiSelect-select").click();
    });
    // find the dropdown item and click it
    cy.get("li[data-value=de]").click();
    // assert localStoage has changed
    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config("baseUrl")!]["i18nextLng"]).to.eq("de");
    });

    // reload the page and assert the language is persisted
    cy.reload();
    cy.wait("@getBlogPosts");
    cy.getMaterialUILoadingCircular().should("not.exist");
    // assert the dropdown value has changed
    cy.get("header").within(() => {
      cy.get(".MuiSelect-select").contains("German");
    });
  });

  it("should work with pagination", () => {
    cy.getMaterialUILoadingCircular().should("not.exist");

    cy.intercept(
      {
        url: "/blog_posts*",
        query: {
          _start: "0",
          _end: "25",
        },
      },
      {
        fixture: "blog-posts.json",
      },
    ).as("getFirstPagePosts");

    cy.wait("@getFirstPagePosts");

    cy.intercept(
      {
        url: "/blog_posts*",
        query: {
          _start: "25",
          _end: "50",
        },
      },
      {
        fixture: "blog-posts.json",
      },
    ).as("getSecondPagePosts");

    cy.get("[title='Go to next page']").click();
    cy.url().should("include", "currentPage=2");
    cy.wait("@getSecondPagePosts");

    cy.get("[title='Go to previous page']").click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getFirstPagePosts");
  });
});
