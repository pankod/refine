import { mockRouterProvider } from "@test/index";

import { checkRouterPropMisuse } from ".";

describe("checkRouterPropMisuse", () => {
  it("should return false when pass routerProvider", () => {
    expect(checkRouterPropMisuse(mockRouterProvider())).toBeFalsy();
  });
});
