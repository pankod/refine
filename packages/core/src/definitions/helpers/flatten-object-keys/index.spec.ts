import { flattenObjectKeys } from ".";

describe("flattenObjectKeys", () => {
  it("should flatten an object with nested objects and arrays", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: [3, 4],
      },
      e: {
        f: {
          g: 5,
        },
      },
    };

    const flattenedObj = flattenObjectKeys(obj);

    expect(flattenedObj).toEqual({
      a: 1,
      b: {
        c: 2,
        d: [3, 4],
      },
      "b.c": 2,
      "b.d": [3, 4],
      "b.d.0": 3,
      "b.d.1": 4,
      e: {
        f: {
          g: 5,
        },
      },
      "e.f": {
        g: 5,
      },
      "e.f.g": 5,
    });
  });

  it("should flatten an object with empty nested objects and arrays", () => {
    const obj = {
      a: 1,
      b: {},
      c: [],
    };

    const flattenedObj = flattenObjectKeys(obj);

    expect(flattenedObj).toEqual({
      a: 1,
      b: {},
      c: [],
    });
  });

  it("should flatten an object with nested objects and arrays with custom prefix", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: [3, 4],
      },
      e: {
        f: {
          g: 5,
        },
      },
    };

    const flattenedObj = flattenObjectKeys(obj, "prefix");

    expect(flattenedObj).toEqual({
      "prefix.a": 1,
      "prefix.b": {
        c: 2,
        d: [3, 4],
      },
      "prefix.b.c": 2,
      "prefix.b.d": [3, 4],
      "prefix.b.d.0": 3,
      "prefix.b.d.1": 4,
      "prefix.e": {
        f: {
          g: 5,
        },
      },
      "prefix.e.f": {
        g: 5,
      },
      "prefix.e.f.g": 5,
    });
  });
});
