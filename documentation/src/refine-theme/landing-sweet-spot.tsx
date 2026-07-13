import React, { type FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  AuthenticationIcon,
  ChartsIcon,
  DataTablesIcon,
  FormsIcon,
  ListIcon,
  WizardsIcon,
} from "../components/landing/icons";
import useIsBrowser from "@docusaurus/useIsBrowser";
import { AnimatePresence, motion, useInView } from "framer-motion";

type Props = {
  className?: string;
};

export const LandingSweetSpot: FC<Props> = ({ className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const isBrowser = useIsBrowser();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeListItem = list[activeIndex];

  const [shouldIncrement, setShouldIncrement] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!shouldIncrement || isHovering) {
      return;
    }

    let interval: NodeJS.Timeout;
    if (inView) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % list.length);
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [shouldIncrement, inView, isHovering]);

  return (
    <div ref={ref} className={clsx(className, "w-full")}>
      <div className={clsx("not-prose", "w-full", "px-4 landing-md:px-10")}>
        <h2
          className={clsx(
            "text-2xl landing-sm:text-[32px]",
            "tracking-normal",
            "text-start",
            "font-medium",
            "p-0",
            "text-white",
          )}
        >
          The <span className={clsx("text-orange-400")}>sweet spot</span>{" "}
          between low-code and full-code.
        </h2>
        <p
          className={clsx(
            "mt-4 landing-sm:mt-7",
            "max-w-md",
            "text-base",
            "tracking-[-0.004em]",
            "text-zinc-300",
          )}
        >
          Drag-and-drop tools shine initially, but collapse under the weight of
          complexity. Refine Core offers comparable speed at the start and
          infinite scaling in the long run.
        </p>
      </div>

      <div className={clsx("mt-8 landing-sm:mt-12")}>
        <div
          className={clsx(
            "select-none",
            "relative",
            "h-[752px] landing-sm:h-[874px] landing-md:h-[984px] landing-lg:h-[688px]",
            "not-prose",
            "pt-4 landing-sm:pt-10 landing-lg:pt-20",
            "pb-4 landing-lg:pb-0",
            "pl-4 landing-sm:pl-10",
            "bg-zinc-800",
            "rounded-2xl landing-sm:rounded-3xl",
            "overflow-hidden",
          )}
        >
          {/* @ts-expect-error - Framer Motion v6 type incompatibility with React 17 */}
          <AnimatePresence>
            {/* @ts-expect-error - Framer Motion v6 type incompatibility with React 17 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              key={activeIndex}
              // @ts-expect-error - Framer Motion v6 type incompatibility with React 17
              className={clsx(
                "absolute",
                "inset-0",
                "z-0",
                activeListItem.backgroundImage,
                "landing-xs:bg-landing-sweet-spot-glow-position-xs",
                "landing-md:bg-landing-sweet-spot-glow-position-md",
                "landing-lg:bg-landing-sweet-spot-glow-position-lg",
                "bg-landing-sweet-spot-glow-size",
              )}
            />
          </AnimatePresence>
          <div
            className={clsx(
              "relative",
              "z-[1]",
              "h-full w-full",
              "flex flex-col landing-lg:grid landing-lg:grid-cols-12",
            )}
          >
            <div
              className={clsx(
                "not-prose",
                "pr-6 landing-sm:pr-0",
                "landing-sm:max-w-[540px] landing-md:max-w-[760px] landing-lg:max-w-[435px]",
                "landing-lg:col-span-5",
                "landing-lg:mt-16",
              )}
            >
              <h3
                className={clsx(
                  "text-base landing-sm:text-2xl font-normal",
                  "text-white",
                )}
              >
                {activeListItem.title}
              </h3>
              <p className={clsx("mt-6", "text-sm", "text-zinc-300")}>
                {activeListItem.description}
              </p>
              <div
                className={clsx(
                  "mt-4 landing-sm:mt-10",
                  "w-max",
                  "grid",
                  "grid-cols-2 landing-sm:grid-cols-3 landing-lg:grid-cols-2",
                  "landing-sm:gap-x-2 gap-y-4",
                  "not-prose",
                )}
              >
                {list.map((item, index) => {
                  const active = index === activeIndex;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.iconText}
                      onClick={() => {
                        setShouldIncrement(false);
                        setActiveIndex(index);
                      }}
                      onMouseEnter={() => {
                        setIsHovering(true);
                        setActiveIndex(index);
                      }}
                      onMouseLeave={() => {
                        setIsHovering(false);
                      }}
                      className={clsx(
                        "appearance-none",
                        "focus:outline-none",
                        "cursor-pointer",
                        active && "bg-black",
                        !active && "bg-zinc-900",
                        "w-max",
                        "flex",
                        "items-center",
                        "justify-start",
                        "gap-1",
                        "pl-2 pr-5 py-3",
                        "rounded-lg",
                        "text-sm landing-sm:text-base",
                      )}
                    >
                      <div>
                        <Icon active={active} />
                      </div>
                      <div
                        className={clsx(
                          active && "text-white",
                          !active && "text-zinc-400",
                        )}
                      >
                        {item.iconText}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            {isBrowser && (
              <div
                className={clsx(
                  "relative",
                  "h-full",
                  "mt-4 landing-sm:mt-[72px] landing-lg:mt-0",
                  "flex",
                  "landing-lg:col-start-7 landing-lg:col-end-13",
                  "-ml-8",
                )}
              >
                <div
                  className={clsx(
                    "w-full",
                    "h-full",
                    "landing-sweet-spot-mask",
                    "z-[1]",
                    "landing-lg:absolute",
                    "top-0 right-0",
                  )}
                >
                  {list.map((item, index) => {
                    const active = index === activeIndex;

                    return (
                      <img
                        key={index}
                        src={item.image}
                        alt="UI of refine"
                        className={clsx(
                          "block",
                          "object-cover",
                          "object-left-top",
                          "w-full landing-md:w-[874px] landing-lg:w-full",
                          "h-full landing-lg:h-[464px]",
                          "landing-md:pl-20 landing-lg:pl-0",
                          "absolute",
                          "top-0 right-0",
                          active && "delay-300",
                          active ? "translate-x-0" : "translate-x-full",
                          active ? "opacity-100" : "opacity-0",
                          "transition-[transform,opacity] duration-500 ease-in-out",
                        )}
                      />
                    );
                  })}
                </div>

                {list.map((item, index) => {
                  const active = index === activeIndex;

                  return (
                    <div
                      key={index}
                      className={clsx(
                        "block",
                        "z-[2]",
                        "w-[328px] landing-sm:w-[488px]",
                        "absolute",
                        "bottom-0 landing-sm:bottom-[4px] landing-lg:bottom-[78px]",
                        "-left-2 landing-lg:-left-20",
                        "rounded-xl",
                        "bg-zinc-800",
                        "shadow-landing-sweet-spot-code-dark",
                        active && "delay-300",
                        active ? "translate-y-0" : "translate-y-full",
                        active ? "opacity-100" : "opacity-0",
                        "transition-[transform,opacity] duration-500 ease-in-out",
                      )}
                    >
                      <img src={item.imageCode} alt="Code of refine" />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const list = [
  {
    title:
      "Business applications not only share fundamental UI elements, but also the underlying logic.",
    description:
      "Stop writing repetitive code for CRUD, security and state management. Let Refine Core automatically transform your UI elements to enterprise-grade:",
    icon: (props: { active: boolean }) => (
      <DataTablesIcon
        height={24}
        width={24}
        className={clsx(
          props.active && "text-[#FA3852]",
          !props.active && "text-zinc-500",
        )}
      />
    ),
    iconText: "Datatables",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/datatables.png",
    imageCode:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/datatables-code.png",
    backgroundImage: "bg-landing-sweet-spot-glow-red-dark",
  },
  {
    title:
      "Business applications not only share fundamental UI elements, but also the underlying logic.",
    description:
      "Stop writing repetitive code for CRUD, security and state management. Let Refine Core automatically transform your UI elements to enterprise-grade:",
    icon: (props: { active: boolean }) => (
      <ListIcon
        height={24}
        width={24}
        className={clsx(
          props.active && "text-[#F46A25]",
          !props.active && "text-zinc-500",
        )}
      />
    ),
    iconText: "List",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/list.png",
    imageCode:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/list-code.png",
    backgroundImage: "bg-landing-sweet-spot-glow-orange-dark",
  },
  {
    title:
      "Business applications not only share fundamental UI elements, but also the underlying logic.",
    description:
      "Stop writing repetitive code for CRUD, security and state management. Let Refine Core automatically transform your UI elements to enterprise-grade:",
    icon: (props: { active: boolean }) => (
      <ChartsIcon
        height={24}
        width={24}
        className={clsx(
          props.active && "text-[#F9D51F]",
          !props.active && "text-zinc-500",
        )}
      />
    ),
    iconText: "Charts",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/charts.png",
    imageCode:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/charts-code.png",
    backgroundImage: "bg-landing-sweet-spot-glow-yellow-dark",
  },
  {
    title:
      "Business applications not only share fundamental UI elements, but also the underlying logic.",
    description:
      "Stop writing repetitive code for CRUD, security and state management. Let Refine Core automatically transform your UI elements to enterprise-grade:",
    icon: (props: { active: boolean }) => (
      <FormsIcon
        height={24}
        width={24}
        className={clsx(
          props.active && "text-[#47D1BF]",
          !props.active && "text-zinc-500",
        )}
      />
    ),
    iconText: "Forms",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/forms.png",
    imageCode:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/forms-code.png",
    backgroundImage: "bg-landing-sweet-spot-glow-cyan-dark",
  },
  {
    title:
      "Business applications not only share fundamental UI elements, but also the underlying logic.",
    description:
      "Stop writing repetitive code for CRUD, security and state management. Let Refine Core automatically transform your UI elements to enterprise-grade:",
    icon: (props: { active: boolean }) => (
      <WizardsIcon
        height={24}
        width={24}
        className={clsx(
          props.active && "text-[#3DB8F5]",
          !props.active && "text-zinc-500",
        )}
      />
    ),
    iconText: "Wizards",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/wizards.png",
    imageCode:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/wizards-code.png",
    backgroundImage: "bg-landing-sweet-spot-glow-blue-dark",
  },
  {
    title:
      "Business applications not only share fundamental UI elements, but also the underlying logic.",
    description:
      "Stop writing repetitive code for CRUD, security and state management. Let Refine Core automatically transform your UI elements to enterprise-grade:",
    icon: (props: { active: boolean }) => (
      <AuthenticationIcon
        height={24}
        width={24}
        className={clsx(
          props.active && "text-[#5959FF]",
          !props.active && "text-zinc-500",
        )}
      />
    ),
    iconText: "Authentication",
    image:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/authentication.png",
    imageCode:
      "https://refine.ams3.cdn.digitaloceanspaces.com/refine-core/landing/authentication-code.png",
    backgroundImage: "bg-landing-sweet-spot-glow-indigo-dark",
  },
];
