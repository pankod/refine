import { vi, afterAll } from "vitest";
import nock from "nock";
import axios from "axios";

// Fix for TextEncoder/TextDecoder in Node.js environment
if (typeof globalThis.TextEncoder === "undefined") {
  globalThis.TextEncoder = require("util").TextEncoder;
}
if (typeof globalThis.TextDecoder === "undefined") {
  globalThis.TextDecoder = require("util").TextDecoder;
}

axios.defaults.adapter = "http";

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
