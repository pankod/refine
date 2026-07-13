import type { IResourceItem } from "@refinedev/core";
import { translatePrettyString } from ".";
import type { InferField } from "@/types";

describe("translatePrettyString", () => {
  const resource: IResourceItem = {
    name: "posts",
  };
  const field: InferField = {
    key: "title",
    type: "text",
  };
  describe("with i18n", () => {
    it("should return without braces", () => {
      expect(
        translatePrettyString({
          resource,
          field,
          i18n: true,
          noBraces: true,
        }),
      ).toBe('translate("posts.fields.title")');
    });

    it("should return with braces", () => {
      expect(
        translatePrettyString({
          resource,
          field,
          i18n: true,
        }),
      ).toBe('{translate("posts.fields.title")}');
    });
  });
  describe("without i18n", () => {
    it("should return without quotes", () => {
      expect(
        translatePrettyString({
          resource,
          field,
          i18n: false,
          noQuotes: true,
        }),
      ).toBe("Title");
    });

    it("should return with quotes", () => {
      expect(
        translatePrettyString({
          resource,
          field,
          i18n: false,
        }),
      ).toBe('"Title"');
    });
  });
});
