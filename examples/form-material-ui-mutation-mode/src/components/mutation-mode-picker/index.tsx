import React from "react";
import type { MutationMode } from "@refinedev/core";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

interface Props {
  currentMutationMode: MutationMode;
  onMutationModeChange: (mode: MutationMode) => void;
}

const MutationModePicker: React.FC<Props> = ({
  currentMutationMode,
  onMutationModeChange,
}) => {
  return (
    <Card
      elevation={8}
      sx={{
        position: "fixed",
        bottom: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "8px 16px",
      }}
    >
      <RadioGroup
        row
        aria-labelledby="mutation-mode-picker"
        name="mutation-mode-picker"
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FormControlLabel
          value="pessimistic"
          control={
            <Radio
              checked={currentMutationMode === "pessimistic"}
              onChange={() => onMutationModeChange("pessimistic")}
            />
          }
          label="Pessimistic"
        />
        <FormControlLabel
          value="optimistic"
          control={
            <Radio
              checked={currentMutationMode === "optimistic"}
              onChange={() => onMutationModeChange("optimistic")}
            />
          }
          label="Optimistic"
        />
        <FormControlLabel
          value="undoable"
          control={
            <Radio
              checked={currentMutationMode === "undoable"}
              onChange={() => onMutationModeChange("undoable")}
            />
          }
          label="Undoable"
        />
      </RadioGroup>

      <Typography>
        <a
          href="https://refine.dev/docs/advanced-tutorials/mutation-mode/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Refer to the mutation mode documentation for more information. →
        </a>
      </Typography>
    </Card>
  );
};

export default MutationModePicker;
