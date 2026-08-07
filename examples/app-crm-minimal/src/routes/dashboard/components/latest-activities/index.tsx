import { useList } from "@refinedev/core";
import type { GetFieldsFromList } from "@refinedev/nestjs-query";

import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, List, Skeleton as AntdSkeleton, Space } from "antd";
import dayjs from "dayjs";

import { CustomAvatar, Text } from "@/components";
import type {
  DashboardLatestActivitiesAuditsQuery,
  DashboardLatestActivitiesDealsQuery,
} from "@/graphql/types";

import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from "./queries";

type Props = { limit?: number };

export const DashboardLatestActivities = ({ limit = 5 }: Props) => {
  const {
    result: audit,

    query: { isLoading: isLoadingAudit, isError, error },
  } = useList<GetFieldsFromList<DashboardLatestActivitiesAuditsQuery>>({
    resource: "audits",
    pagination: {
      pageSize: limit,
    },
    sorters: [
      {
        field: "createdAt",
        order: "desc",
      },
    ],
    filters: [
      {
        field: "action",
        operator: "in",
        value: ["CREATE", "UPDATE"],
      },
      {
        field: "targetEntity",
        operator: "eq",
        value: "Deal",
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });

  const dealIds = audit?.data?.map((audit) => audit.targetId);

  const {
    result: deals,
    query: { isLoading: isLoadingDeals },
  } = useList<GetFieldsFromList<DashboardLatestActivitiesDealsQuery>>({
    resource: "deals",
    queryOptions: { enabled: !!dealIds?.length },
    pagination: {
      mode: "off",
    },
    filters: [{ field: "id", operator: "in", value: dealIds }],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
  });

  if (isError) {
    console.error("Error fetching latest activities", error);
    return null;
  }

  const isLoading = isLoadingAudit || isLoadingDeals;

  return (
    <Card
      headStyle={{ padding: "16px" }}
      bodyStyle={{
        padding: "0 1rem",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: ".5rem" }}>
            Latest activities
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: limit }).map((_, index) => ({
            id: index,
          }))}
          renderItem={(_item, index) => {
            return (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={
                    <AntdSkeleton.Avatar
                      active
                      size={48}
                      shape="square"
                      style={{
                        borderRadius: "4px",
                      }}
                    />
                  }
                  title={
                    <AntdSkeleton.Button
                      active
                      style={{
                        height: "16px",
                      }}
                    />
                  }
                  description={
                    <AntdSkeleton.Button
                      active
                      style={{
                        width: "300px",
                        height: "16px",
                      }}
                    />
                  }
                />
              </List.Item>
            );
          }}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={audit?.data || []}
          renderItem={(item) => {
            const deal =
              deals?.data.find((deal) => deal.id === `${item.targetId}`) ||
              undefined;

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <CustomAvatar
                      shape="square"
                      size={48}
                      src={deal?.company.avatarUrl}
                      name={deal?.company.name}
                    />
                  }
                  title={dayjs(deal?.createdAt).format("MMM DD, YYYY - HH:mm")}
                  description={
                    <Space size={4}>
                      <Text strong>{item.user?.name}</Text>
                      <Text>
                        {item.action === "CREATE" ? "created" : "moved"}
                      </Text>
                      <Text strong>{deal?.title}</Text>
                      <Text>deal</Text>
                      <Text>{item.action === "CREATE" ? "in" : "to"}</Text>
                      <Text strong>{deal?.stage?.title || "Unassigned"}.</Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};
