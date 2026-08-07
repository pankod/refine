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

import type { IContact } from "interfaces";
import { CreateContact } from "@/components/contacts";

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
        bodyStyle={{ padding: 0 }}
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
              label="Client Company Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Select Contact">
              <div style={{ display: "flex" }}>
                <Form.Item name={"contacts"} noStyle>
                  <Select {...selectProps} mode="multiple" />
                </Form.Item>
                <Button type="link" onClick={() => show()}>
                  Create Contact
                </Button>
              </div>
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
