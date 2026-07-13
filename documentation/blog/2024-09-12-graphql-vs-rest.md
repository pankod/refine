---
title: GraphQL vs REST - Key Differences and Use Cases
description: We'll explore the key differences between GraphQL and REST, and discuss the use cases where each approach excels.
slug: graphql-vs-rest
authors: chidume_nnamdi
category: "Alternatives"
tags: [backend, comparison]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-12-03-graphql-vs-rest/social-2.png
hide_table_of_contents: false
last_update: 2024-09-12
---

**This article was last updated on September 12, 2024, to add sections on Error Handling, Batching Multiple Requests, Versioning, and Caching Strategies.**

## Introduction

The internet is connected using a standard method called HTTP. This enabled communication between devices to be possible. Despite all these, protocols were put in place for the design and communication of these devices to be efficient. Protocols were created, SOAP, XML-RPC, etc. But the protocols that have stood the test of time are REST, coined by Roy Fielding in 2000 in his doctoral dissertation, Architectural Styles and the Design of Network-based Software Architecture, and GraphQL, a new kid on the block. These two have proven themselves over time, and they have become the most used protocols in the world.

In this article, we will explore the key differences between GraphQL and REST, and discuss the use cases where each approach excels.

## Architectural Style

In this section, we will discuss the architectural style of REST and GraphQL, and highlight the key differences between the two approaches. Let's start with REST.

### REST

REST is an age-old method for networked applications or devices to communicate with each other. It is sending and receiving data between each other. Right from the time of the invention of the internet by Tim Benners-Lee, REST has been the go-to method for the internet.

In REST, one device sends the request, and the other device receives and processes the request and sends it back to the sender. Now, this sender is known as the client, while the receiver is known as the server.

This communication in REST is handled by a protocol called HTTP. This HTTP is the backbone of communication in REST, and it is designed in a way that suits the needs of REST. This is because the HTTP enables the separation of concerns, which is one of the principles a networked application must observe before it can be called a RESTful API.

The building blocks of REST are called the resources. A resource in REST is a single entity that can be manipulated and sent to the client as data. A resource can be media, documents, database data, etc. HTTP has different methods that can be used to perform specific operations on a resource. They are:

- GET
- POST
- DELETE
- PUT
- OPTIONS

This makes REST completely stateless, which is one of its principles. The statelessness of REST means that each request is not dependent on the data elsewhere. Every data needed for that request is contained in the request itself. This makes REST to be very scalable and reliable. This makes it readable, scalable, and reliable.

REST is perfect, but as the application grows, it becomes complex to manage. As each request is based on a particular resource, we will find ourselves making multiple rounds of requests to fetch what we need. This leads to over-fetching and under-fetching of data. This brings a performance bottleneck to the application.
Because users will have to wait before all the requests are completed before they can see the data they need, this is where GraphQL comes in.

### GraphQL

GraphQL is a query language and data manipulation language for APIs. GraphQL still uses HTTP for communication; it does not use another protocol. So, this is one of the similarities between GraphQL and REST.

GraphQL was built in 2015 by Facebook; it was designed to solve the problem of over-fetching and under-fetching of data that we already saw in REST. It is doing a very nice job of giving REST a run for its money.

In REST, we have resources, and each resource is mapped to an HTTP verb; it can be GET, POST, DELETE, or PUT. In the case of GraphQL, it does not do any mapping or use anything close to that. GraphQL communicates only via the POST method. Each request of GraphQL contains a POST body that holds information describing the structure of the data to be fetched, what resources to be fetched, and how many to fetch.

So, we can say that GraphQL merged PUT, DELETE, GET, and POST requests into one entity. The data contained in the POST body describing how to fetch the data is actually in a query language that GraphQL understands. The GraphQL server receives these requests, interprets the POST body, and goes on to fetch and structure the data as instructed.

One of the key benefits of GraphQL compared to a traditional REST API is its ability to support declarative data fetching. This means that each component can (and ideally should) request precisely the fields it needs to render, avoiding any unnecessary data transmission over the network.

## Data Fetching

In this section, we will discuss the differences between GraphQL and REST in terms of data fetching. How do both approaches handle data fetching, and what are the advantages and disadvantages of each approach?

### REST

The discussion of REST data-fetching will include the following points:

- Endpoints for specific resources
- Over-fetching or under-fetching of data
- Multiple requests for related data
- Limited control over the response structure

Endpoints for specific resources are one of the defining characteristics of REST. They are represented below:

