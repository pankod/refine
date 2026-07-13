import { buttonListTests } from "@refinedev/ui-tests";
import { ListButton } from "./";

describe("List Button", () => {
  buttonListTests.bind(this)(ListButton);
});
