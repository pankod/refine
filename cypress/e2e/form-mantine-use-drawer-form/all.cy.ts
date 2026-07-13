/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-mantine-use-drawer-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    status: "Draft",
  };

  const isDrawerVisible = () => {
    return cy.get(".mantine-Drawer-drawer").should("be.visible");
  };

  const fillForm = () => {
    cy.get("#title").clear().type(mockPost.title);
    cy.get("#content textarea").clear({ force: true }).type(mockPost.content);
    cy.get("#status").click().get("#status-1").click();
    cy.get("#categoryId").clear().get("#categoryId-1").click();
  };

  const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body).to.have.property("category");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    cy.getMantineNotification().contains(/success/gi);
  };

  const submitForm = () => {
    return cy.getSaveButton().click();
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should create record", () => {
    cy.getCreateButton().click();
    fillForm();
    submitForm();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should edit record", () => {
    cy.getEditButton().first().click();
    isDrawerVisible();

    // assert response values are equal to the form values
    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      // wait loading state and render to be finished
      cy.getSaveButton().should("not.be.disabled");
      cy.getMantineLoadingOverlay().should("not.exist");

      cy.get("#title").should("have.value", body?.title);
      cy.get("#content textarea").should("have.value", body?.content);
      cy.get("#status").should(
        "have.value",
        body?.status?.charAt(0).toUpperCase() + body?.status?.slice(1),
      );
    });

    fillForm();
    submitForm();

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should create form sync with location", () => {
    cy.wait("@getPosts");

    cy.getCreateButton().click();
    isDrawerVisible();
    cy.location("search").should("include", "modal-posts-create[open]=true");

    cy.reload();
    isDrawerVisible();
    cy.location("search").should("include", "modal-posts-create[open]=true");
  });

  it("should edit form sync with location", () => {
    cy.wait("@getPosts");

    cy.getEditButton().first().click();
    cy.wait("@getPost");

    isDrawerVisible();
    cy.location("search").should("include", "modal-posts-edit[open]=true");
    cy.location("search").should("include", "modal-posts-edit[id]");

    cy.reload();
    isDrawerVisible();
    cy.location("search").should("include", "modal-posts-edit[open]=true");
    cy.location("search").should("include", "modal-posts-edit[id]");
  });
});
