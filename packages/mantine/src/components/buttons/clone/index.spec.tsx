import { buttonCloneTests } from "@refinedev/ui-tests";

import { CloneButton } from "./";

describe("Clone Button", () => {
  buttonCloneTests.bind(this)(CloneButton);
});
