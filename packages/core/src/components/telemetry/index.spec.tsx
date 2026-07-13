import React from "react";
import { vi } from "vitest";
import { render, TestWrapper } from "@test";
import * as UseTelemetryData from "../../hooks/useTelemetryData";

import { Telemetry } from "./index";

describe("Telemetry", () => {
  const originalImage = global.Image;
  const originalFetch = global.fetch;

  const imageMock = vi.fn();
  global.Image = imageMock;

  const fetchMock = vi.fn();
  global.fetch = fetchMock;

  beforeEach(() => {
    global.Image = imageMock;
    global.fetch = fetchMock;

    vi.spyOn(UseTelemetryData, "useTelemetryData").mockReturnValue({
      providers: {},
      version: "1",
      resourceCount: 1,
    });
  });

  afterEach(() => {
    imageMock.mockClear();
    fetchMock.mockClear();
  });

  afterAll(() => {
    global.Image = originalImage;
    global.fetch = originalFetch;
  });

  it("should not crash", async () => {
    const { container } = render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(container).toBeTruthy();

    expect(imageMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should encode payload", async () => {
    const imageMockInstance = {} as any;

    imageMock.mockImplementation(() => imageMockInstance);

    render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(imageMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).not.toHaveBeenCalled();

    expect(imageMockInstance.src).toBe(
      "https://telemetry.refine.dev/telemetry?payload=eyJwcm92aWRlcnMiOnt9LCJ2ZXJzaW9uIjoiMSIsInJlc291cmNlQ291bnQiOjF9",
    );
  });

  it("should use fetch when image is undefined", async () => {
    global.Image = undefined as any;

    render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(imageMock).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("should encode payload when using fetch", async () => {
    global.Image = undefined as any;

    render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(imageMock).not.toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledTimes(1);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://telemetry.refine.dev/telemetry?payload=eyJwcm92aWRlcnMiOnt9LCJ2ZXJzaW9uIjoiMSIsInJlc291cmNlQ291bnQiOjF9",
    );
  });

  it("should not call endpoints if encoding fails", async () => {
    const originalBtoa = global.btoa;

    global.btoa = () => {
      throw new Error("error");
    };

    render(<Telemetry />, {
      wrapper: TestWrapper({}),
    });

    expect(imageMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();

    global.btoa = originalBtoa;
  });
});
