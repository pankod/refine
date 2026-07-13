import React from "react";

export const ConfigErrorPage = () => {
  return (
    <div
      style={{
        position: "fixed",
        zIndex: 11,
        inset: 0,
        overflow: "auto",
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
          background: "#14141FBF",
          backdropFilter: "blur(3px)",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            width: "100%",
            background: "#1D1E30",
            borderRadius: "16px",
            border: "1px solid #303450",
            boxShadow: "0px 0px 120px -24px #000000",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #303450",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              position: "relative",
            }}
          >
            <ErrorGradient
              style={{
                position: "absolute",
                left: 0,
                top: 0,
              }}
            />
            <div
              style={{
                lineHeight: "24px",
                fontSize: "16px",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <ErrorIcon />
              <span
                style={{
                  fontWeight: 400,
                }}
              >
                Configuration Error
              </span>
            </div>
          </div>
          <div
            style={{
              padding: "20px",
              color: "#A3ADC2",
              lineHeight: "20px",
              fontSize: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <p
              style={{
                margin: 0,
                padding: 0,
                lineHeight: "28px",
                fontSize: "16px",
              }}
            >
              <code
                style={{
                  display: "inline-block",
                  background: "#30345080",
                  padding: "0 4px",
                  lineHeight: "24px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                }}
              >
                {"<Refine />"}
              </code>{" "}
              is not initialized. Please make sure you have it mounted in your
              app and placed your components inside it.
            </p>
            <div>
              <ExampleImplementation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExampleImplementation = () => {
  return (
    <pre
      style={{
        display: "block",
        overflowX: "auto",
        borderRadius: "8px",
        fontSize: "14px",
        lineHeight: "24px",
        backgroundColor: "#14141F",
        color: "#E5ECF2",
        padding: "16px",
        margin: "0",
        maxHeight: "400px",
        overflow: "auto",
      }}
    >
      <span style={{ color: "#FF7B72" }}>import</span> {"{"} Refine, WelcomePage{" "}
      {"}"} <span style={{ color: "#FF7B72" }}>from</span>{" "}
      <span style={{ color: "#A5D6FF" }}>{'"@refinedev/core"'}</span>;{"\n"}
      {"\n"}
      <span style={{ color: "#FF7B72" }}>export</span>{" "}
      <span style={{ color: "#FF7B72" }}>default</span>{" "}
      <span>
        <span style={{ color: "#FF7B72" }}>function</span>{" "}
        <span style={{ color: "#FFA657" }}>App</span>
        (
        <span style={{ color: "rgb(222, 147, 95)" }} />){" "}
      </span>
      {"{"}
      {"\n"}
      {"  "}
      <span style={{ color: "#FF7B72" }}>return</span> ({"\n"}
      {"    "}
      <span>
        <span style={{ color: "#79C0FF" }}>
          &lt;
          <span style={{ color: "#79C0FF" }}>Refine</span>
          {"\n"}
          {"      "}
          <span style={{ color: "#E5ECF2", opacity: 0.6 }}>
            {"// "}
            <span>...</span>
          </span>
          {"\n"}
          {"    "}&gt;
        </span>
        {"\n"}
        {"      "}
        <span style={{ opacity: 0.6 }}>
          {"{"}
          {"/* ... */"}
          {"}"}
        </span>
        {"\n"}
        {"      "}
        <span style={{ color: "#79C0FF" }}>
          &lt;
          <span style={{ color: "#79C0FF" }}>WelcomePage</span> /&gt;
        </span>
        {"\n"}
        {"      "}
        <span style={{ opacity: 0.6 }}>
          {"{"}
          {"/* ... */"}
          {"}"}
        </span>
        {"\n"}
        {"    "}
        <span style={{ color: "#79C0FF" }}>
          &lt;/
          <span style={{ color: "#79C0FF" }}>Refine</span>
          &gt;
        </span>
      </span>
      {"\n"}
      {"  "});{"\n"}
      {"}"}
    </pre>
  );
};

const ErrorGradient = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={204}
    height={56}
    viewBox="0 0 204 56"
    fill="none"
    {...props}
  >
    <path fill="url(#welcome-page-error-gradient-a)" d="M12 0H0v12L12 0Z" />
    <path
      fill="url(#welcome-page-error-gradient-b)"
      d="M28 0h-8L0 20v8L28 0Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-c)"
      d="M36 0h8L0 44v-8L36 0Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-d)"
      d="M60 0h-8L0 52v4h4L60 0Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-e)"
      d="M68 0h8L20 56h-8L68 0Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-f)"
      d="M92 0h-8L28 56h8L92 0Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-g)"
      d="M100 0h8L52 56h-8l56-56Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-h)"
      d="M124 0h-8L60 56h8l56-56Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-i)"
      d="M140 0h-8L76 56h8l56-56Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-j)"
      d="M132 0h8L84 56h-8l56-56Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-k)"
      d="M156 0h-8L92 56h8l56-56Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-l)"
      d="M164 0h8l-56 56h-8l56-56Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-m)"
      d="M188 0h-8l-56 56h8l56-56Z"
    />
    <path
      fill="url(#welcome-page-error-gradient-n)"
      d="M204 0h-8l-56 56h8l56-56Z"
    />
    <defs>
      <radialGradient
        id="welcome-page-error-gradient-a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-b"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-c"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-d"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-e"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-f"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-g"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-h"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-i"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-j"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-k"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-l"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-m"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
      <radialGradient
        id="welcome-page-error-gradient-n"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="scale(124)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF4C4D" stopOpacity={0.1} />
        <stop offset={1} stopColor="#FF4C4D" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);

const ErrorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="#FF4C4D"
      fillRule="evenodd"
      d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Z"
      clipRule="evenodd"
    />
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7 8a1 1 0 1 0 2 0V5a1 1 0 1 0-2 0v3Zm0 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
      clipRule="evenodd"
    />
  </svg>
);
