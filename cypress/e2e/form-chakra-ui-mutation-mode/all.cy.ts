/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-chakra-ui-mutation-mode", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    status: "draft",
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
  };

  const submitForm = () => {
    return cy.getSaveButton().click();
  };

  const changeMutationMode = (
    mode: "pessimistic" | "optimistic" | "undoable",
  ) => {
    return cy.get(`.chakra-radio__input[value=${mode}]`).click({
      force: true,
    });
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should edit record when mutation mode is pessimistic", () => {
    changeMutationMode("pessimistic");
    cy.getEditButton().first().click();

    cy.wait("@getPost").then((interception) => {
      const getResponse = interception?.response;
      const body = getResponse?.body;

      // wait loading state and render to be finished
      cy.getSaveButton().should("not.be.disabled");
      cy.getChakraUILoadingOverlay().should("not.exist");

      // assert response values are equal to the form values
      cy.get("#title").should("have.value", body?.title);
      cy.get("#status").should("have.value", body?.status);
      cy.get("#categoryId").should("have.value", body?.category?.id);

      fillForm();
      submitForm();

      cy.wait("@patchPost").then((patchInterception) => {
        const patchResponse = patchInterception?.response;
        assertSuccessResponse(patchResponse);
      });
    });
  });

  it("should edit record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.getEditButton().first().click();

    cy.wait("@getPost").then((interception) => {
      const getResponse = interception?.response;
      const body = getResponse?.body;

      // wait loading state and render to be finished
      cy.getSaveButton().should("not.be.disabled");
      cy.getChakraUILoadingOverlay().should("not.exist");

      // assert response values are equal to the form values
      cy.get("#title").should("have.value", body?.title);
      cy.get("#status").should("have.value", body?.status);
      cy.get("#categoryId").should("have.value", body?.category?.id);
    });

    fillForm();
    submitForm();

    // should show notification
    cy.getChakraUIToast().contains(/seconds to undo/gi);
    // notification should disappear after certain time
    cy.getChakraUIToast()
      .contains("seconds to undo", { timeout: 10000 })
      .should("not.exist");

    // should sent a PATCH request after certain time
    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should undo editing when mutation mode is undoable", () => {
    cy.wait("@getPosts");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");
    cy.wait("@getCategories");

    fillForm();
    submitForm();

    cy.getChakraUIToast()
      .contains(/seconds to undo/gi)
      .siblings("button")
      .click();
    cy.getChakraUIToast().should("not.exist");

    cy.get("@patchPost").should("be.null");
  });

  it("should create record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.getCreateButton().click();

    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");
    fillForm();
    submitForm();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    // should sent a PATCH request after certain time
    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getChakraUINotification().should("contain", "Success");
    });
  });

  it("should edit record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.getEditButton().first().click();

    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");
    fillForm();
    submitForm();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    // should sent a PATCH request after certain time
    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getChakraUINotification().should("contain", "Success");
    });
  });

  it("should delete record when mutation mode is pessimistic", () => {
    changeMutationMode("pessimistic");
    cy.getEditButton().first().click();

    cy.wait("@getPost");
    // wait loading state and render to be finished
    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getDeleteButton().click().getChakraUIPopoverDeleteButton().click();

    cy.wait("@deletePost").then((interception) => {
      const deleteResponse = interception?.response;
      expect(deleteResponse?.statusCode).to.eq(200);

      cy.getChakraUINotification().contains(/success/gi);
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should delete record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.getEditButton().first().click();

    cy.wait("@getPost");
    // wait loading state and render to be finished
    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getDeleteButton().click().getChakraUIPopoverDeleteButton().click();

    // should show notification
    cy.getChakraUIToast().contains(/seconds to undo/gi);
    // notification should disappear after certain time
    cy.getChakraUIToast()
      .contains("seconds to undo", { timeout: 10000 })
      .should("not.exist");

    // should sent a PATCH request after certain time
    cy.wait("@deletePost").then(() => {
      cy.getChakraUINotification().contains(/success/gi);
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should undo deleting record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.getEditButton().first().click();

    cy.wait("@getPost");
    // wait loading state and render to be finished
    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getDeleteButton().click().getChakraUIPopoverDeleteButton().click();

    cy.getDeleteButton().should("be.disabled");
    // should show notification
    cy.getChakraUIToast().contains(/seconds to undo/gi);
    // click undo button
    cy.getChakraUIToast()
      .contains(/seconds to undo/gi)
      .siblings("button")
      .click();
    cy.getDeleteButton().should("not.be.disabled");
    cy.get("@deletePost").should("be.null");
  });

  it("should delete record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.getEditButton().first().click();

    cy.wait("@getPost");
    // wait loading state and render to be finished
    cy.getSaveButton().should("not.be.disabled");
    cy.getChakraUILoadingOverlay().should("not.exist");

    cy.getDeleteButton().click().getChakraUIPopoverDeleteButton().click();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    // should sent a DELETE request after certain time
    cy.wait("@deletePost").then(() => {
      cy.getChakraUINotification().contains(/success/gi);
    });
  });
});
