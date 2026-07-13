import { buttonExportTests } from "@refinedev/ui-tests";
import { ExportButton } from "./index";

describe("<ExportButton/>", () => {
  buttonExportTests.bind(this)(ExportButton);
});
