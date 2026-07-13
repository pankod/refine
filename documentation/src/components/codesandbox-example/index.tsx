import React from "react";

import ExampleLocalPrompt from "../example-local-prompt";
import ExampleSourcePrompt from "../example-source-prompt";

type Props = {
  path?: string;
  hideSource?: boolean;
  hideLocal?: boolean;
  hideSandbox?: boolean;
};

const CodeSandboxExample: React.FC<Props> = ({
  path,
  hideSource,
  hideLocal,
  hideSandbox,
}) => {
  const CODESANDBOX_URL = `https://codesandbox.io/embed/github/refinedev/refine/tree/main/examples/${path}`;

  const EDITOR_URL = `${CODESANDBOX_URL}?view=preview&theme=dark&runonclick=1&codemirror=1`;

  return (
    <div className="refine-codesandbox-example">
      {!hideSource && <ExampleSourcePrompt path={path} />}
      {!hideLocal && <ExampleLocalPrompt path={path} />}
      {!hideSandbox && (
        <iframe
          loading="lazy"
          src={EDITOR_URL}
          style={{
            width: "100%",
            height: "80vh",
            border: "0px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
          title={path}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      )}
    </div>
  );
};

export default CodeSandboxExample;
