import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { TextEncoder, TextDecoder } from "util";
import nock from "nock";
import axios from "axios";

global.TextEncoder = TextEncoder;
// @ts-ignore
global.TextDecoder = TextDecoder;

axios.defaults.adapter = "http";

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