```js
    GET /users/1

    {
      "id": 1,
      "name": "John Doe",
      "email": "",
        "address": {
            "street": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip": "10001"
        }
    }

    GET /users

    [
        {
            "id": 1,
            "name": "John Doe",
            "email": "",
            "address": {
            "street": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip": "10001"
            }
        },
        {
            "id": 2,
            "name": "Jane Doe",
            "email": "",
            "address": {
            "street": "456 Main St",
            "city": "New York",
            "state": "NY",
            "zip": "10001"
            }
        }
    ]

    GET /users/1/address

    {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zip": "10001"
    }

    GET /articles
    GET /articles/456
```

The examples above show how URIs are used to identify collections (e.g., /users, /articles) and individual resource instances (e.g., /users/1, /articles/456).

Each endpoint returns a fixed set of data, and clients may need to make multiple requests to different endpoints to gather all the necessary information. This can result in inefficiencies, particularly in scenarios where bandwidth is a critical factor. Additionally, the need for multiple requests to fetch related data can lead to performance issues.

Example:

```js
    // GET /users/1
    {
      "id": 1,
      "name": "John Doe",
      "email": "",
        "address": {
            "street": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip": "10001"
        }
    }
```

In the above example, the client may only need the user's name and email, but the endpoint returns the entire user object, including the address. This is an example of over-fetching, where the server returns more data than is required. This can be mitigated by creating a new endpoint that returns only the required data, but it can lead to an explosion of endpoints.

Additionally, the client may need to make multiple requests to fetch related data, such as the user's address, etc. This also leads to making multiple requests, which hampers the performance of the application.

We see that in REST, we have limited control over the response structure; the shape and size of the response are determined by the server, and clients have no control over the structure of the response. This can lead to inefficiencies, as the client may need to make multiple requests to fetch related data.

### GraphQL

GraphQL excels in scenarios where the client's data requirements are dynamic or where different clients (web, mobile, etc.) necessitate distinct data sets. The ability to request precisely the needed data in a single query mitigates over-fetching, addressing one of the challenges faced by REST.

Let's see an example:

```js
    // GraphQL query
    {
      user(id: 1) {
        name
        email
      }
    }

    // Response
    {
      "data": {
        "user": {
          "name": "John Doe",
          "email": ""
        }
      }
    }
```

In the above example, the client requests only the user's name and email, and the server returns precisely that data. This is an example where the server returns only the required data. This is in contrast to REST, where the server returns the entire user object, including the address.

However, this flexibility introduces complexities, especially for those accustomed to the straightforward nature of REST. Additionally, the need for a robust schema and increased complexity in resolving queries may pose challenges for certain use cases. Examples of the use cases where GraphQL may pose a challenge include scenarios where the data requirements are static or where the data requirements are simple. In these cases, the simplicity of REST may be preferable.

Let's look at GraphQL's ability to batch multiple queries in a single request:

```js
    // GraphQL query
    {
      user(id: 1) {
        name
        email
      }
      article(id: 456) {
        title
        body
      }
    }

    // Response
    {
      "data": {
        "user": {
          "name": "John Doe",
          "email": ""
        },
        "article": {
          "title": "GraphQL vs REST",
          "body": "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data."
        }
      }
    }
```

In the above example, the client requests data for the user and the article in a single query. This contrasts REST, where the client must make two separate requests to fetch the user and the article. Everything was gotten in a single request.

In REST, we must make two separate requests to fetch the user and the article.

```js
    // GET /users/1
    {
      "id": 1,
      "name": "John Doe",
      "email": "",
        "address": {
            "street": "123 Main St",
            "city": "New York",
            "state": "NY",
            "zip": "10001"
        }
    }

    // GET /articles/456
    {
      "id": 456,
      "title": "GraphQL vs REST",
      "body": "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data."
    }

```

### Error Handling

Both REST and GraphQL handle errors differently. Here's how:

### REST Error Handling

REST typically uses **HTTP status codes** to indicate the success or failure of an API request. Good examples of it are `200 OK` being a successful response while `404 Not Found` and `500 Internal Server Error` spelling out errors.

```json
GET /users/12345

HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": {
    "code": 404,
    "message": "User not found"
  }
}
```

### Error Handling in GraphQL

In GraphQL, the errors will be part of the response body, contrary to trying to map them through HTTP status codes. When an error occurs in any part of the execution of a GraphQL query, it can return back individual errors for fields or operations in that query.

```graphql
{
  user(id: "12345") {
    name
    email
  }
}

# Response

{
  "data": {
    "user": null
  },
  "errors": [
    {
      "message": "User not found",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": ["user"]
    }
  ]
}
```

