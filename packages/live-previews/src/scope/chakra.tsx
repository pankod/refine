import React from "react";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import type RefineChakraTypes from "@refinedev/chakra-ui";
import * as ChakraUI from "@chakra-ui/react";
import * as ReactHookForm from "react-hook-form";
import * as RefineChakra from "@refinedev/chakra-ui";
import axios from "axios";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const ChakraProvider = ({
  children,
  theme,
}: {
  children?: React.ReactNode;
  theme: any;
}) => {
  const [themeFromWindow, setThemeFromWindow] = React.useState<
    undefined | string
  >();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const messageListener = (event: MessageEvent) => {
        if (event.data.type === "UPDATE_DYNAMIC_VALUES") {
          if (event.data.payload.theme) {
            setThemeFromWindow(event.data.payload.theme);
          }
        }
      };

      window.addEventListener("message", messageListener);

      return () => {
        window.removeEventListener("message", messageListener);
      };
    }

    return () => undefined;
  }, []);

  return (
    <ChakraUI.ChakraProvider
      theme={
        themeFromWindow && themeFromWindow in RefineChakra.RefineThemes
          ? RefineChakra.RefineThemes[
              themeFromWindow as keyof typeof RefineChakra.RefineThemes
            ]
          : theme
      }
    >
      <div style={{ padding: 16 }}>{children}</div>
    </ChakraUI.ChakraProvider>
  );
};

const RefineChakraDemo: React.FC<
  Partial<RefineProps> & {
    initialRoutes?: string[];
  }
> = ({ initialRoutes, ...rest }) => {
  if (initialRoutes) {
    RefineCommonScope.setInitialRoutes(initialRoutes);
  }

  return (
    <ChakraProvider theme={RefineChakra.refineTheme}>
      <RefineCommonScope.RefineCore.Refine
        routerProvider={RefineCommonScope.RefineReactRouter.default}
        dataProvider={RefineCommonScope.RefineSimpleRest.default(
          SIMPLE_REST_API_URL,
        )}
        notificationProvider={RefineChakra.notificationProvider}
        options={{
          disableTelemetry: true,
        }}
        {...rest}
      />
    </ChakraProvider>
  );
};

const ThemedTitle = ({
  collapsed,
  wrapperStyles,
  text: textFromProps,
  icon: iconFromProps,
}: RefineChakraTypes.RefineLayoutThemedTitleProps) => {
  const [svgContent, setSvgContent] = React.useState<string | undefined>(
    window.__refineIconSVGContent || undefined,
  );
  const [title, setTitle] = React.useState<string | undefined>(
    window.__refineTitleContent || undefined,
  );

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const messageListener = (event: MessageEvent) => {
        if (event.data.type === "UPDATE_DYNAMIC_VALUES") {
          if (event.data.payload?.title) {
            setTitle(event.data.payload?.title);

            if (typeof window !== "undefined") {
              window.__refineTitleContent = event.data.payload?.title;
            }
          }

          if (event.data.payload?.icon) {
            try {
              axios
                .get(`/assets/icons/${event.data.payload.icon}`)
                .then((res) => {
                  const content = res.data
                    .replace(/fill\=\"white\"/g, `fill="currentColor"`)
                    .replace(/stroke\=\"white\"/g, `stroke="currentColor"`);

                  setSvgContent(content);

                  if (typeof window !== "undefined") {
                    window.__refineIconSVGContent = content;
                  }
                });
            } catch (error) {
              console.error(error);
            }
          }
        }
      };

      window.addEventListener("message", messageListener);

      return () => {
        window.removeEventListener("message", messageListener);
      };
    }

    return () => undefined;
  }, []);

  return (
    <RefineChakra.ThemedTitle
      collapsed={collapsed}
      wrapperStyles={wrapperStyles}
      text={title || textFromProps}
      icon={svgContent ? parseHtml(svgContent) : iconFromProps}
    />
  );
};

const AntdScope = {
  // ...RefineCommonScope,
  // RefineAntdDemo,
  // RefineAntd,
  // RefineMuiDemo,
  // RefineMui,
  // RefineMantine,
  // RefineMantineDemo,
  RefineChakra: {
    ...RefineChakra,
    ThemedTitle,
  },
  RefineChakraDemo,
  ChakraUI: {
    ...ChakraUI,
    ChakraProvider,
  },
  ReactHookForm,
  // // Other Packages
  // RefineReactHookForm,
  // RefineReactTable,
};

export default AntdScope;
