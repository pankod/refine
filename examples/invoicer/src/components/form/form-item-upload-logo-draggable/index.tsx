import { useMemo } from "react";
import { Button, Flex, Form, Upload, theme } from "antd";
import { CloudUploadOutlined, PictureOutlined } from "@ant-design/icons";
import { getValueProps } from "@refinedev/strapi-v4";
import type { RcFile, UploadChangeParam } from "antd/lib/upload";
import { axiosInstance } from "@/providers/axios";
import { API_URL, TOKEN_KEY } from "@/utils/constants";
import type { Media, UploadResponse } from "@/types";
import { useStyles } from "./styled";

type Props = {
  name?: string;
  onUpload?: (params: UploadResponse) => void;
};

export const FormItemUploadLogoDraggable = ({
  name = "logo",
  onUpload,
}: Props) => {
  const { styles } = useStyles();
  const { token } = theme.useToken();

  const form = Form.useFormInstance();
  const fieldValue = Form.useWatch(name, form) as Media | UploadResponse;

  const src = useMemo(() => {
    if (!fieldValue) return null;

    if ("url" in fieldValue) {
      return `${API_URL}${fieldValue?.url}`;
    }

    if (fieldValue.file?.response?.[0]?.url) {
      return `${API_URL}${fieldValue?.file?.response?.[0]?.url}`;
    }

    return null;
  }, [fieldValue]);

  const onChange = (info: UploadChangeParam) => {
    if (info.file.status === "error") {
    }

    if (info.file.status === "done") {
      onUpload?.(info);
    }
  };

  const customRequest = async ({
    file,
    onSuccess,
  }: {
    file: string | RcFile | Blob;
    onSuccess:
      | ((body: any, xhr?: XMLHttpRequest | undefined) => void)
      | undefined;
  }) => {
    const formData = new FormData();
    formData.append("files", file);
    form.setFields([{ name: name, errors: [] }]);

    try {
      const response = await axiosInstance.post(
        `${API_URL}/api/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
          },
        },
      );

      onSuccess?.(response?.data, response?.request);
    } catch (error: any) {
      if (error.request.status === 0 || error.request.status === 413) {
        form.setFields([{ name: name, errors: ["File is too large"] }]);
        return;
      }

      form.setFields([
        { name: name, errors: [error?.message || "Something went wrong"] },
      ]);

      return;
    }
  };

  return (
    <Flex gap={16} vertical>
      <div className={styles.container}>
        <Form.Item
          name="logo"
          valuePropName="fileList"
          getValueProps={(data) => {
            return getValueProps(data, API_URL);
          }}
          noStyle
        >
          <Upload.Dragger
            name="files"
            listType="picture"
            accept="image/*"
            multiple={false}
            showUploadList={false}
            style={{
              padding: 0,
            }}
            onChange={onChange}
            customRequest={(options) => {
              customRequest({
                file: options.file,
                onSuccess: options.onSuccess,
              });
            }}
          >
            {src && (
              <img
                src={src}
                alt="preview"
                style={{
                  width: "148px",
                  height: "148px",
                  objectFit: "cover",
                }}
              />
            )}
            {!src && (
              <PictureOutlined
                style={{
                  fontSize: "48px",
                  color: token.colorTextTertiary,
                }}
              />
            )}
          </Upload.Dragger>
        </Form.Item>
      </div>
      <Form.Item
        name="logo"
        valuePropName="fileList"
        getValueProps={(data) => {
          return getValueProps(data, API_URL);
        }}
        noStyle
      >
        <Upload
          name="files"
          listType="picture"
          accept="image/*"
          multiple={false}
          showUploadList={false}
          onChange={onChange}
          customRequest={(options) => {
            customRequest({
              file: options.file,
              onSuccess: options.onSuccess,
            });
          }}
        >
          <Button
            style={{
              width: "148px",
            }}
            icon={<CloudUploadOutlined />}
          >
            Upload Logo
          </Button>
        </Upload>
      </Form.Item>
    </Flex>
  );
};
