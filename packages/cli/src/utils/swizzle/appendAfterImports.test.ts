import { appendAfterImports } from "./appendAfterImports";

describe("appendAfterImports", () => {
  it("should append after imports", () => {
    const content = `
import { foo } from "bar";
import { bar } from "foo";
import { baz } from "baz";
`;

    const append = `console.log("hello world");`;

    const result = appendAfterImports(content, append);

    expect(result).toEqual(`
import { foo } from "bar";
import { bar } from "foo";
import { baz } from "baz";
console.log("hello world");

`);
  });
});
