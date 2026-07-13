import { transformErrorMessages } from "../../src/utils";

describe("transformErrorMessages", () => {
  it("should transform error messages", () => {
    const errorMessages = [
      "title should not be empty",
      "status must be a valid enum value",
      "status should not be empty",
    ];

    expect(transformErrorMessages(errorMessages)).toEqual({
      title: ["title should not be empty"],
      status: [
        "status must be a valid enum value",
        "status should not be empty",
      ],
    });
  });
});
