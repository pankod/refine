/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-chakra-use-drawer-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    status: "draft",
  };

  const isModalVisible = () => {
    cy.get(".chakra-modal__body").should("be.visible");
  };

  const isModalNotVisible = () => {
    cy.get(".chakra-modal__overlay ").should("not.exist");
  };

  const fillForm = () => {
    cy.get("#title").clear().type(mockPost.title);
    cy.get("#status").select(mockPost.status);
    cy.get("#categoryId").select(2);
  };

  const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body).to.have.property("category");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    cy.getChakraUINotification().contains(/success/gi);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    isModalNotVisible();
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

    // wait loading state and render to be finished
    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");

    fillForm();
    submitForm();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should edit record", () => {
    cy.getEditButton().first().click();

    // assert response values are equal to the form values
    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      // wait loading state and render to be finished
      cy.getSaveButton().should("not.be.disabled");
      cy.getChakraUILoadingOverlay().should("not.exist");

      // assert response values are equal to the form values
      cy.get("#title").should("have.value", body?.title);
      cy.get("#status").should("have.value", body?.status.toLowerCase());
      cy.get("#categoryId").should("have.value", body?.category?.id);
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
    isModalVisible();
    cy.location("search").should("include", "modal-posts-create[open]=true");

    cy.reload();
    isModalVisible();
    cy.location("search").should("include", "modal-posts-create[open]=true");
  });

  it("should edit form sync with location", () => {
    cy.wait("@getPosts");

    cy.getEditButton().first().click();
    cy.wait("@getPost");

    isModalVisible();
    cy.location("search").should("include", "modal-posts-edit[open]=true");
    cy.location("search").should("include", "modal-posts-edit[id]");

    cy.reload();
    isModalVisible();
    cy.location("search").should("include", "modal-posts-edit[open]=true");
    cy.location("search").should("include", "modal-posts-edit[id]");
  });
});
