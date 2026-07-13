/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-save-and-continue", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "published",
    category: 1,
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
    expect(body?.category?.id.toString()).to.eq(mockPost.category.toString());
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());
  };

  const waitForLoading = () => {
    cy.contains(/loading/).should("not.exist");
    cy.get("button").contains(/save/i).should("not.be.disabled");
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
    cy.get("button").contains(/save/i).click();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should create record and continue editing", () => {
    // should return mock post when get post
    cy.fixture("posts")
      .then(() => {
        return cy.intercept("GET", "/posts/*", mockPost);
      })
      .as("getNewPost");

    cy.get("button").contains("Create Post").click();

    fillForm();
    cy.get("button")
      .contains(/continue/i)
      .click();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });

    // assert form values available in edit page
    cy.wait("@getNewPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      waitForLoading();

      // assert form values are not cleared
      cy.get("#title").should("have.value", body.title);
      cy.get("#content").should("have.value", body.content);
      cy.get("#status").should("have.value", body.status);
      cy.get("#category").should("have.value", body.category);
      cy.location().should((loc) => {
        expect(loc.pathname).to.includes("/posts/edit");
      });
    });
  });

  it("should create record and continue to add new record", () => {
    cy.get("button").contains("Create Post").click();

    fillForm();
    cy.get("button")
      .contains(/add another/i)
      .click();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);

      waitForLoading();

      // assert form values are not cleared
      cy.get("#title").should("have.value", "");
      cy.get("#content").should("have.value", "");
      cy.get("#status").should("have.value", "draft");
      cy.get("#category").should("have.value", null);
      cy.location().should((loc) => {
        expect(loc.pathname).to.includes("/posts/create");
      });
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
    cy.get("button").contains(/save/i).click();

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/posts");
      });
    });
  });

  it("should edit record and continue editing", () => {
    cy.get("button").contains(/edit/i).first().click();

    cy.wait("@getPost");
    waitForLoading();
    fillForm();

    cy.get("button")
      .contains(/continue/i)
      .click();
    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });

    waitForLoading();

    // assert form values still in form
    cy.get("#title").should("have.value", mockPost.title);
    cy.get("#content").should("have.value", mockPost.content);
    cy.get("#status").should("have.value", mockPost.status);
    cy.get("#category").should("have.value", mockPost.category);
    cy.location().should((loc) => {
      expect(loc.pathname).to.includes("/posts/edit");
    });
  });

  it("should edit record and continue to add new record", () => {
    cy.get("button").contains(/edit/i).first().click();

    cy.wait("@getPost");
    waitForLoading();
    fillForm();
    cy.get("button")
      .contains(/add another/i)
      .click();

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });

    cy.location().should((loc) => {
      expect(loc.pathname).to.includes("/posts/create");
    });
  });
});
