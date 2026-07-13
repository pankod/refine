import { forwardRef, type ReactNode } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Box,
  type SxProps,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  type DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { DateIcon } from "@/icons";

type Props = {
  sx?: SxProps;
  label?: string;
  icon?: ReactNode;
  value?: string;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: () => void;
  onChange?: (date: string | null) => void;
  loading?: boolean;
  error?: string;
  datePickerProps?: DatePickerProps<any>;
};

export const InputDate = forwardRef<HTMLDivElement, Props>(
  (props: Props, ref) => {
    return (
      <FormControl
        variant="standard"
        sx={{
          "& .MuiInputBase-root": {
            width: "100%",
          },

          "& .MuiInputBase-input": {
            position: "relative",
            border: "none",
            borderRadius: "6px",
            padding: "10px 12px",
            fontSize: "14px",
            color: (theme) => theme.palette.text.primary,
            borderColor: (theme) => theme.palette.divider,
          },

          "& .MuiIconButton-root": {
            borderRadius: "6px",
          },

          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: (theme) => theme.palette.divider,
          },

          "& .MuiOutlinedInput-root": {
            "&:active, &:focus-within": {
              outlineStyle: "solid",
              outlineOffset: "2px",
              outlineWidth: "2px",
              outlineColor: (theme) =>
                props.error
                  ? `${theme.palette.error.main}`
                  : `${theme.palette.primary.main}`,
            },
          },
          ...props.sx,
        }}
      >
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
        <Box
          paddingLeft={props.icon ? "18px" : "0"}
          paddingTop="24px"
          width="100%"
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="MM.DD.YYYY"
              {...props.datePickerProps}
              ref={ref}
              onClose={props.onBlur}
              value={props.value ? dayjs(props.value) : null}
              onChange={(value) => {
                const date = value?.format("MM.DD.YYYY") || null;
                props.onChange?.(date);
              }}
              slots={{
                openPickerIcon: () => <DateIcon />,
              }}
              sx={{
                width: "100%",
              }}
            />
          </LocalizationProvider>
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
  },
);
