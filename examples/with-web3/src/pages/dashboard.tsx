import React, { useState } from "react";
import { useGetIdentity } from "@refinedev/core";

import { useModal } from "@refinedev/antd";

import {
  Row,
  Col,
  Card,
  Typography,
  Space,
  Button,
  Modal,
  Form,
  Input,
  notification,
} from "antd";

import { sendEthereum } from "../utility";

const { Text } = Typography;

export const DashboardPage: React.FC = () => {
  const { data, isLoading } = useGetIdentity<{
    address: string;
    balance: string;
  }>();
  const { modalProps, show, close } = useModal();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line
  const handleModal = async (values: any) => {
    setLoading(true);
    // eslint-disable-next-line
    const tx: any | undefined = await sendEthereum(
      data?.address || "",
      values.receiver,
      values.amount,
    );
    const status = tx ? tx.status : undefined;
    setLoading(false);

    if (status) {
      close();
      notification["success"]({
        message: "Transaction Success",
        description: "Transaction successfull you can check on Etherscan.io",
      });
    } else {
      notification["warning"]({
        message: "Transaction Failed",
        description: "Transaction failed try again",
      });
    }
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Card
            title="Ethereum Public ID"
            style={{ height: "150px", borderRadius: "15px" }}
            headStyle={{ textAlign: "center" }}
          >
            <Space align="center" direction="horizontal">
              <Text>{isLoading ? "loading" : data?.address}</Text>
            </Space>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Account Balance"
            style={{ height: "150px", borderRadius: "15px" }}
            headStyle={{ textAlign: "center" }}
          >
            <Text>{`${isLoading ? "loading" : data?.balance} Ether`}</Text>
          </Card>
        </Col>
        <Col span={12}>
          <Button
            style={{ maxWidth: 300, marginTop: 24 }}
            type="primary"
            size="large"
            onClick={() => show()}
          >
            Send Ethereum
          </Button>
          <Button
            style={{ maxWidth: 300, marginTop: 24, marginLeft: 12 }}
            type="primary"
            size="large"
            href={`https://ropsten.etherscan.io/address/${data?.address}`}
          >
            View on Etherscan
          </Button>
        </Col>
      </Row>
      <Modal
        {...modalProps}
        okText={"Send"}
        title={"Send Test Ethereum via Ropsten Chain"}
        onOk={form.submit}
        okButtonProps={{ loading: loading }}
      >
        <Form layout="vertical" onFinish={handleModal} form={form}>
          <Form.Item name="receiver" label="Receiver Public Adress">
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amaount Ether">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
