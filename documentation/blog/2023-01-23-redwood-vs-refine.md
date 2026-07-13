---
title: refine vs RedwoodJS
description: We will compare two open source React frameworks, that can be used to build CRUD applications
slug: refine-vs-redwood-js
authors: madars_biss
category: "Alternatives"
tags: [comparison]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/social.png
hide_table_of_contents: false
last_update: 2023-07-27
---

Modern full-stack applications are often based on data components like admin panels, dashboards, and internal tools. It may take a lot of time and involve repetitive work to create them from scratch each time.

In this article we will compare two open-source React frameworks, that can be used to build CRUD applications - [Refine](https://github.com/refinedev/refine) and [Redwood](https://redwoodjs.com/).

The first one is designed to accelerate the development of data-rich apps and includes a wide library of hooks, components, and providers. The other is a full-fledged framework, that is marketed as the best choice for startups.

We will review anything from the core features, history, installation, build structure, frontend, database, backend, and deployment options for both.

## Overview

### Refine

[Refine](https://github.com/refinedev/refine) is a React framework, that aims to eliminate repetitive work and offers pre-built solutions for routing, authentication, internationalization, and many other features that you would frequently implement in full-stack apps.

It is based on a headless architecture, meaning users are not tied to any specific stack of technologies, styling solutions, and settings. It allows you to focus on business logic and use the framework just to support you.

The project has experienced rapid growth since its release in 2021. On GitHub 100+ developers have made around 4000 contributions. As of the start of 2023, the project has been already starred 7000+ times.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_stars.png"  alt="GitHub stars count for Refine" />
</div>

<br/>

### Redwood

Redwood is a React framework designed to keep you moving fast as your app grows from side project to startup.

It it based on several core technologies - [GraphQL](https://graphql.org/) for making API calls, [Prisma](https://www.prisma.io/) as an ORM, [TypeScript](https://www.typescriptlang.org/) for type safety (optional), [Jest](https://jestjs.io/) for testing, [Pino](https://getpino.io/#/) for logging and [Storybook](https://storybook.js.org/) to assist with creating UI.

Since its release in 2020, the project has received over 7500 contributions on GitHub by 340 developers. As of the start of 2023, the project has already been starred more than 15000 times.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_stars.png"  alt="GitHub stars count for RedwoodJS" />
</div>

<br/>

## Installation

### Refine

The recommended way to set up a new Refine project is to use their built-in CLI tool `create refine-app`. Run the command `npm create refine-app@latest crud-refine` and it will take you through a terminal wizard.

You will be asked to pick your preferred router solution, UI framework, auth provider, i18n approach, and other settings. For testing purposes, choose the settings provided below:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_setup.png"  alt="Refine project setup screen" />
</div>

<br/>

Once the installation setup is completed, change the working direction to the newly created project folder by running `cd crud-refine` and start the development server via `npm run dev`.

It should automatically open up a new tab on your default browser with the application preview. If it does not, open [http://localhost:3000](http://localhost:3000/) manually. You should be presented with the welcome screen of Refine:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_welcome.png"  alt="Refine welcome page" />
</div>

<br/>

### Redwood

In order to set up a new Redwood app, open the terminal and run the command `yarn create redwood-app crud-redwood --typescript`.

If you prefer to set up the project on Vanilla JS, remove `--typescript` tag from the command. Notice, that [Yarn](https://yarnpkg.com/) package manager is the requirement to create a project.

During the terminal wizard, you will be asked whether or not to initialize the git repository. The rest of the wizard is fully automatic and should not take more than a couple of minutes to finish.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_setup.png"  alt="RedwoodJS project setup screen" />
</div>

<br/>

Next, change your working directory to the newly created project folder via `cd crud-redwood` and start the developer server by running `yarn rw dev`.

It should open a new tab on your default browser with the working project demo. If it's not, run [http://localhost:8910](http://localhost:8910/) to see the Redwood welcome page.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_welcome.png"  alt="RedwoodJS welcome page" />
</div>

<br/>

## Internal build

### Refine

Out of the box, Refine file structure is as simple as it gets. The user is provided with just the bare minimum to be able to work with a functional React app.

There is the `App.tsx` file where the main logic of the app lives. The core Refine functionality is achieved via the `Refine` component, which receives all of the application settings as props.

We can see all of the installed packages like [Ant Design](https://ant.design/), route provider, and data provider already imported and passed successfully so we can use them in the Refine app.

Here is what the `App.tsx` file should look like:

```typescript
import { Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={useNotificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      resources={}
    />
  );
}

export default App;
```

Finally, there is the `index.tsx` file in the `src` root direction, which renders the whole app to the screen. The code structure should be similar to this:

```typescript
import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### Redwood

Redwood framework gives you a much more complex file structure right out of the gate. It is a full-fledged framework that recommends how you should go with authentication, database, separate logic from layout, and so on.

If we take a closer look at the internal build of a Redwood project, we easily notice that the whole app is divided into two main blocks. The first is the `api` directory, which deals with the backend and databases and the second is the `web` directory, which deals with the front-end, styling, and routing.

```
├── api
│ ├── db
│ │ └── schema.prisma
│ ├── dist
│ ├── src
│ │ ├── directives
│ │ │ ├── requireAuth
│ │ │ └── skipAuth
│ │ ├── functions
│ │ │ └── graphql.js
│ │ ├── graphql
│ │ ├── lib
│ │ │ ├── auth.js
│ │ │ ├── db.js
│ │ │ └── logger.js
│ │ └── services
│ └── types
└── web
 ├── public
 └── src
 ├── components
 ├── layouts
 ├── pages
 │ ├── FatalErrorPage
 │ │ └── FatalErrorPage.tsx
 │ └── NotFoundPage
 │ └── NotFoundPage.tsx
 ├── App.tsx
 ├── index.css
 ├── index.html
 └── Routes.tsx
```

The `api` folder is further divided into the `db` directory, which holds the Prisma schema, `dist` for compiled code, and the `src` folder which holds the information about GraphQL schema, lambda functions, and additional information required to configure authentication and logging.

The `web` folder holds the main `App.jsx` file for the app logic, `Routes.tsx` for routing configuration as well `index.css` for styling. There is also a dedicated folder for `pages`, `layouts`, and `components` to separate reusable code blocks.

## Pages and routing

### Refine

In order to create the first page, run the following command in the terminal `npm run refine create-resource test -- --actions list`.

This will create a new folder `pages` and include 2 new files: `list.tsx` and `index.ts` and link everything to the `Refine` component.

Check your `App.tsx` file and it should now look like this:

```typescript
import { Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { TestList } from "pages/tests";

function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={useNotificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      resources={[
        {
          name: "test",
          list: TestList,
        },
      ]}
    />
  );
}

export default App;
```

Now, let's create a page to display some sample data. Open the newly created `list.tsx` file in the `pages` folder and change the content to the following code:

```typescript
export const TestList = () => {
  return (
    <>
      <h1>TestPage</h1>
      <p>
        Find me in <code>./src/pages/tests/list.tsx</code>
      </p>
    </>
  );
};
```

To test the route, open your browser and navigate to [http://localhost:3000/test](http://localhost:3000/test). You should be presented with the following view:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_page.png"  alt="Refine example page" />
</div>

<br/>

### Redwood

To create your first page in the Redwood project, run the command `yarn rw generate page test`.

It will create a new file `TestPage.tsx` inside the `pages` directory with the following code in it:

```typescript
import { Link, routes } from "@redwoodjs/router";
import { MetaTags } from "@redwoodjs/web";

const TestPage = () => {
  return (
    <>
      <MetaTags title="Test" description="Test page" />

      <h1>TestPage</h1>
      <p>
        Find me in <code>./web/src/pages/TestPage/TestPage.tsx</code>
      </p>
      <p>
        My default route is named <code>test</code>, link to me with `
        <Link to={routes.test()}>Test</Link>`
      </p>
    </>
  );
};

export default TestPage;
```

To test it out, run [http://localhost:8910/test](http://localhost:8910/test) in your browser and you should be presented with something like this:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_page.png"  alt="RedwoodJS example page" />
</div>

<br/>

## Data sources

### Refine

In order to set up data for the application, Refine has a built-in REST data provider, that could simulate the use of the database. We already imported it in the initialization phase while setting up the app.

All we have to do is to check `App.tsx` and make sure it is passed in the `Refine` component as a `dataProvider` like so:

```typescript
function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      .....
    />
  );
}
```

We can also check the data coming from the data provider. Open your browser and navigate to [https://api.fake-rest.refine.dev](https://api.fake-rest.refine.dev). You will be presented with all the available endpoints:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/json_server.png"  alt="JSON Server setup output" />
</div>

<br/>

For this application we will use the `posts` route, so click on it and you will see sample data that is provided to the user:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/json_data.png"  alt="Sample JSON data for the API" />
</div>

<br/>

Make sure to install [JSON formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) so the returned data is formatted and easy to read.

### Redwood

Redwood does not come with the sample database, so we will create an [SQLite](https://www.sqlite.org/index.html) and populate it with some sample data.

Open the `schema.prisma` file located in the `api` directory under the `db` folder and paste the following code:

```sql
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = "native"
}

model Post {
  id    Int   @id @default(autoincrement())
  title  String?
}
```

Migrate the new changes with the command `yarn rw prisma migrate dev` for the new schema to take effect.

Redwood also comes with Prisma studio, so we get a graphical user interface (GUI) to work with database records. To access it, run `yarn rw prisma studio`. It will open it up on [http://localhost:5555](http://localhost:5555).

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/prisma_studio.png"  alt="Prisma Studio interface" />
</div>

<br/>

Click on the Post model and add some records into the database so we have data to work with.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/prisma_data.png"  alt="Prisma database records table" />
</div>

<br/>

## CRUD approach

### Refine

In order to implement the create, read, update and delete functionality, run the following command in the terminal `npm run refine create-resource post`.

This will create 5 new files: `list.tsx`, `show.tsx`, `create.tsx`, `edit.tsx` and `index.ts` in the `pages` directory and link everything to the `Refine` component.

Check your `App.tsx` file and change it to the following:

```typescript
import { Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";

function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      notificationProvider={useNotificationProvider}
      Layout={Layout}
      ReadyPage={ReadyPage}
      catchAll={<ErrorComponent />}
      routerProvider={routerProvider}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
      ]}
    />
  );
}

