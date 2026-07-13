import { parseSwizzleBlocks } from "./parseSwizzleBlocks";

describe("parseSwizzleBlocks", () => {
  it("should remove swizzle blocks", () => {
    const content = `
            1
            // swizzle-remove-start
            remove-this
            //swizzle-remove-end
            2
            /* swizzle-remove-start */
            remove-this-too
            /* swizzle-remove-end */
        `;

    const result = parseSwizzleBlocks(content);

    expect(result).not.toContain("remove-this");
    expect(result).not.toContain("remove-this-too");
    expect(result).toContain("1");
    expect(result).toContain("2");
    expect(result).not.toContain("swizzle-remove-start");
    expect(result).not.toContain("swizzle-remove-end");
  });
});
