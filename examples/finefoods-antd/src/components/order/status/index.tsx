import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";
import { Tag } from "antd";
import { BikeIcon, BikeWhiteIcon } from "../../icons";

type OrderStatusProps = {
  status: "Pending" | "Ready" | "On The Way" | "Delivered" | "Cancelled";
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const t = useTranslate();
  let color;
  let icon;

  switch (status) {
    case "Pending":
      color = "orange";
      icon = <ClockCircleOutlined />;
      break;
    case "Ready":
      color = "cyan";
      icon = <BellOutlined />;
      break;
    case "On The Way":
      color = "blue";
      icon = <BikeWhiteIcon />;
      break;
    case "Delivered":
      color = "green";
      icon = <CheckCircleOutlined />;
      break;
    case "Cancelled":
      color = "red";
      icon = <CloseCircleOutlined />;
      break;
  }

  return (
    <Tag color={color} icon={icon}>
      {t(`enum.orderStatuses.${status}`)}
    </Tag>
  );
};
