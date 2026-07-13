import type { PropsWithChildren } from "react";
import { Box, CircularProgress, type SxProps, type Theme } from "@mui/material";

type Props = PropsWithChildren<{
  loading: boolean;
  sx?: SxProps<Theme>;
}>;

export const LoadingOverlay = (props: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        ...props.sx,
      }}
    >
      <Box
        sx={{
          display: props.loading ? "block" : "none",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          zIndex: 1000,
          cursor: "wait",
        }}
      />
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          marginTop: "-20px",
          marginLeft: "-20px",
          display: props.loading ? "block" : "none",
        }}
      />
      {props.children}
    </Box>
  );
};
