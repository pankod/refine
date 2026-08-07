import clsx from "clsx";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

import {
  Airtable,
  Antd,
  Appwrite,
  Chakra,
  Graphql,
  Hasura,
  Mantine,
  Mui,
  Nest,
  Rest,
  Strapi,
  Supabase,
} from "../assets/integration-icons";

const dataItems = [
  {
    icon: Appwrite,
    label: "Appwrite",
    packageName: "appwrite",
  },
  {
    icon: Nest,
    label: "NestJS",
    packageName: "nestjsx-crud",
  },
  {
    icon: Strapi,
    label: "Strapi",
    packageName: "strapi-v4",
  },
  {
    icon: Airtable,
    label: "Airtable",
    packageName: "airtable",
  },
  {
    icon: Supabase,
    label: "Supabase",
    packageName: "supabase",
  },
  {
    icon: Hasura,
    label: "Hasura",
    packageName: "hasura",
  },
  {
    icon: (props) => (
      <Rest {...props} className={clsx(props.className, "!text-gray-0")} />
    ),
    label: "REST API",
    packageName: "simple-rest",
  },
  {
    icon: Graphql,
    label: "GraphQL",
    packageName: "graphql",
  },
  {
    icon: Appwrite,
    label: "Appwrite",
    packageName: "appwrite",
  },
];

const uiItems = [
  {
    icon: Mui,
    label: "Material UI",
    packageName: "mui",
    dependencyLine: 'import { DataGrid } from "@mui/material";',
  },
  {
    icon: Antd,
    label: "Ant Design",
    packageName: "antd",
    dependencyLine: 'import { Table } from "antd";',
  },
  {
    icon: Mantine,
    label: "Mantine",
    packageName: "mantine",
    dependencyLine: 'import { Table } from "@mantine/core";',
  },
  {
    icon: Chakra,
    label: "Chakra UI",
    packageName: "chakra-ui",
    dependencyLine: 'import { Table } from "@chakra-ui/react";',
  },
  {
    icon: Mui,
    label: "Material UI",
    packageName: "mui",
    dependencyLine: 'import { DataGrid } from "@mui/material";',
  },
];

