import { vi } from "vitest";
import { file2Base64 } from "./index";

class FileReaderMock {
  DONE = FileReader.DONE;
  EMPTY = FileReader.EMPTY;
  LOADING = FileReader.LOADING;
  readyState = 0;
  error: FileReader["error"] = null;
  result: FileReader["result"] = null;
  abort = vi.fn();
  addEventListener = vi.fn();
  dispatchEvent = vi.fn();
  onabort = vi.fn();
  onerror = vi.fn();
  onload = vi.fn();
  onloadend = vi.fn();
  onloadprogress = vi.fn();
  onloadstart = vi.fn();
  onprogress = vi.fn();
  readAsArrayBuffer = vi.fn();
  readAsBinaryString = vi.fn();
  readAsDataURL = vi.fn();
  readAsText = vi.fn();
  removeEventListener = vi.fn();
}

describe("definitions/upload", () => {
  const file = new File([new ArrayBuffer(1)], "file.jpg");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("file2Base64 success", async () => {
    const fileReader = new FileReaderMock();
    vi.spyOn(window, "FileReader").mockImplementation(
      () => fileReader as FileReader,
    );

    fileReader.result = "file content";
    fileReader.addEventListener.mockImplementation((_, fn) => fn());

    const content = await file2Base64({ ...file, uid: "uid" });

    expect(content).toBe("file content");
  });
});
