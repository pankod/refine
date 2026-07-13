import {
  Box,
  Button,
  Group,
  type MantineThemeOverride,
  Modal,
  useMantineColorScheme,
} from "@mantine/core";
import { useModal } from "@refinedev/core";
import { RefineThemes } from "@refinedev/mantine";
import type { FC } from "react";

type ThemeName = keyof typeof RefineThemes;

const refineThemeNameToMantineColors = (name: keyof typeof RefineThemes) => {
  if (name === "Purple") return "violet";

  return name.toLowerCase();
};

type Props = {
  onThemeClick: (theme: MantineThemeOverride) => void;
};

const ThemeSettings: FC<Props> = ({ onThemeClick }) => {
  const { visible, show, close } = useModal();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
      >
        <Button onClick={show}>Open Theme settings</Button>
      </Box>
      <Modal onClose={close} opened={visible} title="Theme Settings">
        <Group position="left" spacing="sm">
          {Object.keys(RefineThemes).map((key) => {
            const themeName = key as ThemeName;
            const theme = { ...RefineThemes[themeName] };

            return (
              <Button
                compact
                key={themeName}
                color={refineThemeNameToMantineColors(themeName)}
                onClick={() => {
                  onThemeClick(theme);
                  close();
                }}
              >
                {themeName}
              </Button>
            );
          })}
        </Group>
        <Button mt="lg" variant="default" onClick={() => toggleColorScheme()}>
          Set Mode to {isDark ? "Light ☀️" : "Dark  🌑"}
        </Button>
      </Modal>
    </>
  );
};

export default ThemeSettings;
