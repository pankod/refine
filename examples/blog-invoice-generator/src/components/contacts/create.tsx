import { useSelect } from "@refinedev/antd";

import {
  Form,
  Modal,
  Input,
  type ModalProps,
  type FormProps,
  Select,
} from "antd";

type CreateContactProps = {
  modalProps: ModalProps;
  formProps: FormProps;
  hideCompanySelect?: boolean;
};

export const CreateContact: React.FC<CreateContactProps> = ({
  modalProps,
  formProps,
  hideCompanySelect = true,
}) => {
  const { selectProps } = useSelect({
    resource: "clients",
    optionValue: "id",
    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Modal {...modalProps} title="Create Contact">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Client Company"
          name="client"
          hidden={hideCompanySelect}
        >
          <Select {...selectProps} />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone_number">
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Job" name="job">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
