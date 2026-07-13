import { Edit, useSelect } from "@refinedev/antd";
import {
  Drawer,
  type DrawerProps,
  Form,
  type FormProps,
  Input,
  type ButtonProps,
  Grid,
  Select,
} from "antd";
import type { IClient, IContact } from "../../interfaces";

type EditClientProps = {
  drawerProps: DrawerProps;
  formProps: FormProps<IClient>;
  saveButtonProps: ButtonProps;
};

export const EditClient: React.FC<EditClientProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const breakpoint = Grid.useBreakpoint();

  const contactIds = formProps.initialValues?.contacts.map(
    (c: IClient) => c.id,
  );

  const { selectProps } = useSelect<IContact>({
    resource: "contacts",
    optionLabel: "first_name",
    defaultValue: contactIds,
    pagination: {
      mode: "server",
    },
  });

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      styles={{ body: { padding: 0 } }}
    >
      <Edit
        saveButtonProps={saveButtonProps}
        title={
          <h4 style={{ padding: "0 24px", fontWeight: "bold" }}>Edit Client</h4>
        }
      >
        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            isActive: true,
            ...formProps.initialValues,
            contacts: contactIds,
          }}
        >
          <Form.Item
            label="Client Name"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Select Contacts" name={["contacts"]}>
            <Select {...selectProps} mode="multiple" />
          </Form.Item>
        </Form>
      </Edit>
    </Drawer>
  );
};
