import React from "react";
import clsx from "clsx";
import { ArrowRightIcon } from "./icons/arrow-right";
import { RedoIcon } from "./icons/redo";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Highlight, { defaultProps } from "prism-react-renderer";
import { usePrismTheme } from "@docusaurus/theme-common";

const WalkthroughCodeWindow = ({ code }: { code: string }) => {
  const theme = usePrismTheme();
  return (
    <div
      className={clsx(
        "w-full",
        "min-w-[430px]",
        "max-w-[430px]",
        "rounded-lg",
        "ring-4",
        "ring-refine-bg",
        "bg-gray-700",
        "flex flex-col",
      )}
    >
      <div
        className={clsx(
          "p-3",
          "border-b",
          "border-b-gray-800",
          "flex items-center justify-start",
          "gap-1",
        )}
      >
        {["#FF5F5A", "#FFBE2E", "#2ACA44"].map((c) => (
          <div
            key={c}
            className={clsx("rounded-full", "w-2", "h-2")}
            style={{
              backgroundColor: c,
            }}
          />
        ))}
      </div>
      <div
        className={clsx(
          "px-4",
          "pb-12",
          "pt-4",
          "w-full",
          "flex-1",
          "font-mono",
          "text-[12px] leading-[16px]",
          "text-gray-0",
        )}
      >
        <Highlight
          {...defaultProps}
          theme={theme}
          code={`${code ?? ""}`.trim()}
          language="tsx"
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line })} key={`${code}-${i}`}>
                  {line.map((token, key) => {
                    const content = `${token.content}`.replace(
                      "___",
                      "&nbsp;&nbsp;&nbsp;&nbsp;",
                    );

                    const { children: _children, ...tokenProps } =
                      getTokenProps({
                        token,
                      });

                    return (
                      <span
                        {...tokenProps}
                        key={`${token.content}-${key}`}
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: explicitly disabled
                        dangerouslySetInnerHTML={{
                          __html: content,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </>
          )}
        </Highlight>
      </div>
    </div>
  );
};

const WalkthroughNextButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, translateY: 30, rotateX: -90 }}
      animate={{
        opacity: 1,
        rotateX: 0,
        translateY: 0,
      }}
      exit={{ opacity: 0, rotateX: -90, translateY: 30 }}
      transition={{
        duration: 0.3,
        delay: 0.4,
      }}
      className={clsx(
        "-mt-6",
        "ml-4",
        "overflow-hidden",
        "p-px",
        "rounded-[8px]",
        "relative",
        "w-auto",
        "flex",
        "ring-4",
        "ring-refine-bg",
        "group",
        "focus:outline-none",
        "z-[1]",
      )}
      onClick={onClick}
    >
      <div
        className={clsx(
          "bg-walkthrough-button-shadow",
          "w-[300px]",
          "aspect-square",
          "h-auto",
          "absolute",
          "-left-[calc(150px-50%)]",
          "-top-[calc(150px-calc(48px/2))]",
          "animate-spin-slow",
        )}
      />
      <div
        className={clsx(
          "py-3",
          "px-5",
          "bg-refine-walkthrough-button-bg",
          "flex-shrink-0",
          "flex",
          "z-[1]",
          "rounded-[7px]",
          "text-gray-0",
          "group-hover:brightness-110",
          "transition-[filter]",
          "duration-200",
          "ease-in-out",
        )}
      >
        {children}
      </div>
    </motion.button>
  );
};

const WalkthroughRestartButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      type="button"
      className={clsx(
        "-mt-6",
        "ml-4",
        "overflow-hidden",
        "p-px",
        "rounded-[8px]",
        "relative",
        "w-auto",
        "flex",
        "ring-4",
        "ring-refine-bg",
        "group",
        "focus:outline-none",
        "z-[1]",
      )}
      initial={{ opacity: 0, translateY: 30, rotateX: -90 }}
      animate={{
        opacity: 1,
        rotateX: 0,
        translateY: 0,
      }}
      exit={{ opacity: 0, rotateX: -90, translateY: 30 }}
      transition={{
        duration: 0.3,
        delay: 0.4,
      }}
      onClick={onClick}
    >
      <div
        className={clsx(
          "bg-walkthrough-button-alt-shadow",
          "w-[300px]",
          "aspect-square",
          "h-auto",
          "absolute",
          "-left-[calc(150px-50%)]",
          "-top-[calc(150px-calc(48px/2))]",
          "animate-spin-slow",
        )}
      />
      <div
        className={clsx(
          "py-3",
          "px-5",
          "bg-refine-walkthrough-button-alt-bg",
          "flex-shrink-0",
          "flex",
          "z-[1]",
          "rounded-[7px]",
          "text-gray-0",
          "group-hover:brightness-110",
          "transition-[filter]",
          "duration-200",
          "ease-in-out",
        )}
      >
        <span
          className={clsx(
            "whitespace-nowrap",
            "flex items-center justify-center",
            "gap-2",
            "text-base",
            "text-gray-0",
          )}
        >
          <span>
            <RedoIcon />
          </span>
          <span>
            <span className="font-semibold">Start Over</span>
          </span>
        </span>
      </div>
    </motion.button>
  );
};

const WalkthroughNextButtonLabel = ({ text }: { text: string }) => {
  return (
    <span
      className={clsx(
        "whitespace-nowrap",
        "flex items-center justify-center",
        "gap-3",
        "text-base",
        "text-gray-0",
      )}
    >
      <span>
        <span className="font-normal">Next: </span>
        <span className="font-semibold">{text}</span>
      </span>
      <span>
        <ArrowRightIcon />
      </span>
    </span>
  );
};

