export const getMantineNotification = () => {
  return cy.get(".mantine-Notification-description");
};

export const getMantinePopoverDeleteButton = () => {
  return cy.get(".mantine-Popover-dropdown").contains(/delete/gi);
};

export const getMantineFormItemError = ({
  id,
}: IGetChakraUIFormItemErrorParams) => {
  return cy.get(`#${id}-error`);
};

export const getMantineLoadingOverlay = () => {
  return cy.get(".mantine-LoadingOverlay-root");
};

export const fillMantineForm = () => {
  cy.fixture("mock-post").then((mockPost) => {
    cy.get("#title").clear().type(mockPost.title);
    cy.get("#content textarea").clear({ force: true }).type(mockPost.content, {
      delay: 32,
    });
    cy.get("#status").click().get("#status-0").click();
    cy.get("#categoryId").clear().get("#categoryId-1").click();
  });
};
