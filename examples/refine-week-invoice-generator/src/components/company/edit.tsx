import {
  Modal,
  Form,
  Input,
  Grid,
  type ModalProps,
  type FormProps,
  Upload,
} from "antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";

import { TOKEN_KEY, API_URL } from "../../constants";

type EditCompanyProps = {
  modalProps: ModalProps;
  formProps: FormProps;
};

export const EditCompany: React.FC<EditCompanyProps> = ({
  modalProps,
  formProps,
}) => {
  const breakpoint = Grid.useBreakpoint();

  return (
    <Modal
      {...modalProps}
      title="Edit Company"
      width={breakpoint.sm ? "600px" : "80%"}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          formProps.onFinish?.(mediaUploadMapper(values));
        }}
      >
        <Form.Item
          label="Company Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Company Address" name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Company Country" name="country">
          <Input />
        </Form.Item>
        <Form.Item label="Company City" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input />
        </Form.Item>
        <Form.Item label="Company Logo">
          <Form.Item
            name={"logo"}
            valuePropName="fileList"
            getValueProps={(data) => getValueProps(data, API_URL)}
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload.Dragger
              name="files"
              action={`${API_URL}/api/upload`}
              headers={{
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
              }}
              listType="picture"
              multiple
            >
              <p className="ant-upload-text">Drag & drop a file in this area</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};
