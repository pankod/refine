import { useModalForm, useSelect } from "@refinedev/antd";
import { type HttpError, useGo } from "@refinedev/core";
import type {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";

import { Form, Input, Modal, Select } from "antd";

import { SelectOptionWithAvatar } from "@/components";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import type {
  CreateCompanyMutation,
  CreateCompanyMutationVariables,
  UsersSelectQuery,
} from "@/graphql/types";

import { CREATE_COMPANY_MUTATION } from "./queries";

export const CompanyCreateModal = () => {
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: "companies", action: "list" },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm<
    GetFields<CreateCompanyMutation>,
    HttpError,
    GetVariables<CreateCompanyMutationVariables>
  >({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });

  const { selectProps, query: queryResult } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",

    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },

    optionLabel: "name",

    pagination: {
      mode: "server",
    },
  });

  return (
    <Modal
      {...modalProps}
      mask={true}
      onCancel={goToListPage}
      title="Add new company"
      width={512}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Company name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Please enter company name" />
        </Form.Item>
        <Form.Item
          label="Sales owner"
          name="salesOwnerId"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Please enter sales owner user"
            {...selectProps}
            options={
              queryResult.data?.data?.map((user) => ({
                value: user.id,
                label: (
                  <SelectOptionWithAvatar
                    name={user.name}
                    avatarUrl={user.avatarUrl ?? undefined}
                  />
                ),
              })) ?? []
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
