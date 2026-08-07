---
title: How to Multipart File Upload Using FormData with React Hook Form
description: In this guide, I'm going to show you how to multipart files upload with using React Hook Form
slug: how-to-multipart-file-upload-with-react-hook-form
authors: melih
category: "Ecosystem / Integrations"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-29-react-hook-form-upload/social.jpg
hide_table_of_contents: false
last_update: 2022-10-19
---

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-29-react-hook-form-upload/overview.gif" alt="Refine upload example overview screen" />
<br />

In this example, we will learn how to upload files with [React Hook Form](https://react-hook-form.com/), which is very preferred for managing forms with React. We will use [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) to upload a file and we will upload a file of type multipart/form-data.

<!--truncate-->

## Introduction

We will examine step by step how to use the Multipart file upload process, which is generally used to upload an image or file to a server, with React Hook Form. Let's first create a simple [express](https://expressjs.com/) server to upload the files. Then, let's upload our files to this server with the React Hook form. Let's start!

## Create Express Server

```bash
npm i express
```

Then, let's install the cors package necessary to allow file upload to the server, and the express-fileupload package to manage the paths of the downloaded files.

```bash
npm i cors express-fileupload
```

We have completed our installations to create a simple server. This server will indicate that the file has been uploaded successfully or failed, in response to a `POST` call to an endpoint that we have specified.

```jsx
import express from "express";
import fileupload from "express-fileupload";
import cors from "cors";

const app = express();

app.use(
  fileupload({
    createParentPath: true,
  }),
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload-file", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
    } else {
      let file = req.files.file;

      console.log(req.files);

      file.mv("./uploads/" + file.name);

      res.send({
        status: "success",
        message: "File is uploaded",
        data: {
          name: file.name,
          mimetype: file.mimetype,
          size: file.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-29-react-hook-form-upload/server_start.gif" alt="Express server running in the terminal" />
<br />

We created a server with Express. As you can see, we have successfully started our server, now we have an endpoint to handle requests to this port. Now let's create a React project and send our files to this server with React Hook Form.

## Create React Project

Let's create a react project with [Create React App](https://create-react-app.dev/) and then install the necessary packages for our project.

```bash
npx create-react-app react-hook-form-multipart-upload
```

After your project is ready, let's go to our project directory and install the React Hook Form package.

```bash
cd react-hook-form-multipart-upload
npm install react-hook-form

npm run start
```

---

<div className="banner-container">
<div className="banner-header" >Stop wasting your time copy/pasting your table code all over your application!</div >

Meet the headless, React-based solution to build sleek **CRUD** applications. With Refine, you can be confident that your codebase will always stay clean and boilerplate-free.

Try [Refine](https://github.com/pankod/refine) to rapidly build your next **CRUD** project, whether it's an admin panel, dashboard, internal tool or storefront.

<div>
<a href="https://github.com/pankod/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/generic_banner.webp" alt="Refine blog banner" />
</a>
</div>

<br/>

**Refine** is an open-source, React-based framework for building CRUD applications without constraints. It’s headless by design and seamlessly works with **any custom design** or **UI framework** you favor. For convenience, it ships with ready-made integrations for **Ant Design, Material UI and Mantine UI**.

It can **speed up your development time up to 3X** without compromising freedom on styling, customization and project workflow.

Visit [Refine GitHub repository](https://github.com/pankod/refine) for more information, demos, tutorials, and example projects.

</div>

---

## Multipart File Upload with React Hook Form

We created our React project and installed our react hook form package. Now let's create a form and manage it with the react hook form.

```jsx title="App.js"
import React from "react";
//highlight-next-line
import { useForm } from "react-hook-form";

function App() {
  //highlight-next-line
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {};

  return (
    //highlight-start
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />

        <input type="submit" />
      </form>
    </div>
    //highlight-end
  );
}

export default App;
```

To manage our form and its elements, we defined the register and handleSubmit methods from the react hook form. Now, let's upload the file selected in our onSubmit method to our server by placing it in the formData.

```jsx title="App.js"
import React from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    //highlight-start
    const formData = new FormData();
    formData.append("file", data.file[0]);

    const res = await fetch("http://localhost:5000/upload-file", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    //highlight-end
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" {...register("file")} />

        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
```

Our project is ready! With React Hook Form, we can now send the selected file to our server in `multipart/form-data` type. Let's test it!

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-29-react-hook-form-upload/image_upload.avif" alt="multipart/form-data file upload" />
<br />

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="Join Refine on Discord banner" />
</a>
</div>

## Are You Looking React Web Framework?

A React-based framework for building internal tools, rapidly. **Refine** offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to admin panels, B2B applications and dashboards.

🔥 **Headless** : Works with any UI framework

⚙️ Zero-configuration: One-line setup with superplate. It takes less than a minute to start a project.

📦 Out-of-the-box : Routing, networking, authentication, state management, i18n and UI.

🔌 Backend Agnostic : Connects to any custom backend. Built-in support for REST API, Strapi, NestJs CRUD, Hasura, Airtable, Medusa, Supabase, and Appwrite.

📝 Native Typescript Core : You can always opt-out for plain JavaScript.

🐜 Enterprise UI : Works seamlessly with Ant Design. (Support for multiple UI frameworks is on the Roadmap)

📝 Boilerplate-free Code : Keeps your codebase clean and readable.

[Refer to the **Refine** documentation for more information. →](https://refine.dev/core/docs/)

## How to Multipart File Upload with Refine and React Hook Form?

It allows you to manage your forms and send data to your server with the [refine-react-hook-form adapter](/core/docs/packages/list-of-packages/) it publishes with its **Refine** **headless** feature. With this adapter, you can use all the features of the React Hook Form in harmony with **Refine**. You can also perform `Multipart File Upload(multipart/form-data)` operation very easily using this adapter.

[Refer to the refine-react-hook-form adapter documentation for detailed information. →](/core/docs/packages/list-of-packages/)

[View Source](https://github.com/refinedev/refine/tree/main/examples/reactHookForm/useForm)

You can manage your form very easily with the `refine-react-hook-form adapter`. The data created in the form will be automatically saved to the database with the **Refine** `onFinish` method.

This is a basic `CMS` app that was created with **Refine**'s **headless** feature. You may quickly build records and save them to your database using **Refine**. We'll look at the CreatePost page of this step. We'll create a record in the form and manage it with the `refine-react-hook-form` adapter.

```tsx title="src/pages/CreatePost"
import { useState } from "react";
//highlight-next-line
import { useForm } from "@refinedev/react-hook-form";
import { useSelect, useApiUrl } from "@refinedev/core";

import axios from "axios";

export const PostCreate: React.FC = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);

  //highlight-start
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  //highlight-end

  //highlight-next-line
  const apiURL = useApiUrl();

  const { options } = useSelect({
    resource: "categories",
  });

  //highlight-start
  const onSubmitFile = async () => {
    setIsUploading(true);
    const inputFile = document.getElementById("fileInput") as HTMLInputElement;

    const formData = new FormData();
    formData.append("file", inputFile?.files?.item(0) as File);

    const res = await axios.post<{ url: string }>(
      `${apiURL}/media/upload`,
      formData,
      {
        withCredentials: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

    setValue("thumbnail", res.data.url);
    setIsUploading(false);
  };
  //highlight-end

  return (
    //highlight-next-line
    <form onSubmit={handleSubmit(onFinish)}>
      <label>Title: </label>
      <input {...register("title", { required: true })} />
      {errors.title && <span>This field is required</span>}
      <br />
      <label>Status: </label>
      <select {...register("status")}>
        <option value="published">published</option>
        <option value="draft">draft</option>
        <option value="rejected">rejected</option>
      </select>
      <br />
      <label>Category: </label>
      <select
        defaultValue={""}
        {...register("category.id", { required: true })}
      >
        <option value={""} disabled>
          Please select
        </option>
        {options?.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      {errors.category && <span>This field is required</span>}
      <br />
      <label>Content: </label>
      <br />
      <textarea
        {...register("content", { required: true })}
        rows={10}
        cols={50}
      />
      {errors.content && <span>This field is required</span>}
      <br />
      <br />
      //highlight-start
      <label>Image: </label>
      <input id="fileInput" type="file" onChange={onSubmitFile} />
      <input type="hidden" {...register("thumbnail", { required: true })} />
      {errors.thumbnail && <span>This field is required</span>}
      //highlight-end
      <br />
      <br />
      <input type="submit" disabled={isUploading} value="Submit" />
      {formLoading && <p>Loading</p>}
    </form>
  );
};
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-03-29-react-hook-form-upload/overview.gif" alt="Refine upload example overview screen" />
<br />

As you can see, we have easily saved both our data such as title, category, status and an image in the form of `multipart/form-data` to our database using the `refine-react-hook-form` adapter. We've only shown how to utilize the Multipart File Upload feature for our example in this tutorial. For examine **Refine** CMS example, checkout the live codeSandbox below.

## Example

<CodeSandboxExample path="form-react-hook-form-use-form" />
