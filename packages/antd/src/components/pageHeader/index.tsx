import React, { useContext, type FC } from "react";
import {
  PageHeader as AntdPageHeader,
  type PageHeaderProps as AntdPageHeaderProps,
} from "@ant-design/pro-layout";
import { Button, ConfigProvider, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { RefinePageHeaderClassNames } from "@refinedev/ui-types";

export type PageHeaderProps = AntdPageHeaderProps;

export const PageHeader: FC<AntdPageHeaderProps> = ({ children, ...props }) => {
  const direction = useContext(ConfigProvider.ConfigContext)?.direction;
  const renderBackButton = () => {
    const BackIcon =
      direction === "rtl" ? ArrowRightOutlined : ArrowLeftOutlined;

    return <Button type="text" icon={<BackIcon />} />;
  };
  const backIcon =
    typeof props.backIcon === "undefined" ? renderBackButton() : props.backIcon;

  const title =
    typeof props.title === "string" ? (
      <Typography.Title
        className={RefinePageHeaderClassNames.Title}
        level={4}
        style={{ marginBottom: 0 }}
      >
        {props.title}
      </Typography.Title>
    ) : (
      props.title
    );

  const subtitle =
    typeof props.title === "string" ? (
      <Typography.Title
        className={RefinePageHeaderClassNames.SubTitle}
        level={5}
        type="secondary"
        style={{ marginBottom: 0 }}
      >
        {props.subTitle}
      </Typography.Title>
    ) : (
      props.subTitle
    );

  return (
    <AntdPageHeader
      {...props}
      backIcon={backIcon}
      title={title}
      subTitle={subtitle}
      style={{ padding: 0, ...props.style }}
    >
      {children}
    </AntdPageHeader>
  );
};
