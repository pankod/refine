/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("inferencer-antd", () => {
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
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.url().should("include", "/blog-posts");
    cy.getPageHeaderTitle().should("contain", "Blog Posts");

    cy.assertDocumentTitle("Blog Posts", "list");
  });

  it("should show resource", () => {
    cy.wait("@getBlogPosts");
    cy.wait("@getCategories");
    cy.getAntdLoadingOverlay().should("not.exist");

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
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();

    cy.wait("@getBlogPost");
    cy.getAntdLoadingOverlay().should("not.exist");
    cy.getSaveButton().should("not.be.disabled");

    cy.getDeleteButton().first().click();
    cy.getAntdPopoverDeleteButton().click({ force: true });

    cy.wait("@deleteBlogPost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getAntdNotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/blog-posts");
      });
    });
  });

  it("should create resource", () => {
    cy.getCreateButton().click();
    cy.location("pathname").should("contain", "/blog-posts/create");
    cy.assertDocumentTitle("Blog Post", "create");
    cy.wait("@getCategories");

    cy.fixture("mock-post").then((mockPost) => {
      cy.get("#title").clear();
      cy.get("#title").type(mockPost.title);
      cy.get("#content").clear();
      cy.get("#content").type(mockPost.content);
      cy.get("#status").clear();
      cy.get("#status").type("status");
      cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
      cy.setAntdRangeDatePickerToToday({ id: "createdAt" });

      cy.getSaveButton().click();

      cy.wait("@postBlogPost").then((interception) => {
        const response = interception?.response;
        const body = response?.body;

        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);
        expect(body?.status).to.eq("status");

        const createdAt = new Date(body.createdAt);
        const today = new Date();
        expect(createdAt.getDay()).to.eq(today.getDay());
        expect(createdAt.getFullYear()).to.eq(today.getFullYear());
        cy.getAntdNotification().should("contain", "Success");
        cy.location("pathname").should("eq", "/blog-posts");
      });
    });
  });

  it("should edit resource", () => {
    cy.wait("@getCategories");
    cy.wait("@getBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();
    cy.location("pathname").should("contain", "/blog-posts/edit");
    cy.assertDocumentTitle("Blog Post", "edit");
    cy.wait("@getCategories");

    cy.wait("@getBlogPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      // wait loading state and render to be finished
      cy.getAntdLoadingOverlay().should("not.exist");
      cy.getSaveButton().should("not.be.disabled");
      cy.location("pathname").should("include", "/blog-posts/edit");

      // assert form values have been set
      cy.get("#title").should("have.value", body?.title);
      cy.get("#content").should("have.value", body?.content);
      cy.get("#status").should("have.value", body?.status);
      cy.fixture("categories").then((categories) => {
        const category = categories.find(
          (category: any) => category.id === body?.category?.id,
        );
        cy.get(`.ant-select-selection-item[title="${category?.title}"]`).should(
          "exist",
        );
      });
      cy.get("#createdAt").should(($createdAt) => {
        const inputDateValue = new Date($createdAt.val() as string);
        const createdAt = new Date(body?.createdAt);
        expect(inputDateValue.getDay()).to.eq(createdAt.getDay());
      });
    });

    // fill form
    cy.fixture("mock-post").then((mockPost) => {
      cy.get("#title").clear();
      cy.get("#title").type(mockPost.title);
      cy.get("#content").clear();
      cy.get("#content").type(mockPost.content);
      cy.get("#status").clear();
      cy.get("#status").type("status");
      cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
      cy.get("#createdAt")
        .click({ force: true })
        .get(".ant-picker-now-btn")
        .eq(0)
        .click({ force: true })
        .click({ force: true });

      cy.getSaveButton().click();

      cy.wait("@patchBlogPost").then((interception) => {
        const response = interception?.response;
        const body = response?.body;

        expect(body?.title).to.eq(mockPost.title);
        expect(body?.content).to.eq(mockPost.content);
        expect(body?.status).to.eq("status");
        expect(body?.category?.id).to.eq(1);
        expect(new Date(body?.createdAt).getDay()).to.eq(new Date().getDay());
      });
    });
  });

  it("should change language", () => {
    cy.wait("@getBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

    // find the dropdown trigger and click it
    cy.get(".ant-layout-header").within(() => {
      cy.get(".ant-dropdown-trigger").click();
    });
    // find the dropdown item and click it
    cy.get(".ant-dropdown-menu-title-content").contains("German").click();
    // assert the dropdown value has changed
    cy.get(".ant-layout-header").within(() => {
      cy.get(".ant-dropdown-trigger").contains("German");
    });
    // assert localStoage has changed
    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config("baseUrl")!]["i18nextLng"]).to.eq("de");
    });

    // reload the page and assert the language is persisted
    cy.reload();
    cy.wait("@getCategories");
    cy.wait("@getBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");
    // assert the dropdown value has changed
    cy.get(".ant-layout-header").within(() => {
      cy.get(".ant-dropdown-trigger").contains("German");
    });
  });

  it("should change theme", () => {
    cy.wait("@getBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

    // find initial  theme from localStorage
    cy.getAllLocalStorage().then((ls) => {
      const initialTheme =
        ls[Cypress.config("baseUrl")!]["colorMode"]?.toString();

      // find the theme swtich
      cy.get(".ant-layout-header").within(() => {
        // assert default theme is working
        if (initialTheme === "dark") {
          expect(cy.get(".ant-switch-checked").should("exist"));
        } else {
          expect(cy.get(".ant-switch-checked").should("not.exist"));
        }

        // click the theme switch
        cy.get(".ant-switch").click();
        cy.getAllLocalStorage().then((ls) => {
          if (initialTheme === "dark") {
            expect(cy.get(".ant-switch-checked").should("not.exist"));
            expect(ls[Cypress.config("baseUrl")!]["colorMode"]).to.eq("light");
          } else {
            expect(cy.get(".ant-switch-checked").should("exist"));
            expect(ls[Cypress.config("baseUrl")!]["colorMode"]).to.eq("dark");
          }
        });
      });

      // reload the page and assert the theme is persisted
      cy.reload();
      cy.wait("@getCategories");
      cy.wait("@getBlogPosts");
      cy.getAntdLoadingOverlay().should("not.exist");
      // should be reversed from initial theme
      cy.get(".ant-layout-header").within(() => {
        if (initialTheme === "dark") {
          expect(cy.get(".ant-switch-checked").should("not.exist"));
        } else {
          expect(cy.get(".ant-switch-checked").should("exist"));
        }
      });
    });
  });

  it("should work with pagination", () => {
    cy.wait("@getCategories");
    cy.wait("@getBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

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

    cy.getAntdPaginationItem(2).click();

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

    cy.get(".ant-pagination-prev").first().click();

    cy.url().should("include", "currentPage=1");

    cy.wait("@getFirstPagePosts");
  });
});
