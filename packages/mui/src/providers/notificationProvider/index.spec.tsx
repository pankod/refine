import React from "react";
import { vi } from "vitest";
import * as Snack from "notistack";

import type { OpenNotificationParams } from "@refinedev/core";

import { CircularDeterminate } from "@components/circularDeterminate";

import { useNotificationProvider } from ".";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const cancelMutationMock = vi.fn();

const mockNotification: OpenNotificationParams = {
  key: "test-notification",
  message: "Test Notification Message",
  type: "success",
  description: "Test Notification Description",
};

const mockNotificationUndoable: OpenNotificationParams = {
  key: "test-notification-undoable",
  message: "Undo Test Notification Message",
  type: "progress",
  undoableTimeout: 5,
  cancelMutation: cancelMutationMock,
};

describe("Notistack notificationProvider", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const enqueueSnackbarMock = vi.fn();

  const closeSnackbarMock = vi.fn();

  const useSnackbarEnqueueSnackbar = vi.spyOn(Snack, "useSnackbar");

  useSnackbarEnqueueSnackbar.mockImplementation(
    () =>
      ({
        enqueueSnackbar: enqueueSnackbarMock,
        closeSnackbar: closeSnackbarMock,
      }) as any,
  );

  const notificationProviderHandle = useNotificationProvider();

  // This test cover the case when the type is not "progress" ("success" or "error")

  it("should render notification snack with success type ", () => {
    notificationProviderHandle.open(mockNotification);

    expect(enqueueSnackbarMock).toHaveBeenCalled();
    expect(enqueueSnackbarMock).toHaveBeenCalledWith(
      <Box>
        <Typography variant="subtitle2" component="h6">
          {mockNotification.description}
        </Typography>
        <Typography variant="caption" component="p">
          {mockNotification.message}
        </Typography>
      </Box>,
      {
        key: mockNotification.key,
        variant: "success",
      },
    );
  });

  it("should render error notification if type set as error", async () => {
    notificationProviderHandle.open({ ...mockNotification, type: "error" });

    expect(enqueueSnackbarMock).toHaveBeenCalledTimes(1);
    expect(enqueueSnackbarMock).toHaveBeenCalledWith(
      <Box>
        <Typography variant="subtitle2" component="h6">
          {mockNotification.description}
        </Typography>
        <Typography variant="caption" component="p">
          {mockNotification.message}
        </Typography>
      </Box>,
      {
        key: mockNotification.key,
        variant: "error",
      },
    );
  });

  // This test cover the case when the type is "progress"

  it("should render notification with undoable when type is progress", async () => {
    notificationProviderHandle.open(mockNotificationUndoable);

    expect(enqueueSnackbarMock).toHaveBeenCalledTimes(1);
    expect(enqueueSnackbarMock).toHaveBeenCalledWith(
      <>
        <CircularDeterminate
          undoableTimeout={5}
          message={"Undo Test Notification Message"}
        />
      </>,
      {
        action: expect.any(Function),
        preventDuplicate: true,
        key: "test-notification-undoable",
        autoHideDuration: 5000,
      },
    );
  });

  // This test cover the case when the closeSnackbar is called

  it("should close notification", async () => {
    notificationProviderHandle.close("");

    expect(closeSnackbarMock).toHaveBeenCalledTimes(1);
  });
});
