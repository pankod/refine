import { Create, useSelect, useModalForm } from "@refinedev/antd";

import {
  Drawer,
  type DrawerProps,
  Form,
  type FormProps,
  Input,
  type ButtonProps,
  Grid,
  Select,
  Button,
} from "antd";

import type { IContact } from "../../interfaces";
import { CreateContact } from "../../components/contact";

type CreateClientProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const CreateClient: React.FC<CreateClientProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const breakpoint = Grid.useBreakpoint();

  const { selectProps } = useSelect<IContact>({
    resource: "contacts",
    optionLabel: "first_name",
    pagination: {
      mode: "server",
    },
  });

  const {
    formProps: createContactFormProps,
    modalProps,
    show,
  } = useModalForm({
    resource: "contacts",
    action: "create",
    redirect: false,
  });

  return (
    <>
      <Drawer
        {...drawerProps}
        width={breakpoint.sm ? "500px" : "100%"}
        styles={{ body: { padding: 0 } }}
      >
        <Create saveButtonProps={saveButtonProps}>
          <Form
            {...formProps}
            layout="vertical"
            initialValues={{
              isActive: true,
            }}
          >
            <Form.Item
              name="name"
              label="Client Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="contacts"
              label="Select Contacts"
              rules={[{ required: true }]}
              extra={
                <Button type="link" onClick={() => show()}>
                  Create Contact
                </Button>
              }
            >
              <Select {...selectProps} mode="multiple" />
            </Form.Item>
          </Form>
        </Create>
      </Drawer>

      <CreateContact
        modalProps={modalProps}
        formProps={createContactFormProps}
      />
    </>
  );
};
