import { pageLoginTests } from "@refinedev/ui-tests";
import { LoginPage } from ".";

describe("Auth Page Login", () => {
  pageLoginTests.bind(this)(LoginPage);
});
