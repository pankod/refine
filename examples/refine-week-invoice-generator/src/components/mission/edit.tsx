import {
  Form,
  Input,
  type ModalProps,
  type FormProps,
  Modal,
  InputNumber,
} from "antd";

type EditMissionProps = {
  modalProps: ModalProps;
  formProps: FormProps;
};

export const EditMission: React.FC<EditMissionProps> = ({
  modalProps,
  formProps,
}) => {
  return (
    <Modal {...modalProps} title="Edit Mission">
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="mission"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="mission_description">
          <Input />
        </Form.Item>
        <Form.Item label="Day(s)" name="day">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Daily Rate" name="daily_rate">
          <InputNumber />
        </Form.Item>
      </Form>
    </Modal>
  );
};
