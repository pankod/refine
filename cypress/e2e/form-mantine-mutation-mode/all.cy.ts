/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-mantine-mutation-mode", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    status: "draft",
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
  };

  const submitForm = () => {
    return cy.getSaveButton().click();
  };

  const changeMutationMode = (
    mode: "pessimistic" | "optimistic" | "undoable",
  ) => {
    // uppercase first letter
    const uppercaseMode = mode.charAt(0).toUpperCase() + mode.slice(1);

    return cy.get(".mantine-Radio-label").contains(uppercaseMode).click({
      force: true,
    });
  };

  const waitForLoading = () => {
    cy.getMantineLoadingOverlay().should("not.exist");
    cy.getSaveButton().should("not.be.disabled");
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should edit record when mutation mode is pessimistic", () => {
    changeMutationMode("pessimistic");
    cy.wait("@getPosts");
    cy.getEditButton().first().click();
    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      // wait loading state and render to be finished
      waitForLoading();

      cy.get("#title").should("have.value", body?.title);
      cy.get("#content textarea").should("have.value", body?.content);
    });
    fillForm();
    submitForm();
    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getMantineNotification().contains(/success/gi);
      // should redirect to list page
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should edit record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitForLoading();
    fillForm();
    submitForm();
    // should redirect to list page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
    cy.getMantineNotification().contains(/seconds to undo/gi);
    cy.getMantineNotification()
      .contains("seconds to undo", { timeout: 10000 })
      .should("not.exist");
    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getMantineNotification().contains(/success/gi);
    });
  });

  it("should undo editing when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.wait("@getCategories");
    waitForLoading();
    submitForm();
    // should redirect to list page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
    cy.getMantineNotification()
      .contains(/seconds to undo/gi)
      .parent()
      .siblings("button")
      .click({ force: true });
    cy.getMantineNotification().should("not.exist");
    cy.get("@patchPost").should("be.null");
  });

  it("should create a record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.getCreateButton().click();

    // wait loading state and render to be finished
    waitForLoading();
    fillForm();
    submitForm();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getMantineNotification().contains(/success/gi);
    });
  });

  it("should edit a record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitForLoading();
    fillForm();
    submitForm();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getMantineNotification().contains(/success/gi);
    });
  });

  it("should delete record when mutation mode is pessimistic", () => {
    changeMutationMode("pessimistic");
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitForLoading();
    cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();

    cy.wait("@deletePost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getMantineNotification().contains(/success/gi);
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should delete record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitForLoading();
    cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();
    // should show notification
    cy.getMantineNotification().contains(/seconds to undo/gi);
    // notification should disappear after certain time
    cy.getMantineNotification()
      .contains("seconds to undo", { timeout: 10000 })
      .should("not.exist");
    // should sent a PATCH request after certain time
    cy.wait("@deletePost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getMantineNotification().contains(/success/gi);
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should undo deleting record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitForLoading();
    cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();
    cy.getDeleteButton().should("be.disabled");
    // should show notification
    cy.getMantineNotification().contains(/seconds to undo/gi);
    // click undo button
    cy.getMantineNotification()
      .contains(/seconds to undo/gi)
      .parent()
      .siblings("button")
      .click();
    cy.getDeleteButton().should("not.be.disabled");
    cy.get("@deletePost").should("be.null");
  });

  it("should delete record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitForLoading();
    cy.getDeleteButton().click().getMantinePopoverDeleteButton().click();
    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
    // should sent a DELETE request after certain time
    cy.wait("@deletePost").then((interception) => {
      const response = interception?.response;
      expect(response?.statusCode).to.eq(200);
      cy.getMantineNotification().contains(/success/gi);
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });
});
