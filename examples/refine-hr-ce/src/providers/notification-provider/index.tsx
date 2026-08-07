import { useEffect, useState } from "react";
import type { NotificationProvider } from "@refinedev/core";
import { Box, IconButton, Typography } from "@mui/material";
import toast, { ErrorIcon } from "react-hot-toast";
import { NotificationSuccessIcon, NotificationCloseIcon } from "@/icons";

export const useNotificationProvider = (): NotificationProvider => {
  return {
    open: ({ key, type, message, description }) => {
      toast(
        ({ id, duration }: { id: string; duration: number }) => {
          return (
            <CustomToast
              id={key ?? id}
              type={type}
              description={message ?? description}
              duration={duration ?? 0}
            />
          );
        },
        {
          duration: 3000,
          style: {
            overflow: "hidden",
            maxWidth: "420px",
            paddingRight: "0px",
            paddingLeft: "6px",
            paddingTop: "10px",
            paddingBottom: "10px",
            borderRadius: "12px",
            boxShadow:
              "0px 0px 0px 1px rgba(51, 65, 85, 0.04), 0px 1px 1px -0.5px rgba(100, 116, 139, 0.04), 0px 3px 3px -1.5px rgba(100, 116, 139, 0.04), 0px 6px 6px -3px rgba(100, 116, 139, 0.04), 0px 12px 12px -6px rgba(51, 65, 85, 0.04), 0px 24px 24px -12px rgba(51, 65, 85, 0.04)",
          },
        },
      );
    },
    close: (key) => {
      toast.dismiss(key);
    },
  };
};

type CustomToastProps = {
  id: string;
  type: "success" | "error" | "progress";
  description: string;
  duration: number;
};

const CustomToast = ({ description, duration, id, type }: CustomToastProps) => {
  const [timeLeft, setTimeLeft] = useState(duration - 600);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 20);
    }, 20);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "0px",
          top: "-2px",
          width: `${percentage}%`,
          height: "6px",
          willChange: "width",
          backgroundColor: (theme) => theme.palette.divider,
        }}
      />
      <Box
        key={id}
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "20px",
            marginRight: "14px",
          }}
        >
          {type === "success" ? <NotificationSuccessIcon /> : <ErrorIcon />}
        </Box>
        <Typography variant="body2">{description}</Typography>
        <IconButton
          sx={{
            marginLeft: "20px",
            padding: 0,
          }}
          onClick={() => {
            toast.dismiss(id);
          }}
        >
          <NotificationCloseIcon />
        </IconButton>
      </Box>
    </>
  );
};
