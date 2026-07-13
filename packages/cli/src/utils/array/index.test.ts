import { findDuplicates } from "@utils/array";

test("Find duplicates from array", () => {
  const testCases = [
    {
      input: [],
      output: [],
    },

    {
      input: [1, 2, 3, 3, "3", "3"],
      output: [3, "3"],
    },
    {
      input: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
      output: [1, 2, 3, 4, 5],
    },
  ];

  testCases.forEach((testCase) => {
    const result = findDuplicates(testCase.input);
    expect(result).toEqual(testCase.output);
  });
});
