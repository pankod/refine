import { useTable } from "@refinedev/antd";
import type { ICourier, IReview } from "../../../interfaces";
import { Rate, Table, Tag } from "antd";
import { useNavigation, useTranslate } from "@refinedev/core";

type Props = {
  courier?: ICourier;
};

export const CourierReviewTable = (props: Props) => {
  const t = useTranslate();
  const { show } = useNavigation();

  const { tableProps } = useTable<IReview>({
    resource: "reviews",

    filters: {
      permanent: [
        {
          field: "order.courier.id",
          value: props.courier?.id,
          operator: "eq",
        },
      ],
    },

    pagination: {
      mode: "off",
    },

    queryOptions: {
      enabled: !!props.courier,
    },
  });
  return (
    <Table {...tableProps} rowKey="id">
      <Table.Column title={t("reviews.reviews")} dataIndex="comment" />
      <Table.Column
        title={t("reviews.fields.rating")}
        dataIndex="star"
        render={(value) => (
          <Rate
            style={{
              minWidth: "132px",
            }}
            disabled
            allowHalf
            value={value}
          />
        )}
      />
      <Table.Column
        title={t("reviews.fields.orderId")}
        dataIndex={["order", "id"]}
        render={(value) => (
          <Tag
            style={{
              cursor: "pointer",
            }}
            onClick={() => show("orders", value)}
          >
            #{value}
          </Tag>
        )}
      />
    </Table>
  );
};
