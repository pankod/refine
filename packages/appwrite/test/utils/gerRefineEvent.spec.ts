import { getRefineEvent } from "../../src/utils";

describe("getRefineEvent", () => {
  it("should return 'created' when the event includes '.create'", () => {
    const event = "user.create";
    const expected = "created";
    expect(getRefineEvent(event)).toBe(expected);
  });

  it("should return 'undefined' when the event includes '.update'", () => {
    const event = "user.update";
    expect(getRefineEvent(event)).toBeUndefined();
  });

  it("should return 'deleted' when the event includes '.delete'", () => {
    const event = "user.delete";
    const expected = "deleted";
    expect(getRefineEvent(event)).toBe(expected);
  });

  it("should return 'undefined' when the event does not match any pattern", () => {
    const event = "user.unknown";
    expect(getRefineEvent(event)).toBeUndefined();
  });
});
