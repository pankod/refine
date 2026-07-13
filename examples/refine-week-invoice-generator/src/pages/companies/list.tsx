import type { HttpError } from "@refinedev/core";
import {
  List,
  useModalForm,
  useTable,
  DeleteButton,
  EditButton,
} from "@refinedev/antd";
import { Space, Table } from "antd";

import type { ICompany } from "../../interfaces";
import { CreateCompany, EditCompany } from "../../components/company";
import { API_URL } from "../../constants";

export const CompanyList = () => {
  const { tableProps } = useTable<ICompany>({
    sorters: { initial: [{ field: "id", order: "desc" }] },
    meta: { populate: ["logo"] },
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "create",
    meta: { populate: ["logo"] },
  });

  const {
    modalProps: editModalProps,
    formProps: editFormProps,
    show: editShow,
  } = useModalForm<ICompany, HttpError, ICompany>({
    action: "edit",
    meta: { populate: ["logo"] },
  });

  return (
    <>
      <List
        createButtonProps={{
          onClick: () => {
            createShow();
          },
        }}
      >
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="ID" sorter />
          <Table.Column<ICompany>
            dataIndex="logo"
            title="Logo"
            render={(_, record) => {
              const image = record.logo
                ? API_URL + record.logo.url
                : "./error.png";

              return <img src={image} alt="logo" style={{ width: 50 }} />;
            }}
          />
          <Table.Column<ICompany> dataIndex="name" title="Name" sorter />
          <Table.Column<ICompany> dataIndex="address" title="Address" sorter />
          <Table.Column<ICompany> dataIndex="country" title="Country" sorter />
          <Table.Column<ICompany> dataIndex="city" title="City" sorter />
          <Table.Column<ICompany> dataIndex="email" title="Email" sorter />

          <Table.Column<ICompany>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <EditButton
                  hideText
                  size="small"
                  onClick={() => editShow(record.id)}
                />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
      {createModalProps.open ? (
        <CreateCompany
          modalProps={createModalProps}
          formProps={createFormProps}
        />
      ) : null}

      {editModalProps.open ? (
        <EditCompany modalProps={editModalProps} formProps={editFormProps} />
      ) : null}
    </>
  );
};
