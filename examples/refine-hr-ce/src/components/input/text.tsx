import {
  Box,
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
  type SxProps,
} from "@mui/material";
import { forwardRef, type ReactNode } from "react";

type Props = {
  sx?: SxProps;
  label?: string;
  type?: string;
  icon?: ReactNode;
  value?: string | number;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  required?: boolean;
  startAdornment?: ReactNode;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  error?: string;
  rightSlot?: ReactNode;
  multiline?: boolean;
  rows?: number;
  defaultValue?: string;
};

export const InputText = forwardRef((props: Props, ref) => {
  return (
    <FormControl
      variant="standard"
      sx={{
        width: "100%",
        ...props.sx,
      }}
    >
      {(props.icon || props.label) && (
        <InputLabel
          shrink
          required={props.required}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: props.icon ? "text.secondary" : "text.primary",

            "& > svg": {
              width: "22px",
              height: "22px",
            },
            "&.MuiFormLabel-root": {
              position: "unset",
              marginBottom: "0px !important",
            },
            "&.Mui-focused": {
              color: "text.primary",
            },
            "& .MuiFormLabel-asterisk": {
              marginLeft: "-4px",
              color: (theme) => theme.palette.error.dark,
            },
          }}
        >
          {props.icon}
          {props.label}
        </InputLabel>
      )}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: "8px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            position: "relative",
            alignItems: "center",
            gap: "8px",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: "6px",
            marginLeft: props.icon ? "18px" : "0",

            outlineStyle: "solid",
            outlineOffset: "2px",
            outlineWidth: "2px",
            outlineColor: "transparent",

            ...(props.error && {
              outlineColor: (theme) =>
                props.error
                  ? `${theme.palette.error.main}`
                  : `${theme.palette.primary.main}`,
            }),

            "&:active, &:focus-within": {
              outlineColor: (theme) =>
                props.error
                  ? `${theme.palette.error.main}`
                  : `${theme.palette.primary.main}`,
            },
          }}
        >
          <InputBase
            type={props.type}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onBlur={props.onBlur}
            disabled={props.disabled}
            name={props.name}
            value={props.defaultValue ? undefined : props.value || ""}
            ref={ref}
            fullWidth
            multiline={props.multiline}
            rows={props.rows}
            startAdornment={
              props.startAdornment && (
                <Box
                  sx={{
                    marginLeft: "8px",
                    marginRight: "-8px",
                    maxWidth: "24px",
                    width: "100%",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                  }}
                >
                  {props.startAdornment}
                </Box>
              )
            }
            sx={{
              "label + &": {
                marginTop: "24px",
              },
              "& .MuiInputBase-input": {
                position: "relative",
                padding: "10px 12px",
                fontSize: "14px",
                lineHeight: "20px",
                color: (theme) => theme.palette.text.primary,
              },
            }}
          />
        </Box>
        {props.rightSlot && props.rightSlot}
      </Box>
      {props?.error && (
        <FormHelperText
          variant="standard"
          error
          sx={{
            marginTop: "4px",
          }}
        >
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
});
