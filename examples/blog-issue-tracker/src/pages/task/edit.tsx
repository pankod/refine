import { useForm, Edit, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import type { ITask, ILabel, IPriority, IStatus, IAuthUser } from "../../types";

export const TaskEdit = () => {
  const { formProps, saveButtonProps } = useForm<ITask>();

  const { selectProps: labelSelectProps } = useSelect<ILabel>({
    resource: "label",
  });

  const { selectProps: priorityProps } = useSelect<IPriority>({
    resource: "priority",
  });

  const { selectProps: assigneeProps } = useSelect<IAuthUser>({
    resource: "users",
    optionValue: "id",
    optionLabel: "email",
  });

  const { selectProps: statusProps } = useSelect<IStatus>({
    resource: "status",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} wrapperCol={{ span: 12 }} layout="vertical">
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>
        <Form.Item label="Label" name="label_id">
          <Select {...labelSelectProps} />
        </Form.Item>
        <Form.Item label="Priority" name="priority_id">
          <Select {...priorityProps} />
        </Form.Item>
        <Form.Item label="Status" name="status_id">
          <Select {...statusProps} />
        </Form.Item>
        <Form.Item label="Assignee" name="user_id">
          <Select {...assigneeProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
