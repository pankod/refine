import { renderHook } from "@testing-library/react";

import { TestWrapper, waitFor, act } from "../../test";

import { useStepsForm } from "./";
import * as UseForm from "../useForm";

describe("useStepsForm Hook", () => {
  it("'defaultStep' props should set the initial value of 'currentStep'", async () => {
    const { result } = renderHook(
      () =>
        useStepsForm({
          stepsProps: {
            defaultStep: 4,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );
    expect(result.current.steps.currentStep).toBe(4);
  });

  it("'goToStep' should update the current step state", async () => {
    const { result } = renderHook(() => useStepsForm({}), {
      wrapper: TestWrapper({}),
    });
    await act(async () => {
      result.current.steps.gotoStep(1);
    });
    expect(result.current.steps.currentStep).toBe(1);
  });

  it("'currentStep' should be 0 when the 'goToSteps' params less than zero", async () => {
    const { result } = renderHook(() => useStepsForm({}), {
      wrapper: TestWrapper({}),
    });
    await act(async () => {
      result.current.steps.gotoStep(-7);
    });
    expect(result.current.steps.currentStep).toBe(0);
  });

  it("'currentStep' should be 0 when the 'goToSteps' params less than zero", async () => {
    const { result } = renderHook(() => useStepsForm({}), {
      wrapper: TestWrapper({}),
    });
    await act(async () => {
      result.current.steps.gotoStep(-7);
    });
    expect(result.current.steps.currentStep).toBe(0);
  });

  it("'currentStep' should not update when the 'goToSteps' params equal to the 'currentStep'", async () => {
    const { result } = renderHook(
      () =>
        useStepsForm({
          stepsProps: {
            defaultStep: 2,
          },
        }),
      {
        wrapper: TestWrapper({}),
      },
    );
    await act(async () => {
      result.current.steps.gotoStep(2);
    });
    expect(result.current.steps.currentStep).toBe(2);
  });

  it.each([
    {
      mockDirtyFields: {},
    },
    {
      mockDirtyFields: { field2: true },
    },
  ])(
    "should call setValue with correct data according to dirty fields",
    async (scenario) => {
      const mockData = { field1: "field1", field2: "field2" };
      const mockDirtyFields = scenario.mockDirtyFields;
      const setValue = vi.fn();
      const getValues = () => mockData;

      (vi.spyOn(UseForm, "useForm") as vi.Mock).mockReturnValueOnce({
        setValue,
        getValues,
        formState: { dirtyFields: mockDirtyFields },
        refineCore: { query: { data: { data: mockData } } },
      });

      const { result } = renderHook(
        () =>
          useStepsForm({
            stepsProps: {
              defaultStep: 1,
            },
          }),
        {
          wrapper: TestWrapper({}),
        },
      );

      await waitFor(() => {
        expect(!result.current.refineCore.formLoading).toBeTruthy();
      });

      expect(result.current.refineCore.query?.data?.data).toEqual(mockData);

      const setValueCallTimes =
        Object.keys(mockData).length - Object.keys(mockDirtyFields).length;
      expect(setValue).toHaveBeenCalledTimes(setValueCallTimes);

      Object.keys(mockData).forEach((key) => {
        const keyName = key as keyof typeof mockData &
          keyof typeof mockDirtyFields;

        if (!mockDirtyFields[keyName]) {
          expect(setValue).toHaveBeenCalledWith(key, mockData[keyName]);
        }
      });
    },
  );
});
