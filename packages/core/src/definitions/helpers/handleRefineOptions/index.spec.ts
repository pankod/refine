import { QueryClient } from "@tanstack/react-query";

import { defaultRefineOptions } from "@contexts/refine";

import { handleRefineOptions } from ".";
import type { IRefineOptions } from "../../../contexts/refine/types";

describe("handleRefineOptions", () => {
  it("should return the default options if no options are provided", () => {
    const { optionsWithDefaults } = handleRefineOptions();

    expect(optionsWithDefaults).toEqual(defaultRefineOptions);
  });

  it("should return the options if they are provided", () => {
    const options: IRefineOptions = {
      mutationMode: "optimistic",
      disableTelemetry: true,
      disableRouteChangeHandler: false,
      liveMode: "auto",
      reactQuery: {
        clientConfig: {
          defaultOptions: { queries: { enabled: false } },
        },
      },
      undoableTimeout: 1000,
      syncWithLocation: true,
      warnWhenUnsavedChanges: true,
      redirect: {
        afterClone: "show",
        afterCreate: "edit",
        afterEdit: "show",
      },
      breadcrumb: false,
    };

    const {
      optionsWithDefaults,
      disableTelemetryWithDefault,
      reactQueryWithDefaults,
    } = handleRefineOptions({ options });

    expect(optionsWithDefaults).toEqual({
      liveMode: "auto",
      mutationMode: "optimistic",
      syncWithLocation: true,
      undoableTimeout: 1000,
      warnWhenUnsavedChanges: true,
      redirect: {
        afterClone: "show",
        afterCreate: "edit",
        afterEdit: "show",
      },
      breadcrumb: false,
      overtime: {
        enabled: true,
        interval: 1000,
      },
      textTransformers: {
        humanize: expect.any(Function),
        plural: expect.any(Function),
        singular: expect.any(Function),
      },
      disableServerSideValidation: false,
      disableRouteChangeHandler: false,
      title: expect.objectContaining({
        icon: expect.any(Object),
        text: "Refine Project",
      }),
    });
    expect(disableTelemetryWithDefault).toBe(true);
    expect(reactQueryWithDefaults).toEqual({
      clientConfig: {
        defaultOptions: { queries: { enabled: false } },
      },
      devtoolConfig: {},
    });
  });

  it("should return the options if they are provided both in options and passed directly <Refine>", () => {
    const options: IRefineOptions = {
      mutationMode: "optimistic",
      disableTelemetry: true,
      liveMode: "auto",
      reactQuery: {
        clientConfig: {
          defaultOptions: { queries: { enabled: false } },
        },
      },
      undoableTimeout: 1000,
      syncWithLocation: true,
      warnWhenUnsavedChanges: true,
    };

    const {
      optionsWithDefaults,
      disableTelemetryWithDefault,
      reactQueryWithDefaults,
    } = handleRefineOptions({
      options,
      mutationMode: "pessimistic",
      disableTelemetry: false,
      liveMode: "manual",
      reactQueryClientConfig: {
        defaultOptions: { queries: { enabled: true } },
      },
      reactQueryDevtoolConfig: {
        position: "bottom-left",
      },
      syncWithLocation: false,
      undoableTimeout: 2000,
      warnWhenUnsavedChanges: false,
    });

    expect(optionsWithDefaults).toEqual({
      liveMode: "auto",
      mutationMode: "optimistic",
      syncWithLocation: true,
      undoableTimeout: 1000,
      warnWhenUnsavedChanges: true,
      redirect: {
        afterClone: "list",
        afterCreate: "list",
        afterEdit: "list",
      },
      overtime: {
        enabled: true,
        interval: 1000,
      },
      textTransformers: {
        humanize: expect.any(Function),
        plural: expect.any(Function),
        singular: expect.any(Function),
      },
      disableServerSideValidation: false,
      disableRouteChangeHandler: false,
      title: expect.objectContaining({
        icon: expect.any(Object),
        text: "Refine Project",
      }),
    });
    expect(disableTelemetryWithDefault).toBe(true);
    expect(reactQueryWithDefaults).toEqual({
      clientConfig: {
        defaultOptions: { queries: { enabled: false } },
      },
      devtoolConfig: {
        position: "bottom-left",
      },
    });
  });

  it("should return directly passed <Refine> options if options are not provided", () => {
    const {
      optionsWithDefaults,
      disableTelemetryWithDefault,
      reactQueryWithDefaults,
    } = handleRefineOptions({
      mutationMode: "pessimistic",
      disableTelemetry: true,
      liveMode: "manual",
      reactQueryClientConfig: {
        defaultOptions: { queries: { enabled: false } },
      },
      reactQueryDevtoolConfig: {
        position: "bottom-right",
      },
      syncWithLocation: false,
      undoableTimeout: 2000,
      warnWhenUnsavedChanges: false,
    });

    expect(optionsWithDefaults).toEqual({
      liveMode: "manual",
      mutationMode: "pessimistic",
      syncWithLocation: false,
      undoableTimeout: 2000,
      warnWhenUnsavedChanges: false,
      redirect: {
        afterClone: "list",
        afterCreate: "list",
        afterEdit: "list",
      },
      overtime: {
        enabled: true,
        interval: 1000,
      },
      textTransformers: {
        humanize: expect.any(Function),
        plural: expect.any(Function),
        singular: expect.any(Function),
      },
      disableServerSideValidation: false,
      disableRouteChangeHandler: false,
      title: expect.objectContaining({
        icon: expect.any(Object),
        text: "Refine Project",
      }),
    });
    expect(disableTelemetryWithDefault).toBe(true);
    expect(reactQueryWithDefaults).toEqual({
      clientConfig: {
        defaultOptions: { queries: { enabled: false } },
      },
      devtoolConfig: {
        position: "bottom-right",
      },
    });
  });

  it("if some of the redirect options are not provided, should return the default ones for those options", () => {
    const { optionsWithDefaults } = handleRefineOptions({
      options: {
        redirect: {
          afterClone: "show",
        },
      },
    });

    expect(optionsWithDefaults.redirect).toEqual({
      afterClone: "show",
      afterCreate: "list",
      afterEdit: "list",
    });
  });

  it("it should return provided query client", () => {
    const queryClient = new QueryClient();

    const options: IRefineOptions = {
      reactQuery: {
        clientConfig: queryClient,
      },
    };

    const { reactQueryWithDefaults } = handleRefineOptions({ options });

    expect(reactQueryWithDefaults).toEqual({
      clientConfig: queryClient,
      devtoolConfig: {},
    });
  });

  it("it should return projectId", () => {
    const options: IRefineOptions = {
      projectId: "test",
    };

    const { optionsWithDefaults } = handleRefineOptions({ options });

    expect(optionsWithDefaults.projectId).toEqual("test");
  });

  it("it should return title", () => {
    const options: IRefineOptions = {
      title: {
        icon: "My Icon",
        text: "My Project",
      },
    };

    const { optionsWithDefaults } = handleRefineOptions({ options });

    expect(optionsWithDefaults.title).toEqual(
      expect.objectContaining({ icon: "My Icon", text: "My Project" }),
    );
  });

  it("it should return modified title partially", () => {
    const options: IRefineOptions = {
      title: {
        icon: undefined,
        text: "My Project",
      },
    };

    const { optionsWithDefaults } = handleRefineOptions({ options });

    expect(optionsWithDefaults.title).toEqual(
      expect.objectContaining({ icon: expect.any(Object), text: "My Project" }),
    );
  });

  it("it should accept null values for title", () => {
    const options: IRefineOptions = {
      title: {
        icon: null,
        text: "My Project",
      },
    };

    const { optionsWithDefaults } = handleRefineOptions({ options });

    expect(optionsWithDefaults.title).toEqual(
      expect.objectContaining({ icon: null, text: "My Project" }),
    );
  });
});