The snippet above shows a case where the `user` in the request did not exist; however, the response is valid because there is an existing `data` object and an `errors` array indicating that the `user` does not exist.

## Flexibility and Efficiency

In this section, we will discuss the flexibility and efficiency of GraphQL and REST.

### REST

We will discuss the following points:

- Static endpoints
- Versioning is often required for changes
- Limited flexibility in response format
- Stateless nature simplifies caching

Let's start with static endpoints. REST relies on static endpoints, where each endpoint returns a fixed set of data. In as much as it offers simplicity and predictability, making it easy for developers to understand and navigate the API, this can lead to inefficiencies and rigidity. It can easily become a limitation in scenarios where dynamic or complex data retrieval is required.

Looking at versioning, REST APIs are often versioned to accommodate changes. As RESTful APIs evolve, there might be a need to introduce changes to the existing endpoints or data structures. It can be achieved through various strategies, such as URI versioning (/v1/users), custom headers, or query parameters. This evolution can pose challenges for existing clients, as modifications may unintentionally disrupt their functionality. It can lead to a proliferation of endpoints and can be challenging to manage.
Limited flexibility in response format.

The server determines the shape and size of the response, and clients have no control over the structure of the response. This lack of flexibility in response format may be a drawback in scenarios where clients have varying data requirements.

The stateless nature of RESTful services simplifies caching. Each request contains all the information required to fulfill it, and the server does not need to maintain any state. This makes it easy to cache responses, improving performance and scalability.

### GraphQL

Here we will discuss the following points:

- Dynamic queries tailored to client needs
- No need for versioning (backward-compatible)
- Fine-grained control over the response structure
- Challenges in caching due to variable queries

GraphQL's main selling point is that it allows dynamic queries, which lets the users craft and design their queries to meet their specific needs. This is unlike REST, where each endpoint returns a fixed set of data. Clients can specify the shape and structure of the response, resulting in more efficient data retrieval.

With the way GraphQL is structured, it does not require versioning. GraphQL is backward-compatible, and new fields can be added to the schema without impacting existing queries. This is in contrast to REST, where changes to the API may unintentionally disrupt existing clients.

GraphQL gives clients fine-grained control over the response structure. Clients can specify precisely the data they need, and the server returns precisely that data.

Caching proves to be difficult with GraphQL. The dynamic nature of GraphQL queries makes it challenging to cache responses. The same query may be executed with different arguments, resulting in different responses. Caching becomes more complex as responses are no longer uniform, and caching mechanisms must account for the variability in queries.
This can lead to cache invalidation issues and can be challenging to manage. Although tools and libraries have emerged to address these challenges, caching in GraphQL requires careful consideration.

## Caching

The approaches to caching are also very different in REST and GraphQL. REST builds on top of HTTP caching. Since REST is strongly typed, it provides with it built-in GraphQL caching. It does not have to be advanced as in the case of GraphQL, though. The above structure pertains to REST caching. REST APIs can also leverage such in-built HTTP cache mechanisms, among which there are **ETags** and **Cache-Control** headers.

```http
GET /users/12345
Cache-Control: max-age=3600
ETag: "abc123"
```

This tells the client to cache the response for one hour (`3600` seconds) and only request updates if the `ETag` is changed.

### GraphQL Caching

This might be a bit more complicated with GraphQL, since one query typically requests data from various resources, so HTTP-level caching won't work well. Instead, it would be client-side caching tools like Apollo Client or Relay.

**Apollo Client Example**:

```js
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://example.com/graphql",
  cache,
});
```

Apollo Client will take care of caching the responses to all of those queries according to a unique identifier, for example, the user `id`.

## Performance

In the last sections, we have seen how GraphQL and REST differ in terms of data fetching and flexibility. In this section, we will discuss the performance of both. Let's go!

### REST

When it comes to performance, REST is like the reliable workhorse of the web world. In straightforward scenarios where you're dealing with basic data retrieval and modifications, REST gets the job done efficiently.

But, and there's always a "but," REST has its downsides. Sometimes, REST can give you more than you asked for. It is called over-fetching, as we have previously known. Picture this: you ask for some user details, and REST dutifully sends everything—name, email, posts, and maybe even the favorite color of their cat. It's like ordering a coffee and getting the entire coffee shop menu.

And then there's this thing with separate requests. If you want details about a user and their posts, you're making one request for the user and another for the posts. It's like having to visit two different stores to buy bread and cheese when all you want is a good old sandwich.
So, while REST is awesome for simple tasks, it can get a bit tricky in more complex situations. Just be ready to make multiple stops on your data-fetching journey.

### GraphQL

