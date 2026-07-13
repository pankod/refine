import { useMemo, useState } from "react";
import { Avatar, Form, Skeleton, Typography, Upload } from "antd";
import { getValueProps } from "@refinedev/strapi-v4";
import { CloudUploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/lib/upload";
import { axiosInstance } from "@/providers/axios";
import { getRandomColorFromString } from "@/utils/get-random-color";
import { API_URL, TOKEN_KEY } from "@/utils/constants";
import type { Media, UploadResponse } from "@/types";
import { useStyles } from "./styled";

type Props = {
  label: string;
  formName?: string;
  isLoading?: boolean;
  onUpload?: (params: UploadResponse) => void;
};

export const FormItemUploadLogo = ({
  formName = "logo",
  label,
  isLoading,
  onUpload,
}: Props) => {
  const { styles } = useStyles();

  const [error, setError] = useState<string | null>(null);

  const form = Form.useFormInstance();
  const fieldValue = Form.useWatch(formName, form) as Media | UploadResponse;

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
    <div className={styles.container}>
      <Form.Item
        name={formName}
        valuePropName="fileList"
        getValueProps={(data) => {
          return getValueProps(data, API_URL);
        }}
      >
        {isLoading && (
          <Skeleton.Avatar
            active
            shape="square"
            size={96}
            style={{ borderRadius: "6px" }}
          />
        )}
        {!isLoading && (
          <Upload
            className={styles.upload}
            name="files"
            listType="picture"
            multiple={false}
            showUploadList={false}
            onChange={(info) => {
              if (info.file.status === "done") {
                onUpload?.(info);
              }
            }}
            customRequest={(options) => {
              customRequest({
                file: options.file,
                onSuccess: options.onSuccess,
              });
            }}
          >
            <Avatar
              key={src}
              size={96}
              shape="square"
              src={src}
              alt={label}
              onError={() => {
                setError("Error loading image");
                return true;
              }}
              style={{
                zIndex: 1,
                cursor: "pointer",
                borderRadius: "6px",
                background:
                  error || !src ? getRandomColorFromString(label) : "none",
              }}
            >
              {<Typography.Text>{label[0].toUpperCase()}</Typography.Text>}
            </Avatar>

            <div className={styles.overlayContainer}>
              <div className={styles.overlayIconContainer}>
                <CloudUploadOutlined className={styles.overlayIcon} />
              </div>
            </div>
          </Upload>
        )}
      </Form.Item>
    </div>
  );
};
