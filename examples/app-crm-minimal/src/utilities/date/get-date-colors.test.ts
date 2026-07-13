import dayjs from "dayjs";

import { getDateColor } from "./get-date-colors";

describe("getDateColors function", () => {
  it("should return 'error' if the date is before today", () => {
    const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");
    expect(getDateColor({ date: yesterday })).toBe("error");
  });

  it.each([1, 2, 3])(
    "should return 'warning' if the date is %s days from today",
    (day) => {
      const date = dayjs().add(day, "day").format("YYYY-MM-DD");
      expect(getDateColor({ date: date })).toBe("warning");
    },
  );

  it("should return 'default' if the date is more than 3 days from today", () => {
    const date = dayjs().add(4, "day").format("YYYY-MM-DD");
    expect(getDateColor({ date: date })).toBe("default");
  });
});
