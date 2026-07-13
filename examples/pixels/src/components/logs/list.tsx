import { useLogList } from "@refinedev/core";
import { Avatar, List, Typography } from "antd";

import { formattedDate, timeFromNow } from "../../utility/time";

type TLogListProps = {
  currentCanvas: any;
};

export const LogList = ({ currentCanvas }: TLogListProps) => {
  const { data } = useLogList({
    resource: "pixels",
    meta: {
      canvas: currentCanvas,
    },
  });

  return (
    <List
      size="small"
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src={item?.author?.user_metadata?.avatar_url} size={20} />
            }
          />
          <Typography.Text style={{ fontSize: "12px" }}>
            <strong>{item?.author?.user_metadata?.email}</strong>
            {` ${item.action}d a pixel on canvas: `}
            <strong>{`${item?.meta?.canvas?.name} `}</strong>
            <span style={{ fontSize: "10px", color: "#9c9c9c" }}>
              {`${formattedDate(item.created_at)} - ${timeFromNow(
                item.created_at,
              )}`}
            </span>
          </Typography.Text>
        </List.Item>
      )}
    />
  );
};
