import { Edit, useForm, useSelect } from "@refinedev/antd";
import type { HttpError } from "@refinedev/core";
import type {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";

import { Form, Input, InputNumber, Select } from "antd";

import { CustomAvatar, SelectOptionWithAvatar } from "@/components";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import type {
  BusinessType,
  CompanySize,
  Industry,
} from "@/graphql/schema.types";
import type {
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables,
  UsersSelectQuery,
} from "@/graphql/types";
import { getNameInitials } from "@/utilities";

import { UPDATE_COMPANY_MUTATION } from "./queries";

export const CompanyForm = () => {
  const {
    saveButtonProps,
    formProps,
    formLoading,
    query: queryResult,
  } = useForm<
    GetFields<UpdateCompanyMutation>,
    HttpError,
    GetVariables<UpdateCompanyMutationVariables>
  >({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });
  const { avatarUrl, name } = queryResult?.data?.data || {};

  const { selectProps: selectPropsUsers, query: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      breadcrumb={false}
    >
      <Form {...formProps} layout="vertical">
        <CustomAvatar
          shape="square"
          src={avatarUrl}
          name={getNameInitials(name || "")}
          style={{
            width: 96,
            height: 96,
            marginBottom: "24px",
          }}
        />
        <Form.Item
          label="Sales owner"
          name="salesOwnerId"
          initialValue={formProps?.initialValues?.salesOwner?.id}
        >
          <Select
            {...selectPropsUsers}
            options={
              queryResultUsers.data?.data?.map(({ id, name, avatarUrl }) => ({
                value: id,
                label: (
                  <SelectOptionWithAvatar
                    name={name}
                    avatarUrl={avatarUrl ?? undefined}
                  />
                ),
              })) ?? []
            }
          />
        </Form.Item>
        <Form.Item label="Company size" name="companySize">
          <Select options={companySizeOptions} />
        </Form.Item>
        <Form.Item label="Total revenue" name="totalRevenue">
          <InputNumber
            autoFocus
            addonBefore={"$"}
            min={0}
            placeholder="0,00"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item label="Industry" name="industry">
          <Select options={industryOptions} />
        </Form.Item>
        <Form.Item label="Business type" name="businessType">
          <Select options={businessTypeOptions} />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input placeholder="Country" />
        </Form.Item>
        <Form.Item label="Website" name="website">
          <Input placeholder="Website" />
        </Form.Item>
      </Form>
    </Edit>
  );
};

const companySizeOptions: {
  label: string;
  value: CompanySize;
}[] = [
  {
    label: "Enterprise",
    value: "ENTERPRISE",
  },
  {
    label: "Large",
    value: "LARGE",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "Small",
    value: "SMALL",
  },
];

const industryOptions: {
  label: string;
  value: Industry;
}[] = [
  { label: "Aerospace", value: "AEROSPACE" },
  { label: "Agriculture", value: "AGRICULTURE" },
  { label: "Automotive", value: "AUTOMOTIVE" },
  { label: "Chemicals", value: "CHEMICALS" },
  { label: "Construction", value: "CONSTRUCTION" },
  { label: "Defense", value: "DEFENSE" },
  { label: "Education", value: "EDUCATION" },
  { label: "Energy", value: "ENERGY" },
  { label: "Financial Services", value: "FINANCIAL_SERVICES" },
  { label: "Food and Beverage", value: "FOOD_AND_BEVERAGE" },
  { label: "Government", value: "GOVERNMENT" },
  { label: "Healthcare", value: "HEALTHCARE" },
  { label: "Hospitality", value: "HOSPITALITY" },
  { label: "Industrial Manufacturing", value: "INDUSTRIAL_MANUFACTURING" },
  { label: "Insurance", value: "INSURANCE" },
  { label: "Life Sciences", value: "LIFE_SCIENCES" },
  { label: "Logistics", value: "LOGISTICS" },
  { label: "Media", value: "MEDIA" },
  { label: "Mining", value: "MINING" },
  { label: "Nonprofit", value: "NONPROFIT" },
  { label: "Other", value: "OTHER" },
  { label: "Pharmaceuticals", value: "PHARMACEUTICALS" },
  { label: "Professional Services", value: "PROFESSIONAL_SERVICES" },
  { label: "Real Estate", value: "REAL_ESTATE" },
  { label: "Retail", value: "RETAIL" },
  { label: "Technology", value: "TECHNOLOGY" },
  { label: "Telecommunications", value: "TELECOMMUNICATIONS" },
  { label: "Transportation", value: "TRANSPORTATION" },
  { label: "Utilities", value: "UTILITIES" },
];

const businessTypeOptions: {
  label: string;
  value: BusinessType;
}[] = [
  {
    label: "B2B",
    value: "B2B",
  },
  {
    label: "B2C",
    value: "B2C",
  },
  {
    label: "B2G",
    value: "B2G",
  },
];
