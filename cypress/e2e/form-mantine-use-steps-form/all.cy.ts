/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-mantine-use-steps-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    status: "Draft",
    slug: "lorem-ipsum-is-simply-dummy-text-of-the-printing-and-typesetting-industry",
  };

  const fillForm = () => {
    cy.get("#title").clear().type(mockPost.title);
    cy.get("#slug").clear().type(mockPost.slug);
    getNextStepButton().click();
    cy.get("#status").click().get("#status-1").click();
    getNextStepButton().click();
    cy.get("#content textarea").clear().type(mockPost.content, { delay: 0 });
  };

  const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.slug).to.eq(mockPost.slug);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    cy.getMantineNotification().contains(/success/gi);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
  };

  const submitForm = () => {
    return cy.getSaveButton().click();
  };

  const getNextStepButton = () => {
    return cy.get("button").contains(/next step/i);
  };

  const getPreviousStepButton = () => {
    return cy.get("button").contains(/back/i);
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

    cy.wait("@postPost").then((createInterception) => {
      const createResponse = createInterception?.response;
      assertSuccessResponse(createResponse);
    });
  });

  it("should edit record", () => {
    cy.getEditButton().first().click();

    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      // wait loading state and render to be finished
      cy.getAntdLoadingOverlay().should("not.exist");

      // assert form values are equal to the response values
      cy.get("#title").should("have.value", body.title);
      cy.get("#slug").should("have.value", body.slug);
      getNextStepButton().click();
      cy.get("#status").should(
        "have.value",
        body.status.charAt(0).toUpperCase() + body.status.slice(1),
      );
      getNextStepButton().click();
      cy.get("#content textarea").should("have.value", body.content);
    });

    getPreviousStepButton().click();
    getPreviousStepButton().click();
    fillForm();
    submitForm();

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should preserve form data when navigating between steps", () => {
    cy.getCreateButton().click();

    // fill first step
    cy.get("#title").clear().type(mockPost.title);
    cy.get("#slug").clear().type(mockPost.slug);

    // go to second step
    getNextStepButton().click();
    // fill second step
    cy.get("#status").click().get("#status-1").click();

    // go to third step
    getNextStepButton().click();
    // fill third step
    cy.get("#content textarea").clear().type(mockPost.content, { delay: 0 });

    // go back to second step
    getPreviousStepButton().click();
    // asert second step values are preserved
    cy.get("#status").should("have.value", mockPost.status);

    // go back to frist step
    getPreviousStepButton().click();
    // assert that first step values are preserved
    cy.get("#title").should("have.value", mockPost.title);
    cy.get("#slug").should("have.value", mockPost.slug);

    // assert second and third step values are still preserved
    // go to second step
    getNextStepButton().click();
    // asert second step values are preserved
    cy.get("#status").should("have.value", mockPost.status);

    // go to third step
    getNextStepButton().click();
    // assert that third step values are preserved
    cy.get("#content textarea").should("have.value", mockPost.content);

    // submit form and assert that values
    submitForm();
    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });
});
