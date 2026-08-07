import { useEffect, useRef, useState } from "react";
import { useNavigation, useTranslate } from "@refinedev/core";
import {
  DeleteButton,
  ListButton,
  SaveButton,
  useForm,
  useSelect,
} from "@refinedev/antd";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  type InputRef,
  Row,
  Select,
} from "antd";
import InputMask from "react-input-mask";

import type { ICourier } from "../../interfaces";
import {
  BikeWhiteIcon,
  CourierFormItemAvatar,
  CourierReviewTable,
  CourierStatus,
  FormItemEditable,
  FormItemHorizontal,
} from "../../components";
import {
  BankOutlined,
  EditOutlined,
  LeftOutlined,
  MailOutlined,
  PhoneOutlined,
  RightCircleOutlined,
  ScanOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export const CourierEdit = () => {
  const titleInputRef = useRef<InputRef>(null);

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const t = useTranslate();
  const { list } = useNavigation();
  const {
    formProps,
    query: queryResult,
    saveButtonProps,
  } = useForm<ICourier>();
  const courier = queryResult?.data?.data;

  const { selectProps: storeSelectProps } = useSelect({
    resource: "stores",
    defaultValue: courier?.store.id,

    queryOptions: {
      enabled: !!courier,
    },

    pagination: {
      mode: "server",
    },
  });

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    defaultValue: courier?.vehicle?.id,
    optionLabel: "model",
    optionValue: "id",

    queryOptions: {
      enabled: !!courier?.vehicle?.id,
    },

    pagination: {
      mode: "server",
    },
  });

  useEffect(() => {
    if (!isFormDisabled) {
      titleInputRef.current?.focus();
    }
  }, [isFormDisabled]);

  return (
    <>
      <Flex>
        <ListButton icon={<LeftOutlined />}>
          {t("couriers.couriers")}
        </ListButton>
      </Flex>
      <Divider />

      <Row gutter={16}>
        <Col span={9}>
          <Form {...formProps} layout="horizontal" disabled={isFormDisabled}>
            <Flex align="center" gap={24}>
              <CourierFormItemAvatar
                formProps={formProps}
                disabled={isFormDisabled}
              />
              <FormItemEditable
                formItemProps={{
                  name: "name",
                  style: {
                    width: "100%",
                    marginBottom: "0",
                  },
                  rules: [
                    {
                      required: true,
                    },
                  ],
                }}
              >
                <Input
                  ref={titleInputRef}
                  size="large"
                  placeholder={t("couriers.fields.name.placeholder")}
                />
              </FormItemEditable>
            </Flex>
            <Card
              style={{
                marginTop: "16px",
              }}
              styles={{
                body: {
                  padding: 0,
                },
              }}
            >
              <FormItemHorizontal
                isInput={false}
                icon={<RightCircleOutlined />}
                label={t("couriers.fields.status.label")}
                flexProps={{
                  style: { padding: "24px 16px 24px 16px" },
                }}
              >
                <CourierStatus
                  isLoading={queryResult?.isLoading}
                  value={
                    courier?.status || {
                      id: 3,
                      text: "Offline",
                    }
                  }
                />
              </FormItemHorizontal>
              <Divider
                style={{
                  margin: "0",
                }}
              />
              <FormItemHorizontal
                name="gsm"
                icon={<PhoneOutlined />}
                label={t("couriers.fields.gsm.label")}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputMask mask="(999) 999 99 99">
                  {/* 
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore */}
                  {(props: InputProps) => <Input {...props} />}
                </InputMask>
              </FormItemHorizontal>
              <Divider
                style={{
                  margin: "0",
                }}
              />
              <FormItemHorizontal
                icon={<MailOutlined />}
                label={t("couriers.fields.email.label")}
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input />
              </FormItemHorizontal>
              <Divider
                style={{
                  margin: "0",
                }}
              />
              <FormItemHorizontal
                icon={<MailOutlined />}
                label={t("couriers.fields.address.label")}
                name="address"
                flexProps={{
                  align: "flex-start",
                }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea rows={2} />
              </FormItemHorizontal>
              <Divider
                style={{
                  margin: "0",
                }}
              />
              <FormItemHorizontal
                icon={<BankOutlined />}
                label={t("couriers.fields.accountNumber.label")}
                name="accountNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  style={{
                    width: "100%",
                  }}
                />
              </FormItemHorizontal>
              <Divider
                style={{
                  margin: "0",
                }}
              />
              <FormItemHorizontal
                icon={<ShopOutlined />}
                label={t("couriers.fields.store.label")}
                name={["store", "id"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select {...storeSelectProps} />
              </FormItemHorizontal>
              <Divider
                style={{
                  margin: "0",
                }}
              />
              <FormItemHorizontal
                icon={<BikeWhiteIcon />}
                label={t("couriers.fields.vehicle.label")}
                name={["vehicle", "id"]}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select {...vehicleSelectProps} />
              </FormItemHorizontal>
              <Divider
                style={{
                  margin: "0",
                }}
              />
              <FormItemHorizontal
                icon={<ScanOutlined />}
                label={t("couriers.fields.licensePlate.label")}
                name="licensePlate"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </FormItemHorizontal>
            </Card>
            <Flex
              align="center"
              justify="space-between"
              style={{
                padding: "16px 16px 0px 16px",
              }}
            >
              {isFormDisabled ? (
                <>
                  <DeleteButton
                    type="text"
                    onSuccess={() => {
                      list("couriers");
                    }}
                    style={{
                      marginLeft: "-16px",
                    }}
                  />
                  <Button
                    style={{
                      marginLeft: "auto",
                    }}
                    disabled={false}
                    icon={<EditOutlined />}
                    onClick={() => setIsFormDisabled(false)}
                  >
                    {t("actions.edit")}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsFormDisabled(true)}>
                    {t("actions.cancel")}
                  </Button>
                  <SaveButton
                    {...saveButtonProps}
                    disabled={isFormDisabled}
                    style={{
                      marginLeft: "auto",
                    }}
                    htmlType="submit"
                    type="primary"
                    icon={null}
                  >
                    Save
                  </SaveButton>
                </>
              )}
            </Flex>
          </Form>
        </Col>
        <Col
          span={15}
          style={{
            marginTop: "88px",
          }}
        >
          <CourierReviewTable courier={courier} />
        </Col>
      </Row>
    </>
  );
};
