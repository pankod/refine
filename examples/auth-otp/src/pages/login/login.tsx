import React, { useState } from "react";
import { useLogin } from "@refinedev/core";

import { PhoneOutlined, NumberOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Layout as AntdLayout,
  Card,
  Form,
  Input,
  Button,
} from "antd";
import { format } from "node:util";
export interface ILoginForm {
  gsmNumber: string;
  code: string;
}

export const Login: React.FC = () => {
  const [current, setCurrent] = useState<"gsmNumber" | "code">("gsmNumber");
  const [gsmNumber, setGsmNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { mutate: login, isPending } = useLogin<ILoginForm>();

  const onGsmFormSubmit = (values: Pick<ILoginForm, "gsmNumber">) => {
    setLoading(true);
    setGsmNumber(values.gsmNumber);
    setTimeout(() => setCurrent("code"), 1000);
  };

  const onCodeFormSubmit = async (values: Pick<ILoginForm, "code">) => {
    login({ gsmNumber, code: values.code });
  };

  const renderGSMForm = () => (
    <Form layout="vertical" requiredMark={false} onFinish={onGsmFormSubmit}>
      <Form.Item
        name="gsmNumber"
        label="Gsm Number"
        rules={[
          {
            required: true,
            message: "Gsm number is required",
          },
        ]}
      >
        <Input
          prefix={<PhoneOutlined style={{ color: "#00000040" }} />}
          maxLength={10}
          placeholder="(___)___-____"
        />
      </Form.Item>
      <Form.Item noStyle>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          loading={loading}
          block
        >
          Send
        </Button>
      </Form.Item>
    </Form>
  );

  const renderCodeForm = () => (
    <Form layout="vertical" requiredMark={false} onFinish={onCodeFormSubmit}>
      <Form.Item
        name="code"
        label="Code"
        rules={[
          {
            required: true,
            message: "Code is required",
          },
        ]}
      >
        <Input
          type="password"
          maxLength={4}
          prefix={<NumberOutlined style={{ color: "#00000040" }} />}
        />
      </Form.Item>
      <Form.Item noStyle>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          block
          loading={isPending}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <AntdLayout
      style={{
        background:
          "radial-gradient(50% 50% at 50% 50%, #63386A 0%, #310438 100%)",
        backgroundSize: "cover",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col xs={22}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <img src="./refine.svg" alt="Refine" />
          </div>

          <Card
            style={{
              maxWidth: "400px",
              margin: "auto",
              borderRadius: "10px",
            }}
          >
            {current === "gsmNumber" ? renderGSMForm() : renderCodeForm()}
          </Card>
        </Col>
      </Row>
    </AntdLayout>
  );
};
