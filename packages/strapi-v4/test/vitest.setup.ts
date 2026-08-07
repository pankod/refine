import nock from "nock";
import axios from "axios";

axios.defaults.adapter = "http";

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
