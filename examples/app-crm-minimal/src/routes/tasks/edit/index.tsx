import { useState } from "react";

import { DeleteButton, useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import {
  AlignLeftOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

import { Accordion } from "@/components";
import type { Task } from "@/graphql/schema.types";

import { DescriptionForm } from "./forms/description/description-form";
import { DescriptionHeader } from "./forms/description/description-header";
import { DueDateForm } from "./forms/due-date/duedate-form";
import { DueDateHeader } from "./forms/due-date/duedate-header";
import { StageForm } from "./forms/stage/stage-form";
import { TitleForm } from "./forms/title/title-form";
import { UsersForm } from "./forms/users/users-form";
import { UsersHeader } from "./forms/users/users-header";
import { UPDATE_TASK_MUTATION } from "./queries";

export const TasksEditPage = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>();

  const { list } = useNavigation();
  const {
    modalProps,
    close,
    query: queryResult,
  } = useModalForm<Task>({
    action: "edit",
    defaultVisible: true,
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  const { description, dueDate, users, title } = queryResult?.data?.data ?? {};
  const isLoading = queryResult?.isLoading ?? true;

  return (
    <Modal
      {...modalProps}
      className="kanban-update-modal"
      onCancel={() => {
        close();
        list("tasks", "replace");
      }}
      title={<TitleForm initialValues={{ title }} isLoading={isLoading} />}
      width={586}
      footer={
        <DeleteButton
          type="link"
          onSuccess={() => {
            list("tasks", "replace");
          }}
        >
          Delete card
        </DeleteButton>
      }
    >
      <StageForm isLoading={isLoading} />
      <Accordion
        accordionKey="description"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DescriptionHeader description={description} />}
        isLoading={isLoading}
        icon={<AlignLeftOutlined />}
        label="Description"
      >
        <DescriptionForm
          initialValues={{ description }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>
      <Accordion
        accordionKey="due-date"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<DueDateHeader dueData={dueDate} />}
        isLoading={isLoading}
        icon={<FieldTimeOutlined />}
        label="Due date"
      >
        <DueDateForm
          initialValues={{ dueDate: dueDate ?? undefined }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>
      <Accordion
        accordionKey="users"
        activeKey={activeKey}
        setActive={setActiveKey}
        fallback={<UsersHeader users={users} />}
        isLoading={isLoading}
        icon={<UsergroupAddOutlined />}
        label="Users"
      >
        <UsersForm
          initialValues={{
            userIds: users?.map((user) => ({
              label: user.name,
              value: user.id,
            })),
          }}
          cancelForm={() => setActiveKey(undefined)}
        />
      </Accordion>
    </Modal>
  );
};
