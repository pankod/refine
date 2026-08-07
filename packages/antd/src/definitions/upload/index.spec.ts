import { vi } from "vitest";
import { getValueFromEvent } from "./index";

describe("definitions/upload", () => {
  const file = new File([new ArrayBuffer(1)], "file.jpg");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getValueFromEvent", async () => {
    const fileList = getValueFromEvent({
      file: {
        ...file,
        uid: "test1",
      },
      fileList: [
        {
          ...file,
          uid: "test2",
        },
      ],
    });

    expect(fileList).toMatchInlineSnapshot(`
            [
              {
                "uid": "test2",
              },
            ]
        `);
  });
});
