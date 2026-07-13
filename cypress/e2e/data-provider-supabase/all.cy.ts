/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("data-provider-supabase", () => {
  const submitAuthForm = () => {
    return cy.get("button[type=submit]").click();
  };

  const login = () => {
    cy.fixture("supabase-credentials").then((auth) => {
      cy.get("#email").clear();
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

    cy.interceptSupabaseGETPosts();
    cy.interceptSupabasePOSTPost();
    cy.interceptSupabasePATCHPost();
    cy.interceptSupabaseDELETEPost();
    cy.interceptSupabaseGETCategories();

    cy.visit("/");
  });

  describe("login", () => {
    it("should login", () => {
      login();
      cy.location("pathname").should("eq", "/blog-posts");
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
      cy.location("pathname").should("eq", "/blog-posts");
      cy.wait("@supabaseGetPosts");

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
      cy.location("pathname").should("eq", "/blog-posts");
    });

    it("should list with select", () => {
      cy.wait("@supabaseGetPosts").then(({ request }) => {
        const query = request.query;
        expect(query).to.deep.equal({
          select: "*,categories(title)",
          offset: "0",
          limit: "10",
          order: "id.asc",
        });
      });
    });

    it("should list with pagination", () => {
      cy.wait("@supabaseGetPosts");
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.get(".ant-pagination-item-2 > a").click();
      cy.wait("@supabaseGetPosts").then(({ request }) => {
        const query = request.query;
        expect(query).to.deep.equal({
          select: "*,categories(title)",
          offset: "10",
          limit: "10",
          order: "id.asc",
        });
      });
    });

    it("should sort", () => {
      cy.wait("@supabaseGetPosts").then(({ request }) => {
        const query = request.query;
        expect(query).to.deep.equal({
          select: "*,categories(title)",
          offset: "0",
          limit: "10",
          order: "id.asc",
        });
      });
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.getAntdColumnSorter(0).click();
      cy.wait("@supabaseGetPosts").then(({ request }) => {
        const query = request.query;
        expect(query).to.deep.equal({
          select: "*,categories(title)",
          offset: "0",
          limit: "10",
          order: "id.desc",
        });
      });

      cy.getAntdColumnSorter(0).click();
      cy.wait("@supabaseGetPosts").then(({ request }) => {
        const query = request.query;
        expect(query).to.deep.equal({
          select: "*,categories(title)",
          offset: "0",
          limit: "10",
        });
      });
    });

    it("should filter", () => {
      cy.wait("@supabaseGetCategories");
      cy.wait("@supabaseGetPosts");
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.getAntdFilterTrigger(0).click();
      cy.get(".ant-select-selector").click();
      cy.fixture("categories").then((categories) => {
        const category = categories[0];

        cy.get(".ant-select-item-option-content")
          .contains(category.title)
          .click();
        cy.contains(/filter/i).click({ force: true });

        cy.wait("@supabaseGetPosts").then(({ request }) => {
          const query = request.query;
          expect(query).to.deep.equal({
            select: "*,categories(title)",
            offset: "0",
            limit: "10",
            order: "id.asc",
            categoryId: `in.(${category.id})`,
          });
        });
      });
    });
  });

  describe("useShow", () => {
    beforeEach(() => {
      login();
      cy.location("pathname").should("eq", "/blog-posts");
    });

    it("should show", () => {
      cy.wait("@supabaseGetPosts");

      cy.getShowButton().first().click();
      cy.location("pathname").should("contains", "/blog-posts/show/");
      cy.wait("@supabaseGetPosts").then(({ request, response }) => {
        const query = request.query;
        const body = response?.body?.[0];

        expect(query).to.deep.equal({
          select: "*",
          id: "eq.1",
        });

        cy.getAntdLoadingOverlay().should("not.exist");
        console.log(body);
        cy.contains(body.title);
        cy.contains(body.content);
        cy.contains(body.categories?.title);
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

    const fillForm = () => {
      cy.get("#title").clear();
      cy.get("#title").type(mockPost.title);
      cy.get("#content textarea").clear();
      cy.get("#content textarea").type(mockPost.content);
      cy.setAntdDropdown({ id: "categoryId", selectIndex: 0 });
    };

    beforeEach(() => {
      login();
      cy.location("pathname").should("eq", "/blog-posts");
    });

    it("should create", () => {
      cy.wait("@supabaseGetPosts");
      cy.getCreateButton().click();
      cy.location("pathname").should("eq", "/blog-posts/create");

      fillForm();
      cy.getSaveButton().click();

      cy.wait("@supabasePostPost").then(({ request, response }) => {
        expect(request.body).to.deep.equal({
          title: mockPost.title,
          content: mockPost.content,
          categoryId: 1,
        });
        expect(response?.body?.title).to.eq(mockPost.title);
        expect(response?.body?.content).to.eq(mockPost.content);
        expect(response?.body?.categoryId).to.eq(1);

        cy.location("pathname").should("eq", "/blog-posts");
        cy.getAntdNotification().contains(/success/i);
      });
    });

    it("should edit", () => {
      cy.wait("@supabaseGetPosts");
      cy.getEditButton().first().click();
      cy.wait("@supabaseGetPosts");
      cy.location("pathname").should("include", "/blog-posts/edit/");
      cy.getAntdLoadingOverlay().should("not.exist");
      cy.getSaveButton().should("not.be.disabled");

      fillForm();
      cy.getSaveButton().click();

      cy.wait("@supabasePatchPost").then(({ request, response }) => {
        expect(request.body).to.deep.equal({
          title: mockPost.title,
          content: mockPost.content,
          categoryId: 1,
        });
        expect(response?.body?.title).to.eq(mockPost.title);
        expect(response?.body?.content).to.eq(mockPost.content);
        expect(response?.body?.categoryId).to.eq(1);

        cy.location("pathname").should("eq", "/blog-posts");
        cy.getAntdNotification().contains(/success/i);
      });
    });

    it("should delete", () => {
      cy.wait("@supabaseGetPosts");
      cy.getEditButton().first().click();
      cy.wait("@supabaseGetPosts");
      cy.location("pathname").should("include", "/blog-posts/edit/");
      cy.getAntdLoadingOverlay().should("not.exist");
      cy.getSaveButton().should("not.be.disabled");

      cy.getDeleteButton().click();
      cy.getAntdPopoverDeleteButton().click();
      cy.wait("@supabaseDeletePost").then(({ request }) => {
        expect(request.query).to.deep.equal({
          id: "eq.1",
        });
        cy.location("pathname").should("eq", "/blog-posts");
        cy.getAntdNotification().contains(/success/i);
      });
    });
  });
});
