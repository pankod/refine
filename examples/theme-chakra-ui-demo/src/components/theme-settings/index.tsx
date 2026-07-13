import { useModal } from "@refinedev/core";
import { RefineThemes, type RefineTheme } from "@refinedev/chakra-ui";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from "@chakra-ui/react";
import type { FC } from "react";

type ThemeName = keyof typeof RefineThemes;

interface Props {
  onColorClick: (theme: RefineTheme) => void;
}

export const ThemeSettings: FC<Props> = ({ onColorClick }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { visible, show, close } = useModal();

  return (
    <div>
      <Button
        sx={{
          position: "fixed",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={show}
      >
        Theme Settings
      </Button>
      <Modal isOpen={visible} onClose={close} size={"2xl"}>
        <ModalOverlay />
        <ModalContent p="4">
          <ModalHeader>Theme Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              {Object.keys(RefineThemes).map((name) => {
                const theme = RefineThemes[name as ThemeName];

                return (
                  <Button
                    p={8}
                    key={name}
                    onClick={() => {
                      onColorClick(theme);
                    }}
                    bg={theme.colors?.brand[500]}
                  >
                    {name}
                  </Button>
                );
              })}
            </HStack>

            <HStack pt={8}>
              <Button onClick={toggleColorMode}>
                Set Mode to {colorMode === "dark" ? "Light ☀️" : "Dark  🌑"}
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
