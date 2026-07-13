import { buttonSaveTests } from "@refinedev/ui-tests";
import { SaveButton } from "./";

describe("Save Button", () => {
  buttonSaveTests.bind(this)(SaveButton);
});
