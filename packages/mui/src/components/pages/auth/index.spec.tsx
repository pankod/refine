import { authPageTests } from "@refinedev/ui-tests";
import { AuthPage } from ".";

describe("Auth Page", () => {
  authPageTests.bind(this)(AuthPage);
});
