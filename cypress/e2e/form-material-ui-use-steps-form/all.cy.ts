/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-material-ui-use-modal-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "published",
    slug: "lorem-ipsum-is-simply-dummy-text-of-the-printing-and-typesetting-industry",
  };

  const getNextButton = () => {
    return cy.get("button").contains(/next/i);
  };

  const getPreviousButton = () => {
    return cy.get("button").contains(/previous/i);
  };

  const fillForm = () => {
    cy.get("#title").clear();
    cy.get("#title").type(mockPost.title);

    getNextButton().click();

    cy.get("#status").click();
    cy.get("#status-option-0").click();
    cy.get("#category").click();
    cy.get("#category-option-0").click();

    getNextButton().click();

    cy.get("#slug").clear();
    cy.get("#slug").type(mockPost.slug);
    cy.get("#content").clear();
    cy.get("#content").type(mockPost.content);
  };

  const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body).to.have.property("id");
    expect(body).to.have.property("category");
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.content).to.eq(mockPost.content);
    expect(body?.slug).to.eq(mockPost.slug);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());

    cy.getMaterialUINotification().contains(/success/i);
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/posts");
    });
  };

  const submitForm = () => {
    cy.getSaveButton().click();
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

    // wait loading state and render to be finished
    cy.wait("@getPost");
    getNextButton().should("not.be.disabled");

    fillForm();

    cy.getSaveButton().should("not.be.disabled");
    submitForm();

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should preserve form data when navigating between steps", () => {
    cy.getCreateButton().click();

    fillForm();

    // traverse back and forth and assert that the form data is preserved
    getPreviousButton().click();
    cy.get("#status").should("have.value", mockPost.status);
    cy.get("#category").should("not.have.value", "");
    getPreviousButton().click();
    cy.get("#title").should("have.value", mockPost.title);
    getNextButton().click();
    getNextButton().click();
    cy.get("#slug").should("have.value", mockPost.slug);
    cy.get("#content").should("have.value", mockPost.content);

    // traverse back and forth and change the form data
    cy.get("#slug").clear();
    cy.get("#slug").type("changed");
    cy.get("#content").clear();
    cy.get("#content").type("changed");
    getPreviousButton().click();
    cy.get("#status").click();
    cy.get("#status-option-1").click();
    cy.get("#category").click();
    cy.get("#category-option-1").click();
    getPreviousButton().click();
    cy.get("#title").clear();
    cy.get("#title").type("changed");

    // traverse back and forth and assert that the form data is preserved
    getNextButton().click();
    getNextButton().click();
    cy.get("#slug").should("have.value", "changed");
    cy.get("#content").should("have.value", "changed");
    getPreviousButton().click();
    cy.get("#status").should("have.value", "draft");
    cy.get("#category").should("not.have.value", "");
    getPreviousButton().click();
    cy.get("#title").should("have.value", "changed");

    // submit the form
    getNextButton().click();
    getNextButton().click();
    cy.getSaveButton().should("not.be.disabled");
    submitForm();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      expect(response?.statusCode).to.eq(200);
      expect(body).to.have.property("id");
      expect(body).to.have.property("category");
      expect(body?.title).to.eq("changed");
      expect(body?.content).to.eq("changed");
      expect(body?.slug).to.eq("changed");
      expect(body?.status?.toLowerCase()).to.eq("draft");

      cy.getMaterialUINotification().contains(/success/i);
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });
});
