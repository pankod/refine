import { handleMultiple } from ".";

describe("handleMultiple", () => {
  it("should be resolve multiple promise", () => {
    expect(
      handleMultiple([
        Promise.resolve({ data: 1 }),
        Promise.resolve({ data: 2 }),
      ]),
    ).toEqual(Promise.resolve({ data: [1, 2] }));
  });
});
