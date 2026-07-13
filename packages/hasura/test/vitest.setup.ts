import nock from "nock";

// it's actually sending request to the server and print "mock" to console for you to copy and paste.
// nock.recorder.rec();

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
