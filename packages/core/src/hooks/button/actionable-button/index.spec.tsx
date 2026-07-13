import React from "react";

import { renderHook } from "@testing-library/react";

import { TestWrapper, mockRouterProvider } from "@test";

import { useActionableButton } from ".";

const types = ["save", "export", "import"] as const;
const labels = {
  save: "Save",
  export: "Export",
  import: "Import",
};

describe("useActionableButton", () => {
  describe.each(types)("with type %s", (type) => {
    it("should return the correct label", () => {
      const { result } = renderHook(() => useActionableButton({ type }), {
        wrapper: TestWrapper({
          resources: [{ name: "posts" }],
          routerProvider: mockRouterProvider({
            resource: { name: "posts" },
          }),
        }),
      });

      expect(result.current.label).toEqual(labels[type]);
    });
  });
});
