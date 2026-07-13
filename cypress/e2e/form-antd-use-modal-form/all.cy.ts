/// <reference types="cypress" />
/// <reference types="../../cypress/support" />

describe("form-antd-use-modal-form", () => {
  const mockPost = {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    content:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    status: "Published",
  };

  const openModal = () => {
    return cy.getCreateButton().click();
  };

  const closeModal = () => {
    return cy
      .get(".ant-modal-footer > .ant-btn")
      .contains(/cancel/gi)
      .click();
  };

  const isModalVisible = () => {
    return cy.get(".ant-modal-content").should("be.visible");
  };

  const isModalNotVisible = () => {
    return cy.get(".ant-modal-content").should("not.be.visible");
  };

  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.visit("/");
  });

  it("should open and close modal", () => {
    openModal();
    isModalVisible();
    // by X button
    cy.get(".ant-modal-close").click({ multiple: true, force: true });
    isModalNotVisible();

    openModal();
    isModalVisible();
    closeModal();
    isModalNotVisible();
  });

  it("should create a new record", () => {
    openModal();

    cy.get("#title").type(mockPost.title);
    cy.setAntdSelect({ id: "status", value: mockPost.status });
    cy.get(".ant-modal-footer > .ant-btn-primary").eq(0).click({ force: true });

    cy.wait("@postPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      expect(response?.statusCode).to.eq(200);
      expect(body?.title).to.eq(mockPost.title);
      expect(body?.status?.toLowerCase()).to.eq(mockPost.status.toLowerCase());
      isModalNotVisible();
      cy.getAntdNotification().should("contain", "Success");
    });
  });

  it("should edit a record", () => {
    cy.getEditButton().first().click();

    // assert response values are equal to the form values
    cy.wait("@getPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      // wait loading state and render to be finished
      isModalVisible();
      cy.getAntdLoadingOverlay().should("not.exist");

      cy.get("#title.ant-input").eq(1).should("have.value", body?.title);
      cy.get("input#status")
        .get(".ant-select-selection-item")
        .should(
          "contain",
          body?.status[0].toUpperCase() + body?.status.slice(1),
        );
    });

    cy.get("#title.ant-input")
      .eq(1)
      .clear({
        force: true,
      })
      .type(mockPost.title, { force: true });
    cy.get("input#status")
      .eq(1)
      .click({ force: true })
      .get(`.ant-select-item[title="${mockPost.status}"]`)
      .click({ force: true });
    cy.get(".ant-modal-footer > .ant-btn-primary")
      .eq(1)
      .should("not.be.disabled")
      .click({ force: true });

    cy.wait("@patchPost").then((interception) => {
      const response = interception?.response;
      const body = response?.body;

      expect(response?.statusCode).to.eq(200);
      expect(body?.title).to.eq(mockPost.title);
      expect(body?.status?.toLowerCase()).to.eq(mockPost.status.toLowerCase());
      isModalNotVisible();
      cy.getAntdNotification().should("contain", "Success");
    });
  });

  it("should create form sync with location", () => {
    cy.wait("@getPosts");

    openModal();
    isModalVisible();
    cy.location("search").should("include", "modal-posts-create[open]=true");

    cy.reload();
    isModalVisible();
    cy.location("search").should("include", "modal-posts-create[open]=true");
  });

  it("should edit form sync with location", () => {
    cy.wait("@getPosts");

    cy.getEditButton().first().click();
    cy.wait("@getPost");

    isModalVisible();
    cy.location("search").should("include", "modal-posts-edit[open]=true");
    cy.location("search").should("include", "modal-posts-edit[id]");

    cy.reload();
    isModalVisible();
    cy.location("search").should("include", "modal-posts-edit[open]=true");
    cy.location("search").should("include", "modal-posts-edit[id]");
  });
});
