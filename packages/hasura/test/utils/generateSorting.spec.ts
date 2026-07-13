import type { CrudSorting } from "@refinedev/core";
import { generateSorting } from "../../src/utils";

describe("generateSorting", () => {
  it.each([undefined, null])(
    "should return undefined when sorters is %p",
    (sorters) => {
      expect(generateSorting(sorters as unknown as CrudSorting)).toEqual(
        undefined,
      );
    },
  );

  it("should return correct HasuraSortingType when sorters is provided", () => {
    const sorters: CrudSorting = [
      { field: "name", order: "asc" },
      { field: "createdAt", order: "desc" },
    ];
    const expectedSorting = {
      name: "asc",
      createdAt: "desc",
    };
    expect(generateSorting(sorters)).toEqual(expectedSorting);
  });

  it("should handle nested fields correctly", () => {
    const sorters: CrudSorting = [
      { field: "author.name", order: "asc" },
      { field: "createdAt", order: "desc" },
    ];
    const expectedSorting = {
      author: {
        name: "asc",
      },
      createdAt: "desc",
    };
    expect(generateSorting(sorters)).toEqual(expectedSorting);
  });

  it("should handle multiple nested fields correctly", () => {
    const sorters: CrudSorting = [
      { field: "patient_status.title", order: "asc" },
      { field: "insurance_status.title", order: "asc" },
      { field: "patient.name_and_dob", order: "asc" },
      { field: "rx_received_date", order: "desc" },
    ];
    const result = generateSorting(sorters);
    const expectedSorting = {
      patient_status: {
        title: "asc",
      },
      insurance_status: {
        title: "asc",
      },
      patient: {
        name_and_dob: "asc",
      },
      rx_received_date: "desc",
    };
    expect(result).toEqual(expectedSorting);
  });
});
