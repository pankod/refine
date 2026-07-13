import { vi } from "vitest";
import { ENV } from "@utils/env";
import * as notifier from "./index";
import * as utilz from "./utils";

const { store, shouldUpdatePackagesCache } = notifier;

const { isPackagesCacheExpired, isUpdateNotifierDisabled } = utilz;

describe("update notifier", () => {
  test.each([
    {
      isExpired: true,
      isKeyValid: true,
      output: true,
    },
    {
      isExpired: true,
      isKeyValid: false,
      output: true,
    },
    {
      isExpired: false,
      isKeyValid: false,
      output: true,
    },
    {
      isExpired: false,
      isKeyValid: true,
      output: false,
    },
    {
      isExpired: false,
      isKeyValid: null,
      output: null,
    },
    {
      isExpired: true,
      isKeyValid: null,
      output: null,
    },
  ])("handle should update packages cache %s", async (testCase) => {
    vi.spyOn(utilz, "isPackagesCacheExpired").mockReturnValueOnce(
      testCase.isExpired,
    );

    vi.spyOn(utilz, "validateKey").mockResolvedValue(testCase.isKeyValid);

    const shouldUpdate = await shouldUpdatePackagesCache();
    expect(shouldUpdate).toBe(testCase.output);
  });

  test.each([
    {
      lastUpdated: 1,
      now: 2,
      cacheTTL: "1",
      output: true,
    },
    {
      lastUpdated: 1,
      now: 2,
      cacheTTL: "2",
      output: false,
    },
    {
      lastUpdated: 1,
      now: 2,
      cacheTTL: "1",
      output: true,
    },
  ])("handle package cache is expired %s", (testCase) => {
    ENV.UPDATE_NOTIFIER_CACHE_TTL = testCase.cacheTTL;
    Date.now = vi.fn(() => testCase.now);
    store.get = vi.fn(() => testCase.lastUpdated);

    expect(isPackagesCacheExpired()).toBe(testCase.output);
  });

  test("when store is undefined, should return true", () => {
    store.get = vi.fn(() => undefined);
    expect(isPackagesCacheExpired()).toBe(true);
  });

  test("when store is null, should return true", () => {
    store.get = vi.fn(() => null);
    expect(isPackagesCacheExpired()).toBe(true);
  });

  test("when store is 0, should return true", () => {
    store.get = vi.fn(() => 0);
    expect(isPackagesCacheExpired()).toBe(true);
  });

  test("Update notifier should not run if env.UPDATE_NOTIFIER_IS_DISABLED is true", () => {
    ENV.UPDATE_NOTIFIER_IS_DISABLED = "true";
    expect(isUpdateNotifierDisabled()).toBe(true);

    ENV.UPDATE_NOTIFIER_IS_DISABLED = "TRUE";
    expect(isUpdateNotifierDisabled()).toBe(true);

    ENV.UPDATE_NOTIFIER_IS_DISABLED = "false";
    expect(isUpdateNotifierDisabled()).toBe(false);

    ENV.UPDATE_NOTIFIER_IS_DISABLED = "1";
    expect(isUpdateNotifierDisabled()).toBe(false);

    ENV.UPDATE_NOTIFIER_IS_DISABLED = "0";
    expect(isUpdateNotifierDisabled()).toBe(false);
  });
});
