import type { ImportElement } from "@/types";
import { printImports } from ".";

describe("printImports", () => {
  it("should return empty string if no imports are passed", () => {
    expect(printImports([])).toEqual([]);
  });

  it("should combine same module imports into one", () => {
    const imports: Array<ImportElement> = [
      ["useForm", "@refinedev/core"],
      ["useForm", "@refinedev/core"],
    ];

    expect(printImports(imports)).toEqual([
      'import { useForm } from "@refinedev/core";',
    ]);
  });

  it("should combine default and named imports", () => {
    const imports: Array<ImportElement> = [
      ["useEffect", "react"],
      ["React", "react", true],
    ];

    expect(printImports(imports)).toEqual([
      'import React, { useEffect } from "react";',
    ]);
  });

  it("should print two lines of imports", () => {
    const imports: Array<ImportElement> = [
      ["useEffect", "react"],
      ["useForm", "@refinedev/core"],
    ];

    expect(printImports(imports)).toEqual([
      'import { useEffect } from "react";',
      'import { useForm } from "@refinedev/core";',
    ]);
  });
});
