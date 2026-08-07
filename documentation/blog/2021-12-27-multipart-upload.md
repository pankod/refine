---
title: How to Multipart File Upload Using FormData with HTML
description: In this guide, I'm going to show you how to multipart files upload with using HTML and JavaScript
slug: how-to-multipart-upload
authors: melih
category: "Ecosystem / Integrations"
tags: [backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/placeholder.png
hide_table_of_contents: false
last_update: 2022-10-19
---

In this guide, we will look at how we can upload a file from HTML form data to a server with the multipart-upload method. Multipart-Upload is commonly used method for sending files or data to a server.

<!--truncate-->

## What is Multipart Upload Request?

A multipart request is a HTTP request that HTTP clients construct to send files and data over to a HTTP Server. It is commonly used by browsers and HTTP clients to upload files to the server.

## Example

We will take a file from the user with [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) and send it to the server. First, let's create our fields for the user to choose a file using HTML form.

```html
<body>
  <div class="container">
    <h1>Multipart File Upload</h1>
    <form id="form" enctype="multipart/form-data">
      <div class="input-group">
        <label for="files">Select files</label>
        <input id="file" type="file" multiple />
      </div>
      <button class="submit-btn" type="submit">Upload</button>
    </form>
  </div>
  <script src="index.js"></script>
</body>
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2021/2021-12-27-multipart-upload/upload.png" alt="Multipart upload form screen" />
<br />

Here we simply created an input and a button. With these HTML elements we have created, we can get the file chosen by the user.

Let's make a request with JavaScript and [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) to send the selected files to the server.

```jsx
const form = document.getElementById("form");
const inputFile = document.getElementById("file");

const formData = new FormData();

const handleSubmit = (event) => {
  event.preventDefault();

  for (const file of inputFile.files) {
    formData.append("files", file);
  }

  fetch("http://localhost:8080/files", {
    method: "post",
    body: formData,
  }).catch((error) => ("Something went wrong!", error));
};

form.addEventListener("submit", handleSubmit);
```

We added the file we received from the user with the input file to FormData. We then created a request to send this FormData object to the server.

Now, let's create a simple server using [Express](https://expressjs.com/) and [Multer](https://github.com/expressjs/multer) in order to see that the files we sent are received by the server successfully.

:::note

Multer: JavaScript middleware for handling multipart/form-data , which is used for uploading files.

:::

```jsx title=server.js
import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();

//Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const Data = multer({ storage: storage });

app.post("/files", Data.any("files"), (req, res) => {
  if (res.status(200)) {
    console.log("Your file has been uploaded successfully.");
    console.log(req.files);
    res.json({ message: "Successfully uploaded files" });
    res.end();
  }
});

app.listen(8000, () => {
  console.log("Server is running");
});
```

As you can see, we have created our multer structure and a simple server to run locally in order to manage and receive FormData.

The requests we created to send files by JavaScript will now be sent to our local server.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2021/2021-12-27-multipart-upload/overview.avif" alt="Multipart upload overview screen" />
<br />

## How to Multipart Upload with Refine?

The Multipart file upload process with **Refine** is very simple. How to use it is explained step by step in the guide and example.

[Refer to the **Refine** Multipart Upload guide for more information. →](https://refine.dev/core/docs/guides-and-concepts/upload/multipart-upload/)

[View Source](https://github.com/refinedev/refine/tree/main/examples/upload/multipartUpload)

## Example

<CodeSandboxExample path="upload-antd-multipart" />
