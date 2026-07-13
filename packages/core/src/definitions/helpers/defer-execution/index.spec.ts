import { waitFor } from "@testing-library/react";
import { deferExecution } from ".";

describe("deferExecution", () => {
  beforeEach(() => {
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.useFakeTimers();
  });

  it("should defer the call after caller returns", async () => {
    const array: number[] = [];

    const fn = () => {
      array.push(1);

      deferExecution(() => {
        array.push(3);
      });

      array.push(2);
    };

    fn();

    await waitFor(() => {
      expect(array).toEqual([1, 2, 3]);
    });
  });
});
