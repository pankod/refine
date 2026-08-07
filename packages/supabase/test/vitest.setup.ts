import nock from "nock";
import { afterAll } from "vitest";

// nock.recorder.rec();

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
