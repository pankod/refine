import { transformErrorMessages } from "../../src/utils";

describe("transformErrorMessages", () => {
  it("should transform error messages", () => {
    const errorMessages = [
      {
        path: ["title"],
        message: "title must be at most 5 characters",
        name: "ValidatorError",
      },
      {
        path: ["slug"],
        message: "This attribute must be unique",
        name: "ValidatorError",
      },
      {
        path: ["status"],
        message:
          'status must be a `string` type, but the final value was: `[\n  "\\"draft\\""\n]`.',
        name: "ValidatorError",
      },
      {
        path: ["status"],
        message:
          "status must be one of the following values: draft, rejected, approved",
        name: "ValidatorError",
      },
    ];

    expect(transformErrorMessages(errorMessages)).toEqual({
      title: ["title must be at most 5 characters"],
      slug: ["This attribute must be unique"],
      status: [
        'status must be a `string` type, but the final value was: `[\n  "\\"draft\\""\n]`.',
        "status must be one of the following values: draft, rejected, approved",
      ],
    });
  });

  it("should not throw an error with an empty array", () => {
    const errorMessages: any = [];

    const expectedOutput = {};

    expect(transformErrorMessages(errorMessages)).toEqual(expectedOutput);
  });
});
