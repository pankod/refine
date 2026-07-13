import { Create, useForm } from "@refinedev/antd";

import { Form, Input, Checkbox, Typography, Row, Col } from "antd";

import type { ICompany } from "interfaces";

export const CompanyCreate = () => {
  const { Title } = Typography;
  const { formProps, saveButtonProps } = useForm<ICompany>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Location"
          name="location"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Is Active" name="isActive" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Title level={5}>Links</Title>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Web" name="web">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Linkedin" name="linkedin">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Twitter" name="twitter">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Instagram" name="instagram">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Youtube" name="youtube">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Github" name="github">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