export default App;
```

Next, open the `list.tsx` file and replace the current content with the following code:

```typescript
import {
  List,
  Table,
  TextField,
  useTable,
  DateField,
  Space,
  EditButton,
  DeleteButton,
  ShowButton,
} from "@refinedev/antd";
import { IPost } from "interfaces";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="id"
          key="id"
          title="ID"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="title"
          key="title"
          title="Title"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="createdAt"
          key="createdAt"
          title="Created At"
          render={(value) => <DateField value={value} format="LLL" />}
        />
        <Table.Column<IPost>
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

Notice we already imported an interface to work with TypeScript. Create a new folder `interfaces` in the `src` root and include the `index.d.ts` file with the following code:

```typescript
export interface IPost {
  id: number;
  title: string;
  createdAt: string;
}
```

Now test the `/posts` route on [http://localhost:3000/posts](http://localhost:3000/posts). This route will allow us to display all the data from the data provider and display the action buttons.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_list.png"  alt="Refine list view" />
</div>

<br/>

Let's also create a feature to create new records. Open the `create.tsx` file in the `pages` folder and paste the following code into the file:

```typescript
import { Create, Form, Input, useForm } from "@refinedev/antd";

import { IPost } from "interfaces";

export const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

Now every time we want to create a new record, we have a dedicated route ([http://localhost:3000/posts/create](http://localhost:3000/posts/create)) for it:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_create.png"  alt="Refine create form" />
</div>

<br/>

Next, we will want to update the records. For that open the `edit.tsx` file and change the content to the following code:

```typescript
import { Edit, Form, Input, useForm } from "@refinedev/antd";

import { IPost } from "interfaces";

export const PostEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
```

Each time there is the need to update some record, users will be presented with the current values that could be editable.

The posts can be edited via [http://localhost:3000/posts/edit/5](http://localhost:3000/posts/edit/5), where the number behind the last forward slash is the ID of the post:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_edit.png"  alt="Refine edit form" />
</div>

<br/>

Finally, users should be able to see individual posts by opening them separately. For that, open `show.tsx` file and include the following code:

```typescript
import { useShow } from "@refinedev/core";
import { Show, Typography } from "@refinedev/antd";

import { IPost } from "interfaces";

const { Title, Text } = Typography;

export const PostShow: React.FC = () => {
  const { query } = useShow<IPost>();
  const { data, isLoading } = query;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>
    </Show>
  );
};
```

To read the data, users will be able to click on individual records and they will be opened in the new route.

Each post will be accessible on the [http://localhost:3000/posts/show/11](http://localhost:3000/posts/show/11), where the number behind the last forward slash is the ID of the post:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_show.png"  alt="Refine detail view" />
</div>

<br/>

Users are also able to delete any record from the app by clicking on the bin icon. The UI is handled via a modal, where they are first asked to confirm the decision:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_delete.png"  alt="Refine delete confirmation dialog" />
</div>

<br/>

### Redwood

In order to create the CRUD functionality in the Redwood app, run the following command on the terminal: `yarn rw g scaffold post`.

Redwood first created individual components to create, read, update and delete posts in the `components` folder. Here is the example of `PostCell.tsx` that uses GraphQL to fetch the data.

```typescript
import type { FindPostById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Post from "src/components/Post/Post";

export const QUERY = gql`
  query FindPostById($id: Int!) {
    post: post(id: $id) {
      id
      title
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Post not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ post }: CellSuccessProps<FindPostById>) => {
  return <Post post={post} />;
};
```

After that Redwood created a separate page for each CRUD action in the `pages` folder and imported the component to keep the code organized and easier to manage. Here is the example of `PostPage.tsx`:

```typescript
import PostCell from "src/components/Post/PostCell";

type PostPageProps = {
  id: number;
};

const PostPage = ({ id }: PostPageProps) => {
  return <PostCell id={id} />;
};

export default PostPage;
```

To see it working, access the route on [http://localhost:8910/posts](http://localhost:8910/posts), which would display all of the posts available in the database:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_list.png"  alt="RedwoodJS list view" />
</div>

<br/>

In order to create a new post navigate to [http://localhost:8910/posts/new](http://localhost:8910/posts/new):

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_create.png"  alt="RedwoodJS create form" />
</div>

<br/>

Now try to open any of the individual posts, via [http://localhost:8910/posts/1](http://localhost:8910/posts/1), where the number after the last slash in the URL is the ID of the particular post.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_show.png"  alt="RedwoodJS detail view" />
</div>

<br/>

Similarly, you can edit any of the posts in the database via [http://localhost:8910/posts/1/edit](http://localhost:8910/posts/1/edit):

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_edit.png"  alt="RedwoodJS edit form" />
</div>

<br/>

And, finally, the user is also able to delete any of the posts. Before the actual deletion, the user is presented with the alert asking to confirm the decision:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_delete.png"  alt="RedwoodJS delete confirmation dialog" />
</div>

<br/>

## Authentication

### Refine

We will use [Auth0](https://auth0.com/) provider to implement the authentication in our Refine app.

First, we must install the required Auth0 package via the command
`npm install @auth0/auth0-react`.

For authentication to work, the whole app needs to be wrapped in the Auth0 provider. The most appropriate place for that is the `index.tsx` file in the `src` directory root. Change it to the following:

```typescript
import React from "react";
import { createRoot } from "react-dom/client";

import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID as string}
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
```

Now [create a new account on Auth0](https://auth0.com/signup).

Once logged in create a new application, by selecting Single page web application.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_auth0.png"  alt="Auth0 application settings for Refine" />
</div>

<br/>

After that navigate to the Settings panel and you will get the keys for domain, client_id, and client secret.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_keys.png"  alt="Auth0 keys configuration for Refine" />
</div>

<br/>

Now scroll down the settings and configure the callback, logout, and web origins URLs like shown below:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_callbacks.png"  alt="Auth0 callback URLs for Refine" />
</div>

<br/>

Go back to the Refine app, create a file `.env` in the app root and paste the following environment values:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_env.png"  alt="Refine environment variables configuration" />
</div>

<br/>

Now restart the developer server for the changes to take effect. Press Ctrl+C on your keyboard to close the server and run `npm run dev` to start it again.

Then create a new file `login.tsx` inside the `src` directory and include the following code:

```typescript
import { AntdLayout, Button } from "@refinedev/antd";
import { useAuth0 } from "@auth0/auth0-react";

export const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <AntdLayout
      style={{
        backgroundSize: "cover",
      }}
    >
      <div style={{ height: "100vh", display: "flex" }}>
        <div style={{ maxWidth: "200px", margin: "auto" }}>
          <Button
            type="primary"
            size="large"
            block
            onClick={() => loginWithRedirect()}
          >
            Sign in to Refine app
          </Button>
        </div>
      </div>
    </AntdLayout>
  );
};
```

Finally, open the `Apx.tsx` file and paste the following code:

```typescript
import { Refine, AuthProvider } from "@refinedev/core";
import {
  useNotificationProvider,
  Layout,
  ErrorComponent,
} from "@refinedev/antd";
import dataProvider from "@refinedev/simple-rest";
import routerProvider from "@refinedev/react-router";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { Login } from "pages/login";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
  const { isLoading, user, logout, getIdTokenClaims } = useAuth0();

  if (isLoading) {
    return <span>loading...</span>;
  }

  const authProvider: AuthProvider = {
    login: async () => {
      return {
        success: true,
        redirectTo: "/",
      };
    },
    logout: async () => {
      logout({ returnTo: window.location.origin });
      return {
        success: true,
        redirectTo: "/",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      try {
        const token = await getIdTokenClaims();
        if (token) {
          axios.defaults.headers.common = {
            Authorization: `Bearer ${token.__raw}`,
          };
          return {
            authenticated: true,
            redirectTo: "/",
          };
        } else {
          return {
            authenticated: false,
            redirectTo: "/login",
            error: {
              message: "Check failed",
              name: "Token not found",
            },
          };
        }
      } catch (error) {
        return {
          authenticated: false,
          redirectTo: "/login",
          error: error,
        };
      }
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (user) {
        return {
          ...user,
          avatar: user.picture,
        };
      }
      return null;
    },
  };

  return (
    <Refine
      LoginPage={Login}
      authProvider={authProvider}
      dataProvider={dataProvider(API_URL, axios)}
      routerProvider={routerProvider}
      notificationProvider={useNotificationProvider}
      Layout={Layout}
      catchAll={<ErrorComponent />}
      resources={[
        {
          name: "posts",
          list: PostList,
          create: PostCreate,
          edit: PostEdit,
          show: PostShow,
        },
      ]}
    />
  );
};

export default App;
```

Now every time user wants to access the app, he/she will be asked to authenticate via the login screen.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_login.png"  alt="Refine login screen" />
</div>

<br/>

And once the user is done, there will be an option to log out.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_logout.png"  alt="Refine logout menu option" />
</div>

<br/>

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="Join Refine on Discord banner" />
</a>
</div>

### Redwood

We will use Auth0 to create an authentication example for our Redwood app.

Start by installing the required settings by running the following command in the terminal `yarn rw setup auth auth0`.

That will create an auth wrapper around the application in the `App.tsx` file, which should now look like this:

```typescript
import { AuthProvider } from "@redwoodjs/auth";
import { Auth0Client } from "@auth0/auth0-spa-js";
import { FatalErrorBoundary, RedwoodProvider } from "@redwoodjs/web";
import { RedwoodApolloProvider } from "@redwoodjs/web/apollo";

import FatalErrorPage from "src/pages/FatalErrorPage";
import Routes from "src/Routes";

import "./scaffold.css";
import "./index.css";

const auth0 = new Auth0Client({
  domain: process.env.AUTH0_DOMAIN,
  client_id: process.env.AUTH0_CLIENT_ID,
  redirect_uri: process.env.AUTH0_REDIRECT_URI,
  cacheLocation: "localstorage",
  audience: process.env.AUTH0_AUDIENCE,
});

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider client={auth0} type="auth0">
        <RedwoodApolloProvider>
          <Routes />
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
```

Now navigate to the `layouts` folder, find the file `ScaffoldLayout.tsx`, and replace the content with the following content:

```typescript
import { Link, routes } from "@redwoodjs/router";
import { Toaster } from "@redwoodjs/web/toast";

import { useAuth } from "@redwoodjs/auth";

type LayoutProps = {
  title: string;
  titleTo: string;
  buttonLabel: string;
  buttonTo: string;
  children: React.ReactNode;
};

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  const { logIn, logOut, isAuthenticated } = useAuth();

  return !isAuthenticated ? (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <button
        style={{
          padding: "10px 15px",
          backgroundColor: "#0063D1",
          border: "none",
          borderRadius: "5px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={logIn}
      >
        Sign In to Redwood app
      </button>
    </div>
  ) : (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: "rw-toast", duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes[titleTo]()} className="rw-link">
            {title}
          </Link>
        </h1>

        <Link to={routes[buttonTo]()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> {buttonLabel}
        </Link>
        <button className="link-button" onClick={logOut}>
          Log Out
        </button>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  );
};

export default ScaffoldLayout;
```

Import the Layout for all the routes of the app. Open the `Routes.tsx` file and change its content to the following code:

```typescript
import { Set, Router, Route } from "@redwoodjs/router";

import ScaffoldLayout from "src/layouts/ScaffoldLayout";

const Routes = () => {
  return (
    <Router>
      <Set
        wrap={ScaffoldLayout}
        title="Posts"
        titleTo="posts"
        buttonLabel="New Post"
        buttonTo="newPost"
      >
        <Route path="/posts/new" page={PostNewPostPage} name="newPost" />
        <Route
          path="/posts/{id:Int}/edit"
          page={PostEditPostPage}
          name="editPost"
        />
        <Route path="/posts/{id:Int}" page={PostPostPage} name="post" />
        <Route path="/posts" page={PostPostsPage} name="posts" />
        <Route path="/" page={PostPostsPage} name="posts" />
      </Set>
    </Router>
  );
};

export default Routes;
```

Next, [create a new Auth0 account](https://auth0.com/signup) if you already do not have one.

Once logged in, create a new application by selecting Single page web application.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_auth0.png"  alt="Auth0 application settings for RedwoodJS" />
</div>

<br/>

After that navigate to the Settings panel and you will get the keys for domain, client_iId, and client secret.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_keys.png"  alt="Auth0 keys configuration for Refine" />
</div>

<br/>

Scroll down the Settings and set the callback, logout, and web origins URLs as shown below:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_callbacks.png"  alt="Auth0 callback URLs for Refine" />
</div>

<br/>

Go back to the Refine app, and paste those environmental variables into the `.env` file in the project root as shown below:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_env.png"  alt="Refine environment variables configuration" />
</div>

<br/>

Now, restart the developer server for the changes to take effect. Press Ctrl+C on your keyboard to close the server and run `yarn rw dev` to start it again.

Now try to access the app via [http://localhost:8910](http://localhost:8910) and you will be asked to log in to view the content:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_login.png"  alt="Refine login screen" />
</div>

<br/>

After successful login, you will be taken to the app, allowing access to all the content. There will also be an option to log out:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_logout.png"  alt="Refine logout menu option" />
</div>

<br/>

## Deployment

### Refine

Deploying a Refine app is as easy as it would be with any other React app.

First, make sure to push your code to GitHub.

[Create a new account](https://github.com/signup) if you do not have one already, log in and [create a new repository](https://github.com/new) to host the code.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_repo.png"  alt="Refine GitHub repository page" />
</div>

<br/>

Switch back to the code editor and run the following commands on your terminal. Make sure to replace the GitHub user name with your own in the first command:

```bash
git remote add origin https://github.com/username/crud-refine.git
git branch -M main
git push -u origin main
```

Once the code is successfully pushed, refresh your GitHub repository and you should see all of your project files.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_github.png"  alt="Refine GitHub project settings" />
</div>

<br/>

Next, [create a Vercel account](https://vercel.com/signup) if you do not have one.

Select Import from Git, which will let you set up the project from the GitHub that we just pushed.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_vercel.png"  alt="Refine deployment settings on Vercel" />
</div>

<br/>

The only thing required for you to do is to provide the environmental keys, the same way you did in the local instance of the application. Once that's done, click on Deploy.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_prod.png"  alt="Refine production deployment details" />
</div>

<br/>

The deployment process is fully automatic and once everything is completed, you will receive a live link to your deployed project.

Congratulations, your site is now live, the live link will be provided by Vercel.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/refine_deployed.png"  alt="Refine deployed app screen" />
</div>

<br/>

Before clicking on the link, make sure to visit Auth0, open the Refine project, navigate to the Settings panel and change the domain URL for a callback, logout, and web origins given by Vercel (previously set to http://localhost:3000).

### Redwood

Since we designed a separate database for our Redwood project we will first need to find an online provider that would support that. A great solution for this is [Railway](https://railway.app), which will allow us to spin up a free Postgres instance.

[Create a new Railway account](https://railway.app/login) first if you do not have one already.

Then [create a new project](https://railway.app/new) and pick a new Postgres instance.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_postgres.png"  alt="RedwoodJS PostgreSQL setup" />
</div>

<br/>

Open the newly created Postgres instance and select the Connect tab. Here you will access the database connection keys that we will need later.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_connect.png"  alt="RedwoodJS database connection configuration" />
</div>

<br/>

Now switch back to your local Redwood project and change the database type in the `schema.prisma` file to PostgreSQL. It should now look like this:

```sql
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = "native"
}

model Post {
  id    Int   @id @default(autoincrement())
  title  String?
}
```

Now add the database connection string from Railway in the `.env` file, like this:

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_dbenv.png"  alt="RedwoodJS database environment variables" />
</div>

<br/>

Next, remove the `migrations` folder inside the `api` directory.

Restart the development server by pressing Ctrl+C on your keyboard, start it again by running the command `yarn rw dev`, and run the database migration for the changes to take effect by the command `yarn rw prisma migrate dev`.

We will also need to add some configuration for the environmental values and the API path so the host can read them. Create a new file `redwood.toml` in the app root if you already do not have one and include the following code:

```toml
[web]
  title = "Redwood App"
  port = 8910
  apiUrl = "/api"
  includeEnvironmentVariables = ['AUTH0_DOMAIN', 'AUTH0_CLIENT_ID', 'AUTH0_CLIENT_SECRET', 'AUTH0_AUDIENCE', 'AUTH0_REDIRECT_URI', 'DATABASE_URL']
[api]
  port = 8911
[browser]
  open = true
```

Now it is time to push the code to GitHub.

[Create a new account](https://github.com/signup) if you do not have one already and [create a new repository](https://github.com/new).

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_repo.png"  alt="RedwoodJS GitHub repository page" />
</div>

<br/>

Run the following command on the terminal to push the code. Make sure to replace the GitHub user name with your own in the first command:

```bash
git remote add origin https://github.com/username/crud-redwood.git
git branch -M main
git push -u origin main
```

Once successfully pushed, you will have the project available on the repository.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_github.png"  alt="RedwoodJS GitHub project settings" />
</div>

<br/>

We will use Vercel to deploy the front end.

[Create a new account](https://vercel.com/signup) if you already do not have one.

Select Import from Git, which will let you set up the project from the GitHub that we just pushed.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_vercel.png"  alt="RedwoodJS deployment settings on Vercel" />
</div>

<br/>

The only thing required for you to do is to provide the environmental keys, the same way you did in the local instance of the application.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_prod.png"  alt="RedwoodJS production deployment details" />
</div>

<br/>

The deployment process is fully automatic and once everything is completed, you will receive a live link to your deployed project.

Congratulations, your site is now live. Vercel will provide you with the live link for the project.

<div className="centered-image"  >
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-01-23-redwood-vs-refine/redwood_deployed.png"  alt="RedwoodJS deployed app screen" />
</div>

<br/>

Before clicking on the link, make sure to visit Auth0, open the Refine project, navigate to the Settings panel and change the domain URL for a callback, logout, and web origins given by Vercel (previously set to http://localhost:8910).

## Conclusion

Both frameworks can be efficiently used to create CRUD applications. Choosing any of them and getting proficient with them will definitely speed up the development progress for full-stack apps.

Both frameworks have terminal wizards to set them up, both provide the scaffolding commands to set up the routes and resources for the app, both support various styling solutions, authentication alternatives, and are easy to deploy.

The core differences are in the internal structure, the level of abstraction each provides after the initialization of the project, and the core tech stack each of them uses to achieve CRUD functionality.

I would recommend using Refine for developers who are seeking full control and a higher level of customization. Refine allows users to fully focus on business logic and the provided framework/project structure is minimal.

Refine also has a data API that could be used to create a full-stack app example without relying on a database. With Redwood, you are expected to use Prisma and create a database schema to handle the CRUD operations on data.

Redwood provides a more complex framework structure and the user has less control over the file tree. Users are requested to work with GraphQL and the installation wizard sets support for tools like StoryBlock, Jest, and Pino.
