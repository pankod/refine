/// <reference types="cypress" />
/// <reference types="../index.d.ts" />

export const assertDocumentTitle = (resource: string, action?: IAction) => {
  switch (action) {
    case "list":
      cy.document()
        .its("title")
        .should("match", new RegExp(`^${resource} | refine$`, "i"));
      break;
    case "edit":
      cy.document()
        .its("title")
        .should("match", new RegExp(`^#\\d+ Edit ${resource} | refine$`, "i"));
      break;
    case "show":
      cy.document()
        .its("title")
        .should("match", new RegExp(`^#\\d+ Show ${resource} | refine$`, "i"));
      break;
    case "create":
      cy.document()
        .its("title")
        .should("match", new RegExp(`^Create new ${resource} | refine$`, "i"));
      break;
    case "clone":
      cy.document()
        .its("title")
        .should("match", new RegExp(`^#\\d+ Clone ${resource} | refine$`, "i"));
      break;
    default:
      cy.document().its("title").should("eq", "refine");
      break;
  }
};
