import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";

import type { ICompany, IContact, IMission, IInvoice } from "../../interfaces";

export const CreateInvoice = () => {
  const { formProps, saveButtonProps } = useForm<IInvoice>();

  const { selectProps: companySelectProps } = useSelect<ICompany>({
    resource: "companies",
    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: contactSelectProps } = useSelect<IContact>({
    resource: "contacts",
    optionLabel: "first_name",

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: missionSelectProps } = useSelect<IMission>({
    resource: "missions",
    optionLabel: "mission",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" wrapperCol={{ md: 18, lg: 16 }}>
        <Form.Item label="Invoice Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          label="Company"
          name="company"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...companySelectProps} />
        </Form.Item>

        <Form.Item
          label="Missions"
          name="missions"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...missionSelectProps} mode="multiple" />
        </Form.Item>
        <Form.Item label="Discount(%)" name="discount">
          <Input />
        </Form.Item>
        <Form.Item label="Tax(%)" name="tax">
          <Input />
        </Form.Item>
        <Form.Item label="Custom ID" name="custom_id">
          <Input />
        </Form.Item>
        <Form.Item
          label="Contact"
          name="contact"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select {...contactSelectProps} />
        </Form.Item>
        <Form.Item label="Invoice Date" name="date">
          <DatePicker style={{ width: "50%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
