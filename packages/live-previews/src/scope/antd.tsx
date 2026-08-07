import React from "react";
import parseHtml from "html-react-parser";
import type { RefineProps } from "@refinedev/core";
import { RefineCommonScope } from "./common";
import type RefineAntdTypes from "@refinedev/antd";
import * as MDEditorNamespace from "@uiw/react-md-editor";
import * as AntdCore from "antd";
import * as RefineAntd from "@refinedev/antd";
import axios from "axios";

import Icon, {
  UnorderedListOutlined,
  GoogleOutlined,
  AppstoreAddOutlined,
  LoginOutlined,
  SearchOutlined,
  DownOutlined,
  EditOutlined,
} from "@ant-design/icons";

const SIMPLE_REST_API_URL = "https://api.fake-rest.refine.dev";

const ThemedTitle = ({
  collapsed,
  wrapperStyles,
  text: textFromProps,
  icon: iconFromProps,
}: RefineAntdTypes.RefineLayoutThemedTitleProps) => {
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
    <RefineAntd.ThemedTitle
      collapsed={collapsed}
      wrapperStyles={wrapperStyles}
      text={title || textFromProps}
      icon={svgContent ? parseHtml(svgContent) : iconFromProps}
    />
  );
};

const ConfigProvider = ({
  children,
  theme,
}: {
  children?: React.ReactNode;
  theme?: React.ComponentProps<typeof AntdCore.ConfigProvider>["theme"];
}) => {
  const [themeFromWindow, setThemeFromWindow] = React.useState<
    undefined | string
  >(undefined);

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
    <AntdCore.ConfigProvider
      theme={{
        ...(themeFromWindow
          ? RefineAntd.RefineThemes[
              themeFromWindow as keyof typeof RefineAntd.RefineThemes
            ]
          : theme),
        algorithm: theme?.algorithm,
      }}
    >
      {children}
    </AntdCore.ConfigProvider>
  );
};

const RefineAntdDemo: React.FC<
  Partial<RefineProps> & {
    initialRoutes?: string[];
  }
> = ({ initialRoutes, ...rest }) => {
  if (initialRoutes) {
    RefineCommonScope.setInitialRoutes(initialRoutes);
  }

  return (
    <ConfigProvider>
      <RefineCommonScope.RefineCore.Refine
        routerProvider={RefineCommonScope.RefineReactRouter.default}
        dataProvider={RefineCommonScope.RefineSimpleRest.default(
          SIMPLE_REST_API_URL,
        )}
        notificationProvider={RefineAntd.useNotificationProvider}
        options={{
          disableTelemetry: true,
        }}
        {...rest}
      />
    </ConfigProvider>
  );
};

const AntdScope = {
  RefineAntdDemo,
  RefineAntd: {
    ...RefineAntd,
    ThemedTitle,
  },
  AntdCore: {
    ...AntdCore,
    ConfigProvider,
  },
  AntDesignIcons: {
    UnorderedListOutlined,
    GoogleOutlined,
    AppstoreAddOutlined,
    LoginOutlined,
    SearchOutlined,
    default: Icon,
    DownOutlined,
    EditOutlined,
  },
  MDEditorNamespace,
};

export default AntdScope;
