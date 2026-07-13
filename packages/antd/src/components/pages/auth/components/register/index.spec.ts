import { pageRegisterTests } from "@refinedev/ui-tests";
import { RegisterPage } from ".";

describe("Auth Page Register", () => {
  pageRegisterTests.bind(this)(RegisterPage);
});
