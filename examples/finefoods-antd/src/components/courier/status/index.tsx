import { Flex, Skeleton, Spin, Tag, Typography, theme } from "antd";
import { CheckCircleOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";
import type { ICourier } from "../../../interfaces";
import { useConfigProvider } from "../../../context";
import { BikeWhiteIcon } from "../../icons";

type Status = ICourier["status"];

type Props = {
  value?: Status;
  isLoading?: boolean;
};

export const CourierStatus = ({ value, isLoading }: Props) => {
  const t = useTranslate();
  const { token } = theme.useToken();
  const { mode } = useConfigProvider();

  const variant = {
    Available: {
      icon: <CheckCircleOutlined />,
      tagColor: "green",
      tagTextColor: {
        dark: token.colorSuccess,
        light: "#3C8618",
      },
    },
    Offline: {
      tagColor: "default",
      tagTextColor: {
        dark: token.colorTextTertiary,
        light: token.colorTextTertiary,
      },
      icon: <PoweroffOutlined />,
    },
    "On delivery": {
      tagColor: "blue",
      tagTextColor: {
        dark: token.blue7,
        light: token.blue5,
      },
      icon: <BikeWhiteIcon />,
    },
  };

  const valueText = value?.text || "Offline";
  const currentVariant = variant[valueText];
  const { tagColor, tagTextColor, icon } = currentVariant;

  if (isLoading) {
    return (
      <Flex
        align="center"
        style={{
          width: "108px",
          height: "24px",
        }}
      >
        <Spin size="small" spinning>
          <Skeleton.Button
            style={{
              width: "108px",
              height: "24px",
            }}
          />
        </Spin>
      </Flex>
    );
  }

  return (
    <Tag
      color={tagColor}
      style={{
        color: tagTextColor[mode],
        marginInlineEnd: "0",
      }}
      icon={icon}
    >
      {!isLoading && (
        <Typography.Text
          style={{
            color: tagTextColor[mode],
          }}
        >
          {t(`couriers.fields.status.${valueText}`)}
        </Typography.Text>
      )}
    </Tag>
  );
};
