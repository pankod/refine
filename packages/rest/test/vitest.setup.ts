import nock from "nock";
import { afterEach, afterAll, vi } from "vitest";

// nock.recorder.rec({ use_separator: false });

let storage: Record<string, any> = {};

global.localStorage = {
  getItem: vi.fn((key: string) => storage[key]),
  setItem: vi.fn((key: string, value: string) => {
    storage[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete storage[key];
  }),
  clear: vi.fn(() => {
    storage = {};
  }),
  key: vi.fn(),
  length: Object.keys(storage).length,
};

afterEach(() => {
  storage = {};
});

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
