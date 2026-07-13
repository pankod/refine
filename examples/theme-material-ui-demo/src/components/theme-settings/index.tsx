import { type FC, useMemo } from "react";
import { useModal } from "@refinedev/core";
import { RefineThemes } from "@refinedev/mui";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material/styles";

type ThemeName = keyof typeof RefineThemes;

interface Props {
  onThemeClick: (theme: Theme) => void;
}

export const ThemeSettings: FC<Props> = ({ onThemeClick }) => {
  const { show, close, visible } = useModal();

  const themes = useMemo(() => {
    const darkThemes: Partial<Record<ThemeName, Theme>> = {};
    const lightThemes: Partial<Record<ThemeName, Theme>> = {};

    for (const [key, value] of Object.entries(RefineThemes)) {
      if (value.palette.mode === "dark") {
        darkThemes[key as ThemeName] = value;
      } else {
        lightThemes[key as ThemeName] = value;
      }
    }

    return {
      darkThemes,
      lightThemes,
    };
  }, []);

  return (
    <>
      <Fab
        onClick={show}
        color="primary"
        variant="extended"
        size="small"
        sx={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        Theme Settings
      </Fab>
      <Dialog open={visible} onClose={close}>
        <DialogTitle>Theme Settings</DialogTitle>
        <Card>
          <CardContent>
            <Typography>Light Themes</Typography>
            <Stack mt={2} gap={2} direction="row" flexWrap="wrap">
              {Object.keys(themes.lightThemes).map((name) => {
                const theme = RefineThemes[name as ThemeName];

                return (
                  <Chip
                    key={name}
                    label={name}
                    onClick={() => {
                      onThemeClick(theme);
                    }}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                    }}
                  />
                );
              })}
            </Stack>

            <Divider
              sx={{
                my: 2,
              }}
            />

            <Typography>Dark Themes</Typography>
            <Stack mt={2} gap={2} direction="row" flexWrap="wrap">
              {Object.keys(themes.darkThemes).map((name) => {
                const theme = RefineThemes[name as ThemeName];

                return (
                  <Chip
                    key={name}
                    label={name}
                    onClick={() => {
                      onThemeClick(theme);
                    }}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                    }}
                  />
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};
