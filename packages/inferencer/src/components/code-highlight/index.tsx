import React, { useEffect } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";

/**
 * CodeHighlight component renders the code in a pretty way with `prism-react-renderer` library.
 * By default, code overflowing 50vh will be scrollable; this can be adjusted with the `wrapperProps` prop.
 */
export const CodeHighlight: React.FC<{
  code: string;
  wrapperProps?: React.ComponentProps<"div">;
}> = ({ code, wrapperProps }) => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.appendChild(
      document.createTextNode(
        `
                #code-highlight::-webkit-scrollbar {-webkit-appearance: none; height: 7px; width: 7px;}
                #code-highlight::-webkit-scrollbar-thumb {background-color: #666b7a;}
                #code-highlight::-webkit-scrollbar-corner {background-color: rgb(30, 30, 30);}
                `,
      ),
    );
    document.getElementById("code-highlight")?.appendChild(styleElement);
  }, []);

  return (
    <div
      id="code-highlight"
      style={{
        maxHeight: "75vh",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgb(30, 30, 30)",
      }}
      {...(wrapperProps ?? {})}
    >
      <Highlight {...defaultProps} theme={theme} code={code} language="tsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: "14px 14px 14px 14px",
              margin: "0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
