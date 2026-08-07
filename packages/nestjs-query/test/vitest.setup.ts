import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { TextEncoder, TextDecoder } from "util";
import nock from "nock";

global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

// nock.recorder.rec();

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