const WalkthroughPhaseWrapper = ({
  onClick,
  text,
  code,
  end,
}: {
  onClick: () => void;
  code: string;
  text?: string;
  end?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{ opacity: 0, y: -80, scale: 0.9 }}
      transition={{
        duration: 0.23,
      }}
      className={clsx("absolute", "left-0", "bottom-0")}
    >
      <AnimatePresence>
        <WalkthroughCodeWindow code={code} />
        {end && <WalkthroughRestartButton onClick={onClick} />}
        {text && (
          <WalkthroughNextButton onClick={onClick}>
            <WalkthroughNextButtonLabel text={text} />
          </WalkthroughNextButton>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const walkthroughPhases = [
  "initial",
  "add-your-backend",
  "hook-the-table",
  "add-your-ui-framework",
  "add-more-crud-functions",
  "add-more-routes",
  "secure-your-app",
  "restart",
] as const;

type WalkthroughPhase = (typeof walkthroughPhases)[number];

const phaseCheckpoints: Record<(typeof walkthroughPhases)[number], number> = {
  initial: 0.0,
  "add-your-backend": 0.8,
  "hook-the-table": 1.7,
  "add-your-ui-framework": 8,
  "add-more-crud-functions": 16,
  "add-more-routes": 17,
  "secure-your-app": 17.9,
  restart: 23.8,
};

const phaseData: Record<
  WalkthroughPhase,
  {
    code?: string;
    text?: string;
    end?: boolean;
  }
> = {
  initial: {},
  "add-your-backend": {
    code: `
import { Refine } from "@refinedev/core";
/* ... */
<Route path="/orders" element={<MyCustomTable />} />
`,
    text: "Add your Backend",
  },
  "hook-the-table": {
    code: `
import dataProvider from "@refinedev/nestjsx-crud";
`,
    text: "Hook the Table",
  },
  "add-your-ui-framework": {
    code: `
import { useTable } from "@refinedev/core";
/* ... */
const tableValues = useTable();
/* ... */
<table>{...}</table>
`,
    text: "Add your UI Framework",
  },
  "add-more-crud-functions": {
    code: `
import { Table } from "antd";
import { Layout, List } from "@refinedev/antd";
import { useTable } from "@refinedev/antd";
`,
    text: "Add more CRUD functions",
  },
  "add-more-routes": {
    code: `
{
___name: "orders",
___list: "/orders",
___show: "/orders/show/:id",
___create: "/orders/create",
___edit: "/orders/edit:id",
}
`,
    text: "Add more Routes",
  },
  "secure-your-app": {
    code: `
<Route path="/orders" element={<OrdersPage />} />
<Route path="/products" element={<ProductsPage />} />
<Route path="/customers" element={<CustomersPage />} />
`,
    text: "Secure your App",
  },
  restart: {
    code: `
import { AuthPage } from "@refinedev/antd";
import { Auth0Provider } from "@auth0/auth0-react";
`,
    end: true,
  },
};

const getNextPhase = (phase: WalkthroughPhase) => {
  const currentIndex = walkthroughPhases.indexOf(phase);
  if (currentIndex === -1) {
    return "initial";
  }
  if (currentIndex === walkthroughPhases.length - 1) {
    return "initial";
  }
  return walkthroughPhases[currentIndex + 1];
};

const isAtCheckpoint = (currentTime: number, phase: WalkthroughPhase) => {
  // we can consider the checkpoint to be reached if we're at exact time or past 0.25s
  const lowerBound = phaseCheckpoints[phase];
  const upperBound = phaseCheckpoints[phase] + 0.125;
  return currentTime >= lowerBound && currentTime <= upperBound;
};

export const LandingWalkthroughVideo = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = React.useState<WalkthroughPhase>("initial");
  const [isPlaying, setIsPlaying] = React.useState(false);

  const inView = useInView(videoRef, {
    amount: "all",
    once: true,
  });

  const onTime = React.useCallback(
    (currentTime: number) => {
      const nextPhase = getNextPhase(phase);

      const atNext = isAtCheckpoint(currentTime, nextPhase);

      if (atNext) {
        videoRef?.current?.pause();
        setPhase(nextPhase);
      }
    },
    [phase],
  );

  React.useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        onTime(videoRef.current?.currentTime);
      }, 10);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying]);

  const onPhaseClick = React.useCallback(() => {
    videoRef.current?.play();
  }, []);

  React.useEffect(() => {
    if (inView) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [inView]);

  return (
    <div
      className={clsx(
        "w-full",
        "flex",
        "items-center",
        "justify-center",
        "relative",
      )}
    >
      <video
        ref={videoRef}
        muted={true}
        playsInline={true}
        controls={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
          }
          setPhase("initial");
        }}
        className={clsx(
          "w-full h-full opacity-[0.99]",
          "max-w-screen-walkthrough",
        )}
      >
        <source
          src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/refine-walkthrough.mov"
          type='video/mp4; codecs="hvc1"'
        />
        <source
          src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/assets/refine-walkthrough.webm"
          type="video/webm;"
        />
      </video>
      <div className={clsx("absolute", "left-0", "bottom-11")}>
        <AnimatePresence>
          {phase !== "initial" && !isPlaying && (
            <WalkthroughPhaseWrapper
              key={phase}
              code={phaseData[phase].code ?? ""}
              text={phaseData[phase].text}
              end={phaseData[phase].end}
              onClick={onPhaseClick}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
