import React from "react";
import {
  IconCode,
  IconMessageCircle,
  IconCopy,
  IconCheck,
} from "@tabler/icons-react";

import { prettierFormat } from "../../utilities";
import type { CreateInferencerConfig } from "../../types";
import { CodeHighlight } from "../../components";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ visible, onClose, children }) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          backgroundColor: "#fff",
          maxWidth: "700px",
          borderRadius: "4px",
          padding: "16px",
          paddingTop: "32px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 6,
            width: "32px",
            height: "32px",
            fontSize: "24px",
            lineHeight: "32px",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={onClose}
        >
          &times;
        </div>
        {children}
      </div>
    </div>
  );
};

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

    const [isOpen, setIsOpen] = React.useState(false);

    const onOpen = React.useCallback(() => {
      setIsOpen(true);
    }, []);

    const onClose = React.useCallback(() => {
      setIsOpen(false);
    }, []);

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
          <div
            style={{
              position: "fixed",
              bottom: "12px",
              right: "64px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                gap: "12px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  display: "flex",
                  fontFamily: "sans-serif",
                  alignItems: "center",
                }}
                onClick={onOpen}
              >
                <IconCode size={18} />
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "14px",
                    color: "#666B7A",
                  }}
                >
                  Show Code
                </span>
              </button>
              <a
                href="https://github.com/refinedev/refine/discussions/3046"
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  color: "#666B7A",
                  fontFamily: "sans-serif",
                }}
              >
                <IconMessageCircle size={18} />
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "14px",
                    color: "#666B7A",
                  }}
                >
                  Give Feedback
                </span>
              </a>
            </div>
          </div>
          <div style={{ height: "50px" }} />
          <Modal visible={isOpen} onClose={onClose}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CodeHighlight
                  code={code}
                  wrapperProps={{
                    style: {
                      width: "100%",
                      maxHeight: "75vh",
                      height: "100%",
                      overflow: "auto",
                      backgroundColor: "rgb(30, 30, 30)",
                    },
                  }}
                />
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
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingTop: "8px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "4px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={copyCode}
                >
                  {isCopied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                  <span
                    style={{
                      marginLeft: "8px",
                      fontSize: "14px",
                      color: "#666B7A",
                    }}
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </span>
                </button>
              </div>
            </div>
          </Modal>
        </>
      );
    }

    return null;
  };
