import React from "react";
import { Sandpack } from "@site/src/components/sandpack";

export function ViteHeadless() {
  return (
    <Sandpack
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
      }}
      showFiles
      files={{
        "/App.tsx": {
          code: AppTsxCode,
        },
        "src/refine-component.tsx": { code: RefineComponentCode.trim() },
        "src/other-component.tsx": {
          code: OtherComponentCode.trim(),
        },
      }}
    />
  );
}

const AppTsxCode = /* tsx */ `
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";

import { OtherComponent } from "./src/other-component";
import { RefineComponent } from "./src/refine-component";

const API_URL = "https://api.fake-rest.refine.dev";

export default function App() {
  return (
    <>
      <Refine dataProvider={dataProvider(API_URL)}>
        {/* You can use Refine hooks here */}
        <OtherComponent />
        <RefineComponent />
      </Refine>
    </>
  );
}
`;

const OtherComponentCode = `
export const OtherComponent = () => {
  return (
    <div>
      <p>Hello From My Existing Component</p>
      <p>This component represents your existing components.</p>
      <hr />
    </div>
  );
};

`;

const RefineComponentCode = /* tsx */ `
import { useShow } from "@refinedev/core";

export const RefineComponent = () => {
  const { queryResult } = useShow({ resource: "products", id: 1 });

  return (
    <div>
      <p>Hello From My Refine Component!</p>
      <code>{\`const { queryResult } = useShow({ resource: "products", id: 1 });\`}</code>
      <p>useShow hook queryResult:</p>
      <code>{JSON.stringify(queryResult.data, null, 2)}</code>
    </div>
  );
};
`;
