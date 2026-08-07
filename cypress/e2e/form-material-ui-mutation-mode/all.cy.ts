/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-material-ui-mutation-mode", () => {
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
  };

  const submitForm = () => {
    return cy.getSaveButton().click();
  };

  const changeMutationMode = (
    mode: "pessimistic" | "optimistic" | "undoable",
  ) => {
    return cy
      .get(`input[type="radio"][value="${mode}"]`)
      .click({ force: true });
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

    // wait loading state and render to be finished
    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      expect(response?.statusCode).to.eq(200);
      // assert form values are filled with record data
      cy.getSaveButton().should("not.be.disabled");
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

  it("should edit record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.getEditButton().first().click();

    cy.wait("@getPost").then((interception) => {
      const getResponse = interception?.response;
      const body = getResponse?.body;

      // assert form values are filled with record data
      cy.getSaveButton().should("not.be.disabled");
      cy.get("#title").should("have.value", body?.title);
      cy.get("#content").should("have.value", body?.content);
      cy.get("#status").should("have.value", body?.status);
    });

    fillForm();
    submitForm();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
    // should show notification
    cy.getMaterialUINotification()
      .contains(/seconds to undo/gi)
      .should("exist");
    // notification should disappear after certain time
    cy.getMaterialUINotification()
      .contains(/seconds to undo/gi)
      .should("not.exist");

    // should sent a PATCH request after certain time
    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getMaterialUINotification().contains(/success/i);
    });
  });

  it("should undo editing when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");
    submitForm();
    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
    cy.get(".SnackbarItem-action > button").click();
    cy.getMaterialUINotification().should("not.exist");
    cy.get("@patchPost").should("be.null");
  });

  it("should create record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.getCreateButton().click();

    fillForm();
    submitForm();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    // should sent a POST request after certain time
    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getMaterialUINotification().contains(/success/i);
    });
  });

  it("should edit record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");
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
      cy.getMaterialUINotification().contains(/success/i);
    });
  });

  it("should delete record when mutation mode is pessimistic", () => {
    changeMutationMode("pessimistic");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");

    cy.getDeleteButton()
      .first()
      .click()
      .getMaterialUIDeletePopoverButton()
      .click();

    // should sent a DELETE request after certain time
    cy.wait("@deletePost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getMaterialUINotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should delete record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");

    cy.getDeleteButton()
      .first()
      .click()
      .getMaterialUIDeletePopoverButton()
      .click();
    // should show notification
    cy.getMaterialUINotification()
      .contains(/seconds to undo/gi)
      .should("exist");
    // notification should disappear after certain time
    cy.getMaterialUINotification()
      .contains(/seconds to undo/gi)
      .should("not.exist");
    cy.wait("@deletePost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getMaterialUINotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should undo deleting record when mutation mode is undoable", () => {
    changeMutationMode("undoable");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");

    cy.getDeleteButton()
      .first()
      .click()
      .getMaterialUIDeletePopoverButton()
      .click();
    cy.get(".SnackbarItem-action > button").click();
    cy.getMaterialUINotification().should("not.exist");
    cy.get("@deletePost").should("be.null");
  });

  it("should delete record when mutation mode is optimistic", () => {
    changeMutationMode("optimistic");
    cy.getEditButton().first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    cy.getSaveButton().should("not.be.disabled");

    cy.getDeleteButton()
      .first()
      .click()
      .getMaterialUIDeletePopoverButton()
      .click();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
    cy.wait("@deletePost").then((interception) => {
      const response = interception?.response;
      expect(response?.statusCode).to.eq(200);
      cy.getMaterialUINotification().should("contain", "Success");
    });
  });
});
