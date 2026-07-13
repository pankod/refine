import React from "react";
import { Affix, Button, Modal, Group, ActionIcon } from "@mantine/core";
import {
  IconCode,
  IconMessageCircle,
  IconX,
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

    const [visible, setVisible] = React.useState(false);
    const [isCopied, setIsCopied] = React.useState(false);

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
          <Affix position={{ bottom: 12, right: 60 }}>
            <Group spacing="xs">
              <Button
                leftIcon={<IconCode size={18} />}
                variant="filled"
                color="primary"
                onClick={() => setVisible(true)}
              >
                Show Code
              </Button>
              <Button
                leftIcon={<IconMessageCircle size={18} />}
                variant="default"
                component="a"
                target="_blank"
                href="https://github.com/refinedev/refine/discussions/3046"
              >
                Give Feedback
              </Button>
            </Group>
          </Affix>
          <div style={{ height: "50px" }} />
          <Modal
            size={800}
            opened={visible}
            onClose={() => setVisible(false)}
            styles={{
              modal: {
                padding: "0px !important",
                borderRadius: 0,
              },
              header: { display: "none" },
            }}
          >
            <ActionIcon
              onClick={() => setVisible(false)}
              variant="transparent"
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                height: 56,
                width: 56,
              }}
            >
              <IconX size={18} style={{ color: "#666b7a" }} />
            </ActionIcon>
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
            <Button
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                width: 115,
              }}
              key="copy"
              variant="default"
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
          </Modal>
        </>
      );
    }

    return null;
  };
