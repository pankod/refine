---
title: Build Fast and Customizable Admin Panel with NestJS
description: We will prepare a simple `job-posting` application. We will also use the Refine framework for the admin panel. The project will consist of two parts, api and admin.
slug: customizable-admin-panel-with-nestjs
authors: yildiray
category: "How To Build"
tags: [admin-panel, backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
last_update: 2022-10-08
---

:::caution

This post was created using version 3.x.x of **Refine**. Although we plan to update it with the latest version of **Refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **Refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/core/docs/migration-guide/).

:::

In this article, we will prepare a simple `job-posting` application. We will also use the [Refine](https://github.com/refinedev/refine) framework for the **admin panel**. The project will consist of two parts, api and admin.

<!--truncate-->

All the steps described are in this [repo](https://github.com/refinedev/refine/tree/main/examples/blog-job-posting).

## Intro

[NestJS](https://github.com/nestjs/nest) is a framework for building efficient, scalable Node.js server-side applications. With [nestjsx/crud](https://github.com/nestjsx/crud) we can add CRUD functions quickly and effortlessly on this framework.

## NestJS Rest Api

To start playing with NestJS you should have node (>= 10.13.0, except for v13) and [npm](https://nodejs.org) installed.

**Create Project Folder**

```bash
mkdir job-posting-app
cd job-posting-app
```

Setting up a new project is quite simple with the [Nest CLI](https://docs.nestjs.com/cli/overview). With npm installed, you can create a new Nest project with the following commands in your OS terminal:

```bash
npm i -g @nestjs/cli
nest new api
```

[TypeORM](https://github.com/typeorm/typeorm) is definitely the most mature ORM available in the node.js world. Since it's written in TypeScript, it works pretty well with the Nest framework. I chose mysql as database. TypeORM supports many databases (MySQL, MariaDB, Postgres etc.)

To start with this library we have to install all required dependencies:

```bash
npm install --save @nestjs/typeorm @nestjs/config typeorm mysql2
```

- Create an [.env.example](https://github.com/refinedev/refine-hackathon/tree/main/job-posting-app/blob/master/api/.env.example) file. Here we will save the database information.
- Create and configured a [docker-compose](https://github.com/refinedev/refine-hackathon/tree/main/job-posting-app/blob/master/api/docker-compose.yml) file for MySQL.
- Create a [ormconfig.ts](https://github.com/refinedev/refine-hackathon/tree/main/job-posting-app/blob/master/api/ormconfig.ts) file for migrations.
- Add the following scripts to the `package.json` file for migrations.

```bash
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
"db:migration:generate": "npm run typeorm -- migration:generate",
"db:migration:run": "npm run typeorm -- migration:run",
"db:migration:revert": "npm run typeorm -- migration:revert",
"db:refresh": "npm run typeorm schema:drop && npm run db:migration:run"
```

- Import the `TypeOrmModule` into the `app.module.ts`

**Install nestjsx-crud**
I used [nestjsx-crud](https://github.com/nestjsx/crud) library because it makes crud functions easier.

```bash
npm i @nestjsx/crud @nestjsx/crud-typeorm class-transformer class-validator
```

_Since the steps to create Entities Controllers, and services are very long, I do not explain step by step. You can check the [repo](https://github.com/refinedev/refine-hackathon/tree/main/job-posting-app) for details._

It created these end-points automatically with nestjsx/crud.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2021/2021-10-4-admin-panel-with-nestjs/api.png" alt="API response example" />
<br />

## Refine Admin Panel

**Now let's Refine the admin panel.** With [Superplate](https://pankod.github.io/superplate/docs), we can quickly create a `refine` project.

```bash
npm create refine-app@latest admin -- -b v3
```

Answer as below:

```
✔ Select your project type › refine-react
✔ What will be the name of your app · admin
✔ Package manager: · Npm
✔ Do you want to use a UI Framework? · Ant Design
✔ Do you want a customized theme?: · Yes (Custom Variables)
✔ Router Provider: · React Router v6
✔ Data Provider: · nestjsx-crud
✔ Auth Provider: · None
✔ Do you want to add example pages? · Yes (Recommended)
✔ Do you want a customized layout? · Yes
✔ i18n - Internationalization: · No
```

```bash
cd admin
npm run dev
```

Refine's sample application will welcome you.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2021/2021-10-4-admin-panel-with-nestjs/refine_sample.png" alt="Refine sample application welcome screen" />
<br />

Change api url in [admin/src/App.tsx](https://github.com/refinedev/refine-hackathon/tree/main/job-posting-app/blob/master/admin/src/App.tsx)

```
const API_URL = "http://localhost:3000";
```

Let's add the listing page in Refine for the `companies` crud end-point.

```tsx title="/admin/src/pages/companies/list.tsx"
import {
  List,
  Table,
  TextField,
  useTable,
  IResourceComponentsProps,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
  TagField,
  ShowButton,
} from "@pankod/refine";
import { ICompany } from "interfaces";

export const CompanyList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps, sorter } = useTable<ICompany>({
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="name"
          key="name"
          title="Name"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="location"
          key="location"
          title="Location"
          render={(value) => <TextField value={value} />}
          defaultSortOrder={getDefaultSortOrder("location", sorter)}
          sorter
        />
        <Table.Column
          dataIndex="isActive"
          key="isActive"
          title="Is Active"
          render={(value) => <TagField value={value} />}
          defaultSortOrder={getDefaultSortOrder("status", sorter)}
          sorter
        />
        <Table.Column<ICompany>
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
```

Similarly, let's add the create, edit and jobs crud pages under the pages folder.

Next, let's define the resources in `<Refine>` (App.tsx):

```tsx
import { Refine } from "@pankod/refine";
import routerProvider from "@pankod/refine-react-router";
import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";

import "styles/antd.less";

import {
    CompanyList,
    CompanyShow,
    CompanyCreate,
    CompanyEdit,
} from "./pages/companies";
import {
    Title,
    Header,
    Sider,
    Footer,
    Layout,
    OffLayoutArea,
} from "components";
import { JobList, JobCreate, JobEdit } from "pages/jobs";

function App() {
    const API_URL = "http://localhost:3000";
    const dataProvider = nestjsxCrudDataProvider(API_URL);

    return (
        <Refine
            dataProvider={dataProvider}
            Title={Title}
            Header={Header}
            Sider={Sider}
            Footer={Footer}
            Layout={Layout}
            OffLayoutArea={OffLayoutArea}
            routerProvider={routerProvider}
            resources={[
                {
                    name: "companies",
                    list: CompanyList,
                    create: CompanyCreate,
                    edit: CompanyEdit,
                    show: CompanyShow,
                },
                {
                    name: "jobs",
                    list: JobList,
                    create: JobCreate,
                    edit: JobEdit,
                    show: CompanyShow,
                },
            ]}
        />
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2021/2021-10-4-admin-panel-with-nestjs/refine_job.png" alt="Refine jobs list page" />
<br />
