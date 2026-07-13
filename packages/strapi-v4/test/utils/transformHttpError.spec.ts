import type { HttpError } from "@refinedev/core";
import { transformHttpError } from "../../src/utils/transformHttpError";
import { vi } from "vitest";

vi.mock("../../src/utils/transformErrorMessages", () => ({
  transformErrorMessages: vi.fn(),
}));

import { transformErrorMessages } from "../../src/utils/transformErrorMessages";

describe("transformHttpError", () => {
  it("should transform an error object", () => {
    vi.mocked(transformErrorMessages).mockReturnValueOnce({
      email: ["Email is required"],
    });

    const mockError = {
      response: {
        data: {
          error: {
            message: "Something went wrong",
            status: 400,
            details: {
              errors: [
                {
                  path: ["email"],
                  message: "Email is required",
                  name: "ValidationError",
                },
              ],
            },
          },
        },
      },
    };

    const expectedHttpError: HttpError = {
      statusCode: 400,
      message: "Something went wrong",
      errors: {
        email: ["Email is required"],
      },
    };

    expect(transformHttpError(mockError)).toEqual(expectedHttpError);
  });

  it("should handle undefined values", () => {
    vi.mocked(transformErrorMessages).mockReturnValueOnce({});

    const mockError = {
      response: {
        data: {
          error: {
            message: undefined,
            status: undefined,
            details: {},
          },
        },
      },
    };

    const expectedHttpError = {
      statusCode: undefined,
      message: undefined,
      errors: {},
    };

    expect(transformHttpError(mockError)).toEqual(expectedHttpError);
  });
});
