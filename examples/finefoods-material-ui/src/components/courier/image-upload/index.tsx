import { type SxProps, styled } from "@mui/material/styles";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Box from "@mui/material/Box";

type Props = {
  previewURL?: string;
  sx?: SxProps;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  showOverlay?: boolean;
};

export const CourierImageUpload = ({
  inputProps,
  previewURL,
  sx,
  showOverlay = true,
}: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      flexShrink={0}
      position="relative"
      width="72px"
      height="72px"
      borderRadius="100%"
      overflow="hidden"
      sx={{
        cursor: "pointer",
        ...sx,
      }}
    >
      {previewURL ? (
        <img
          src={previewURL}
          alt="Courier avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "100%",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "72px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EBEBEB",
          }}
        >
          <PhotoOutlinedIcon
            sx={{
              width: "36px",
              height: "36px",
              color: "text.disabled",
            }}
          />
        </Box>
      )}
      {showOverlay && (
        <Overlay>
          <CloudUploadOutlinedIcon />
        </Overlay>
      )}
      <Box
        component="label"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          cursor: "pointer",
          width: "72px",
          height: "72px",
        }}
        tabIndex={-1}
      >
        <VisuallyHiddenInput
          {...inputProps}
          sx={{
            width: "72px",
            height: "72px",
          }}
          type="file"
        />
      </Box>
    </Box>
  );
};

const Overlay = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "50%",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  border: 0,
  borderBottomLeftRadius: "100%",
  borderBottomRightRadius: "100%",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    transition: "background-color 0.3s ease",
  },
});

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
