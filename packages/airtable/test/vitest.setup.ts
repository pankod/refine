import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { TextEncoder, TextDecoder } from "util";
import fetch from "node-fetch";
import nock from "nock";

global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// @ts-ignore
global.fetch = window.fetch = fetch;
// @ts-ignore
global.Request = window.Request = fetch.Request;
// @ts-ignore
global.Response = window.Response = fetch.Response;

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
