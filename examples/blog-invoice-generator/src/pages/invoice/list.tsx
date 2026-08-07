import { useState } from "react";
import { useModal } from "@refinedev/core";
import {
  List,
  useTable,
  DateField,
  TagField,
  EmailField,
  DeleteButton,
  EditButton,
} from "@refinedev/antd";

import { FilePdfOutlined } from "@ant-design/icons";
import { Table, Space, Button, Modal } from "antd";

import type { IInvoice, IMission } from "interfaces";
import { PdfLayout } from "@/components/pdf";

export const InvoiceList: React.FC = () => {
  const [record, setRecord] = useState<IInvoice>();

  const { tableProps } = useTable<IInvoice>({
    meta: {
      populate: {
        contact: { populate: ["client"] },
        company: { populate: ["logo"] },
        missions: "*",
      },
    },
  });

  const { show, visible, close } = useModal();

  return (
    <>
      <List>
        <Table {...tableProps}>
          <Table.Column dataIndex="id" title="ID" />
          <Table.Column<IInvoice>
            dataIndex="name"
            title="Invoice Name"
            render={(_, record) => {
              return `Invoice_#${record.id}${record.name}`;
            }}
          />
          <Table.Column<IInvoice>
            dataIndex="date"
            title="Invoice Date"
            render={(value) => <DateField format="LL" value={value} />}
          />
          <Table.Column dataIndex={["company", "name"]} title="Company" />
          <Table.Column
            dataIndex={"missions"}
            title="Missions"
            render={(value) => {
              return value.map((item: IMission) => {
                return (
                  <TagField key={item.id} color="blue" value={item.mission} />
                );
              });
            }}
          />
          <Table.Column
            dataIndex="discount"
            title="Discount(%)"
            render={(value) => <TagField color="blue" value={value} />}
          />
          <Table.Column
            dataIndex="tax"
            title="Tax(%)"
            render={(value) => <TagField color="cyan" value={value} />}
          />
          <Table.Column dataIndex="custom_id" title="Custom Invoice ID" />

          <Table.Column
            dataIndex={["contact", "email"]}
            title="Contact"
            render={(value) => <EmailField value={value} />}
          />
          <Table.Column<IInvoice>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => {
              return (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                  />
                  {record.company && (
                    <Button
                      size="small"
                      icon={<FilePdfOutlined />}
                      onClick={() => {
                        setRecord(record);
                        show();
                      }}
                    />
                  )}
                </Space>
              );
            }}
          />
        </Table>
      </List>
      <Modal visible={visible} onCancel={close} width="80%" footer={null}>
        <PdfLayout record={record} />
      </Modal>
    </>
  );
};
