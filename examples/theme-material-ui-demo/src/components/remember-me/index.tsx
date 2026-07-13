import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useFormContext } from "react-hook-form";

export const RememeberMe = () => {
  const { register } = useFormContext();

  return (
    <FormControlLabel
      sx={{
        span: {
          fontSize: "12px",
        },
      }}
      control={
        <Checkbox size="small" id="rememberMe" {...register("rememberMe")} />
      }
      label="Remember me"
    />
  );
};
