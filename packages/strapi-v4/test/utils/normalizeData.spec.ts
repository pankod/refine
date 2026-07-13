import { normalizeData } from "../../src/utils";

describe("normalizeData", () => {
  it("should return an empty object if the input is an empty object", () => {
    expect(normalizeData({})).toEqual({});
  });

  it("should return the same data if input is neither an array nor an object", () => {
    const input = "some string";
    expect(normalizeData(input)).toBe(input);
  });

  it("should flatten the attributes of an object with attributes", () => {
    const input = {
      id: "1",
      attributes: {
        name: "John",
        age: 30,
      },
    };
    const expectedOutput = {
      id: "1",
      name: "John",
      age: 30,
    };
    expect(normalizeData(input)).toEqual(expectedOutput);
  });

  it("should handle nested data objects and arrays", () => {
    const input = {
      data: [
        {
          id: "1",
          attributes: {
            name: "John",
            age: 30,
            address: {
              data: {
                id: "100",
                attributes: {
                  street: "123 Main St",
                  city: "New York",
                  country: "USA",
                },
              },
            },
            hobbies: {
              data: [
                {
                  id: "200",
                  attributes: {
                    name: "Reading",
                  },
                },
                {
                  id: "201",
                  attributes: {
                    name: "Running",
                  },
                },
              ],
            },
          },
        },
      ],
    };

    const expectedOutput = [
      {
        id: "1",
        name: "John",
        age: 30,
        address: {
          id: "100",
          street: "123 Main St",
          city: "New York",
          country: "USA",
        },
        hobbies: [
          {
            id: "200",
            name: "Reading",
          },
          {
            id: "201",
            name: "Running",
          },
        ],
      },
    ];

    expect(normalizeData(input)).toEqual(expectedOutput);
  });

  it("should handle null data", () => {
    const input = {
      data: null,
    };
    expect(normalizeData(input)).toBeNull();
  });
});
