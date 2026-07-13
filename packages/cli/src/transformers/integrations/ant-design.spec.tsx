import type { FileInfo } from "jscodeshift";
import transform from "./ant-design";
import { VITE_STARTER_SOURCE } from "./fixtures/vite-starter";

import jscodeshift from "jscodeshift";
import { BASE_HEADLESS_SOURCE } from "./fixtures/ant-design/base-headless";
import { WITH_EXISTING_ANT_DESIGN_SETUP_SOURCE } from "./fixtures/ant-design/with-existing-ant-design-setup";

describe("ant-design transformer", () => {
  const cases = [
    VITE_STARTER_SOURCE,
    BASE_HEADLESS_SOURCE,
    WITH_EXISTING_ANT_DESIGN_SETUP_SOURCE,
  ];

  it.each(cases)(
    "should transform the file\n----------------------------------------------------\n%s\n----------------------------------------------------",
    async (source) => {
      const fileInfo: FileInfo = {
        path: "App.tsx",
        source,
      };

      const result = await transform(fileInfo, {
        jscodeshift,
        j: jscodeshift,
        stats: () => {
          // do nothing
        },
        report: () => {
          // do nothing
        },
      });

      expect(result?.trim()).toMatchSnapshot();
    },
  );
});
