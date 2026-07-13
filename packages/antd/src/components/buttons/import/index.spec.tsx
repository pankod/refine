import { buttonImportTests } from "@refinedev/ui-tests";

import { ImportButton } from "./index";

describe("<ImportButton /> usage with useImport", () => {
  buttonImportTests.bind(this)(ImportButton);
});
