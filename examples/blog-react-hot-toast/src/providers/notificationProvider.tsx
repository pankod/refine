import React from "react";
import type { NotificationProvider } from "@refinedev/core";
import toast from "react-hot-toast";

export const notificationProvider: NotificationProvider = {
  open: ({ key, message, type }) => {
    switch (type) {
      case "success":
        toast.success(message, {
          id: key,
          position: "top-right",
          style: {
            background: "green",
            color: "#fff",
          },
        });
        break;
      case "error":
        toast.error(message, {
          id: key,
          position: "top-right",
          style: {
            background: "red",
            color: "#fff",
          },
        });
        break;
      default:
        break;
    }
  },
  close: (key: any) => {
    toast.dismiss(key);
  },
};
