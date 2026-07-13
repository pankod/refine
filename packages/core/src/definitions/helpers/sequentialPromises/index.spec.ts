import { sequentialPromises } from ".";

describe("sequentialPromises", () => {
  it("should resolve all promises", async () => {
    const result = await sequentialPromises(
      [
        () => Promise.resolve("1"),
        () => Promise.resolve("2"),
        () => Promise.reject("3"),
      ],
      (response) => {
        return response;
      },
      (error) => {
        return error;
      },
    );
    expect(result).toEqual(["1", "2", "3"]);
  });
});
