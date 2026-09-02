import { importCSVMapper } from ".";

describe("importCSVMapper", () => {
  it("should map CSV data with headers", () => {
    const data = [
      ["name", "age"],
      ["John", "30"],
      ["Jane", "25"],
    ];
    const result = importCSVMapper(data);
    expect(result).toEqual([
      { name: "John", age: "30" },
      { name: "Jane", age: "25" },
    ]);
  });

  it("should return empty array when only headers are present", () => {
    const data = [["name", "age"]];
    const result = importCSVMapper(data);
    expect(result).toEqual([]);
  });

  it("should apply mapData function", () => {
    const data = [
      ["name", "age"],
      ["John", "30"],
    ];
    const result = importCSVMapper(data, (item: any) => ({
      ...item,
      age: Number.parseInt(item.age),
    }));
    expect(result).toEqual([{ name: "John", age: 30 }]);
  });

  it("should handle single column CSV", () => {
    const data = [["email"], ["a@b.com"], ["c@d.com"]];
    const result = importCSVMapper(data);
    expect(result).toEqual([{ email: "a@b.com" }, { email: "c@d.com" }]);
  });

  it("should handle mapData with index and array", () => {
    const data = [["name"], ["first"], ["second"]];
    const indices: number[] = [];
    importCSVMapper(data, (item: any, index: number) => {
      indices.push(index);
      return item;
    });
    expect(indices).toEqual([0, 1]);
  });
});
