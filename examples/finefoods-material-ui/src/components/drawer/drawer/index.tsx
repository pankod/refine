import BaseDrawer, { type DrawerProps } from "@mui/material/Drawer";
import type { PropsWithChildren } from "react";
import gray from "@mui/material/colors/grey";
import { useColorModeContext } from "../../../contexts";

type Props = {} & DrawerProps;

export const Drawer = ({ children, ...props }: PropsWithChildren<Props>) => {
  const { mode } = useColorModeContext();

  return (
    <BaseDrawer
      {...props}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: mode === "light" ? gray[100] : "#000",
        },
        ...props.sx,
      }}
    >
      {children}
    </BaseDrawer>
  );
};
