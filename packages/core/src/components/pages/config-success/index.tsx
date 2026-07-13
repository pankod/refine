import React, { useState } from "react";

import { useMediaQuery } from "@definitions/helpers";

type CardInfo = {
  title: string;
  description: string;
  link: string;
  iconUrl: string;
};

const cards: CardInfo[] = [
  {
    title: "Documentation",
    description:
      "Learn about the technical details of using Refine in your projects.",
    link: "https://refine.dev/docs",
    iconUrl:
      "https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/book.svg",
  },
  {
    title: "Tutorial",
    description:
      "Learn how to use Refine by building a fully-functioning CRUD app, from scratch to full launch.",
    link: "https://refine.dev/tutorial",
    iconUrl:
      "https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/hat.svg",
  },
  {
    title: "Templates",
    description:
      "Explore a range of pre-built templates, perfect everything from admin panels to dashboards and CRMs.",
    link: "https://refine.dev/templates",
    iconUrl:
      "https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/application.svg",
  },
  {
    title: "Community",
    description: "Join our Discord community and keep up with the latest news.",
    link: "https://discord.gg/refine",
    iconUrl:
      "https://refine.ams3.cdn.digitaloceanspaces.com/welcome-page/discord.svg",
  },
];

/**
 * It is a page that welcomes you after the configuration is completed.
 */
export const ConfigSuccessPage: React.FC = () => {
  const isTablet = useMediaQuery("(max-width: 1010px)");
  const isMobile = useMediaQuery("(max-width: 650px)");

  const getGridTemplateColumns = () => {
    if (isMobile) {
      return "1, 280px";
    }
    if (isTablet) {
      return "2, 280px";
    }
    return "4, 1fr";
  };

  const getHeaderFontSize = () => {
    if (isMobile) {
      return "32px";
    }
    if (isTablet) {
      return "40px";
    }
    return "48px";
  };

  const getSubHeaderFontSize = () => {
    if (isMobile) {
      return "16px";
    }
    if (isTablet) {
      return "20px";
    }
    return "24px";
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 10,
        inset: 0,
        overflow: "auto",
        width: "100dvw",
        height: "100dvh",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          background: isMobile
            ? "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(88.89% 50% at 50% 100%, rgba(38, 217, 127, 0.10) 0%, rgba(38, 217, 127, 0.00) 100%), radial-gradient(88.89% 50% at 50% 0%, rgba(71, 235, 235, 0.15) 0%, rgba(71, 235, 235, 0.00) 100%), #1D1E30"
            : isTablet
              ? "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(66.67% 50% at 50% 100%, rgba(38, 217, 127, 0.10) 0%, rgba(38, 217, 127, 0.00) 100%), radial-gradient(66.67% 50% at 50% 0%, rgba(71, 235, 235, 0.15) 0%, rgba(71, 235, 235, 0.00) 100%), #1D1E30"
              : "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/landing-noise.webp), radial-gradient(35.56% 50% at 50% 100%, rgba(38, 217, 127, 0.12) 0%, rgba(38, 217, 127, 0) 100%), radial-gradient(35.56% 50% at 50% 0%, rgba(71, 235, 235, 0.18) 0%, rgba(71, 235, 235, 0) 100%), #1D1E30",
          minHeight: "100%",
          minWidth: "100%",
          fontFamily: "Arial",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            zIndex: 2,
            position: "absolute",
            width: isMobile ? "400px" : "800px",
            height: "552px",
            opacity: "0.5",
            background:
              "url(https://refine.ams3.cdn.digitaloceanspaces.com/assets/welcome-page-hexagon.png)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
        <div style={{ height: isMobile ? "40px" : "80px" }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              backgroundRepeat: "no-repeat",
              backgroundSize: isMobile ? "112px 58px" : "224px 116px",
              backgroundImage:
                "url(https://refine.ams3.cdn.digitaloceanspaces.com/assets/refine-logo.svg)",
              width: isMobile ? 112 : 224,
              height: isMobile ? 58 : 116,
            }}
          />
        </div>
        <div
          style={{
            height: isMobile ? "120px" : isTablet ? "200px" : "30vh",
            minHeight: isMobile ? "120px" : isTablet ? "200px" : "200px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: getHeaderFontSize(),
              fontWeight: 700,
              margin: "0px",
            }}
          >
            Welcome Aboard!
          </h1>
          <h4
            style={{
              fontSize: getSubHeaderFontSize(),
              fontWeight: 400,
              margin: "0px",
            }}
          >
            Your configuration is completed.
          </h4>
        </div>
        <div style={{ height: "64px" }} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${getGridTemplateColumns()})`,
            justifyContent: "center",
            gap: "48px",
            paddingRight: "16px",
            paddingLeft: "16px",
            paddingBottom: "32px",
            maxWidth: "976px",
            margin: "auto",
          }}
        >
          {cards.map((card) => (
            <Card key={`welcome-page-${card.title}`} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

type CardProps = {
  card: CardInfo;
};

const Card: React.FC<CardProps> = ({ card }) => {
  const { title, description, iconUrl, link } = card;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <a
          onPointerEnter={() => setIsHover(true)}
          onPointerLeave={() => setIsHover(false)}
          style={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
            textDecoration: "none",
          }}
          href={link}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${iconUrl})`,
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              marginLeft: "13px",
              marginRight: "14px",
            }}
          >
            {title}
          </span>
          <svg
            style={{
              transition:
                "transform 0.5s ease-in-out, opacity 0.2s ease-in-out",
              ...(isHover && {
                transform: "translateX(4px)",
                opacity: 1,
              }),
            }}
            width="12"
            height="8"
            fill="none"
            opacity="0.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.293.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L8.586 5H1a1 1 0 0 1 0-2h7.586L7.293 1.707a1 1 0 0 1 0-1.414Z"
              fill="#fff"
            />
          </svg>
        </a>
      </div>
      <span
        style={{
          fontSize: "12px",
          opacity: 0.5,
          lineHeight: "16px",
        }}
      >
        {description}
      </span>
    </div>
  );
};
