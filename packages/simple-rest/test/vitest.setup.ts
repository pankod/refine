import nock from "nock";
import axios from "axios";
import { vi } from "vitest";

// Import all mock files to register nock interceptors
import "./create/index.mock";
import "./custom/index.mock";
import "./deleteOne/index.mock";
import "./getList/index.mock";
import "./getOne/index.mock";
import "./update/index.mock";

// Configure nock for Vitest environment
nock.disableNetConnect();

// Configure axios for nock compatibility
axios.defaults.adapter = "http";
axios.defaults.timeout = 10000;

// Set up nock before tests
beforeAll(() => {
  if (!nock.isActive()) {
    nock.activate();
  }
});

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
