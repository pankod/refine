import type { FileInfo } from "jscodeshift";
import transform from "./react-router";
import { VITE_STARTER_SOURCE } from "./fixtures/vite-starter";

import jscodeshift from "jscodeshift";
import { WITH_COMPONENT_IMPORTS_SOURCE } from "./fixtures/react-router/with-component-imports";
import { WITH_EXISTING_REACT_ROUTER_SETUP_SOURCE } from "./fixtures/react-router/with-existing-react-router-setup";

describe("react-router transformer", () => {
  const cases = [
    VITE_STARTER_SOURCE,
    WITH_COMPONENT_IMPORTS_SOURCE,
    WITH_EXISTING_REACT_ROUTER_SETUP_SOURCE,
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
