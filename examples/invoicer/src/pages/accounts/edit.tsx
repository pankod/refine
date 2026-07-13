import { type HttpError, useNavigation } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  NumberField,
  Show,
  ShowButton,
  useForm,
} from "@refinedev/antd";
import { Card, Divider, Flex, Form, Table, Typography } from "antd";
import {
  BankOutlined,
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ExportOutlined,
  ContainerOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import {
  FormItemEditableInputText,
  FormItemEditableText,
  FormItemUploadLogo,
} from "@/components/form";
import type { Account, AccountForm } from "@/types";

export const AccountsPageEdit = () => {
  const { listUrl } = useNavigation();

  const { formProps, query: queryResult } = useForm<
    Account,
    HttpError,
    AccountForm
  >({
    redirect: false,
    meta: {
      populate: ["logo", "clients", "invoices.client"],
    },
  });
  const account = queryResult?.data?.data;
  const clients = account?.clients || [];
  const invoices = account?.invoices || [];
  const isLoading = queryResult?.isLoading;

  return (
    <Show
      title="Accounts"
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
      <Form
        {...formProps}
        onFinish={(values) => {
          const logoId = values.logo?.file?.response?.[0]?.id;
          return formProps.onFinish?.({
            ...values,
            logo: logoId,
          } as AccountForm);
        }}
        layout="vertical"
      >
        <Row>
          <Col span={24}>
            <Flex gap={16}>
              <FormItemUploadLogo
                isLoading={isLoading}
                label={account?.company_name || " "}
                onUpload={() => {
                  formProps.form?.submit();
                }}
              />
              <FormItemEditableText
                loading={isLoading}
                formItemProps={{
                  name: "company_name",
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
                  <BankOutlined />
                  <Typography.Text>Account info</Typography.Text>
                </Flex>
              }
            >
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
                  rules: [{ required: true }],
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
                listUrl("clients");
              }}
            >
              Delete account
            </DeleteButton>
          </Col>

          <Col xs={{ span: 24 }} xl={{ span: 16 }}>
            <Card
              bordered={false}
              title={
                <Flex gap={12} align="center">
                  <ShopOutlined />
                  <Typography.Text>Clients</Typography.Text>
                </Flex>
              }
              styles={{
                header: {
                  padding: "0 16px",
                },
                body: {
                  padding: "0",
                },
              }}
            >
              <Table
                dataSource={clients}
                pagination={false}
                loading={isLoading}
                rowKey={"id"}
              >
                <Table.Column title="ID" dataIndex="id" key="id" />
                <Table.Column title="Client" dataIndex="name" key="name" />
                <Table.Column
                  title="Owner"
                  dataIndex="owner_name"
                  key="owner_name"
                />
                <Table.Column
                  title="Email"
                  dataIndex="owner_email"
                  key="owner_email"
                />
                <Table.Column
                  key="actions"
                  width={64}
                  render={(_, record: Account) => {
                    return (
                      <EditButton
                        hideText
                        resource="clients"
                        recordItemId={record.id}
                        icon={<ExportOutlined />}
                      />
                    );
                  }}
                />
              </Table>
            </Card>

            <Card
              bordered={false}
              title={
                <Flex gap={12} align="center">
                  <ContainerOutlined />
                  <Typography.Text>Invoices</Typography.Text>
                </Flex>
              }
              style={{ marginTop: "32px" }}
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
                  render={(_, record: Account) => {
                    return (
                      <ShowButton
                        hideText
                        resource="invoices"
                        recordItemId={record.id}
                        icon={<ExportOutlined />}
                      />
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
