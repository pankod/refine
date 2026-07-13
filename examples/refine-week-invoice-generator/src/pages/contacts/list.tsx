import {
  List,
  TagField,
  useTable,
  EditButton,
  DeleteButton,
  useModalForm,
  EmailField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

import type { IContact } from "../../interfaces";
import { CreateContact } from "../../components/contact";

export const ContactList: React.FC = () => {
  const { tableProps } = useTable<IContact>({
    sorters: { initial: [{ field: "id", order: "desc" }] },
    meta: { populate: ["client"] },
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
      <List
        createButtonProps={{
          onClick: () => {
            show();
          },
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column dataIndex="first_name" title="First Name" />
          <Table.Column dataIndex="last_name" title="Last Name" />
          <Table.Column dataIndex={["client", "name"]} title="Client Company" />
          <Table.Column dataIndex="phone_number" title="Phone Number" />
          <Table.Column
            dataIndex="email"
            title="Email"
            render={(value: string) => <EmailField value={value} />}
          />
          <Table.Column
            dataIndex="job"
            title="Job"
            render={(value: string) => (
              <TagField color={"blue"} value={value} />
            )}
          />
          <Table.Column<{ id: string }>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
      <CreateContact
        modalProps={modalProps}
        formProps={createContactFormProps}
        hideCompanySelect={false}
      />
    </>
  );
};
