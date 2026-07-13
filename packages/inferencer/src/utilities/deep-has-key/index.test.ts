import { deepHasKey } from ".";

describe("deepHasKey", () => {
  it.each([
    [
      [
        {
          1: {
            2: {
              3: "foo",
            },
          },
        },
      ],
      ["3"],
      true,
    ],
    [{ a: { b: { foo: "bar" } } }, ["foo"], true],
    [{ a: { b: { foo: "bar" } } }, ["c"], false],
    [
      { a: { b: { foo: "bar", arr: [1, 2, 3, 4, 5, { c: "c" }] } } },
      ["c"],
      true,
    ],
    [
      {
        meta: {
          getList: {
            gqlQuery: "gql { foo }",
          },
        },
      },
      ["gqlQuery"],
      true,
    ],
  ])("should return %p for %p and %s", (obj, keys, result) => {
    expect(deepHasKey(obj, keys)).toEqual(result);
  });
});
