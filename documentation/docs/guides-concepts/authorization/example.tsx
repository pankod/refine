import React from "react";

import { Sandpack } from "@site/src/components/sandpack";

export function AccessControlExample() {
  return (
    <Sandpack
      showNavigator
      dependencies={{
        "@refinedev/core": "latest",
        "@refinedev/simple-rest": "latest",
        "@refinedev/react-router": "latest",
        "react-router": "^7.0.2",
      }}
      startRoute="/payments/1"
      files={{
        "/App.tsx": {
          code: AppTsxCode,
          hidden: true,
        },
        "/style.css": {
          code: StyleCssCode,
          hidden: true,
        },
        "/access-control.ts": {
          code: AccessControlCode,
          active: true,
        },
        "/show.tsx": {
          code: ShowTsxCode,
        },
      }}
    />
  );
}

const AccessControlCode = /* ts */ `
import { AccessControlProvider } from "@refinedev/core";

const role = "editor";
// Uncomment this line and refresh to see difference.
// const role = "admin";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ action, resource, params }) => {
    console.log(action, resource, params);

    if (
      role === "admin" &&
      ["field", "refund", "approve"].includes(action)
    ) {
      return {
        can: true,
      };
    }

    return {
      can: false,
      reason: "Unauthorized",
    };
  },
};
`.trim();

const AppTsxCode = /* tsx */ `
import React from "react";

import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router";

import "./style.css";

import { accessControlProvider } from "./access-control.ts";
import { PaymentShow } from "./show.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Refine
      accessControlProvider={accessControlProvider}
        routerProvider={routerProvider}
        dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
        resources={[
          {
            name: "payments",
            show: "/payments/:id",
          },
        ]}
      >
        <Routes>
          <Route path="/payments/:id" element={<PaymentShow />} />
        </Routes>
      </Refine>
    </BrowserRouter>
  );
}
`.trim();

const StyleCssCode = `
html {
    margin: 0;
    padding: 0;
}
body {
    margin: 0;
    padding: 12px;
}
* {
    box-sizing: border-box;
}
body {
    font-family: sans-serif;
}
form label, form input, form button {
    display: block;
    width: 100%;
    margin-bottom: 6px;
}
span + button {
    margin-left: 6px;
}
ul > li {
    margin-bottom: 6px;
}
`.trim();

const ShowTsxCode = `
import { CanAccess, useCan } from "@refinedev/core";

export const PaymentShow: React.FC = () => {
  const { data } = useCan({
    resource: "payments",
    action: "refund",
    params: { id: 1 },
  });

  return (
    <>
      <h1>Payment Details</h1>
      <p>
        <b>ID</b>: <span>1</span>
      </p>
      <p>
        <b>Amount</b>: <span>$100</span>
      </p>
      <p>
        <b>Transaction ID</b>:
        <span>
          <CanAccess
            resource="payments"
            action="field"
            params={{ field: "transactionId" }}
            fallback={<>This field is only visible to admin users.</>}
          >
            <span>123456789</span>
          </CanAccess>
        </span>
      </p>
      <button disabled={!data?.can}>
        {data?.can ? "Refund" : data?.reason}
      </button>
    </>
  );
};
`.trim();
