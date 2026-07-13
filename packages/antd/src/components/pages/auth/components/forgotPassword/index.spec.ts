import { pageForgotPasswordTests } from "@refinedev/ui-tests";
import { ForgotPasswordPage } from ".";

describe("Auth Page Forgot Password", () => {
  pageForgotPasswordTests.bind(this)(ForgotPasswordPage);
});
