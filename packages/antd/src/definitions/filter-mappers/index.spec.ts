import { rangePickerFilterMapper } from "./index";
import dayjs from "dayjs";

/**
 * The test cases use multiple `as any` because Ant Design's filterDropdown's selectedKeys prop is defined as `React.Key[]`.
 * However, actually it can be any type of value, including a Dayjs tuple.
 */
describe("rangePickerFilterMapper", () => {
  it("should return selectedKeys as-is if they are not provided", () => {
    expect(rangePickerFilterMapper(undefined as any, "value")).toBeUndefined();
    expect(rangePickerFilterMapper(null as any, "value")).toBeNull();

    expect(
      rangePickerFilterMapper(undefined as any, "onChange"),
    ).toBeUndefined();
    expect(rangePickerFilterMapper(null as any, "onChange")).toBeNull();
  });

  it("should return selectedKeys as-is for invalid event type", () => {
    const selectedKeys = [dayjs("2023-05-20"), dayjs("2023-06-20")] as any;
    expect(
      rangePickerFilterMapper(selectedKeys, "invalidEvent" as any),
    ).toEqual(selectedKeys);
  });

  it("should handle empty array of selectedKeys", () => {
    expect(rangePickerFilterMapper([], "value")).toEqual([]);
    expect(rangePickerFilterMapper([], "onChange")).toEqual([]);
  });

  it("should convert string dates to Dayjs objects for 'value' event", () => {
    const selectedKeys = ["2023-05-20T00:00:00Z", "2023-06-20T00:00:00Z"];
    const expected = selectedKeys.map((date) => dayjs(date));

    expect(rangePickerFilterMapper(selectedKeys, "value")).toEqual(expected);

    expect(rangePickerFilterMapper(selectedKeys, "onChange")).toEqual(
      selectedKeys,
    );
  });

  it("should return Dayjs objects as-is for 'value' event", () => {
    const selectedKeys = [dayjs("2023-05-20"), dayjs("2023-06-20")] as any;

    expect(rangePickerFilterMapper(selectedKeys, "value")).toEqual(
      selectedKeys,
    );

    expect(rangePickerFilterMapper(selectedKeys, "onChange")).toEqual(
      selectedKeys.map((date: any) => date.toISOString()),
    );
  });

  it("should convert Dayjs objects to ISO strings for 'onChange' event", () => {
    const selectedKeys = [dayjs("2023-05-20"), dayjs("2023-06-20")] as any;
    const expected = selectedKeys.map((date: any) => date.toISOString());

    expect(rangePickerFilterMapper(selectedKeys, "onChange")).toEqual(expected);

    expect(rangePickerFilterMapper(selectedKeys, "value")).toEqual(
      selectedKeys,
    );
  });
});
