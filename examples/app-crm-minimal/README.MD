<div align="center" style="margin: 30px;">
<img src="https://refine.ams3.cdn.digitaloceanspaces.com/example-readmes/CRM-Minimal/minimal-crm-cover.png" alt="Refine Logo"  />
<br />
<br />

<div align="center">
    <a href="https://refine.dev">Home Page</a> |
    <a href="https://discord.gg/refine">Discord</a> |
    <a href="https://refine.dev/examples/">Examples</a> |
    <a href="https://refine.dev/blog/">Blog</a> |
    <a href="https://refine.dev/docs/">Documentation</a>
</div>
</div>

<br />

<div align="center">Build your React-based internal tools, admin panels, dashboards, B2B apps with flexibility in mind.<br>An open-source, headless React meta-framework, developed with a commitment to best practices, flexibility, minimal tech debt, and team alignment, could be a perfect fit for dynamic environments.
<br />
<br />

[![Discord](https://img.shields.io/discord/837692625737613362.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/refine)
[![Twitter Follow](https://img.shields.io/twitter/follow/refine_dev?style=social)](https://twitter.com/refine_dev)

</div>

## About

⭐ **Checkout the live demo of the application [here](https://example.minimal-crm.refine.dev).**

The source code for the video tutorial of an enterprise-grade and production-ready internal tool example named "Real-Time CRM Dashboard" has been developed using [Refine](https://refine.dev/), [Ant Design](https://ant.design/), and [GraphQL](https://graphql.org/).

Refine is an open-source React-meta framework specifically designed to meet the requirements of enterprise companies dev teams. It comes with a core package that simplifies app requirements like data handling, authentication, access control, etc.

The repository also open-source; feel free to use or inspect it to discover how Refine works.

Being production-ready, you can either build your own **B2B applications**, **internal tools**, **admin panels**, **dashboards** and all type of **CRUD** applications. using it as a code base or directly implement it as is.

👉 You can find a more comprehensive CRM example [here](https://example.crm.refine.dev/).

## Tutorial

This repository contains the code corresponding to an in-depth tutorial available on <a href="https://www.youtube.com/@javascriptmastery/videos" target="_blank"><b>JavaScript Mastery</b></a> YouTube channel.

<a href="https://youtu.be/6a3Dz8gwjdg" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" /></a>

## Tech Stack

- Refine
- TypeScript
- GraphQL
- Ant Design
- Codegen
- Vite

## Features

**Authentication**: Seamless onboarding with secure login and signup functionalities; robust password recovery ensures a smooth authentication experience.

**Authorization**: Granular access control regulates user actions, maintaining data security and user permissions.

**Home Page**: Dynamic home page showcases interactive charts for key metrics; real-time updates on activities, upcoming events, and a deals chart for business insights.

**Companies Page**: Complete CRUD for company management and sales processes; detailed profiles with add/edit functions, associated contacts/leads, pagination, and field-specific search.

**Kanban Board**: Collaborative board with real-time task updates; customization options include due dates, markdown descriptions, and multi-assignees, dynamically shifting tasks across dashboards.

**Account Settings**: Personalized user account settings for profile management; streamlined configuration options for a tailored application experience.

**Responsive**: Full responsiveness across devices for consistent user experience; fluid design adapts seamlessly to various screen sizes, ensuring accessibility.

<br>

![Product Edit Page](https://refine.ams3.cdn.digitaloceanspaces.com/example-readmes/CRM-Minimal/crm-demo.gif "Demo GIF")

<br>

## Try this example on your local

```bash
npm create refine-app@latest -- --example app-crm-minimal
```

This will download the files and install the necessary dependencies automatically.

Once it's done, go to the directory and run the following command to start the project:

```bash
npm run dev
```

Open http://localhost:5173 in your browser to view the project.

## Code Snippets

<details>
<summary><code>providers/auth.ts</code></summary>

```typescript
import type { AuthProvider } from "@refinedev/core";

import { API_URL, dataProvider } from "./data";

// For demo purposes and to make it easier to test the app, you can use the following credentials
export const authCredentials = {
  email: "michael.scott@dundermifflin.com",
  password: "demodemo",
};

export const authProvider: AuthProvider = {
  login: async ({ email }) => {
    try {
      // call the login mutation
      // dataProvider.custom is used to make a custom request to the GraphQL API
      // this will call dataProvider which will go through the fetchWrapper function
      const { data } = await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          variables: { email },
          // pass the email to see if the user exists and if so, return the accessToken
          rawQuery: `
            mutation Login($email: String!) {
              login(loginInput: { email: $email }) {
                accessToken
              }
            }
          `,
        },
      });

      // save the accessToken in localStorage
      localStorage.setItem("access_token", data.login.accessToken);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (e) {
      const error = e as Error;

      return {
        success: false,
        error: {
          message: "message" in error ? error.message : "Login failed",
          name: "name" in error ? error.name : "Invalid email or password",
        },
      };
    }
  },

  // simply remove the accessToken from localStorage for the logout
  logout: async () => {
    localStorage.removeItem("access_token");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    // a check to see if the error is an authentication error
    // if so, set logout to true
    if (error.statusCode === "UNAUTHENTICATED") {
      return {
        logout: true,
        ...error,
      };
    }

    return { error };
  },

  check: async () => {
    try {
      //  get the identity of the user
      // this is to know if the user is authenticated or not
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: {},
        meta: {
          rawQuery: `
            query Me {
              me {
                name
              }
            }
          `,
        },
      });

      // if the user is authenticated, redirect to the home page
      return {
        authenticated: true,
        redirectTo: "/",
      };
    } catch (error) {
      // for any other error, redirect to the login page
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  // get the user information
  getIdentity: async () => {
    const accessToken = localStorage.getItem("access_token");

    try {
      // call the GraphQL API to get the user information
      // we're using me:any because the GraphQL API doesn't have a type for the me query yet.
      // we'll add some queries and mutations later and change this to User which will be generated by codegen.
      const { data } = await dataProvider.custom<{ me: any }>({
        url: API_URL,
        method: "post",
        headers: accessToken
          ? {
              // send the accessToken in the Authorization header
              Authorization: `Bearer ${accessToken}`,
            }
          : {},
        meta: {
          // get the user information such as name, email, etc.
          rawQuery: `
            query Me {
              me {
                id
                name
                email
                phone
                jobTitle
                timezone
                avatarUrl
              }
            }
          `,
        },
      });

      return data.me;
    } catch (error) {
      return undefined;
    }
  },
};
```

</details>

<details>
<summary>GraphQl and Codegen Setup</summary>

```bash
npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/import-types-preset prettier vite-tsconfig-paths
```

</details>

<details>
<summary><code>graphql.config.ts</code></summary>

```typescript
import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  // define graphQL schema provided by Refine
  schema: "https://api.crm.refine.dev/graphql",
  extensions: {
    // codegen is a plugin that generates typescript types from GraphQL schema
    // https://the-guild.dev/graphql/codegen
    codegen: {
      // hooks are commands that are executed after a certain event
      hooks: {
        afterOneFileWrite: ["eslint --fix", "prettier --write"],
      },
      // generates typescript types from GraphQL schema
      generates: {
        // specify the output path of the generated types
        "src/graphql/schema.types.ts": {
          // use typescript plugin
          plugins: ["typescript"],
          // set the config of the typescript plugin
          // this defines how the generated types will look like
          config: {
            skipTypename: true, // skipTypename is used to remove __typename from the generated types
            enumsAsTypes: true, // enumsAsTypes is used to generate enums as types instead of enums.
            // scalars is used to define how the scalars i.e. DateTime, JSON, etc. will be generated
            // scalar is a type that is not a list and does not have fields. Meaning it is a primitive type.
            scalars: {
              // DateTime is a scalar type that is used to represent date and time
              DateTime: {
                input: "string",
                output: "string",
                format: "date-time",
              },
            },
          },
        },
        // generates typescript types from GraphQL operations
        // graphql operations are queries, mutations, and subscriptions we write in our code to communicate with the GraphQL API
        "src/graphql/types.ts": {
          // preset is a plugin that is used to generate typescript types from GraphQL operations
          // import-types suggests to import types from schema.types.ts or other files
          // this is used to avoid duplication of types
          // https://the-guild.dev/graphql/codegen/plugins/presets/import-types-preset
          preset: "import-types",
          // documents is used to define the path of the files that contain GraphQL operations
          documents: ["src/**/*.{ts,tsx}"],
          // plugins is used to define the plugins that will be used to generate typescript types from GraphQL operations
          plugins: ["typescript-operations"],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
            // determine whether the generated types should be resolved ahead of time or not.
            // When preResolveTypes is set to false, the code generator will not try to resolve the types ahead of time.
            // Instead, it will generate more generic types, and the actual types will be resolved at runtime.
            preResolveTypes: false,
            // useTypeImports is used to import types using import type instead of import.
            useTypeImports: true,
          },
          // presetConfig is used to define the config of the preset
          presetConfig: {
            typesPath: "./schema.types",
          },
        },
      },
    },
  },
};

export default config;
```

</details>

<details>
<summary><code>graphql/mutations.ts</code></summary>

```typescript
import gql from "graphql-tag";

// Mutation to update user
export const UPDATE_USER_MUTATION = gql`
  # The ! after the type means that it is required
  mutation UpdateUser($input: UpdateOneUserInput!) {
    # call the updateOneUser mutation with the input and pass the $input argument
    # $variableName is a convention for GraphQL variables
    updateOneUser(input: $input) {
      id
      name
      avatarUrl
      email
      phone
      jobTitle
    }
  }
`;

// Mutation to create company
export const CREATE_COMPANY_MUTATION = gql`
  mutation CreateCompany($input: CreateOneCompanyInput!) {
    createOneCompany(input: $input) {
      id
      salesOwner {
        id
      }
    }
  }
`;

// Mutation to update company details
export const UPDATE_COMPANY_MUTATION = gql`
  mutation UpdateCompany($input: UpdateOneCompanyInput!) {
    updateOneCompany(input: $input) {
      id
      name
      totalRevenue
      industry
      companySize
      businessType
      country
      website
      avatarUrl
      salesOwner {
        id
        name
        avatarUrl
      }
    }
  }
`;

// Mutation to update task stage of a task
export const UPDATE_TASK_STAGE_MUTATION = gql`
  mutation UpdateTaskStage($input: UpdateOneTaskInput!) {
    updateOneTask(input: $input) {
      id
    }
  }
`;

// Mutation to create a new task
export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: CreateOneTaskInput!) {
    createOneTask(input: $input) {
      id
      title
      stage {
        id
        title
      }
    }
  }
`;

// Mutation to update a task details
export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateOneTaskInput!) {
    updateOneTask(input: $input) {
      id
      title
      completed
      description
      dueDate
      stage {
        id
        title
      }
      users {
        id
        name
        avatarUrl
      }
      checklist {
        title
        checked
      }
    }
  }
`;
```

</details>

<details>
<summary><code>graphql/queries.ts</code></summary>

```typescript
import gql from "graphql-tag";

// Query to get Total Company, Contact and Deal Counts
export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
  query DashboardTotalCounts {
    companies {
      totalCount
    }
    contacts {
      totalCount
    }
    deals {
      totalCount
    }
  }
`;

// Query to get upcoming events
export const DASHBOARD_CALENDAR_UPCOMING_EVENTS_QUERY = gql`
  query DashboardCalendarUpcomingEvents(
    $filter: EventFilter!
    $sorting: [EventSort!]
    $paging: OffsetPaging!
  ) {
    events(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        color
        startDate
        endDate
      }
    }
  }
`;

// Query to get deals chart
export const DASHBOARD_DEALS_CHART_QUERY = gql`
  query DashboardDealsChart(
    $filter: DealStageFilter!
    $sorting: [DealStageSort!]
    $paging: OffsetPaging
  ) {
    dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
      # Get all deal stages
      nodes {
        id
        title
        # Get the sum of all deals in this stage and group by closeDateMonth and closeDateYear
        dealsAggregate {
          groupBy {
            closeDateMonth
            closeDateYear
          }
          sum {
            value
          }
        }
      }
      # Get the total count of all deals in this stage
      totalCount
    }
  }
`;

// Query to get latest activities deals
export const DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY = gql`
  query DashboardLatestActivitiesDeals(
    $filter: DealFilter!
    $sorting: [DealSort!]
    $paging: OffsetPaging
  ) {
    deals(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
        stage {
          id
          title
        }
        company {
          id
          name
          avatarUrl
        }
        createdAt
      }
    }
  }
`;

// Query to get latest activities audits
export const DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY = gql`
  query DashboardLatestActivitiesAudits(
    $filter: AuditFilter!
    $sorting: [AuditSort!]
    $paging: OffsetPaging
  ) {
    audits(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        action
        targetEntity
        targetId
        changes {
          field
          from
          to
        }
        createdAt
        user {
          id
          name
          avatarUrl
        }
      }
    }
  }
`;

// Query to get companies list
export const COMPANIES_LIST_QUERY = gql`
  query CompaniesList(
    $filter: CompanyFilter!
    $sorting: [CompanySort!]
    $paging: OffsetPaging!
  ) {
    companies(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        # Get the sum of all deals in this company
        dealsAggregate {
          sum {
            value
          }
        }
      }
    }
  }
`;

// Query to get users list
export const USERS_SELECT_QUERY = gql`
  query UsersSelect(
    $filter: UserFilter!
    $sorting: [UserSort!]
    $paging: OffsetPaging!
  ) {
    # Get all users
    users(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of users
      # Get specific fields for each user
      nodes {
        id
        name
        avatarUrl
      }
    }
  }
`;

// Query to get contacts associated with a company
export const COMPANY_CONTACTS_TABLE_QUERY = gql`
  query CompanyContactsTable(
    $filter: ContactFilter!
    $sorting: [ContactSort!]
    $paging: OffsetPaging!
  ) {
    contacts(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
        jobTitle
        email
        phone
        status
      }
    }
  }
`;

// Query to get task stages list
export const TASK_STAGES_QUERY = gql`
  query TaskStages(
    $filter: TaskStageFilter!
    $sorting: [TaskStageSort!]
    $paging: OffsetPaging!
  ) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of task stages
      nodes {
        id
        title
      }
    }
  }
`;

// Query to get tasks list
export const TASKS_QUERY = gql`
  query Tasks(
    $filter: TaskFilter!
    $sorting: [TaskSort!]
    $paging: OffsetPaging!
  ) {
    tasks(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount # Get the total count of tasks
      nodes {
        id
        title
        description
        dueDate
        completed
        stageId
        # Get user details associated with this task
        users {
          id
          name
          avatarUrl
        }
        createdAt
        updatedAt
      }
    }
  }
`;

// Query to get task stages for select
export const TASK_STAGES_SELECT_QUERY = gql`
  query TaskStagesSelect(
    $filter: TaskStageFilter!
    $sorting: [TaskStageSort!]
    $paging: OffsetPaging!
  ) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
`;
```

</details>

<details>
<summary><code>text.tsx</code></summary>

```typescript
import React from "react";

import { ConfigProvider, Typography } from "antd";

export type TextProps = {
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "xxxl"
    | "huge"
    | "xhuge"
    | "xxhuge";
} & React.ComponentProps<typeof Typography.Text>;

// define the font sizes and line heights
const sizes = {
  xs: {
    fontSize: 12,
    lineHeight: 20 / 12,
  },
  sm: {
    fontSize: 14,
    lineHeight: 22 / 14,
  },
  md: {
    fontSize: 16,
    lineHeight: 24 / 16,
  },
  lg: {
    fontSize: 20,
    lineHeight: 28 / 20,
  },
  xl: {
    fontSize: 24,
    lineHeight: 32 / 24,
  },
  xxl: {
    fontSize: 30,
    lineHeight: 38 / 30,
  },
  xxxl: {
    fontSize: 38,
    lineHeight: 46 / 38,
  },
  huge: {
    fontSize: 46,
    lineHeight: 54 / 46,
  },
  xhuge: {
    fontSize: 56,
    lineHeight: 64 / 56,
  },
  xxhuge: {
    fontSize: 68,
    lineHeight: 76 / 68,
  },
};

// a custom Text component that wraps/extends the antd Typography.Text component
export const Text = ({ size = "sm", children, ...rest }: TextProps) => {
  return (
    // config provider is a top-level component that allows us to customize the global properties of antd components. For example, default antd theme
    // token is a term used by antd to refer to the design tokens like font size, font weight, color, etc
    // https://ant.design/docs/react/customize-theme#customize-design-token
    <ConfigProvider
      theme={{
        token: {
          ...sizes[size],
        },
      }}
    >
      {/**
       * Typography.Text is a component from antd that allows us to render text
       * Typography has different components like Title, Paragraph, Text, Link, etc
       * https://ant.design/components/typography/#Typography.Text
       */}
      <Typography.Text {...rest}>{children}</Typography.Text>
    </ConfigProvider>
  );
};
```

</details>

<details>
<summary><code>components/layout/account-settings.tsx</code></summary>

```typescript
import { SaveButton, useForm } from "@refinedev/antd";
import { HttpError } from "@refinedev/core";
import { GetFields, GetVariables } from "@refinedev/nestjs-query";

import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Drawer, Form, Input, Spin } from "antd";

import { getNameInitials } from "@/utilities";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations";

import { Text } from "../text";
import CustomAvatar from "../custom-avatar";

import {
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "@/graphql/types";

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  userId: string;
};

export const AccountSettings = ({ opened, setOpened, userId }: Props) => {
  /**
   * useForm in Refine is used to manage forms. It provides us with a lot of useful props and methods that we can use to manage forms.
   * https://refine.dev/docs/data/hooks/use-form/#usage
   */

  /**
   * saveButtonProps -> contains all the props needed by the "submit" button. For example, "loading", "disabled", "onClick", etc.
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/#savebuttonprops
   *
   * formProps -> It's an instance of HTML form that manages form state and actions like onFinish, onValuesChange, etc.
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-form/#form
   *
   * queryResult -> contains the result of the query. For example, isLoading, data, error, etc.
   * https://refine.dev/docs/packages/react-hook-form/use-form/#queryresult
   */
  const { saveButtonProps, formProps, queryResult } = useForm<
    /**
     * GetFields is used to get the fields of the mutation i.e., in this case, fields are name, email, jobTitle, and phone
     * https://refine.dev/docs/data/packages/nestjs-query/#getfields
     */
    GetFields<UpdateUserMutation>,
    // a type that represents an HTTP error. Used to specify the type of error mutation can throw.
    HttpError,
    // A third type parameter used to specify the type of variables for the UpdateUserMutation. Meaning that the variables for the UpdateUserMutation should be of type UpdateUserMutationVariables
    GetVariables<UpdateUserMutationVariables>
  >({
    /**
     * mutationMode is used to determine how the mutation should be performed. For example, optimistic, pessimistic, undoable etc.
     * optimistic -> redirection and UI updates are executed immediately as if the mutation is successful.
     * pessimistic -> redirection and UI updates are executed after the mutation is successful.
     * https://refine.dev/docs/advanced-tutorials/mutation-mode/#overview
     */
    mutationMode: "optimistic",
    /**
     * specify on which resource the mutation should be performed
     * if not specified, Refine will determine the resource name by the current route
     */
    resource: "users",
    /**
     * specify the action that should be performed on the resource. Behind the scenes, Refine calls useOne hook to get the data of the user for edit action.
     * https://refine.dev/docs/data/hooks/use-form/#edit
     */
    action: "edit",
    id: userId,
    /**
     * used to provide any additional information to the data provider.
     * https://refine.dev/docs/data/hooks/use-form/#meta-
     */
    meta: {
      // gqlMutation is used to specify the mutation that should be performed.
      gqlMutation: UPDATE_USER_MUTATION,
    },
  });
  const { avatarUrl, name } = queryResult?.data?.data || {};

  const closeModal = () => {
    setOpened(false);
  };

  // if query is processing, show a loading indicator
  if (queryResult?.isLoading) {
    return (
      <Drawer
        open={opened}
        width={756}
        styles={{
          body: {
            background: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Spin />
      </Drawer>
    );
  }

  return (
    <Drawer
      onClose={closeModal}
      open={opened}
      width={756}
      styles={{
        body: { background: "#f5f5f5", padding: 0 },
        header: { display: "none" },
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px",
          backgroundColor: "#fff",
        }}
      >
        <Text strong>Account Settings</Text>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => closeModal()}
        />
      </div>
      <div
        style={{
          padding: "16px",
        }}
      >
        <Card>
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
            <Form.Item label="Name" name="name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input placeholder="email" />
            </Form.Item>
            <Form.Item label="Job title" name="jobTitle">
              <Input placeholder="jobTitle" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Timezone" />
            </Form.Item>
          </Form>
          <SaveButton
            {...saveButtonProps}
            style={{
              display: "block",
              marginLeft: "auto",
            }}
          />
        </Card>
      </div>
    </Drawer>
  );
};
```

</details>

<details>
<summary><code>constants/index.tsx</code></summary>

```typescript
import { AuditOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";

const IconWrapper = ({
  color,
  children,
}: React.PropsWithChildren<{ color: string }>) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
};

import {
  BusinessType,
  CompanySize,
  Contact,
  Industry,
} from "@/graphql/schema.types";

export type TotalCountType = "companies" | "contacts" | "deals";

export const totalCountVariants: {
  [key in TotalCountType]: {
    primaryColor: string;
    secondaryColor?: string;
    icon: React.ReactNode;
    title: string;
    data: { index: string; value: number }[];
  };
} = {
  companies: {
    primaryColor: "#1677FF",
    secondaryColor: "#BAE0FF",
    icon: (
      <IconWrapper color="#E6F4FF">
        <ShopOutlined
          className="md"
          style={{
            color: "#1677FF",
          }}
        />
      </IconWrapper>
    ),
    title: "Number of companies",
    data: [
      {
        index: "1",
        value: 3500,
      },
      {
        index: "2",
        value: 2750,
      },
      {
        index: "3",
        value: 5000,
      },
      {
        index: "4",
        value: 4250,
      },
      {
        index: "5",
        value: 5000,
      },
    ],
  },
  contacts: {
    primaryColor: "#52C41A",
    secondaryColor: "#D9F7BE",
    icon: (
      <IconWrapper color="#F6FFED">
        <TeamOutlined
          className="md"
          style={{
            color: "#52C41A",
          }}
        />
      </IconWrapper>
    ),
    title: "Number of contacts",
    data: [
      {
        index: "1",
        value: 10000,
      },
      {
        index: "2",
        value: 19500,
      },
      {
        index: "3",
        value: 13000,
      },
      {
        index: "4",
        value: 17000,
      },
      {
        index: "5",
        value: 13000,
      },
      {
        index: "6",
        value: 20000,
      },
    ],
  },
  deals: {
    primaryColor: "#FA541C",
    secondaryColor: "#FFD8BF",
    icon: (
      <IconWrapper color="#FFF2E8">
        <AuditOutlined
          className="md"
          style={{
            color: "#FA541C",
          }}
        />
      </IconWrapper>
    ),
    title: "Total deals in pipeline",
    data: [
      {
        index: "1",
        value: 1000,
      },
      {
        index: "2",
        value: 1300,
      },
      {
        index: "3",
        value: 1200,
      },
      {
        index: "4",
        value: 2000,
      },
      {
        index: "5",
        value: 800,
      },
      {
        index: "6",
        value: 1700,
      },
      {
        index: "7",
        value: 1400,
      },
      {
        index: "8",
        value: 1800,
      },
    ],
  },
};

export const statusOptions: {
  label: string;
  value: Contact["status"];
}[] = [
  {
    label: "New",
    value: "NEW",
  },
  {
    label: "Qualified",
    value: "QUALIFIED",
  },
  {
    label: "Unqualified",
    value: "UNQUALIFIED",
  },
  {
    label: "Won",
    value: "WON",
  },
  {
    label: "Negotiation",
    value: "NEGOTIATION",
  },
  {
    label: "Lost",
    value: "LOST",
  },
  {
    label: "Interested",
    value: "INTERESTED",
  },
  {
    label: "Contacted",
    value: "CONTACTED",
  },
  {
    label: "Churned",
    value: "CHURNED",
  },
];

export const companySizeOptions: {
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

export const industryOptions: {
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

export const businessTypeOptions: {
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
```

</details>

<details>
<summary><code>pages/company/contacts-table.tsx</code></summary>

```typescript
import { useParams } from "react-router";

import { FilterDropdown, useTable } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import {
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Select, Space, Table } from "antd";

import { statusOptions } from "@/constants";
import { COMPANY_CONTACTS_TABLE_QUERY } from "@/graphql/queries";

import { CompanyContactsTableQuery } from "@/graphql/types";
import { Text } from "@/components/text";
import CustomAvatar from "@/components/custom-avatar";
import { ContactStatusTag } from "@/components/tags/contact-status-tag";

type Contact = GetFieldsFromList<CompanyContactsTableQuery>;

export const CompanyContactsTable = () => {
  // get params from the url
  const params = useParams();

  /**
   * Refine offers a TanStack Table adapter with @refinedev/react-table that allows us to use the TanStack Table library with Refine.
   * All features such as sorting, filtering, and pagination come out of the box
   * Under the hood it uses useList hook to fetch the data.
   * https://refine.dev/docs/packages/tanstack-table/use-table/#installation
   */
  const { tableProps } = useTable<Contact>({
    // specify the resource for which the table is to be used
    resource: "contacts",
    syncWithLocation: false,
    // specify initial sorters
    sorters: {
      /**
       * initial sets the initial value of sorters.
       * it's not permanent
       * it will be cleared when the user changes the sorting
       * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/#sortersinitial
       */
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
    // specify initial filters
    filters: {
      /**
       * similar to initial in sorters
       * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/#filtersinitial
       */
      initial: [
        {
          field: "jobTitle",
          value: "",
          operator: "contains",
        },
        {
          field: "name",
          value: "",
          operator: "contains",
        },
        {
          field: "status",
          value: undefined,
          operator: "in",
        },
      ],
      /**
       * permanent filters are the filters that are always applied
       * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-table/#filterspermanent
       */
      permanent: [
        {
          field: "company.id",
          operator: "eq",
          value: params?.id as string,
        },
      ],
    },
    /**
     * used to provide any additional information to the data provider.
     * https://refine.dev/docs/data/hooks/use-form/#meta-
     */
    meta: {
      // gqlQuery is used to specify the GraphQL query that should be used to fetch the data.
      gqlQuery: COMPANY_CONTACTS_TABLE_QUERY,
    },
  });

  return (
    <Card
      headStyle={{
        borderBottom: "1px solid #D9D9D9",
        marginBottom: "1px",
      }}
      bodyStyle={{ padding: 0 }}
      title={
        <Space size="middle">
          <TeamOutlined />
          <Text>Contacts</Text>
        </Space>
      }
      // property used to render additional content in the top-right corner of the card
      extra={
        <>
          <Text className="tertiary">Total contacts: </Text>
          <Text strong>
            {/* if pagination is not disabled and total is provided then show the total */}
            {tableProps?.pagination !== false && tableProps.pagination?.total}
          </Text>
        </>
      }
    >
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: false, // hide the page size changer
        }}
      >
        <Table.Column<Contact>
          title="Name"
          dataIndex="name"
          render={(_, record) => (
            <Space>
              <CustomAvatar name={record.name} src={record.avatarUrl} />
              <Text
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                {record.name}
              </Text>
            </Space>
          )}
          // specify the icon that should be used for filtering
          filterIcon={<SearchOutlined />}
          // render the filter dropdown
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Name" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          title="Title"
          dataIndex="jobTitle"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Title" />
            </FilterDropdown>
          )}
        />
        <Table.Column<Contact>
          title="Stage"
          dataIndex="status"
          // render the status tag for each contact
          render={(_, record) => <ContactStatusTag status={record.status} />}
          // allow filtering by selecting multiple status options
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: "200px" }}
                mode="multiple" // allow multiple selection
                placeholder="Select Stage"
                options={statusOptions}
              ></Select>
            </FilterDropdown>
          )}
        />
        <Table.Column<Contact>
          dataIndex="id"
          width={112}
          render={(_, record) => (
            <Space>
              <Button
                size="small"
                href={`mailto:${record.email}`}
                icon={<MailOutlined />}
              />
              <Button
                size="small"
                href={`tel:${record.phone}`}
                icon={<PhoneOutlined />}
              />
            </Space>
          )}
        />
      </Table>
    </Card>
  );
};
```

</details>

<details>
<summary><code>components/tags/contact-status-tag.tsx</code></summary>

```typescript
import React from "react";

import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  PlayCircleFilled,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Tag, TagProps } from "antd";

import { ContactStatus } from "@/graphql/schema.types";

type Props = {
  status: ContactStatus;
};

/**
 * Renders a tag component representing the contact status.
 * @param status - The contact status.
 */
export const ContactStatusTag = ({ status }: Props) => {
  let icon: React.ReactNode = null;
  let color: TagProps["color"] = undefined;

  switch (status) {
    case "NEW":
    case "CONTACTED":
    case "INTERESTED":
      icon = <PlayCircleOutlined />;
      color = "cyan";
      break;

    case "UNQUALIFIED":
      icon = <PlayCircleOutlined />;
      color = "red";
      break;

    case "QUALIFIED":
    case "NEGOTIATION":
      icon = <PlayCircleFilled />;
      color = "green";
      break;

    case "LOST":
      icon = <PlayCircleFilled />;
      color = "red";
      break;

    case "WON":
      icon = <CheckCircleOutlined />;
      color = "green";
      break;

    case "CHURNED":
      icon = <MinusCircleOutlined />;
      color = "red";
      break;

    default:
      break;
  }

  return (
    <Tag color={color} style={{ textTransform: "capitalize" }}>
      {icon} {status.toLowerCase()}
    </Tag>
  );
};
```

</details>

<details>
<summary><code>components/text-icon.tsx</code></summary>

```typescript
import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

export const TextIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M1.3125 2.25C1.26094 2.25 1.21875 2.29219 1.21875 2.34375V3C1.21875 3.05156 1.26094 3.09375 1.3125 3.09375H10.6875C10.7391 3.09375 10.7812 3.05156 10.7812 3V2.34375C10.7812 2.29219 10.7391 2.25 10.6875 2.25H1.3125Z"
      fill="black"
      fillOpacity="0.65"
    />
    <path
      d="M1.3125 5.57812C1.26094 5.57812 1.21875 5.62031 1.21875 5.67188V6.32812C1.21875 6.37969 1.26094 6.42188 1.3125 6.42188H10.6875C10.7391 6.42188 10.7812 6.37969 10.7812 6.32812V5.67188C10.7812 5.62031 10.7391 5.57812 10.6875 5.57812H1.3125Z"
      fill="black"
      fillOpacity="0.65"
    />
    <path
      d="M1.3125 8.90625C1.26094 8.90625 1.21875 8.94844 1.21875 9V9.65625C1.21875 9.70781 1.26094 9.75 1.3125 9.75H7.6875C7.73906 9.75 7.78125 9.70781 7.78125 9.65625V9C7.78125 8.94844 7.73906 8.90625 7.6875 8.90625H1.3125Z"
      fill="black"
      fillOpacity="0.65"
    />
  </svg>
);

export const TextIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={TextIconSvg} {...props} />
);
```

</details>

<details>
<summary><code>components/tasks/kanban/add-card-button.tsx</code></summary>

```typescript
import React from "react";

import { PlusSquareOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Text } from "@/components/text";

interface Props {
  onClick: () => void;
}

/** Render a button that allows you to add a new card to a column.
 *
 * @param onClick - a function that is called when the button is clicked.
 * @returns a button that allows you to add a new card to a column.
 */
export const KanbanAddCardButton = ({
  children,
  onClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <Button
      size="large"
      icon={<PlusSquareOutlined className="md" />}
      style={{
        margin: "16px",
        backgroundColor: "white",
      }}
      onClick={onClick}
    >
      {children ?? (
        <Text size="md" type="secondary">
          Add new card
        </Text>
      )}
    </Button>
  );
};
```

</details>

<details>
<summary><code>pages/tasks/create.tsx</code></summary>

```typescript
import { useSearchParams } from "react-router";

import { useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import { Form, Input, Modal } from "antd";

import { CREATE_TASK_MUTATION } from "@/graphql/mutations";

const TasksCreatePage = () => {
  // get search params from the url
  const [searchParams] = useSearchParams();

  /**
   * useNavigation is a hook by Refine that allows you to navigate to a page.
   * https://refine.dev/docs/routing/hooks/use-navigation/
   *
   * list method navigates to the list page of the specified resource.
   * https://refine.dev/docs/routing/hooks/use-navigation/#list
   */ const { list } = useNavigation();

  /**
   * useModalForm is a hook by Refine that allows you manage a form inside a modal.
   * it extends the useForm hook from the @refinedev/antd package
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/
   *
   * formProps -> It's an instance of HTML form that manages form state and actions like onFinish, onValuesChange, etc.
   * Under the hood, it uses the useForm hook from the @refinedev/antd package
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/#formprops
   *
   * modalProps -> It's an instance of Modal that manages modal state and actions like onOk, onCancel, etc.
   * https://refine.dev/docs/ui-integrations/ant-design/hooks/use-modal-form/#modalprops
   */
  const { formProps, modalProps, close } = useModalForm({
    // specify the action to perform i.e., create or edit
    action: "create",
    // specify whether the modal should be visible by default
    defaultVisible: true,
    // specify the gql mutation to be performed
    meta: {
      gqlMutation: CREATE_TASK_MUTATION,
    },
  });

  return (
    <Modal
      {...modalProps}
      onCancel={() => {
        // close the modal
        close();

        // navigate to the list page of the tasks resource
        list("tasks", "replace");
      }}
      title="Add new card"
      width={512}
    >
      <Form
        {...formProps}
        layout="vertical"
        onFinish={(values) => {
          // on finish, call the onFinish method of useModalForm to perform the mutation
          formProps?.onFinish?.({
            ...values,
            stageId: searchParams.get("stageId")
              ? Number(searchParams.get("stageId"))
              : null,
            userIds: [],
          });
        }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TasksCreatePage;
```

</details>

<details>
<summary><code>pages/tasks/edit.tsx</code></summary>

```typescript
import { useState } from "react";

import { DeleteButton, useModalForm } from "@refinedev/antd";
import { useNavigation } from "@refinedev/core";

import {
  AlignLeftOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";

import {
  Accordion,
  DescriptionForm,
  DescriptionHeader,
  DueDateForm,
  DueDateHeader,
  StageForm,
  TitleForm,
  UsersForm,
  UsersHeader,
} from "@/components";
import { Task } from "@/graphql/schema.types";

import { UPDATE_TASK_MUTATION } from "@/graphql/mutations";

const TasksEditPage = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>();

  // use the list method to navigate to the list page of the tasks resource from the navigation hook
  const { list } = useNavigation();

  // create a modal form to edit a task using the useModalForm hook
  // modalProps -> It's an instance of Modal that manages modal state and actions like onOk, onCancel, etc.
  // close -> It's a function that closes the modal
  // queryResult -> It's an instance of useQuery from react-query
  const { modalProps, close, queryResult } = useModalForm<Task>({
    // specify the action to perform i.e., create or edit
    action: "edit",
    // specify whether the modal should be visible by default
    defaultVisible: true,
    // specify the gql mutation to be performed
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  // get the data of the task from the queryResult
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
      {/* Render the stage form */}
      <StageForm isLoading={isLoading} />

      {/* Render the description form inside an accordion */}
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

      {/* Render the due date form inside an accordion */}
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

      {/* Render the users form inside an accordion */}
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

export default TasksEditPage;
```

</details>

<details>
<summary><code>components/accordion.tsx</code></summary>

```typescript
import { AccordionHeaderSkeleton } from "@/components";
import { Text } from "./text";

type Props = React.PropsWithChildren<{
  accordionKey: string;
  activeKey?: string;
  setActive: (key?: string) => void;
  fallback: string | React.ReactNode;
  isLoading?: boolean;
  icon: React.ReactNode;
  label: string;
}>;

/**
 * when activeKey is equal to accordionKey, the children will be rendered. Otherwise, the fallback will be rendered
 * when isLoading is true, the <AccordionHeaderSkeleton /> will be rendered
 * when Accordion is clicked, setActive will be called with the accordionKey
 */
export const Accordion = ({
  accordionKey,
  activeKey,
  setActive,
  fallback,
  icon,
  label,
  children,
  isLoading,
}: Props) => {
  if (isLoading) return <AccordionHeaderSkeleton />;

  const isActive = activeKey === accordionKey;

  const toggleAccordion = () => {
    if (isActive) {
      setActive(undefined);
    } else {
      setActive(accordionKey);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        padding: "12px 24px",
        gap: "12px",
        alignItems: "start",
        borderBottom: "1px solid #d9d9d9",
      }}
    >
      <div style={{ marginTop: "1px", flexShrink: 0 }}>{icon}</div>
      {isActive ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flex: 1,
          }}
        >
          <Text strong onClick={toggleAccordion} style={{ cursor: "pointer" }}>
            {label}
          </Text>
          {children}
        </div>
      ) : (
        <div onClick={toggleAccordion} style={{ cursor: "pointer", flex: 1 }}>
          {fallback}
        </div>
      )}
    </div>
  );
};
```

</details>

<details>
<summary><code>components/tags/user-tag.tsx</code></summary>

```typescript
import { Space, Tag } from "antd";

import { User } from "@/graphql/schema.types";
import CustomAvatar from "../custom-avatar";

type Props = {
  user: User;
};

// display a user's avatar and name in a tag
export const UserTag = ({ user }: Props) => {
  return (
    <Tag
      key={user.id}
      style={{
        padding: 2,
        paddingRight: 8,
        borderRadius: 24,
        lineHeight: "unset",
        marginRight: "unset",
      }}
    >
      <Space size={4}>
        <CustomAvatar
          src={user.avatarUrl}
          name={user.name}
          style={{ display: "inline-flex" }}
        />
        {user.name}
      </Space>
    </Tag>
  );
};
```

</details>

## Links

Other components (Kanban Edit Forms, Skeletons and utilities) used in the project can be found [here](https://drive.google.com/drive/folders/1oDFoI-a8qSJqHde6doUtM9NCHlYpWdNW?usp=sharing)
