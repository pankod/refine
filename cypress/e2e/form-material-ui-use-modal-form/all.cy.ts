/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-material-ui-use-modal-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "published",
  };

  const fillForm = () => {
    cy.get("#title").clear();
    cy.get("#title").type(mockPost.title);
    cy.get("#content").clear();
    cy.get("#content").type(mockPost.content);
    cy.get("#status").click();
    cy.get("#status-option-0").click();
    cy.get("#category").click();
    cy.get("#category-option-0").click();
  };

  const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body).to.have.property("category");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.content).to.eq(mockPost.content);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    isModalClosed();
    cy.getMaterialUINotification().contains(/success/i);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
  };

  const submitForm = () => {
    return cy.getSaveButton().click();
  };

  const isModalOpen = () => {
    return cy.get(".MuiDialog-container").should("be.visible");
  };

  const isModalClosed = () => {
    return cy.get(".MuiDialog-container").should("not.exist");
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should create record", () => {
    cy.getCreateButton().click();
    isModalOpen();

    fillForm();
    submitForm();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should edit record", () => {
    cy.getEditButton().first().click();
    isModalOpen();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");

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
    isModalOpen();
    cy.location("search").should("include", "modal-posts-create[open]=true");

    cy.reload();
    isModalOpen();
    cy.location("search").should("include", "modal-posts-create[open]=true");
  });

  it("should edit form sync with location", () => {
    cy.wait("@getPosts");

    cy.getEditButton().first().click();
    cy.wait("@getPost");

    isModalOpen();
    cy.location("search").should("include", "modal-posts-edit[open]=true");
    cy.location("search").should("include", "modal-posts-edit[id]");

    cy.reload();
    isModalOpen();
    cy.location("search").should("include", "modal-posts-edit[open]=true");
    cy.location("search").should("include", "modal-posts-edit[id]");
  });
});
