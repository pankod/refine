import { buttonDeleteTests } from "@refinedev/ui-tests";
import { DeleteButton } from "./";

describe("Delete Button", () => {
  buttonDeleteTests.bind(this)(DeleteButton);
});
