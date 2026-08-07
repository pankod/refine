import { SaveButton, useDrawerForm } from "@refinedev/antd";
import {
  type BaseKey,
  useApiUrl,
  useGetToPath,
  useGo,
  useTranslate,
} from "@refinedev/core";
import { getValueFromEvent, useSelect } from "@refinedev/antd";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Grid,
  Button,
  Flex,
  Avatar,
  Segmented,
  Spin,
} from "antd";
import type { IProduct, ICategory } from "../../../interfaces";
import { useSearchParams } from "react-router";
import { Drawer } from "../../drawer";
import { UploadOutlined } from "@ant-design/icons";
import { useStyles } from "./styled";

type Props = {
  id?: BaseKey;
  action: "create" | "edit";
  onClose?: () => void;
  onMutationSuccess?: () => void;
};

export const ProductDrawerForm = (props: Props) => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();
  const t = useTranslate();
  const apiUrl = useApiUrl();
  const breakpoint = Grid.useBreakpoint();
  const { styles, theme } = useStyles();

  const { drawerProps, formProps, close, saveButtonProps, formLoading } =
    useDrawerForm<IProduct>({
      resource: "products",
      id: props?.id, // when undefined, id will be read from the URL.
      action: props.action,
      redirect: false,
      onMutationSuccess: () => {
        props.onMutationSuccess?.();
      },
    });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",

    pagination: {
      mode: "server",
    },
  });

  const onDrawerCLose = () => {
    close();

    if (props?.onClose) {
      props.onClose();
      return;
    }

    go({
      to:
        searchParams.get("to") ??
        getToPath({
          action: "list",
        }) ??
        "",
      query: {
        to: undefined,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  const images = Form.useWatch("images", formProps.form);
  const image = images?.[0] || null;
  const previewImageURL = image?.url || image?.response?.url;
  const title = props.action === "edit" ? null : t("products.actions.add");

  return (
    <Drawer
      {...drawerProps}
      open={true}
      title={title}
      width={breakpoint.sm ? "378px" : "100%"}
      zIndex={1001}
      onClose={onDrawerCLose}
    >
      <Spin spinning={formLoading}>
        <Form {...formProps} layout="vertical">
          <Form.Item
            name="images"
            valuePropName="fileList"
            getValueFromEvent={getValueFromEvent}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger
              name="file"
              action={`${apiUrl}/media/upload`}
              maxCount={1}
              accept=".png,.jpg,.jpeg"
              className={styles.uploadDragger}
              showUploadList={false}
            >
              <Flex
                vertical
                align="center"
                justify="center"
                style={{
                  position: "relative",
                  height: "100%",
                }}
              >
                <Avatar
                  shape="square"
                  style={{
                    aspectRatio: 1,
                    objectFit: "contain",
                    width: previewImageURL ? "100%" : "48px",
                    height: previewImageURL ? "100%" : "48px",
                    marginTop: previewImageURL ? undefined : "auto",
                    transform: previewImageURL ? undefined : "translateY(50%)",
                  }}
                  src={previewImageURL || "/images/product-default-img.png"}
                  alt="Product Image"
                />
                <Button
                  icon={<UploadOutlined />}
                  style={{
                    marginTop: "auto",
                    marginBottom: "16px",
                    backgroundColor: theme.colorBgContainer,
                    ...(!!previewImageURL && {
                      position: "absolute",
                      bottom: 0,
                    }),
                  }}
                >
                  {t("products.fields.images.description")}
                </Button>
              </Flex>
            </Upload.Dragger>
          </Form.Item>
          <Flex vertical>
            <Form.Item
              label={t("products.fields.name")}
              name="name"
              className={styles.formItem}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("products.fields.description")}
              name="description"
              className={styles.formItem}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea rows={6} />
            </Form.Item>
            <Form.Item
              label={t("products.fields.price")}
              name="price"
              className={styles.formItem}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber prefix={"$"} style={{ width: "150px" }} />
            </Form.Item>
            <Form.Item
              label={t("products.fields.category")}
              name={["category", "id"]}
              className={styles.formItem}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...categorySelectProps} />
            </Form.Item>
            <Form.Item
              label={t("products.fields.isActive.label")}
              name="isActive"
              className={styles.formItem}
              initialValue={true}
            >
              <Segmented
                block
                size="large"
                options={[
                  {
                    label: t("products.fields.isActive.true"),
                    value: true,
                  },
                  {
                    label: t("products.fields.isActive.false"),
                    value: false,
                  },
                ]}
              />
            </Form.Item>
            <Flex
              align="center"
              justify="space-between"
              style={{
                padding: "16px 16px 0px 16px",
              }}
            >
              <Button onClick={onDrawerCLose}>Cancel</Button>
              <SaveButton
                {...saveButtonProps}
                htmlType="submit"
                type="primary"
                icon={null}
              >
                Save
              </SaveButton>
            </Flex>
          </Flex>
        </Form>
      </Spin>
    </Drawer>
  );
};
