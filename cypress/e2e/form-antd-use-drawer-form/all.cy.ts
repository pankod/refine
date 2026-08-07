/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-use-drawer-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    status: "Published",
  };

  const openDrawer = () => {
    return cy.getCreateButton().click();
  };

  const closeDrawer = () => {
    return cy.get(".ant-drawer-close").eq(0).click();
  };

  const isDrawerVisible = () => {
    return cy.get(".ant-drawer-content").should("be.visible");
  };

  const isDrawerNotVisible = () => {
    return cy.get(".ant-drawer-content").should("not.be.visible");
  };

  const assertSuccessResponse = (response: any) => {
    const body = response?.body;

    expect(response?.statusCode).to.eq(200);
    expect(body?.title).to.eq(mockPost.title);
    expect(body?.status?.toLowerCase()).to.eq(mockPost?.status?.toLowerCase());
    isDrawerNotVisible();
    cy.getAntdNotification().should("contain", "Success");
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should open and close drawer", () => {
    openDrawer();
    isDrawerVisible();
    closeDrawer();
    isDrawerNotVisible();

    openDrawer();
    isDrawerVisible();
    // outside click
    cy.get(".ant-drawer-mask").click({ force: true });
    isDrawerNotVisible();
  });

  it("should create a new record", () => {
    openDrawer();
    cy.get("#title").type(mockPost.title);
    cy.setAntdSelect({ id: "status", value: mockPost.status });
    cy.getSaveButton().eq(0).click();

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should edit a record", () => {
    cy.getEditButton().first().click();

    // assert response values are equal to the form values
    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      // wait loading state and render to be finished
      isDrawerVisible();
      cy.getSaveButton().should("not.be.disabled");
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.get("#title.ant-input").eq(1).should("have.value", body?.title);
      cy.get("input#status")
        .get(".ant-select-selection-item")
        .should(
          "contain",
          body?.status[0].toUpperCase() + body?.status.slice(1),
        );
    });

    cy.get("#title.ant-input").eq(1).clear();
    cy.get("#title.ant-input").eq(1).type(mockPost.title);
    cy.get("input#status")
      .eq(1)
      .click({ force: true })
      .get(`.ant-select-item[title="Published"]`)
      .click({ force: true })
      .get("input#status")
      .eq(1)
      .blur();
    cy.getSaveButton().eq(1).click();

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      assertSuccessResponse(response);
    });
  });

  it("should create form sync with location", () => {
    cy.wait("@getPosts");

    openDrawer();
    isDrawerVisible();
    cy.location("search").should("include", "drawer-posts-create[open]=true");

    cy.reload();
    isDrawerVisible();
    cy.location("search").should("include", "drawer-posts-create[open]=true");
  });

  it("should edit form sync with location", () => {
    cy.wait("@getPosts");

    cy.getEditButton().first().click();
    cy.wait("@getPost");

    isDrawerVisible();
    cy.location("search").should("include", "drawer-posts-edit[open]=true");
    cy.location("search").should("include", "drawer-posts-edit[id]");

    cy.reload();
    isDrawerVisible();
    cy.location("search").should("include", "drawer-posts-edit[open]=true");
    cy.location("search").should("include", "drawer-posts-edit[id]");
  });
});
