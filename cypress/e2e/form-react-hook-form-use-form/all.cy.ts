/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-react-hook-form-use-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "published",
    category: "1",
  };

  const fillForm = () => {
    cy.get("#title").clear();
    cy.get("#title").type(mockPost.title);
    cy.get("#content").clear();
    cy.get("#content").type(mockPost.content);
    cy.get("#status").select(mockPost.status);
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
    return cy.get('[type="submit"]').click();
  };

  const waitForLoading = () => {
    cy.contains(/loading/).should("not.exist");
    cy.get('[type="submit"]').should("not.be.disabled");
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

      expect(response?.statusCode).to.eq(200);
      // assert form values are filled with record data
      waitForLoading();
      cy.get("#title").should("have.value", body?.title);
      cy.get("#content").should("have.value", body?.content);
      cy.get("#status").should("have.value", body?.status);
      cy.get("#category").should("have.value", body?.category?.id);
    });

    fillForm();
    submitForm();

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should create form render errors", () => {
    cy.get("button").contains("Create Post").click();

    submitForm();

    cy.get("#title-error").contains(/required/gi);
    cy.get("#content-error").contains(/required/gi);
    cy.get("#category-error").contains(/required/gi);

    fillForm();

    cy.get("#title-error").should("not.exist");
    cy.get("#content-error").should("not.exist");
    cy.get("#category-error").should("not.exist");
  });

  it("should edit form render errors", () => {
    cy.get("button").contains(/edit/i).first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitForLoading();

    cy.get("#title").should("not.have.value", "").clear();
    cy.get("#content").should("not.have.value", "").clear();
    cy.get("#status").should("not.have.value", "").select([]);
    cy.get("#category").should("not.have.value", "").select([]);

    submitForm();

    cy.get("#title-error").contains(/required/gi);
    cy.get("#content-error").contains(/required/gi);
    cy.get("#category-error").contains(/required/gi);

    fillForm();

    cy.get("#title-error").should("not.exist");
    cy.get("#content-error").should("not.exist");
    cy.get("#category-error").should("not.exist");
  });

  it("should create form warn when unsaved changes", () => {
    cy.wait("@getPosts");
    cy.get("button").contains("Create Post").click();
    cy.get("#title").type("any value");
    cy.contains(/cancel/i).click();
    cy.on("window:confirm", (str) => {
      expect(str).to.includes("You have unsaved changes");
    });
  });

  it("should edit form warn when unsaved changes", () => {
    cy.wait("@getPosts");
    cy.get("button").contains(/edit/i).first().click();

    // wait loading state and render to be finished
    cy.wait("@getPost");
    waitForLoading();

    cy.get("#title").clear();
    cy.get("#title").type("any value");
    cy.contains(/cancel/i).click();
    cy.on("window:confirm", (str) => {
      expect(str).to.includes("You have unsaved changes");
    });
  });
});
