import type { CrudFilter } from "@refinedev/core";
import { replaceIdWithAppwriteId } from "../../src/utils/replaceIdWithAppwriteId";

describe("replaceIdWithAppwriteId", () => {
  it("should replace the id with appwrite id", () => {
    const result = replaceIdWithAppwriteId({
      field: "id",
      operator: "eq",
      value: "John Doe",
    } satisfies CrudFilter);
    expect(result).toStrictEqual({
      field: "$id",
      operator: "eq",
      value: "John Doe",
    });
  });

  it("should only replace the first layer of id with appwrite id", () => {
    const result = replaceIdWithAppwriteId({
      field: "id",
      operator: "eq",
      value: [
        {
          field: "id",
          operator: "eq",
          value: "John Doe",
        },
      ],
    } satisfies CrudFilter);
    expect(result).toStrictEqual({
      field: "$id",
      operator: "eq",
      value: [
        {
          field: "id",
          operator: "eq",
          value: "John Doe",
        },
      ],
    });
  });

  it("should not replace the other field value with appwrite id", () => {
    const result = replaceIdWithAppwriteId({
      field: "name",
      operator: "eq",
      value: "John Doe",
    } satisfies CrudFilter);
    expect(result).toStrictEqual({
      field: "name",
      operator: "eq",
      value: "John Doe",
    });
  });
});
