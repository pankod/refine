import { useNavigation } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  NumberField,
  Show,
  ShowButton,
  useForm,
  useSelect,
} from "@refinedev/antd";
import { Card, Divider, Flex, Form, Table, Typography } from "antd";
import {
  ShopOutlined,
  UserOutlined,
  ExportOutlined,
  BankOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import {
  FormItemEditableInputText,
  FormItemEditableText,
  FormItemEditableSelect,
} from "@/components/form";
import type { Invoice } from "@/types";

export const ClientsPageEdit = () => {
  const { list } = useNavigation();

  const { formProps, query: queryResult } = useForm({
    redirect: false,
    meta: {
      populate: ["account", "invoices.client", "invoices.account.logo"],
    },
  });

  const { selectProps: selectPropsAccount } = useSelect({
    resource: "accounts",
    optionLabel: "company_name",
    optionValue: "id",

    pagination: {
      mode: "server",
    },
  });

  const invoices = queryResult?.data?.data?.invoices || [];
  const isLoading = queryResult?.isLoading;

  return (
    <Show
      title="Clients"
      headerButtons={() => false}
      contentProps={{
        styles: {
          body: {
            padding: 0,
          },
        },
        style: {
          background: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <Form {...formProps} layout="vertical">
        <Row>
          <Col span={24}>
            <Flex gap={16}>
              <FormItemEditableText
                loading={isLoading}
                formItemProps={{
                  name: "name",
                  rules: [{ required: true }],
                }}
              />
            </Flex>
          </Col>
        </Row>
        <Row
          gutter={32}
          style={{
            marginTop: "32px",
          }}
        >
          <Col xs={{ span: 24 }} xl={{ span: 8 }}>
            <Card
              bordered={false}
              styles={{ body: { padding: 0 } }}
              title={
                <Flex gap={12} align="center">
                  <ShopOutlined />
                  <Typography.Text>Client info</Typography.Text>
                </Flex>
              }
            >
              <FormItemEditableSelect
                loading={isLoading}
                icon={<BankOutlined />}
                editIcon={<ExportOutlined />}
                selectProps={{
                  showSearch: true,
                  placeholder: "Select account",
                  ...selectPropsAccount,
                }}
                formItemProps={{
                  name: "account",
                  getValueProps: (value) => {
                    return {
                      value: value?.id,
                      label: value?.company_name,
                    };
                  },
                  label: "Account",
                  rules: [{ required: true }],
                }}
              />
              <FormItemEditableInputText
                loading={isLoading}
                icon={<UserOutlined />}
                placeholder="Add owner name"
                formItemProps={{
                  name: "owner_name",
                  label: "Owner name",
                  rules: [{ required: true }],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableInputText
                loading={isLoading}
                icon={<MailOutlined />}
                placeholder="Add email"
                formItemProps={{
                  name: "owner_email",
                  label: "Owner email",
                  rules: [{ required: true, type: "email" }],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableInputText
                loading={isLoading}
                icon={<EnvironmentOutlined />}
                placeholder="Add address"
                formItemProps={{
                  name: "address",
                  label: "Address",
                  rules: [{ required: true }],
                }}
              />
              <Divider style={{ margin: 0 }} />
              <FormItemEditableInputText
                loading={isLoading}
                icon={<PhoneOutlined />}
                placeholder="Add phone number"
                formItemProps={{
                  name: "phone",
                  label: "Phone",
                  rules: [{ required: true }],
                }}
              />
            </Card>
            <DeleteButton
              type="text"
              style={{
                marginTop: "16px",
              }}
              onSuccess={() => {
                list("clients");
              }}
            >
              Delete client
            </DeleteButton>
          </Col>

          <Col xs={{ span: 24 }} xl={{ span: 16 }}>
            <Card
              bordered={false}
              title={
                <Flex gap={12} align="center">
                  <ContainerOutlined />
                  <Typography.Text>Invoices</Typography.Text>
                </Flex>
              }
              styles={{
                header: {
                  padding: "0 16px",
                },
                body: {
                  padding: 0,
                },
              }}
            >
              <Table
                dataSource={invoices}
                pagination={false}
                loading={isLoading}
                rowKey={"id"}
              >
                <Table.Column title="ID" dataIndex="id" key="id" width={72} />
                <Table.Column
                  title="Date"
                  dataIndex="date"
                  key="date"
                  render={(date) => (
                    <DateField value={date} format="D MMM YYYY" />
                  )}
                />
                <Table.Column
                  title="Client"
                  dataIndex="client"
                  key="client"
                  render={(client) => client?.name}
                />
                <Table.Column
                  title="Amount"
                  dataIndex="total"
                  key="total"
                  render={(total) => (
                    <NumberField
                      value={total}
                      options={{ style: "currency", currency: "USD" }}
                    />
                  )}
                />
                <Table.Column
                  key="actions"
                  width={64}
                  render={(_, record: Invoice) => {
                    return (
                      <Flex align="center" gap={8}>
                        <ShowButton
                          hideText
                          resource="invoices"
                          recordItemId={record.id}
                          icon={<ExportOutlined />}
                        />
                      </Flex>
                    );
                  }}
                />
              </Table>
            </Card>
          </Col>
        </Row>
      </Form>
    </Show>
  );
};
