/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

Cypress.on("uncaught:exception", () => {
  return false;
});

describe("inferencer-antd", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.interceptHasura();
    cy.visit("/");
  });

  it("should list resource", () => {
    cy.wait("@getAllBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.url().should("include", "/blog-posts");
    cy.getPageHeaderTitle().should("contain", "Blog posts");
    cy.assertDocumentTitle("Blog Posts", "list");
  });

  it("should show resource", () => {
    cy.wait("@getAllBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getShowButton().first().click();

    cy.url().should("include", "/blog-posts/show");
    cy.getPageHeaderTitle().should("contain", "Show Blog post");
    cy.assertDocumentTitle("Blog Posts", "show");
  });

  it("should delete resource", () => {
    cy.wait("@getAllBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();
    cy.wait("@getBlogPosts");
    cy.getSaveButton().should("not.be.disabled");
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getDeleteButton().first().click();
    cy.getAntdPopoverDeleteButton().click();

    cy.wait("@deleteBlogPosts").then((interception) => {
      const response = interception?.response;
      expect(response?.statusCode).to.eq(200);
      expect(response?.body).to.deep.eq({
        data: {
          delete_blog_posts_by_pk: {
            id: "1",
          },
        },
      });
    });
  });

  it("should edit resource", () => {
    cy.wait("@getAllBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.getEditButton().first().click();

    cy.location("pathname").should("include", "/blog-posts/edit");
    cy.assertDocumentTitle("Blog Post", "edit");
    cy.getPageHeaderTitle().should("contain", "Edit Blog post");

    cy.wait("@getBlogPosts").then((interception) => {
      const response = interception?.response;
      const body = response?.body;
      const data = body.data.blog_posts_by_pk;

      // wait loading state and render to be finished
      cy.getAntdLoadingOverlay().should("not.exist");
      cy.getSaveButton().should("not.be.disabled");

      // assert form values have been set
      cy.get("#title").should("have.value", data?.title);
      cy.get("#content").should("have.value", data?.content);
      cy.fixture("hasura-categories").then((categories) => {
        const category = categories.data.categories.find(
          (category: any) => category.id === data?.category_id,
        );
        cy.get(`.ant-select-selection-item[title="${category?.title}"]`).should(
          "exist",
        );
      });
      cy.get("#created_at").should(($createdAt) => {
        const inputDateValue = new Date($createdAt.val() as string);
        const createdAt = new Date(data?.created_at);
        expect(inputDateValue.getDay()).to.eq(createdAt.getDay());
      });
    });
  });

  it("should change theme", () => {
    cy.wait("@getAllBlogPosts");
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
      cy.wait("@getAllBlogPosts");
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
    cy.wait("@getAllBlogPosts");
    cy.getAntdLoadingOverlay().should("not.exist");

    cy.intercept(
      {
        method: "POST",
        hostname: "flowing-mammal-24.hasura.app",
        pathname: "/v1/graphql",
      },

      (req) => {
        const { variables } = req.body;

        if (variables?.offset === 10) {
          req.alias = "getSecondPagePosts";
        }

        if (variables?.offset === 0) {
          req.alias = "getFirstPagePosts";
        }

        req.reply({
          fixture: "hasura-blog-posts",
        });
      },
    );

    cy.getAntdPaginationItem(2).click();
    cy.wait("@getSecondPagePosts");
    cy.url().should("include", "currentPage=2");

    cy.get(".ant-pagination-prev").first().click();
    cy.wait("@getFirstPagePosts");
    cy.url().should("include", "currentPage=1");
  });
});
