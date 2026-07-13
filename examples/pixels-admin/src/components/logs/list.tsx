import { useLogList } from "@refinedev/core";
import { Avatar, List as AntdList, Typography } from "antd";

import { formattedDate, timeFromNow } from "../../utility/time";
import type { TCanvas } from "../../types";

type TLogListProps = {
  currentCanvas: TCanvas | {};
};

export const LogList = ({ currentCanvas }: TLogListProps) => {
  const { data } = useLogList({
    resource: "pixels",
    meta: {
      canvas: currentCanvas,
    },
  });

  return (
    <AntdList
      size="small"
      dataSource={data}
      renderItem={(item: any) => (
        <AntdList.Item>
          <AntdList.Item.Meta
            avatar={
              <Avatar src={item?.author?.user_metadata?.avatar_url} size={20} />
            }
          />
          <Typography.Text style={{ fontSize: "12px" }}>
            <strong>{item?.author?.user_metadata?.email}</strong>
            {` ${item.action}d a pixel on canvas: `}
            <strong>{`${item?.meta?.canvas?.name} `}</strong>
            <span
              style={{ fontSize: "10px", color: "#9c9c9c" }}
            >{`${formattedDate(item.created_at)} - ${timeFromNow(
              item.created_at,
            )}`}</span>
          </Typography.Text>
        </AntdList.Item>
      )}
    />
  );
};
