import { renderHook, waitFor } from "@testing-library/react";

import { TestWrapper } from "@test";

import { useRadioGroup } from "./";

describe("render hook default options", () => {
  it("should success data without default values", async () => {
    const { result } = renderHook(
      () =>
        useRadioGroup({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    await waitFor(() =>
      expect(result.current.radioGroupProps.options).toHaveLength(2),
    );

    await waitFor(() =>
      expect(result.current.radioGroupProps.options).toEqual([
        {
          label:
            "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
          value: "1",
        },
        { label: "Recusandae consectetur aut atque est.", value: "2" },
      ]),
    );
  });

  it("should success data with resource with optionLabel and optionValue", async () => {
    const { result } = renderHook(
      () =>
        useRadioGroup<{ id: string; slug: string }>({
          resource: "posts",
          optionLabel: "slug",
          optionValue: "id",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    await waitFor(() =>
      expect(result.current.radioGroupProps.options).toHaveLength(2),
    );
    await waitFor(() =>
      expect(result.current.radioGroupProps.options).toEqual([
        { label: "ut-ad-et", value: "1" },
        { label: "consequatur-molestiae-rerum", value: "2" },
      ]),
    );
  });

  it("should generate options with custom optionLabel and optionValue functions", async () => {
    const { result } = renderHook(
      () =>
        useRadioGroup({
          resource: "posts",
          optionLabel: (item) => `${item.title} - ${item.userId}`,
          optionValue: (item) => `${item.id}`,
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    const { radioGroupProps } = result.current;

    expect(radioGroupProps.options).toHaveLength(2);
    expect(radioGroupProps.options).toEqual([
      {
        label:
          "Necessitatibus necessitatibus id et cupiditate provident est qui amet. - 5",
        value: "1",
      },
      { label: "Recusandae consectetur aut atque est. - 36", value: "2" },
    ]);
  });

  it("should work with query and query", async () => {
    const { result } = renderHook(
      () =>
        useRadioGroup({
          resource: "posts",
        }),
      {
        wrapper: TestWrapper({}),
      },
    );

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBeTruthy();
    });

    expect(result.current.query).toEqual(result.current.query);
  });
});
