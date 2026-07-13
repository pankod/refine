import React from "react";
import HighlightPrism, {
  type Language,
  defaultProps,
} from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

type Props = {
  code: string;
  language: Language;
  size?: string;
};

export const Highlight = ({ code, language, size }: Props) => {
  return (
    <HighlightPrism
      {...defaultProps}
      theme={{
        plain: {
          ...theme.plain,
          backgroundColor: "transparent",
          ...(size ? { fontSize: size } : {}),
        },
        styles: theme.styles,
      }}
      code={code}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span
                  key={key}
                  {...getTokenProps({
                    token,
                    key,
                  })}
                />
              ))}
            </div>
          ))}
        </pre>
      )}
    </HighlightPrism>
  );
};
