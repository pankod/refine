import React from "react";
import { styled } from "@mui/material/styles";

import type EmotionStyled from "@emotion/styled";
import type { styled as MuiSystemStyled } from "@mui/system";

import { SnackbarProvider } from "notistack";

const SnackbarProviderWithDefaultValues = ({
  anchorOrigin = {
    vertical: "top",
    horizontal: "right",
  },
  disableWindowBlurListener = true,
  ...rest
}: React.ComponentProps<typeof SnackbarProvider>) => {
  return (
    <SnackbarProvider
      anchorOrigin={anchorOrigin}
      disableWindowBlurListener={disableWindowBlurListener}
      {...rest}
    />
  );
};

export const RefineSnackbarProvider = styled(SnackbarProviderWithDefaultValues)`
&.SnackbarItem-contentRoot {
    background-color: ${(props) => props.theme.palette.background.default};
    color: ${(props) => props.theme.palette.primary.main};
}
&.SnackbarItem-variantSuccess {
    background-color: ${(props) => props.theme.palette.success.main};
    color: ${(props) => props.theme.palette.success.contrastText};
}
&.SnackbarItem-variantError {
    background-color: ${(props) => props.theme.palette.error.main};
    color: ${(props) => props.theme.palette.error.contrastText};
}
&.SnackbarItem-variantInfo {
    background-color: ${(props) => props.theme.palette.info.main};
    color: ${(props) => props.theme.palette.info.contrastText};
}
&.SnackbarItem-variantWarning {
    background-color: ${(props) => props.theme.palette.warning.main};
    color: ${(props) => props.theme.palette.warning.contrastText};
}
`;
