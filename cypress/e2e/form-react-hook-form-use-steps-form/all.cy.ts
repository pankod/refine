/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-react-hook-form-use-steps-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "published",
    category: "2",
  };

  const goToNextStep = () => {
    cy.get("button").contains(/next/i).click();
  };

  const goToPreviousStep = () => {
    cy.get("button")
      .contains(/previous/i)
      .click();
  };

  const fillForm = () => {
    cy.get("button").contains(/next/i).should("not.be.disabled");
    cy.get("#title").clear();
    cy.get("#title").type(mockPost.title);
    goToNextStep();

    cy.get("button").contains(/next/i).should("not.be.disabled");
    cy.get("#status").select(mockPost.status);
    goToNextStep();

    cy.get("button").contains(/save/i).should("not.be.disabled");
    cy.get("#content").clear();
    cy.get("#content").type(mockPost.content);
    cy.get("#category").select(mockPost.category);
  };

  const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body).to.have.property("category");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.content).to.eq(mockPost.content);
    expect(body?.category?.id).to.eq(mockPost.category);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
  };

  const submitForm = () => {
    return cy.get("button").contains(/save/i).click();
  };

  const waitForLoading = () => {
    cy.contains(/loading.../i).should("not.exist");
  };

  const getNextButton = () => {
    cy.get("button").contains(/next/i).should("not.be.disabled");
    return cy.get("button").contains(/next/i);
  };

  const getPreviousButton = () => {
    cy.get("button")
      .contains(/previous/i)
      .should("not.be.disabled");
    return cy.get("button").contains(/previous/i);
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should create record", () => {
    cy.get("button").contains("Create Post").click();

    fillForm();
    submitForm();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should edit record", () => {
    cy.get("button").contains(/edit/i).first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      waitForLoading();

      expect(response?.statusCode).to.eq(200);
      // assert form values are filled with record data
      waitForLoading();
      cy.get("#title").should("have.value", body?.title);
      goToNextStep();
      cy.get("#status").should("have.value", body?.status);
      goToNextStep();
      cy.get("#content").should("have.value", body?.content);
      cy.get("#category").should("have.value", body?.category?.id);
      goToPreviousStep();
      goToPreviousStep();
    });

    fillForm();
    submitForm();

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should preserve form data when navigating between steps", () => {
    cy.get("button").contains("Create Post").click();

    fillForm();

    // traverse back and forth and assert that the form data is preserved
    cy.get("#category").should("not.have.value", "");
    cy.get("#content").should("have.value", mockPost.content);
    getPreviousButton().click();
    cy.get("#status").should("have.value", mockPost.status);
    getPreviousButton().click();
    cy.get("#title").should("have.value", mockPost.title);
    getNextButton().click();
    getNextButton().click();

    // traverse back and forth and change the form data
    cy.get("#content").clear();
    cy.get("#content").type("changed");
    cy.get("#category").select("2");
    getPreviousButton().click();
    cy.get("#status").select("draft");

    getPreviousButton().click();
    cy.get("#title").clear();
    cy.get("#title").type("changed");

    // traverse back and forth and assert that the form data is preserved
    getNextButton().click();
    getNextButton().click();
    cy.get("#content").should("have.value", "changed");
    cy.get("#category").should("have.value", "2");
    getPreviousButton().click();
    cy.get("#status").should("have.value", "draft");
    getPreviousButton().click();
    cy.get("#title").should("have.value", "changed");

    // submit the form
    getNextButton().click();
    getNextButton().click();
    submitForm();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      expect(response?.statusCode).to.eq(200);
      expect(body).to.have.property("id");
      expect(body).to.have.property("category");
      expect(body?.title).to.eq("changed");
      expect(body?.content).to.eq("changed");
      expect(body?.status?.toLowerCase()).to.eq("draft");

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });
});
