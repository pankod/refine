import React from "react";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";

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
      inputRef?.current?.setSelectionRange(0, 99999);
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
          <Box sx={{ position: "fixed", bottom: 12, right: 60 }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setVisible(true)}
                startIcon={<IconCode size={18} />}
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                Show Code
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component="a"
                target="_blank"
                href="https://github.com/refinedev/refine/discussions/3046"
                startIcon={<IconMessageCircle size={18} />}
                sx={{
                  whiteSpace: "nowrap",
                }}
              >
                Give Feedback
              </Button>
            </Box>
          </Box>
          <div style={{ height: "50px" }} />
          <Modal open={visible} onClose={() => setVisible(false)}>
            <Box
              sx={{
                position: "absolute",
                maxWidth: "800px",
                width: "100%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                boxShadow: 24,
              }}
            >
              <IconButton
                onClick={() => setVisible(false)}
                disableRipple
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: 56,
                  width: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconX size={18} style={{ color: "#666b7a" }} />
              </IconButton>
              <CodeHighlight code={code} />
              <textarea
                ref={inputRef}
                defaultValue={(code ?? "").replace(/\\n/g, "\r\n")}
                id="code-input"
                style={{ display: "none" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  right: 12,
                }}
              >
                <Button
                  key="copy"
                  sx={{
                    textTransform: "capitalize",
                    width: 100,
                  }}
                  startIcon={
                    isCopied ? (
                      <IconCheck size={18} style={{ color: "green" }} />
                    ) : (
                      <IconCopy size={18} />
                    )
                  }
                  color="inherit"
                  variant="contained"
                  onClick={copyCode}
                >
                  {isCopied ? "Copied" : "Copy"}
                </Button>
              </div>
            </Box>
          </Modal>
        </>
      );
    }

    return null;
  };
