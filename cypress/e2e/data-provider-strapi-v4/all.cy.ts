/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("data-provider-strapi-v4", () => {
  const submitAuthForm = () => {
    return cy.get("button[type=submit]").click();
  };

  const login = () => {
    cy.fixture("strapi-v4-credentials").then((auth) => {
      cy.get("#email").clear();
      cy.get("#email").type(auth.email);
      cy.get("#password").clear();
      cy.get("#password").type(auth.password);
    });

    cy.interceptStrapiV4Login();

    submitAuthForm();
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.interceptStrapiV4GETPosts();
    cy.interceptStrapiV4GETPost();
    cy.interceptStrapiV4POSTPost();
    cy.interceptStrapiV4PUTPost();
    cy.interceptStrapiV4DELETEPost();
    cy.interceptStrapiV4GETCategories();
    cy.interceptStrapiV4GETCategory();

    cy.visit("/");
  });

  describe("login", () => {
    it("should login", () => {
      login();
      cy.location("pathname").should("eq", "/posts");
    });

    it("should throw error if login email is wrong", () => {
      cy.get("#email").clear().type("test@test.com");
      cy.get("#password").clear().type("test");
      submitAuthForm();
      cy.getAntdNotification().contains(/invalid/i);
      cy.location("pathname").should("eq", "/login");
    });

    it("should has 'to' param on URL after redirected to /login", () => {
      login();
      cy.location("pathname").should("eq", "/posts");
      cy.wait("@strapiV4GetPosts");

      cy.visit("/test");
      cy.location("pathname").should("eq", "/test");
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
      cy.clearAllSessionStorage();
      cy.reload();
      cy.location("search").should("contains", "to=%2Ftest");
      cy.location("pathname").should("eq", "/login");
    });

    it("should redirect to /login?to= if user not authenticated", () => {
      cy.visit("/test-route");
      cy.get(".ant-card-head-title > .ant-typography").contains(
        /sign in to your account/i,
      );
      cy.location("search").should("contains", "to=%2Ftest");
      cy.location("pathname").should("eq", "/login");
    });
  });

  describe("useList", () => {
    beforeEach(() => {
      login();
      cy.location("pathname").should("eq", "/posts");
    });

    it("should list with populate", () => {
      cy.wait("@strapiV4GetPosts").then(({ request }) => {
        const query = request.query;
        expect(query.populate).to.deep.equal(["category", "cover"]);
      });
    });

    it("should list with pagination", () => {
      cy.wait("@strapiV4GetPosts").then(({ request }) => {
        const query = request.query;
        expect(query.pagination).to.deep.equal({
          page: "1",
          pageSize: "10",
        });
      });
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.get(".ant-pagination-item-2 > a").click();
      cy.wait("@strapiV4GetPosts").then(({ request }) => {
        const query = request.query;
        expect(query.pagination).to.deep.equal({
          page: "2",
          pageSize: "10",
        });
      });
    });

    it("should sort", () => {
      cy.wait("@strapiV4GetPosts").then(({ request }) => {
        const query = request.query;
        expect(query.sort).to.eq("id:desc");
      });
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.getAntdColumnSorter(0).click();
      cy.wait("@strapiV4GetPosts").then(({ request }) => {
        const query = request.query;
        expect(query?.sort);
      });

      cy.getAntdColumnSorter(0).click();
      cy.wait("@strapiV4GetPosts").then(({ request }) => {
        const query = request.query;
        expect(query.sort).to.eq("id:asc");
      });
    });

    it("should filter", () => {
      cy.wait("@strapiV4GetCategories");
      cy.wait("@strapiV4GetPosts");
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.getAntdFilterTrigger(0).click();
      cy.get(".ant-select-selector").eq(1).click();

      // Wait for dropdown options to be visible and have proper dimensions
      cy.get(".ant-select-dropdown").should("be.visible");
      cy.get(".ant-select-item-option-content").should(
        "have.length.at.least",
        1,
      );

      cy.fixture("categories").then((categories) => {
        const category = categories[0];

        cy.get(".ant-select-item-option-content")
          .contains(category.title)
          .should("be.visible")
          .should("have.css", "width")
          .and("not.equal", "0px");

        cy.get(".ant-select-item-option-content")
          .contains(category.title)
          .click();
        cy.contains(/filter/i).click({ force: true });

        cy.wait("@strapiV4GetPosts").then(({ request }) => {
          const query = request.query;
          console.log(query);
          expect(query?.filters).to.deep.equal({
            category: {
              id: {
                $in: ["1"],
              },
            },
          });
        });
      });
    });
  });

  describe("form", () => {
    const mockPost = {
      title:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      content:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      status: "Published",
    };

    beforeEach(() => {
      login();
      cy.location("pathname").should("eq", "/posts");
      cy.wait("@strapiV4GetPosts");
      cy.getAntdLoadingOverlay().should("not.exist");
    });

    it("should show", () => {
      cy.getShowButton().first().click();

      cy.location("pathname").should("include", "/posts/show/");
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.wait("@strapiV4GetPost").then(({ request, response }) => {
        expect(request.query).to.deep.equal({
          populate: ["category", "cover"],
        });
        expect(response?.body).to.deep.equal({
          data: {
            id: 1,
            title:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            content:
              "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            category: {
              id: 1,
            },
            status: "published",
            createdAt: "2022-06-12T11:03:09.829Z",
            slug: "ut-voluptatem-est",
          },
          meta: {},
        });
      });

      cy.wait("@strapiV4GetCategory").then(({ request, response }) => {
        expect(request.url).to.includes("/categories/1");
        expect(response?.body).to.deep.equal({
          data: {
            id: 1,
            title: "Sint Ipsam Tempora",
          },
        });
      });
    });

    it("should create", () => {
      cy.getCreateButton().click();
      cy.location("pathname").should("eq", "/posts/create");

      cy.get("#title").clear();
      cy.get("#title").type(mockPost.title);
      cy.get("#content textarea").clear();
      cy.get("#content textarea").type(mockPost.content);
      cy.setAntdDropdown({ id: "category", selectIndex: 0 });
      cy.getSaveButton().click();

      cy.wait("@strapiV4PostPost").then(({ request }) => {
        expect(request.body).to.deep.equal({
          data: {
            title: mockPost.title,
            content: mockPost.content,
            category: 1,
          },
        });
        cy.location("pathname").should("eq", "/posts");
        cy.getAntdNotification().contains(/success/i);
      });
    });

    it("should edit", () => {
      cy.getEditButton().first().click();

      cy.wait("@strapiV4GetPost");
      cy.location("pathname").should("include", "/posts/edit/");
      cy.getAntdLoadingOverlay().should("not.exist");
      cy.getSaveButton().should("not.be.disabled");

      cy.get("#title").clear();
      cy.get("#title").type(mockPost.title);
      cy.get("#content textarea").clear();
      cy.get("#content textarea").type(mockPost.content);
      cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
      cy.getSaveButton().click();

      cy.wait("@strapiV4PutPost").then(({ request }) => {
        expect(request.body).to.deep.equal({
          data: {
            title: mockPost.title,
            content: mockPost.content,
            category: {
              id: 1,
            },
          },
        });

        cy.location("pathname").should("eq", "/posts");
        cy.getAntdNotification().contains(/success/i);
      });
    });

    it("should delete", () => {
      cy.getEditButton().first().click();

      cy.wait("@strapiV4GetPost");
      cy.location("pathname").should("include", "/posts/edit/");
      cy.getAntdLoadingOverlay().should("not.exist");
      cy.getSaveButton().should("not.be.disabled");

      cy.getDeleteButton().click();
      cy.getAntdPopoverDeleteButton().click();
      cy.wait("@strapiV4DeletePost").then(() => {
        cy.location("pathname").should("eq", "/posts");
        cy.getAntdNotification().contains(/success/i);
      });
    });
  });

  describe("change locale", () => {
    beforeEach(() => {
      login();
      cy.location("pathname").should("eq", "/posts");
      cy.wait("@strapiV4GetPosts");
      cy.getAntdLoadingOverlay().should("not.exist");
    });

    it("should change locale", () => {
      cy.get("#locale").contains("Deutsch").click();
      cy.wait("@strapiV4GetPosts").then(({ request }) => {
        const query = request.query;
        expect(query.locale).to.eq("de");
      });

      cy.get("#locale").contains("English").click();
      cy.wait("@strapiV4GetPosts").then(({ request }) => {
        const query = request.query;
        expect(query.locale).to.eq("en");
      });
    });
  });
});
