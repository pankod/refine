import React from "react";
import * as Icons from "@ant-design/icons";
import { Button, Modal, Space } from "antd";

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

    const [open, setOpen] = React.useState(false);
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
          <div style={{ position: "fixed", bottom: 12, right: 60 }}>
            <Space>
              <Button
                type="primary"
                onClick={() => setOpen(true)}
                icon={<Icons.CodeOutlined />}
              >
                Show Code
              </Button>
              <Button
                type="default"
                target="_blank"
                href="https://github.com/refinedev/refine/discussions/3046"
                icon={<Icons.MessageOutlined />}
              >
                Give Feedback
              </Button>
            </Space>
          </div>
          <div style={{ height: "50px" }} />
          <Modal
            width={800}
            open={open}
            onCancel={() => setOpen(false)}
            closeIcon={<Icons.CloseOutlined style={{ color: "#666b7a" }} />}
            footer={null}
            styles={{
              body: {
                padding: 0,
              },
            }}
          >
            <CodeHighlight code={code} />
            <textarea
              ref={inputRef}
              defaultValue={(code ?? "").replace(/\\n/g, "\r\n")}
              id="code-input"
              aria-hidden="true"
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
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                width: 100,
              }}
              key="copy"
              type="default"
              icon={
                isCopied ? (
                  <Icons.CheckOutlined style={{ color: "green" }} />
                ) : (
                  <Icons.CopyOutlined />
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
