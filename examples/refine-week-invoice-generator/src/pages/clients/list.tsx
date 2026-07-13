import type { HttpError } from "@refinedev/core";
import {
  List,
  useDrawerForm,
  CreateButton,
  useTable,
  TagField,
  EditButton,
  DeleteButton,
} from "@refinedev/antd";
import { Space, Table } from "antd";

import { type IClient, IContact } from "../../interfaces";
import { CreateClient, EditClient } from "../../components/client";

export const ClientList = () => {
  const { tableProps } = useTable<IClient>({
    sorters: { initial: [{ field: "id", order: "desc" }] },
    meta: { populate: ["contacts"] },
  });

  const {
    drawerProps: createDrawerProps,
    formProps: createFormProps,
    saveButtonProps: createSaveButtonProps,
    show: createShow,
  } = useDrawerForm<IClient, HttpError, IClient>({
    action: "create",
    resource: "clients",
    redirect: false,
  });

  const {
    drawerProps: editDrawerProps,
    formProps: editFormProps,
    saveButtonProps: editSaveButtonProps,
    show: editShow,
  } = useDrawerForm<IClient, HttpError, IClient>({
    action: "edit",
    redirect: false,
    meta: { populate: { contacts: { populate: ["*"] } } },
  });

  return (
    <>
      <List
        headerProps={{
          extra: <CreateButton onClick={() => createShow()} />,
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" sorter />
          <Table.Column<IClient> dataIndex="name" title="Name" sorter />
          <Table.Column<IClient>
            dataIndex={["contacts"]}
            title="Contacts"
            render={(values) =>
              values.map((item: any) => (
                <TagField
                  key={item.id}
                  color={"#673ab7"}
                  value={`${item.first_name} ${item.last_name}`}
                />
              ))
            }
          />
          <Table.Column<IClient>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  onClick={() => editShow(record.id)}
                />
                <DeleteButton
                  hideText
                  size="small"
                  recordItemId={record.id}
                  mutationMode="undoable"
                />
              </Space>
            )}
          />
        </Table>
      </List>
      {createDrawerProps.open ? (
        <CreateClient
          drawerProps={createDrawerProps}
          formProps={createFormProps}
          saveButtonProps={createSaveButtonProps}
        />
      ) : null}

      {editDrawerProps.open ? (
        <EditClient
          drawerProps={editDrawerProps}
          formProps={editFormProps}
          saveButtonProps={editSaveButtonProps}
        />
      ) : null}
    </>
  );
};
