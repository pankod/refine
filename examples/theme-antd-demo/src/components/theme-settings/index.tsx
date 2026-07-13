import { type FC, useState } from "react";
import { useModal } from "@refinedev/core";
import { Button, Modal, Space, type ThemeConfig, theme } from "antd";
import { RefineThemes } from "@refinedev/antd";

type ThemeName = keyof typeof RefineThemes;

interface Props {
  currentTheme: ThemeConfig;
  onThemeClick: (theme: ThemeConfig) => void;
}

export const ThemeSettings: FC<Props> = ({ currentTheme, onThemeClick }) => {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const { show, close, visible } = useModal();

  const onTokenColorClick = (token: ThemeConfig["token"]) => {
    onThemeClick({
      ...currentTheme,
      token,
    });

    close();
  };

  const toggleMode = () => {
    onThemeClick({
      ...currentTheme,
      algorithm: mode === "dark" ? theme.defaultAlgorithm : theme.darkAlgorithm,
    });
    setMode((prev) => (prev === "dark" ? "light" : "dark"));

    close();
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
      >
        <Button type="primary" onClick={show}>
          Theme Settings
        </Button>
      </div>
      <Modal
        open={visible}
        onCancel={close}
        destroyOnClose
        title="Theme Settings"
        footer={null}
      >
        <Space direction="vertical" size="large">
          <Space
            style={{
              flexWrap: "wrap",
            }}
          >
            {Object.keys(RefineThemes).map((name) => {
              const theme = RefineThemes[name as ThemeName];

              return (
                <Button
                  key={theme.token?.colorPrimary}
                  onClick={() => {
                    onTokenColorClick(theme.token);
                  }}
                  style={{
                    background: theme.token?.colorPrimary,
                  }}
                >
                  {name}
                </Button>
              );
            })}
          </Space>

          <Button type="dashed" onClick={toggleMode}>
            Set Mode to {mode === "dark" ? "Light ☀️" : "Dark  🌑"}
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default ThemeSettings;
