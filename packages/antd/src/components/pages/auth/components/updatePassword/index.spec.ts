import { pageUpdatePasswordTests } from "@refinedev/ui-tests";
import { UpdatePasswordPage } from ".";

describe("Auth Page Update Password", () => {
  pageUpdatePasswordTests.bind(this)(UpdatePasswordPage);
});
