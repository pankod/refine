import type { IResourceItem } from "@refinedev/core";
import { translateActionTitle } from ".";
import { prettyString } from "../pretty-string";
import { toSingular } from "../to-singular";
import { toPlural } from "../to-plural";

describe("translateActionTitle", () => {
  const resource: IResourceItem = {
    name: "posts",
  };
  it.each(["list", "create", "edit", "show"] as const)(
    "action %s, with i18n",
    async (action) => {
      expect(
        translateActionTitle({
          resource,
          action,
          i18n: true,
        }),
      ).toBe(`{translate("${resource.name}.titles.${action}")}`);
    },
  );
  it.each(["list", "create", "edit", "show"] as const)(
    "action %s, with i18n and no braces",
    async (action) => {
      expect(
        translateActionTitle({
          resource,
          action,
          i18n: true,
          noBraces: true,
        }),
      ).toBe(`translate("${resource.name}.titles.${action}")`);
    },
  );
  it.each(["create", "edit", "show"] as const)(
    "action %s, without i18n",
    async (action) => {
      expect(
        translateActionTitle({
          resource,
          action,
          i18n: false,
        }),
      ).toBe(
        `${prettyString(toSingular(resource.name))} ${prettyString(action)}`,
      );
    },
  );
  it("action list, without i18n", async () => {
    expect(
      translateActionTitle({
        resource,
        action: "list",
        i18n: false,
      }),
    ).toBe(prettyString(toPlural(resource?.meta?.label ?? resource.name)));
  });
});
