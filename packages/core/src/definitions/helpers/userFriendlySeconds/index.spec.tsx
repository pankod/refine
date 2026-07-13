import { userFriendlySecond } from "@definitions";

describe("userFriendlySecond Helper", () => {
  it("converts milliseconds to seconds correctly", async () => {
    const miliseconds = 5000;

    const seconds = userFriendlySecond(miliseconds);

    expect(seconds).toBe(5);
  });
});
