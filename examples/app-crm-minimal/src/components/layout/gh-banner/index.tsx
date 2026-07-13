import React, { type SVGProps, useEffect } from "react";

import { CSSRules } from "./styles";

export const GitHubBanner = () => {
  useEffect(() => {
    const styleTag = document.createElement("style");
    document.head.appendChild(styleTag);
    CSSRules.forEach((rule) =>
      styleTag.sheet?.insertRule(rule, styleTag.sheet.cssRules.length),
    );
  }, []);

  return (
    <div
      className="banner bg-top-announcement"
      style={{
        width: "100%",
        height: "48px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "100vw",
          height: "100%",
          borderBottom: "1px solid #47ebeb26",
        }}
      >
        <div
          className="top-announcement-mask"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            borderBottom: "1px solid #47ebeb26",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "960px",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                width: "calc(50% - 300px)",
                height: "100%",
                position: "relative",
              }}
            >
              <GlowSmall
                style={{
                  animationDelay: "1.5s",
                  position: "absolute",
                  top: "2px",
                  right: "220px",
                }}
                id={"1"}
              />
              <GlowSmall
                style={{
                  animationDelay: "1s",
                  position: "absolute",
                  top: "8px",
                  right: "100px",
                  transform: "rotate(180deg)",
                }}
                id={"2"}
              />
              <GlowBig
                style={{
                  position: "absolute",
                  right: "10px",
                }}
                id={"3"}
              />
            </div>

            <div
              style={{
                width: "calc(50% - 300px)",
                height: "100%",
                position: "relative",
              }}
            >
              <GlowSmall
                style={{
                  animationDelay: "2s",
                  position: "absolute",
                  top: "6px",
                  right: "180px",
                  transform: "rotate(180deg)",
                }}
                id={"4"}
              />
              <GlowSmall
                style={{
                  animationDelay: "0.5s",
                  transitionDelay: "1.3s",
                  position: "absolute",
                  top: "2px",
                  right: "40px",
                }}
                id={"5"}
              />
              <GlowBig
                style={{
                  position: "absolute",
                  right: "-70px",
                }}
                id={"6"}
              />
            </div>
          </div>
        </div>
        <Text />
      </div>
    </div>
  );
};

const Text = () => {
  return (
    <a
      className="gh-link"
      href="https://github.com/refinedev/refine/tree/main/examples/app-crm-minimal"
      target="_blank"
      rel="noreferrer"
      style={{
        position: "absolute",
        height: "100%",
        padding: "0 60px",
        display: "flex",
        flexWrap: "nowrap",
        whiteSpace: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "linear-gradient(90deg, rgba(31, 63, 72, 0.00) 0%, #1F3F48 10%, #1F3F48 90%, rgba(31, 63, 72, 0.00) 100%)",
      }}
    >
      <div
        style={{
          color: "#fff",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          fontSize: "16px",
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "32px",
          }}
        >
          💡
        </span>
        <span className="text">
          This example is open-source! Get the full source code.
        </span>
      </div>
    </a>
  );
};

const GlowSmall = ({ style, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      height={40}
      fill="none"
      style={{
        opacity: 1,
        animation: "top-announcement-glow 1s ease-in-out infinite alternate",
        ...style,
      }}
    >
      <circle cx={40} r={40} fill={`url(#${props.id}-a)`} fillOpacity={0.5} />
      <defs>
        <radialGradient
          id={`${props.id}-a`}
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 40 -40 0 40 0)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#47EBEB" />
          <stop offset={1} stopColor="#47EBEB" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
};

const GlowBig = ({ style, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={120}
    height={48}
    fill="none"
    {...props}
    style={{
      opacity: 1,
      animation: "top-announcement-glow 1s ease-in-out infinite alternate",
      ...style,
    }}
  >
    <circle
      cx={60}
      cy={24}
      r={60}
      fill={`url(#${props.id}-a)`}
      fillOpacity={0.5}
    />
    <defs>
      <radialGradient
        id={`${props.id}-a`}
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0 60 -60 0 60 24)"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#47EBEB" />
        <stop offset={1} stopColor="#47EBEB" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);
