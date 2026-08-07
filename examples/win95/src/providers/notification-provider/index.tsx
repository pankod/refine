import type { NotificationProvider } from "@refinedev/core";
import toast, { type Toast } from "react-hot-toast";
import { Notification } from "@/components/notification";

export const notificationProvider: NotificationProvider = {
  open: (props) => {
    switch (props.type) {
      case "success":
      case "error":
        toast.custom(
          (t: Toast) => {
            return (
              <Notification
                {...props}
                style={{
                  opacity: t.visible ? 1 : 0,
                  animation: t.visible
                    ? "fadeIn 0.4s forwards"
                    : "fadeOut 0.4s ease-in-out",
                }}
              />
            );
          },
          {
            id: props?.key || props?.message,
            position: "bottom-right",
          },
        );
        break;
      default:
        break;
    }
  },
  close: (key: string) => {
    toast.dismiss(key);
  },
};
