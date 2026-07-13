import {
  Button,
  Flex,
  Form,
  type FormItemProps,
  Select,
  type SelectProps,
  Skeleton,
  Typography,
} from "antd";
import { type PropsWithChildren, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useStyles } from "./styled";

type Props = {
  icon?: React.ReactNode;
  formItemProps?: FormItemProps;
  selectProps?: SelectProps;
  editIcon?: React.ReactNode;
  loading?: boolean;
  onEditClick?: () => void;
  onCancelClick?: () => void;
  onSave?: () => void;
};

export const FormItemEditableSelect = ({
  icon,
  formItemProps,
  selectProps,
  editIcon = <EditOutlined />,
  loading,
  onEditClick,
  onCancelClick,
  onSave,
}: PropsWithChildren<Props>) => {
  const [disabled, setDisabled] = useState(true);

  const { styles, cx } = useStyles();
  const form = Form.useFormInstance();

  const handleEdit = () => {
    setDisabled(false);
    onEditClick?.();
  };

  const handleOnCancel = () => {
    setDisabled(true);
    form.resetFields([formItemProps?.name]);
    onCancelClick?.();
  };

  const handleOnSave = async () => {
    try {
      await form.validateFields();
      form.submit();
      setDisabled(true);
      onSave?.();
    } catch (err) {}
  };

  return (
    <Flex align="center" vertical={!disabled} className={styles.container}>
      <Form.Item
        {...formItemProps}
        className={cx(styles.formItem, {
          [styles.formItemDisabled]: disabled,
          [styles.formItemEnabled]: !disabled,
        })}
        rules={disabled ? [] : formItemProps?.rules}
        label={
          formItemProps?.label && (
            <Flex gap={16} align="center">
              <Typography.Text type="secondary">{icon}</Typography.Text>
              <Typography.Text type="secondary">
                {formItemProps?.label}
              </Typography.Text>
            </Flex>
          )
        }
      >
        {loading && (
          <Skeleton.Input
            style={{ height: "22px", marginLeft: "32px" }}
            active
          />
        )}
        {!loading && <Select {...selectProps} disabled={disabled} />}
      </Form.Item>
      {disabled && <Button icon={editIcon} onClick={handleEdit} />}
      {!disabled && (
        <Flex
          gap={8}
          style={{
            alignSelf: "flex-end",
            marginTop: "8px",
          }}
        >
          <Button onClick={handleOnCancel}>Cancel</Button>
          <Button type="primary" onClick={handleOnSave}>
            Save
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
