import React from "react";
import {
  Box,
  Button,
  Modal,
  HStack,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import {
  IconCode,
  IconMessageCircle,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";

import { prettierFormat } from "../../utilities";
import type { CreateInferencerConfig } from "../../types";
import { CodeHighlight } from "../../components";

/**
 * @deprecated Please use `SharedCodeViewer` instead
 */
export const CodeViewerComponent: CreateInferencerConfig["codeViewerComponent"] =
  ({ code: rawCode, loading }) => {
    const code = React.useMemo(() => {
      return prettierFormat(rawCode ?? "");
    }, [rawCode]);

    const inputRef = React.useRef<HTMLTextAreaElement>(null);

    const [isCopied, setIsCopied] = React.useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    if (loading) {
      return null;
    }

    const copyCode = () => {
      inputRef?.current?.select();
      inputRef?.current?.setSelectionRange(0, Number.MAX_SAFE_INTEGER);
      if (typeof navigator !== "undefined") {
        navigator.clipboard.writeText(inputRef?.current?.value ?? "");
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      }
    };

    if (code) {
      return (
        <>
          <Box position="fixed" bottom="12px" right="60px">
            <HStack spacing={4}>
              <Button
                variant="solid"
                colorScheme="green"
                leftIcon={<IconCode size={18} />}
                onClick={onOpen}
              >
                Show Code
              </Button>
              <Button
                colorScheme="gray"
                variant="solid"
                leftIcon={<IconMessageCircle size={18} />}
                as="a"
                target="_blank"
                href="https://github.com/refinedev/refine/discussions/3046"
              >
                Give Feedback
              </Button>
            </HStack>
          </Box>
          <div style={{ height: "50px" }} />
          <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "56px",
                  width: "56px",
                  color: "#666b7a",
                }}
              />
              <ModalBody sx={{ padding: 0 }}>
                <CodeHighlight code={code} />
                <textarea
                  ref={inputRef}
                  defaultValue={(code ?? "").replace(/\\n/g, "\r\n")}
                  id="code-input"
                  style={{
                    padding: 0,
                    margin: 0,
                    width: 0,
                    height: 0,
                    opacity: 0,
                    border: "none",
                    display: "block",
                  }}
                />
              </ModalBody>
              <Button
                sx={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  width: 100,
                }}
                key="copy"
                leftIcon={
                  isCopied ? (
                    <IconCheck size={18} style={{ color: "green" }} />
                  ) : (
                    <IconCopy size={18} />
                  )
                }
                onClick={copyCode}
              >
                {isCopied ? "Copied" : "Copy"}
              </Button>
            </ModalContent>
          </Modal>
        </>
      );
    }

    return null;
  };