export const LandingMagic = () => {
  const dataSequence = useMotionValue(0);
  const uiSequence = useMotionValue(0);

  const dataY = useTransform(
    dataSequence,
    [0, dataItems.length - 1],
    ["0%", `-${100 - 100 / dataItems.length}%`],
  );
  const uiY = useTransform(
    uiSequence,
    [0, uiItems.length - 1],
    ["0%", `-${100 - 100 / uiItems.length}%`],
  );

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const next = uiSequence.get() + 1;
      const nextValue = next > uiItems.length - 1 ? 0 : next;
      const isGoingToLast = nextValue === uiItems.length - 1;

      await animate(uiSequence, nextValue, {
        duration: 0.25,
        type: "spring",
        bounce: 0.35,
        stiffness: 50,
        onComplete: () => {
          if (isGoingToLast) {
            uiSequence.stop();
            uiSequence.set(0);
          }
        },
      });
    }, 12000 / uiItems.length);
    return () => {
      clearInterval(interval);
    };
  }, [uiY]);

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const next = dataSequence.get() + 1;
      const nextValue = next > dataItems.length - 1 ? 0 : next;
      const isGoingToLast = nextValue === dataItems.length - 1;

      await animate(dataSequence, nextValue, {
        duration: 0.25,
        type: "spring",
        bounce: 0.35,
        stiffness: 50,
        onComplete: () => {
          if (isGoingToLast) {
            dataSequence.stop();
            dataSequence.set(0);
          }
        },
      });
    }, 12000 / dataItems.length);
    return () => {
      clearInterval(interval);
    };
  }, [dataY]);

  return (
    <div
      className={clsx(
        "w-full",
        "relative",
        "pb-12",
        "max-w-screen-landing-2xl",
        "mx-auto",
        "block landing-lg:hidden",
      )}
    >
      <div
        className={clsx(
          "w-full h-full",
          "flex items-center justify-center",
          "absolute",
          "left-0 top-0",
        )}
      >
        <div
          className={clsx(
            "w-full",
            "h-[150px]",
            "bg-[#4D4DB2]",
            "blur-[120px]",
            "opacity-50",
          )}
        />
      </div>
      <div
        className={clsx(
          "w-full",
          "max-w-screen-landing-content",
          "px-4 landing-sm:px-5 landing-md:px-6 landing-lg:px-8 landing-xl:px-0",
          "flex flex-col",
          "gap-12",
          "mx-auto",
          "mb-16",
          "relative",
        )}
      >
        <div
          className={clsx(
            "bg-landing-text-bg",
            "bg-clip-text",
            "text-transparent",
            "text-[1.5rem]",
            "leading-[2rem]",
            "landing-md:text-[2rem]",
            "landing-md:leading-[2.5rem]",
            "landing-lg:text-[2.5rem]",
            "landing-lg:leading-[3rem]",
            "text-center",
          )}
        >
          <span className="font-semibold">Flexibility </span>
          <span className="font-light">without starting from scratch</span>
        </div>
        <div
          className={clsx(
            "w-full",
            "flex",
            "items-end",
            "justify-center",
            "landing-lg:justify-end",
            "relative",
          )}
        >
          <div
            className={clsx(
              "max-w-[680px]",
              "w-full",
              "aspect-[680/480]",
              "pl-4",
              "landing-lg:pl-0",
              "relative",
            )}
          >
            <img
              src="assets/landing-magic-window.svg"
              className={clsx("w-full", "h-auto")}
            />
            <div
              className={clsx(
                "absolute",
                "left-0 landing-lg:-left-[30%]",
                "-bottom-[10%]",
                "landing-sm:bottom-[10%]",
              )}
            >
              <div
                className={clsx(
                  "absolute",
                  "landing-lg:pb-8",
                  "left-0",
                  "landing-lg:left-[calc(50%-3.5rem)]",
                  "-top-[calc(2.5rem+2.5rem+1rem+1.5rem)]",
                  "landing-md:-top-[calc(3rem+3rem+1rem+2rem)]",
                  "landing-lg:-top-[calc(3.5rem+3.5rem+1rem+3.5rem)]",
                  "flex flex-col",
                  "gap-2",
                  "landing-lg:gap-4",
                )}
              >
                <div
                  className={clsx(
                    "w-10",
                    "h-10",
                    "landing-md:w-12",
                    "landing-md:h-12",
                    "landing-lg:w-14",
                    "landing-lg:h-14",
                    "rounded-lg",
                    "bg-gray-1000",
                    "relative",
                  )}
                >
                  <div className="hidden landing-lg:block w-10 h-1 bg-gray-1000 absolute -right-10 top-[calc(50%-2px)]" />
                  <div
                    className={clsx(
                      "w-full h-full",
                      "rounded-lg",
                      "relative",
                      "overflow-hidden",
                      "animation-parent",
                    )}
                  >
                    {/* @ts-expect-error framer-motion type error with react 17 */}
                    <motion.div
                      className={clsx("will-change-transform")}
                      style={{
                        translateY: dataY,
                      }}
                    >
                      {dataItems.map(({ icon: DataIcon }, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "p-3",
                            "w-10",
                            "h-10",
                            "landing-md:w-12",
                            "landing-md:h-12",
                            "landing-lg:w-14",
                            "landing-lg:h-14",
                            "flex items-center justify-center",
                          )}
                        >
                          <DataIcon className="w-full h-auto max-w-full object-contain" />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
                <div
                  className={clsx(
                    "w-10",
                    "h-10",
                    "landing-md:w-12",
                    "landing-md:h-12",
                    "landing-lg:w-14",
                    "landing-lg:h-14",
                    "rounded-lg",
                    "bg-gray-1000",
                    "relative",
                  )}
                >
                  <div className="hidden landing-lg:block w-10 h-1 bg-gray-1000 absolute -right-10 top-[calc(50%-2px)]" />
                  <div
                    className={clsx(
                      "w-full h-full",
                      "rounded-lg",
                      "relative",
                      "overflow-hidden",
                      "animation-parent",
                    )}
                  >
                    {/* @ts-expect-error framer-motion type error with react 17 */}
                    <motion.div
                      className={clsx("will-change-transform")}
                      style={{
                        translateY: uiY,
                      }}
                    >
                      {uiItems.map(({ icon: UIIcon }, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "p-3",
                            "w-10",
                            "h-10",
                            "landing-md:w-12",
                            "landing-md:h-12",
                            "landing-lg:w-14",
                            "landing-lg:h-14",
                            "flex items-center justify-center",
                          )}
                        >
                          <UIIcon className="w-full h-auto max-w-full object-contain" />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
              <div
                className={clsx(
                  "rounded-lg",
                  "border-4",
                  "border-refine-bg",
                  "max-w-[350px]",
                  "w-full",
                  "min-w-[280px]",
                  "flex flex-col",
                  "overflow-hidden",
                  "bg-gray-700",
                )}
              >
                <div
                  className={clsx(
                    "flex",
                    "gap-1",
                    "items-center",
                    "justify-start",
                    "p-3",
                    "border-b",
                    "border-b-gray-800",
                    "w-full",
                  )}
                >
                  <div
                    className={clsx("bg-refine-red", "w-2 h-2", "rounded-full")}
                  />
                  <div
                    className={clsx(
                      "bg-refine-yellow",
                      "w-2 h-2",
                      "rounded-full",
                    )}
                  />
                  <div
                    className={clsx(
                      "bg-refine-green",
                      "w-2 h-2",
                      "rounded-full",
                    )}
                  />
                </div>
                <div
                  className={clsx(
                    "text-[10px]",
                    "landing-md:text-[11px]",
                    "font-mono",
                    "text-[#99FFFF]",
                    "px-3",
                    "py-2",
                    "whitespace-nowrap",
                    "w-full",
                  )}
                >
                  <pre className="bg-transparent p-0 m-0">
                    <code className="text-gray-0 bg-transparent p-0 m-0">
                      <span
                        style={{
                          color: "rgb(235, 187, 255)",
                        }}
                      >
                        import
                      </span>{" "}
                      dataProvider{" "}
                      <span
                        style={{
                          color: "rgb(235, 187, 255)",
                        }}
                      >
                        from
                      </span>{" "}
                      <span
                        style={{
                          color: "rgb(209, 241, 169)",
                        }}
                      >
                        &quot;@refinedev/supabase&quot;
                      </span>
                      {";\n"}
                      <span
                        style={{
                          color: "rgb(235, 187, 255)",
                        }}
                      >
                        import
                      </span>
                      {" { "}
                      <span
                        style={{
                          color: "#C1D9FC",
                        }}
                      >
                        Table
                      </span>
                      {", "}
                      <span
                        style={{
                          color: "#C1D9FC",
                        }}
                      >
                        Layout
                      </span>
                      {" } "}
                      <span
                        style={{
                          color: "rgb(235, 187, 255)",
                        }}
                      >
                        from
                      </span>{" "}
                      <span
                        style={{
                          color: "rgb(209, 241, 169)",
                        }}
                      >
                        &quot;antd&quot;
                      </span>
                      {";\n"}
                      <span
                        style={{
                          color: "rgb(235, 187, 255)",
                        }}
                      >
                        import
                      </span>
                      {" { "}
                      <span>useTable</span>
                      {" } "}
                      <span
                        style={{
                          color: "rgb(235, 187, 255)",
                        }}
                      >
                        from
                      </span>{" "}
                      <span
                        style={{
                          color: "rgb(209, 241, 169)",
                        }}
                      >
                        &quot;@refinedev/antd&quot;
                      </span>
                      {";\n"}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
