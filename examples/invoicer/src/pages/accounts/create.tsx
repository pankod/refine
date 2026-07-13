import { type HttpError, useGo } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import { Flex, Form, Input, Modal, Select } from "antd";
import InputMask from "react-input-mask";
import { FormItemUploadLogoDraggable } from "@/components/form";
import type { Account, AccountForm } from "@/types";

export const AccountsPageCreate = () => {
  const go = useGo();

  const { formProps } = useForm<Account, HttpError, AccountForm>();

  return (
    <Modal
      okButtonProps={{ form: "create-account-form", htmlType: "submit" }}
      title="Add new account"
      open
      onCancel={() => {
        go({
          to: { resource: "accounts", action: "list" },
          options: { keepQuery: true },
        });
      }}
    >
      <Form
        layout="vertical"
        id="create-account-form"
        {...formProps}
        onFinish={(values) => {
          const logoId = values.logo?.file?.response?.[0]?.id;
          return formProps.onFinish?.({
            ...values,
            logo: logoId,
          } as AccountForm);
        }}
      >
        <Flex gap={40}>
          <FormItemUploadLogoDraggable />
          <Flex
            vertical
            style={{
              width: "420px",
            }}
          >
            <Form.Item
              name="company_name"
              label="Company Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="owner_name"
              label="Owner Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="owner_email"
              label="Owner email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <InputMask mask="(999) 999-9999">
                {/* @ts-expect-error  <InputMask /> expects React.JSX.Element but we are using React.ReactNode */}
                {(props: InputProps) => (
                  <Input {...props} placeholder="Please enter phone number" />
                )}
              </InputMask>
            </Form.Item>
          </Flex>
        </Flex>
      </Form>
    </Modal>
  );
};
