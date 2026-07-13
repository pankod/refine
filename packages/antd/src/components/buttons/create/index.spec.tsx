import { buttonCreateTests } from "@refinedev/ui-tests";

import { CreateButton } from "./";

describe("Create Button", () => {
  buttonCreateTests.bind(this)(CreateButton);
});
