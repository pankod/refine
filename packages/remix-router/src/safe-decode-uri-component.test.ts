import { safeDecodeURIComponent } from "./safe-decode-uri-component";

describe("safeDecodeURIComponent", () => {
  it("decodes valid encoded values", () => {
    expect(safeDecodeURIComponent("posts%2F123")).toBe("posts/123");
  });

  it("returns the original value when encoded value is malformed", () => {
    expect(safeDecodeURIComponent("%E0%A4%A")).toBe("%E0%A4%A");
  });
});
