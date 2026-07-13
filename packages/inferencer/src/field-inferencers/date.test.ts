import { dateInfer } from "./date";

describe("date inferencer", () => {
  describe("invalid dates", () => {
    const values = ["112312", "551351", "34223", "2222", "01011990"];

    values.forEach((val) => {
      it(`should be false for ${val}`, () => {
        expect(dateInfer("test", val, {}, () => false)).toStrictEqual(false);
      });
    });
  });

  describe("valid dates", () => {
    const values = ["01.01.1990", "01/01/1990", "1990-01-01"];

    values.forEach((val) => {
      it(`should be true for ${val}`, () => {
        expect(dateInfer("test", val, {}, () => false)).toStrictEqual({
          key: "test",
          priority: 1,
          type: "date",
        });
      });
    });
  });
});
