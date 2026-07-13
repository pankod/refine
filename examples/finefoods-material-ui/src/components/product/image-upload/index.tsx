import { useTranslate } from "@refinedev/core";
import { type SxProps, styled, useTheme } from "@mui/material/styles";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type Props = {
  previewURL?: string;
  sx?: SxProps;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const ProductImageUpload = (props: Props) => {
  const t = useTranslate();
  const theme = useTheme();

  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
      width="240px"
      height="240px"
      bgcolor={isDarkMode ? "background.paper" : "#00000014"}
      border={`1px solid ${isDarkMode ? theme.palette.divider : "#C7C9CA"}`}
      sx={props.sx}
      borderRadius="4px"
    >
      {props.previewURL ? (
        <img
          src={props.previewURL}
          alt="product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <PhotoOutlinedIcon
          sx={{
            width: "72px",
            height: "72px",
            color: "text.disabled",
          }}
        />
      )}
      <Button
        component="label"
        variant="contained"
        color="inherit"
        tabIndex={-1}
        startIcon={<CloudUploadOutlinedIcon />}
        sx={{
          position: "absolute",
          bottom: "16px",
          width: "max-content",
          height: "max-content",
          backgroundColor: isDarkMode ? "black" : "background.paper",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: isDarkMode ? theme.palette.divider : "background.paper",
          color: "text.primary",
          "&:hover": {
            backgroundColor: "background.paper",
          },
        }}
      >
        {t("products.fields.images.description")}
        <VisuallyHiddenInput {...props.inputProps} type="file" />
      </Button>
    </Box>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
