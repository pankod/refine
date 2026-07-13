import { getFieldableKeys } from ".";

describe("getFieldableKeys", () => {
  it("should return `name`", () => {
    expect(getFieldableKeys("user", { name: "John" })).toBe("name");
  });

  it("should return `url` for image like fields", () => {
    expect(
      getFieldableKeys("image", {
        name: "My Image",
        url: "https://example.com",
      }),
    ).toBe("url");
  });

  it("should return `firstName`", () => {
    expect(
      getFieldableKeys("user", {
        firstName: "John",
        description: "A user",
      }),
    ).toEqual("firstName");
  });

  it("should return `[firstName, lastName]` if `lastName` present", () => {
    expect(
      getFieldableKeys("user", {
        firstName: "John",
        lastName: "Doe",
        description: "A user",
      }),
    ).toEqual(["firstName", "lastName"]);
  });

  it("should return `team_name`", () => {
    expect(
      getFieldableKeys("team", {
        id: "1",
        team_name: "Refine",
        description: "A team",
      }),
    ).toEqual("team_name");
  });
});
