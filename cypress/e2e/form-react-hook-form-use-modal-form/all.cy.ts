/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-react-hook-form-use-modal-form", () => {
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
    cy.get("#status").select(mockPost.status);
  };

  const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.content).to.eq(mockPost.content);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
  };

  const submitForm = () => {
    return cy.get('[type="submit"]').click();
  };

  const waitForLoading = () => {
    cy.contains(/loading/).should("not.exist");
    cy.get('[type="submit"]').should("not.be.disabled");
  };

  const isModalOpen = () => {
    return cy.get(".modal").should("be.visible");
  };

  const isModalClosed = () => {
    return cy.get(".modal").should("not.exist");
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should open - close modal", () => {
    cy.get("button").contains("Create Post").click();
    isModalOpen();

    cy.get(".close-button").click();
    isModalClosed();
  });

  it("should create record", () => {
    cy.get("button").contains("Create Post").click();
    isModalOpen();

    fillForm();
    submitForm();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should edit record", () => {
    cy.get("button").contains(/edit/i).first().click();
    isModalOpen();

    // wait loading state and render to be finished
    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      expect(response?.statusCode).to.eq(200);
      // assert form values are filled with record data
      waitForLoading();
      cy.get("#title").should("have.value", body?.title);
      cy.get("#content").should("have.value", body?.content);
      cy.get("#status").should("have.value", body?.status);
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

    cy.get("button").contains("Create Post").click();
    isModalOpen();
    cy.location("search").should("include", "modal-posts-create[open]=true");

    cy.reload();
    isModalOpen();
    cy.location("search").should("include", "modal-posts-create[open]=true");
  });

  it("should edit form sync with location", () => {
    cy.wait("@getPosts");

    cy.get("button").contains(/edit/i).first().click();
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
