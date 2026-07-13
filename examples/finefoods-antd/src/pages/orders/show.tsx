import { useShow, useTranslate, useUpdate } from "@refinedev/core";
import type { IOrder } from "../../interfaces";
import { List, ListButton } from "@refinedev/antd";
import { Button, Col, Divider, Flex, Row, Skeleton } from "antd";
import { CloseCircleOutlined, LeftOutlined } from "@ant-design/icons";
import { ButtonSuccess } from "../../button";
import {
  CardWithContent,
  OrderDeliveryMap,
  OrderProducts,
  OrderDeliveryDetails,
} from "../../components";

export const OrderShow = () => {
  const t = useTranslate();
  const { query: queryResult } = useShow<IOrder>();
  const { data, isLoading } = queryResult;
  const record = data?.data;
  const { mutate } = useUpdate({
    resource: "orders",
    id: record?.id.toString(),
  });

  const handleMutate = (status: { id: number; text: string }) => {
    if (record) {
      mutate({
        values: {
          status,
        },
      });
    }
  };

  const canAcceptOrder = isLoading ? false : record?.status.text === "Pending";
  const canRejectOrder = isLoading
    ? false
    : record?.status.text === "Pending" ||
      record?.status.text === "Ready" ||
      record?.status.text === "On The Way";

  return (
    <>
      <Flex>
        <ListButton icon={<LeftOutlined />}>{t("orders.orders")}</ListButton>
      </Flex>
      <Divider />
      <List
        breadcrumb={false}
        title={
          isLoading ? (
            <Skeleton.Input
              active
              style={{
                width: "144px",
                minWidth: "144pxpx",
                height: "28px",
              }}
            />
          ) : (
            `${t("orders.titles.list")} #${record?.orderNumber}`
          )
        }
        headerButtons={[
          <ButtonSuccess
            disabled={!canAcceptOrder}
            key="accept"
            onClick={() =>
              handleMutate({
                id: 2,
                text: "Ready",
              })
            }
          >
            {t("buttons.accept")}
          </ButtonSuccess>,
          <Button
            disabled={!canRejectOrder}
            key="reject"
            danger
            icon={<CloseCircleOutlined />}
            onClick={() =>
              handleMutate({
                id: 5,
                text: "Cancelled",
              })
            }
          >
            {t("buttons.reject")}
          </Button>,
        ]}
      >
        <Row gutter={[16, 16]}>
          <Col xl={15} lg={24} md={24} sm={24} xs={24}>
            <Flex gap={16} vertical>
              <CardWithContent
                bodyStyles={{
                  height: "378px",
                  overflow: "hidden",
                  padding: 0,
                }}
                title={t("orders.titles.deliveryMap")}
              >
                <OrderDeliveryMap order={record} />
              </CardWithContent>
              <OrderProducts order={record} />
            </Flex>
          </Col>

          <Col xl={9} lg={24} md={24} sm={24} xs={24}>
            <CardWithContent
              bodyStyles={{
                padding: 0,
              }}
              title={t("orders.titles.deliveryDetails")}
            >
              {record && <OrderDeliveryDetails order={record} />}
            </CardWithContent>
          </Col>
        </Row>
      </List>
    </>
  );
};
