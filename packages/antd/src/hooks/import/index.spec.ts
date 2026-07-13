import type { RcFile, UploadFile } from "antd/lib/upload/interface";
import { act } from "react-dom/test-utils";
import { notification } from "antd";
import { renderHook } from "@testing-library/react";
import { TestWrapper, MockJSONServer, waitFor } from "@test";
import { vi } from "vitest";

import { useImport } from ".";

const file = new File(
  [
    `"id","title","createdAt","updatedAt"
"35ad97dd-9379-480a-b6ac-6fc9c13e9224","Viral Strategist Local","2021-04-09T12:03:23.933Z","2021-04-09T12:03:23.933Z"
"9a428977-1b03-4c3e-8cdd-1e4e2813528a","Concrete Soap Neural","2021-04-09T12:03:23.835Z","2021-04-09T12:03:23.835Z"
"1a428977-1b03-4c3e-8cdd-1e4e281e9224","Strategist Soap Viral","2021-03-09T12:12:23.933Z","2021-03-09T12:12:23.933Z"`,
  ],
  "data.csv",
  { type: "text/csv" },
);

describe("useImport hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const notificationOpenSpy = vi.spyOn(notification, "open");
  const notificationCloseSpy = vi.spyOn(notification, "destroy");

  it("should return false from uploadProps.beforeUpload callback", async () => {
    const { result } = renderHook(
      () =>
        useImport({
          resource: "tests",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    const beforeUploadResult = result.current.uploadProps.beforeUpload?.(
      file as unknown as RcFile,
      [],
    );

    expect(beforeUploadResult).toBe(false);
  });

  it("should open notification", async () => {
    const { result } = renderHook(
      () =>
        useImport({
          batchSize: 1,
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({
          dataProvider: MockJSONServer,
          resources: [{ name: "posts" }],
        }),
      },
    );

    await act(async () => {
      await result.current.uploadProps.onChange?.({
        fileList: [],
        file: file as unknown as UploadFile,
      });
    });

    await waitFor(() => {
      expect(notificationOpenSpy).toHaveBeenCalled();
      expect(notificationCloseSpy).toHaveBeenCalled();
    });
  });
});
