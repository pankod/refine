import { redirectPage } from ".";
import type { IRefineContextOptions } from "../../../contexts/refine/types";
import type { RedirectAction } from "../../../hooks/form/types";

describe("redirectPath", () => {
  it.each(["edit", "list", "show", false] as RedirectAction[])(
    "should return redirectFromProps if it is provided %s",
    (redirectFromProps) => {
      const action = "create";
      const redirectOptions: IRefineContextOptions["redirect"] = {
        afterClone: "edit",
        afterCreate: "list",
        afterEdit: "show",
      };

      const result = redirectPage({
        redirectFromProps,
        action,
        redirectOptions,
      });
      expect(result).toEqual(redirectFromProps);
    },
  );

  it.each(["edit", "create", "clone", "list"] as const)(
    "should return redirect option according to action %s",
    (action) => {
      const redirectOptions: IRefineContextOptions["redirect"] = {
        afterClone: "edit",
        afterCreate: "list",
        afterEdit: "show",
      };

      const result = redirectPage({
        action,
        redirectOptions,
      });

      switch (action) {
        case "clone":
          expect(result).toEqual(redirectOptions.afterClone);
          break;
        case "create":
          expect(result).toEqual(redirectOptions.afterCreate);
          break;
        case "edit":
          expect(result).toEqual(redirectOptions.afterEdit);
          break;
        case "list":
          expect(result).toBeFalsy();
          break;
      }
    },
  );
});
