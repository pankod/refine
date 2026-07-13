import { vi } from "vitest";

import { importCSVMapper } from ".";

const rawData = [
  ["id", "title", "content"],
  ["600f5fce", "Fantastic Granite", "Ea expedita doloremque et."],
  ["946a03b1", "Sky blue Nepal", "Consequatur ad aut odit."],
];

const transformedData = [
  {
    id: "600f5fce",
    title: "Fantastic Granite",
    content: "Ea expedita doloremque et.",
  },
  {
    id: "946a03b1",
    title: "Sky blue Nepal",
    content: "Consequatur ad aut odit.",
  },
];

describe("importCSVMapper", () => {
  it("should transform the given data", () => {
    expect(importCSVMapper(rawData)).toEqual(transformedData);
  });

  it("should run the given mapper callback with correct parameters", () => {
    const mapperFn = vi.fn((item) => item);

    importCSVMapper(rawData, mapperFn);

    expect(mapperFn).toHaveBeenCalledTimes(2);

    expect(mapperFn).toHaveBeenNthCalledWith(
      1,
      transformedData[0],
      0,
      transformedData,
    );

    expect(mapperFn).toHaveBeenNthCalledWith(
      2,
      transformedData[1],
      1,
      transformedData,
    );
  });
});
