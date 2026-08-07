/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-mutation-mode", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "Published",
  };

  const fillForm = () => {
    cy.get("#title").clear();
    cy.get("#title").should("be.not.disabled");
    cy.get("#title").type(mockPost.title);

    cy.get("#content textarea").clear();
    cy.get("#content textarea").should("be.not.disabled");
    cy.get("#content textarea").type(mockPost.content);

    cy.setAntdDropdown({ id: "category_id", selectIndex: 0 });
    cy.setAntdSelect({ id: "status", value: mockPost.status });
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

  const waitForEditPageLoading = () => {
    cy.wait("@getPost");
    cy.wait("@getCategories");
    cy.getAntdLoadingOverlay().should("not.exist");
    cy.getSaveButton().should("not.be.disabled");
  };

  const waitForListPageLoading = () => {
    cy.wait("@getPosts");
    cy.wait("@getCategories");
    cy.getAntdLoadingOverlay().should("not.exist");
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

  it("should edit record when mutation mode is pessimistic", () => {
    waitForListPageLoading();

    cy.get("input[value=pessimistic]").check({ force: true });
    cy.getEditButton().first().should("not.be.disabled");
    cy.getEditButton().first().click();
    // wait loading state and render to be finished
    waitForEditPageLoading();

    fillForm();
    submitForm();

    cy.wait("@patchPost").then((interception) => {
      cy.getAntdNotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should edit a record when mutation mode is undoable", () => {
    waitForListPageLoading();
    cy.get("input[value=undoable]").check({ force: true });
    cy.getEditButton().first().click();

    // wait loading state and render to be finished

    waitForEditPageLoading();
    fillForm();
    submitForm();

    // should redirect to list page
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
    // should show notification
    cy.getAntdNotification().contains(/seconds to undo/gi);
    // notification should disappear after certain time
    cy.getAntdNotification()
      .contains("seconds to undo", { timeout: 10000 })
      .should("not.exist");

    // should sent a PATCH request after certain time
    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getAntdNotification().should("contain", "Success");
    });
  });

  it("should undo editing when mutation mode is undoable", () => {
    waitForListPageLoading();

    cy.get("input[value=undoable]").check({ force: true });
    cy.getEditButton().first().click();

    waitForEditPageLoading();
    submitForm();

    cy.getAntdNotification()
      .contains(/seconds to undo/gi)
      .siblings("button")
      .click();
    cy.getAntdNotification().should("not.exist");

    cy.get("@patchPost").should("be.null");
  });

  it("should create a record when mutation mode is optimistic", () => {
    waitForListPageLoading();

    cy.get("input[value=optimistic]").check({ force: true });
    cy.getCreateButton().click();

    cy.wait("@getCategories");

    fillForm();
    submitForm();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getAntdNotification().should("contain", "Success");
    });
  });

  it("should edit a record when mutation mode is optimistic", () => {
    waitForListPageLoading();

    cy.get("input[value=optimistic]").check({ force: true });
    cy.getEditButton().first().click();

    waitForEditPageLoading();
    fillForm();
    submitForm();

    // should redirect to list page without waiting for response
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.getAntdNotification().should("contain", "Success");
    });
  });

  it("should delete record when mutation mode is pessimistic", () => {
    waitForListPageLoading();

    cy.get("input[value=pessimistic]").check({ force: true });
    cy.getEditButton().first().click();

    waitForEditPageLoading();

    cy.getDeleteButton().first().click();
    cy.getAntdPopoverDeleteButton().click();

    cy.wait("@deletePost").then((interception) => {
      const response = interception?.response;

      expect(response?.statusCode).to.eq(200);
      cy.getAntdNotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should delete a record when mutation mode is undoable", () => {
    waitForListPageLoading();

    cy.get("input[value=undoable]").check({ force: true });
    cy.getEditButton().first().click();

    waitForEditPageLoading();

    cy.getDeleteButton().click();
    cy.getAntdPopoverDeleteButton().click();

    // should show notification
    cy.getAntdNotification().contains(/seconds to undo/gi);
    // should still in edit page
    cy.location().should((loc) => {
      expect(loc.pathname).to.includes("/posts/edit");
    });
    // notification should disappear after certain time
    cy.getAntdNotification()
      .contains("seconds to undo", { timeout: 20000 })
      .should("not.exist");

    // should sent a DELETE request after certain time
    cy.wait("@deletePost").then(() => {
      cy.getAntdNotification().should("contain", "Success");
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });
});