GraphQL is very powerful and excels greatly on how to make data fetching smooth and efficient. It is so proficient when it comes to handling data, sends you exactly what you asked for, and does not add any extra info to your response.

Also, GraphQL does not make multiple requests just to get data for you. This is because of the design of GraphQL. You make a single request and you get all the data you need from different resources.

So, in the world of data performance, GraphQL takes the lead because of these points:

- No overhead
- No over-fetching
- No multiple requests.

## Use Cases

Let's look at different use cases where REST and GraphQL will play out their best roles.

### REST

In the use case of REST, it is more suitable for CRUD applications. For example, applications like blogs, e-commerce, and other applications that require basic data retrieval and modifications. Applications that do not require complex data handling and manipulation.

Also, REST caching capability makes it ideal for applications where performance and scalability are critical.

### GraphQL

GraphQL takes its game to the higher levels. If you are building an application that requires complex and dynamic data handling and manipulation, GraphQL is the way to go. For example, if you are building a social media that has a target of a billion users, then you are better off using GraphQL. This is because it will help you identify and manage the data you need to handle. Social media requires a lot of data, for instance, a single User model can have a lot of data, like name, email, address, posts, comments, likes, and so on. GraphQL will help you manage all these data in a single request.

Also, GraphQL is best suited for real-time applications. Your social media application will indeed have a chat section. GraphQL's subscription feature is unparalleled and powerful. It will help you manage the real-time data in your application with ease.

## Summary of differences: REST vs. GraphQL

|                                | REST                                                                                | GraphQL                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Architectural Style**        | Structured for communication between client and server                              | A query language uses HTTP, and is very easy to setup..                    |
| **Data Fetching**              | Excels well but becomes a problem when much more info in the data is needed.        | Its main selling point. It was the problem it was created to solve.        |
| **Flexibility and Efficiency** | Very easy to setup but becomes less efficient when the resources grows over time.   | High flexible to adapt to any project but difficult to work with at first. |
| **Performance**                | Great in performance but under-performs when it involves complex resource fetching. | Has high performance but underperforms in terms of caching.                |
| **Use Cases**                  | Used mainly for not-too complex applications and also for CRUD project.             | Excels greatly in complex projects and especially chat apps.               |

## Batching Multiple Requests

One of the upsides to using GraphQL is that it allows for batching multiple requests in a single query, while REST typically requires multiple HTTP requests for each resource.

### REST (Multiple Requests)

```http
# Getting data of the user
GET /users/12345

{
  "id": 12345,
  "name": "John Doe"
}

# Getting user's posts
GET /users/12345/posts

[
  { "id": 1, "title": "First Post" },
  { "id": 2, "title": "Second Post" }
]
```

It will require two different requests for getting the user and his post.

### GraphQL (Single Request)

```graphql
{
  user(id: "12345") {
    name
    posts {
      title
    }
  }
}

# Response

{
  "data": {
    "user": {
      "name": "John Doe",
      "posts": [
        { "title": "First Post" },
        { "title": "Second Post" }
      ]
    }
  }
}
```

In GraphQL, the record for a user and their posts is fetched with a single request, reducing network overhead.

## Versioning

Versioning in APIs is dealt with quite differently between REST and GraphQL. REST generally requires versioning for changes, where GraphQL manages this transparently.

### REST Versioning

REST APIs typically use versioning in the URL to handle changes to the API as time goes on.

```http
# Version 1
GET /api/v1/users/12345

# Version 2
GET /api/v2/users/12345
```

Each version can bring breaking changes, and clients would need updates to use the correct version of the API.

### GraphQL Versioning

GraphQL does not need versioning because you can deprecate the specific fields and introduce new ones without breaking existing queries.

```graphql
{
  user(id: "12345") {
    name
    email
    phoneNumber @deprecated(reason: "Use `mobileNumber` instead")
    mobileNumber
  }
}

# Response

{
  "data": {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "phoneNumber": null,
      "mobileNumber": "123-456-7890"
    }
  }
}
```

GraphQL helps clients use deprecated fields while newer clients can use updated fields.

## Conclusion

In this article, we started by introducing REAT and GraphQL. Next, we discussed and learned about the architectural style of REST and GraphQL. We also discussed the data fetching of both approaches. We saw different scenarios where REST and GraphQL will be used. We saw the ups and downs of each approach and how they can be used to solve different problems.

Further down, We looked at the flexibility and efficiency of both approaches. How performant they were, and also where they greatly lacked.
In conclusion, both are good in their ways; it all depends on where they are used. But we should be careful not to use anyone to where it might be an overkill for the scenario.
