import {
  Box,
  type DialogProps,
  IconButton,
  Dialog as MuiDialog,
  Typography,
} from "@mui/material";
import { CloseRectancleIcon } from "@/icons";
import { LoadingOverlay } from "../loading-overlay";

import type { ReactNode } from "react";

type Props = {
  loading?: boolean;
  footer?: ReactNode;
  size?: "medium" | "large";
} & DialogProps;

export const Modal = ({
  loading,
  footer,
  children,
  size = "medium",
  ...props
}: Props) => {
  return (
    <MuiDialog
      {...props}
      title={undefined}
      sx={(theme) => ({
        "& .MuiDialog-container": {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },

        [theme.breakpoints.down("sm")]: {
          "& .MuiDialog-paper": {
            height: "100dvh",
            maxHeight: "100dvh",
            maxWidth: "100%",
            width: "100%",
            margin: "0px",
            borderRadius: "0px",
          },
        },
        [theme.breakpoints.up("sm")]: {
          "& .MuiDialog-paper": {
            height: "max-content",
            maxHeight: "calc(100% - 64px)",
            maxWidth: size === "medium" ? "520px" : "688px",
            margin: "8px",
            borderRadius: "12px",
          },
        },
      })}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            backgroundColor: (theme) => theme.palette.common.white,
            display: "flex",
            height: "48px",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: "24px",
            paddingRight: "8px",
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            minWidth: {
              xs: "100%",
              sm: "520px",
            },
          }}
        >
          <Typography
            variant="h2"
            fontSize="16px"
            lineHeight="24px"
            fontWeight="600"
          >
            {props.title}
          </Typography>
          <IconButton
            onClick={(e) => {
              props.onClose?.(e, "backdropClick");
            }}
            size="medium"
            sx={{
              borderRadius: "12px",
            }}
          >
            <CloseRectancleIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          <LoadingOverlay loading={!!loading}>
            <Box
              sx={{
                height: "100%",
                overflow: "auto",
              }}
            >
              {children}
            </Box>
          </LoadingOverlay>
        </Box>
        {footer && <Box sx={{ flexShrink: 0 }}>{footer}</Box>}
      </Box>
    </MuiDialog>
  );
};
