---
title: JWT Authentication - What is JSON web token?
description: We will focus mainly on using JWTs for securing web applications.
slug: jwt-authentication
authors: joseph_mawa
category: "Ecosystem / Integrations"
tags: [backend]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-03-11-jwt-authentication/social.png
hide_table_of_contents: false
---

## Introduction

In today's digital era, users have lots of personal and private data online. Therefore successful authentication, user authentication and authorization are inevitable. With authentication, you can validate that a user is who they claim to be. It ensures their data are kept private and secure.

After validating a user's identity, you need authorization to permit them to access some resources. Authorization is usually based on user role, status, or certain privileges. JSON web tokens come in handy for securing web applications.

Though they're mostly used for user authorization, you can also use JWTs for securely sharing any JSON data between two entities in a compact and self-contained way.

In this article, we will explore JSON web tokens. We will also learn how to use them for user authorization in a Node or Express project. We will focus mainly on using JWTs for securing web applications.

What we will cover:

- [What is JWT(JSON Web Token)](#what-is-jwtjson-web-token)
- [Structure of JWT](#structure-of-jwt)
- [How does JWT Authentication work?](#how-does-jwt-authentication-work)
- [Problems JSON web tokens solve](#problems-json-web-tokens-solve)
- [How to use JWT for user authorization in Express](#how-to-use-jwt-for-user-authorization-in-express)
- [Limitations of JWTs for managing user sessions](#limitations-of-jwts-for-managing-user-sessions)

## What is JWT(JSON Web Token)

JSON Web Token, also known as JWT in short, is an open standard that defines a way for entities to securely share information as JSON objects. The information shared is usually referred to as claims.

The first draft of the JWT proposal was developed by the Internet Engineering Task Force in December 2010. The final draft, RFC  7519, was officially published in May 2015. It's the technical document that guides the development and use of JSON web tokens.

Though JWTs are predominantly used for authorization, their use is not limited to that. You can pretty much use it to securely share any kind of information in JSON format.

Because they're compact and lightweight, JWTs have been widely adopted and have become the bedrock of web security.

## Structure of JWT

A JWT consists of three parts separated by periods. These three parts are the Header, Payload, and Signature. It looks like so:

```txt
Header.Payload.Signature
```

Each section of a JWT is base64url-encoded and separated by a period. Let's look at each section and the information it contains in the sub-sections below.

### JWT Header

A JSON web token Header contains information about the token type and the encryption algorithm for creating the digital signature. A typical JSON web token header takes the shape below.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

In the header above, the token type is `JWT`, and the algorithm used for signing the token is `HS256`. The header is encoded into base64 URL format to create the first part of our JWT.

After encoding the above header into base64 URL format, our full JSON web token structure will look like so:

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Payload.Signature
```

We have only encoded encrypted tokens in the header. We shall have a fully signed JSON web token when we create the payload and signature in the sub-sections below.

### JWT Payload

The second part of a JSON web token is the payload. It comes after the header. The payload contains information about an entity. The information in the payload are referred to as claims.

A claim consists of name-value pairs. A claim name is always a string and its value is any valid JSON value. Claim names should always be unique. Claims fall into three classes. These three classes are:

- Registered claims
- Public claims
- Private claims

Registered claims are not mandatory. They're a set of useful and interoperable claims that you may or may not implement. They include: `"iss"`, `"sub"`, `"aud"`, `"exp"`, and several others you can look up in the [RFC  7519](https://datatracker.ietf.org/doc/html/rfc7519) technical document.

Public claims are defined by JWT users. To avoid collisions, you need to register public claim names in the IANA  [JSON Web Token Registry](https://www.iana.org/assignments/jwt/jwt.xhtml) or define them as a URI with collision resistant namespace.

Private claim like its name suggests are private. A producer and consumer of JWT may decide to use claims that are neither registered nor public. Be aware that private claims are subject to collision. Therefore, use them with caution.

The JWT payload below has three claims. The claim names are `sub`, `name`, and `iat`. Their respective values are `"1234567890"`, `"John Doe"`, and `1516239022`. Both `sub`(Subject) and `iat`(Issue at) are registered claims while `name` is a public claim.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

We can encode the above payload into a Base64 URL format so that our JSON web token looks like the code below. We have now encoded both the header and payload in base64 URL format. We are left with the Signature.

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Signature
```

Let's explore how to use an algorithm and a secret key to digitally sign the JWT.

### Signature

The third part of a JSON web token is the digital signature. You can use the algorithm specified in the header with the base64url-encoded header, base64url-encoded payload, and a secret to create a JWT signature for signed tokens.

As an example, if you're using the HMAC SHA256 algorithm, you can create the signature like so:

```js
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret);
```

The digital signature generated will constitute the last part of the JSON web token. It's used to verify that the message has not been tampered with. Depending on the secret you've used, the JWT will now look like so:

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ
```

You can now pass the above JWT to HTML or HTTP environments because it's compact and lightweight. There is a handy [online tool](https://jwt.io/#debugger-io) that you can also use to decode, verify, generate, and debug JWTs.

Be aware that encoding information in base64 URL format doesn't conceal it. Anybody can decode and read the information. Be sure not to include sensitive credentials such as usernames, emails, and passwords in a signed JSON web token payload.

## How does JWT Authentication work?

Depending on the application's authentication strategy, a user can log in using credentials such as email, username, and password. To keep the user logged in during that particular session, the server sends back a JSON web token.

In subsequent requests, the user agent will send the JSON web token to access protected resources on the server. You can use the Authorization header to pass the JWT like so:

```js
Authorization: Bearer <Token>
```

The server then checks for the `Authorization` header in the request. If present, the server verifies the validity of the JSON web token before granting access to some resources.

## Problems JSON web tokens solve

HTTP is a stateless protocol by design. An HTTP server doesn't remember anything about previous requests from the same user. Each request is considered a new interaction and is independent of the others. Therefore, each request must have all the information the server needs to complete the request.

The stateless design makes it easy to implement and scale HTTP servers. However, it becomes a problem if each user needs customized content. You need to persist state to serve customized content.

Traditionally, before JWTs, session IDs(also known as session tokens) were used to persist state and secure web apps.

With session IDs, the server creates a new session, stores the session token, and sends the session ID back to the browser after authenticating a user.

The browser sends the session ID in subsequent requests so that the server can use it for authorization. However, this has a drawback. It introduces session ID lookup overhead.

Unlike session tokens, you don't need to persist JSON web tokens on the server. After user authentication, the server creates a digitally signed JWT as described above and sends it to the browser.

The browser sends the token in subsequent requests. The server validates the JWT to make sure it has not been tampered with. The JWT has all the information needed to verify the user's identity. JWTs remove the need to persist tokens on the server and query the database on every request.

In this section, you will learn how to use JWTs for user authorization in a simple Express server. It will give you an idea of how JWTs work. Before starting, be sure you have installed the Node runtime environment and a text editor like VS Code.

## How to use JWT for user authorization in Express

In this section, you will learn how to use JWTs for user authorization in a simple Express server. It will give you an idea of how JWTs work. Before starting, be sure you have installed the Node runtime environment and a text editor like VS Code.

### Create npm project

Use the command below to create a new project directory. I'm naming it learn-jwt. You can give it any name.

```sh
mkdir learn-jwt
```

After creating it, open the directory in VS code or any other text editor. Use the command below to initialize an npm project.

```sh
npm init -y
```

After successfully initializing an npm project, you should now see a `package.json` file at the root of your project directory.

### Install dependencies

Let us now install dependencies. Will will install express, jsonwebtoken, and dotenv from the npm package registry.

Jsonwebtoken is an implementation of JWT for Node. We will use dotenv for loading environment variables from .`env` file into the `process.env` object.

Run the command below to install the project dependencies.

```sh
npm i express jsonwebtoken dotenv
```

After successfully installing the above packages, you should see a `node_modules` directory at the root of your project directory.

### Create an express server

Let's implement a simple express server in this section. Create the `index.js` file. Copy and paste the code below into it.

```js title="index.js"
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
```

Use the command below to start the development server. It will launch the server in watch mode. Be aware that watch mode is still an experimental feature at the time of writing this article. Therefore, you will get some warning on the command line.

```sh
node --watch index.js
```

The server should now return the "Hello world!" text when you navigate to the index(`/`) route.

As explained above, you need a secret key to create JSON web tokens. We will create a secret key using Node's built-in crypto module. Use the `node` command to launch a Node REPL session.

```sh
node
```

After generating a secret key, create the .env file at the root of your project directory. Copy and paste the code below into it. Replace the value of the JWT_SECRET environment variable with the secret key you created above.

```js
require("crypto").randomBytes(64).toString("hex");
```

After generating a secret key, create the `.env` file at the root of your project directory. Copy and paste the code below into it. Replace the value of the `JWT_SECRET` environment variable with the secret key you created above.

```txt
JWT_SECRET=b19bf1083751c05208ca2ce389af1e92de78cf9c8d56b00952e24cbd67510dd90f2a94605ea30f26510ad55d880dd1606d2910d6c1433c97ad97f5e922d92bcb
```

### Use JSON web token to authorize users

Let's implement a simple user authorization with JWTs. Add the changes below to the `index.js` file you created above.

```js title="index.js"
//highlight-start
require("dotenv").config();
const jwt = require("jsonwebtoken");
//highlight-end
const express = require("express");
const app = express();

//highlight-next-line
app.use(express.json());

const PORT = process.env.PORT || 3000;

//highlight-start
app.post("/login", (req, res) => {
  // Authorize user
  const username = req.body.username;
  const password = req.body.password;

  const accessToken = jwt.sign({ username, password }, process.env.JWT_SECRET);
  res.json({ accessToken });
});
//highlight-end

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
```

In the code above, we configured the `dotenv` package to load our secret key from the `.env` file. We also mounted the built-in `express.json()` middleware. It is for parsing incoming requests with JSON payloads.

We added a simple `/login` route. Ordinarily, you send login credentials in a post request. During login, you authenticate a user before generating a JWT. The code above assumes the user has already been authenticated.

We accessed the user credentials (username and password) and used the secret key to generate a signed JWT. We're sending the JWT to the user agent as a JSON object.

When you make a POST request to the `/login` route with user credentials in the request body, the server will create a JWT, which looks like the code below.

```JSON
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphbmUgRG9lIiwicGFzc3dvcmQiOiIxMjM0NSIsImlhdCI6MTcwOTc5OTc3OX0.xOLRUSytjjXnzC4-ZPY2gohmozhKkWSIS328bf0TmM4"
}
```

Let's create a protected route that users can only access after verifying their JWT. Add the changes below to the `index.js` file.

```js title="index.js"
require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/login", (req, res) => {
  // Authorize user
  const username = req.body.username;
  const password = req.body.password;

  const accessToken = jwt.sign({ username, password }, process.env.JWT_SECRET);
  res.json({ accessToken });
});

//highlight-start
app.get("/posts", verifyToken, (req, res) => {
  const posts = [
    {
      username: "jane_doe",
      title: "Post 1",
    },
    {
      username: "john_doe",
      title: "Post 2",
    },
  ];

  res.json(posts.filter((post) => post.username === req.user.username));
});
//highlight-end

app.get("/", (req, res) => {
  res.send("Hello world!");
});

//highlight-start
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
//highlight-end

app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
```

In the code above, we added a simple `/posts` route, which you can access using a GET request. We also declared a `verifyToken` middleware and mounted it on the `/posts` route.

The middleware checks for the JWT in the Authorization header. If present, it verifies the JWT. As explained above, only the secret token is required for verifying the JWT. The user will only access the posts after the JWT has been successfully verified.

To test the above implementation, you can use an HTTP client like Postman. I prefer the REST client Visual Studio Code extension. You can use it to make HTTP requests to a RESTful service or GraphQL API inside VS Code.

When testing the above implementation, send a post request to the `/login` route with user credentials in the request body. It will generate a signed JWT and send it back to the client.

```txt
POST  /login
Content-Type: application/json
{
    "username": "jane_doe",
    "password": "12345"
}
```

After that, send a GET request to the `/posts` route. Be sure to include the JWT in the Authorization header, as in the example below.

```txt
GET /posts
Authorization: Bearer <token>
```

You can also modify the JWT to check whether a modified token can be used to access a resource.

## Limitations of JWTs for managing user sessions

As hinted above, JWTs are mainly used for managing user sessions. They've become ubiquitous for web security. However, JWTs also have drawbacks. Below are some of them.

### Security

As explained above, the data you send in a signed JWT payload is base64url-encoded. Anybody who gains access to the JWT can decode its contents. Be sure to always transmit JSON web tokens over secure HTTPS.

### Bandwidth and size limitation

Sometimes, the nature of the application may require storing lots of data in the JWT payload. This has the downside of increasing bandwidth if you use the JWT with cookies because the token is added to each request.

Similarly, cookies have a maximum size of 4kB. This might be a limitation if you want to pass more data in the JWT payload.

### Revoking access and invalidating JWT

Sometimes, you may want to revoke user privileges due to security concerns. Invalidating JWTs may not be trivial and straightforward. Once you issue a JWT, there is no straightforward mechanism for revocation of access token.

## Conclusion

JSON web tokens provide a simple and compact mechanism for sharing information between entities. Most programming languages, runtimes, and web frameworks have libraries for implementing JWT in a web application.

A JWT consists of a header, payload, and a digital signature. The header and payload are base64url-encoded and are used with a secret key to generate a digital signature.

The server sends the JWT to the browser after user authentication. The browser sends the JWT in subsequent requests so that the server can use it to verify the user's identity.

Though the commonest use case of JWT is user authorization, it's by no means the only one. You can use JWT to share information between two entities simply and compactly.
