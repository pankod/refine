import { translateButtonTitle } from ".";
import { prettyString } from "../pretty-string";

describe("translateButtonTitle", () => {
  it.each(["list", "create", "edit", "show", "save", "delete"] as const)(
    "action %s, with i18n",
    async (action) => {
      expect(
        translateButtonTitle({
          action,
          i18n: true,
        }),
      ).toBe(`{translate("buttons.${action}")}`);
    },
  );

  it.each(["list", "create", "edit", "show", "save", "delete"] as const)(
    "action %s, without i18n",
    async (action) => {
      expect(
        translateButtonTitle({
          action,
          i18n: false,
        }),
      ).toBe(`"${prettyString(action)}"`);
    },
  );
  it.each(["list", "create", "edit", "show", "save", "delete"] as const)(
    "action %s, without i18n and quotes",
    async (action) => {
      expect(
        translateButtonTitle({
          action,
          i18n: false,
          noQuotes: true,
        }),
      ).toBe(`${prettyString(action)}`);
    },
  );
});
