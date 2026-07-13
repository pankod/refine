import { handleUseParams } from ".";

const paramsWithoutId = {
  resource: "posts",
};

const paramsWithId = {
  resource: "posts",
  id: "11",
};

const paramsWithOutId = {
  resource: "posts",
  id: null,
};

const paramsWithUniqueId = {
  resource: "posts",
  id: "hede/hede",
};

const paramsWithBase64EncodedId = {
  resource: "posts",
  id: "cmVmaW5lIHJ1bHo=",
};

describe("handleUseParams", () => {
  it("should return params true even id does not passed", () => {
    expect(handleUseParams(paramsWithoutId)).toEqual(paramsWithoutId);
  });

  it("should return params true with Id", () => {
    expect(
      handleUseParams({
        ...paramsWithId,
        id: encodeURIComponent(paramsWithId.id),
      }),
    ).toEqual(paramsWithId);
  });

  it("should return params true with unique Id", () => {
    expect(
      handleUseParams({
        ...paramsWithUniqueId,
        id: encodeURIComponent(paramsWithUniqueId.id),
      }),
    ).toEqual(paramsWithUniqueId);
  });

  it("should return params true with nique Id", () => {
    expect(
      handleUseParams({
        ...paramsWithBase64EncodedId,
        id: encodeURIComponent(paramsWithBase64EncodedId.id),
      }),
    ).toEqual(paramsWithBase64EncodedId);
  });

  it("should return params without id", () => {
    expect(handleUseParams(paramsWithOutId)).toEqual(paramsWithOutId);
  });

  it("should return params empty object with does not passed", () => {
    expect(handleUseParams()).toEqual({});
  });
});
