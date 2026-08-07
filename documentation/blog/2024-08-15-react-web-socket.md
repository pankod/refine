---
title: How to set up a WebSocket connection with Node.js and React.js?
description: Understanding Real-time communication with React and WebSocket
slug: react-websocket-tutorial-nodejs
authors: frank_joseph
category: "Tutorials"
tags: [react, backend, javascript]
hide_table_of_contents: false
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-16-react-web-socket/social-2.png
---

**This article was last updated on August 15, 2024, to add sections for WebSocket Protocols and Subprotocols, Security Considerations with WebSockets, and Error Handling and Reconnection Strategies.**

## Introduction

With the advent of Social Media and other internet-enabled communication tools, delivering real-time communication has become increasingly important. Hypertext Transfer Protocol (HTTP) is a communication protocol like WebSocket that follows the Request-Response, one-way communication pattern. It has been used by most developers to implement real-time communication but it falls short when the use case involves instant updates and building a full-duplex bidirectional communication tool. Although HTTP through its various methods such as HTTP Polling, Streaming, and server-sent events (SSE) helped developers implement data transfer, there are restrictions and disadvantages that have paved the way for WebSocket. WebSocket helps developers implement a full-duplex bidirectional communication mechanism and helps developers build a real-time communication system.

In this article, we’ll discuss the shortcomings of the HTTP protocol, and explore the concept of real-time communication and how to implement it with the WebSocket protocol while building a basic client communication application.

## Why WebSocket?

In creating web applications with a full-duplex (two-way) bidirectional communication functionality, developers must tweak the traditional HTTP protocol to implement data transfer. The HTTP protocol has several methods such as HTTP Polling, HTTP Streaming, and server-sent events that help developers build a real-time application. These methods have several shortcomings where WebSockets has proved superior as we’ll see in the following few sections.

**HTTP Polling**
The first attempt to solve the issues that comes with traditional HTTP protocol is by polling the server intervals. The client sends the request to the server at predefined intervals using these functions setInterval or setTimeout. In long polling, the server handles the interval or waiting time. The sum total of the request and response events in the HTTP protocol is referred to as the `HTTP Polling lifecycle` It involves the following steps:

- To communicate with the server, the client sends a request and waits for a response
- The server sends a response when there is an event, update, or change, or reaches a timeout until then it hangs the client request.
- The server sends a response to the client when there is an update or change
- This cycle continues as the client sends a new request.

The following are some of the flaws associated with HTTP Polling: Caching, Timeouts, header overhead, and latency. Building a real-time application with WebSocket removes these pitfalls associated with HTTP Polling.

**HTTP Stream**
In HTTP Polling, the server closes without sending a response to the client, this is the predominant cause of network latency associated with HTTP Polling. In HTTP Polling, the server closes the request connection channel after responding. This connection channel closure means the client would have to create a new connection whenever there is a new request. HTTP Stream solves this problem. In HTTP Stream, the initial request is left open even after the server has responded to the client’s request with data. Leaving the request channel open indefinitely makes it possible for the server to continually send responses to the client whenever new data is available or there is an update or change. HTTP Stream reduces latency, delivers updates near real-time, and utilizes server resources. The limitation associated with streaming data over HTTP is that it requires the client to initiate a request and establish a connection and latency could be an issue with streaming too.

[**Server-Sent Event (SSE)**](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
The server-sent event protocol provides a unidirectional (Serve-client) communication channel to stream data in real-time or near real-time. The SSE is a standardized HTTP streaming protocol with a built-in browser API.

NB: Firefox doesn't support the use of SSE in service workers.

SSE is an excellent choice for unidirectional data transfer from server to client. SSE is extremely fitted for use cases where there is no need to send data from the client to the server. For example, SSE is especially useful for handling social media feed updates, and real-time dashboards.

So far, we’ve seen the shortcomings associated with the traditional HTTP methods, and how inefficient it is to use them to implement bidirectional real-time communication. WebSocket is a more suitable option for implementing bidirectional data exchange.

**What is WebSocket**
WebSocket is a data transfer protocol that makes it possible for bidirectional (two-way), real-time, full-duplex, and interactive communication between the browser (client) and the server over a single, long-lived Transmission Control Protocol (TCP) connection. With [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API), the client can send requests to the server and receive event-driven responses without having to poll the server.

WebSocket connection follows the order below:

- **Request Handshake**: To establish a connection, the client sends an initial request to the server, this is known as the WebSocket handshake.
- **Validate request**: Upon receiving the request, the server checks its validity and connects if validation is successful.
- **Communication**: Upon successful validation, a WebSocket connection is established, and both the server and client can transfer data to each other.

WebSocket API is supported by most major browsers as shown in this [compatibility table](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API#browser_compatibility).

**Why Developers should use WebSockets**
Due to the inconsistencies associated with the HTTP methods; it is not advisable to build an application with a bidirectional communication functionality using traditional HTTP methods. WebSockets provide low-latency, bidirectional, real-time communication channels between client and server. While being a lightweight protocol, it is also scalable and supports full-duplex (two-way) communication. WebSockets are supported by most modern browsers.

## Unleashing the Power of WebSockets using Node.js and React

According to the Web Socket connection order discussed earlier, the WebSocket protocol starts by creating a handshake and then allows communication after confirming the request by sending data. The connection between the client and server must be established through the handshake. Real-time data communication between the client and server is possible when the handshake is complete.

We'll demonstrate how to set up a WebSocket connection with Node.js and React.js. To illustrate the capabilities of WebSockets, we'll utilize a collaborative text editing application as an example. Multiple people can collaborate and edit a text at the same time with this application, and any changes made by one person are immediately visible to all other users.

## Accessing the Code

Before getting into the specifics of WebSockets, it's important to remember that Git Repository has the entire code available. The source code for a prototype collaborative text editing application that will be used as our real-world example to understand web sockets practically is in the root folder(**WebSockets-Demo-main**) that can be obtained from the provided URL([**Collaborative Text Editing Application**](https://github.com/khabbabpersonal/WebSockets-Demo)). To follow along, clone or download the repository.

## Run the application after Setting up the Environment

The next step after downloading and unzipping the file is configuring your Environment. Using your favorite code editor, open the unzipped folder. There are two main directories available:

**The Server Directory:** This is the location of the Node.js WebSocket server. It is in charge of managing the text editor's core logic.

**The Client Directory:** This includes a React application that communicates with the WebSocket server. It is in charge of the application's real-time features. Through it, the user engages with the application.

You need to execute some commands in order to start the text editing application. These commands will launch the server and client and install the required packages. You can open the app in two different browser windows and edit the text simultaneously after the server and client are both up and running. Here, you begin to experience WebSockets' real-time capabilities.

## Understanding the Code\*\*

### Understanding the WebSocket Handshake

The server and client begin a handshake over the WebSocket protocol. At the server level, the HTTP server is turned on, and the WebSocket server is connected using a single port. The WebSocket server is connected to the HTTP port once the HTTP server has been set up. The process of creating a WebSocket connection starts with this, and it serves as the beginning of an exchange between the server and the client, much like a virtual handshake.

```tsx title="/server/index.js"
// Import required modules
const { WebSocket, WebSocketServer } = require("ws");
const http = require("http");
const uuidv4 = require("uuid").v4;

// Create an HTTP server and a WebSocket server
const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8000;

// Start the WebSocket server
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
```

### Managing Client Connections

The management of client connections is essential in any real-time application. Each client is provided with an individual key produced by the 'uuid' package, and all connected clients are tracked as an object in the code. The special key is created, and the connection is saved when a new client connection request is received. This enables the server to manage all connections that are currently active efficiently.

```tsx title="/server/index.js"
// Maintain active connections and users
const clients = {};
const users = {};
let editorContent = null;
let userActivity = [];

// Handle new client connections
wsServer.on("connection", function handleNewConnection(connection) {
  const userId = uuidv4();
  console.log("Received a new connection");

  clients[userId] = connection;
  console.log(`${userId} connected.`);

  connection.on("message", (message) =>
    processReceivedMessage(message, userId),
  );
  connection.on("close", () => handleClientDisconnection(userId));
});
```

New client connections are handled by the `handleNewConnection` function as events. When a new client creates a WebSocket connection with the server, it is activated.

· The uuidv4 library is used to create a distinct `userId` whenever a new connection is made.

· The `userId` serves as the key for storing the connection in the _clients_ object.

· A new connection is signaled by printing a message in the log.

Incoming messages from clients are handled by the `processReceivedMessage` function. The response message is broadcast to all connected clients once the message has been parsed, the message type has been established, and actions have been taken based on the message type (such as user activity of joining or editing content).

```tsx title="/server/index.js"
// Handle incoming messages from clients
function processReceivedMessage(message, userId) {
  const dataFromClient = JSON.parse(message.toString());
  const json = { type: dataFromClient.type };

  if (dataFromClient.type === eventTypes.USER_EVENT) {
    users[userId] = dataFromClient;
    userActivity.push(`${dataFromClient.username} joined to collaborate`);
    json.data = { users, userActivity };
  } else if (dataFromClient.type === eventTypes.CONTENT_CHANGE) {
    editorContent = dataFromClient.content;
    json.data = { editorContent, userActivity };
  }

  sendMessageToAllClients(json);
}
```

As you can see, the new connection is successfully received.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-16-react-web-socket/enter-name.png"  alt="Name entry screen for collaborative editor" />
</div>

When User enter their name and click on Join Document the message is broadcasted to all connected clients that user have joined to collaborate. Please see the below screenshots of application:

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-16-react-web-socket/enter-name-2.png"  alt="User joined message in collaborative editor" />
</div>

### Establishing the Handshake at the Client Level

In the code below, the `react-use-websocket` package is used on the client side to start a WebSocket connection. The `useWebSocket` hook provided by this package allows React functional components to control WebSocket connections. This is the client's way of reaching out for a handshake with the server. From the client's perspective, it's the initial stage of creating a WebSocket connection. It is very easy to understand and use WebSockets when we have a good understanding of the various event types: `onopen`, `onclose`, or `onmessage`.

```tsx title="client/src/App.js"
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { DefaultEditor } from "react-simple-wysiwyg";
import Avatar from "react-avatar";

import "./App.css";

const WS_URL = "ws://127.0.0.1:8000";

function isUserEvent(message) {
  const parsedMessage = JSON.parse(message.data);
  return parsedMessage.type === "userevent";
}

function isDocumentEvent(message) {
  const parsedMessage = JSON.parse(message.data);
  return parsedMessage.type === "contentchange";
}

function App() {
  const [username, setUsername] = useState("");
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  // Rest of the component code
}
```

Now, when user joins, the web socket connection is established at client level. The above screenshot shows the “WebSocket connection established” in console logs when the connection is opened for client.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-16-react-web-socket/handshake.png"  alt="Console log showing WebSocket connection established" />
</div>

### Real-time Message Transmission

The WebSocket connection can transfer messages as it receives them once the client and server have established a connection through the WebSocket handshake event. Users can collaborate and edit text in real-time in the sample React app. The application also keeps track of user actions and content modifications, transmitting these events to every other connected client.

```tsx title="client/src/App.js"
function App() {
  const [username, setUsername] = useState("");
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (username && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username,
        type: "userevent",
      });
    }
  }, [username, sendJsonMessage, readyState]);

  return (
    <>
      <Navbar className="navbar" color="light" light>
        <NavbarBrand href="/">Real-time Collaborative Text Editor</NavbarBrand>
      </Navbar>
      <div className="container-fluid">
        {username ? <EditorSection /> : <LoginSection onLogin={setUsername} />}
      </div>
    </>
  );
}
```

```tsx title="client/src/App.js"
function EditorSection() {
  return (
    <div className="main-content">
      <div className="document-holder">
        <div className="current-users">
          <Users />
        </div>
        <Document />
      </div>
      <div className="history-holder">
        <History />
      </div>
    </div>
  );
}
```

```tsx title="client/src/App.js"
function Document() {
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isDocumentEvent,
  });
  let html = lastJsonMessage?.data.editorContent || "";

  function handleHtmlChange(e) {
    sendJsonMessage({
      type: "contentchange",
      content: e.target.value,
    });
  }

  return <DefaultEditor value={html} onChange={handleHtmlChange} />;
}
```

The below screenshot shows that when the client connection is established then users can collaborate and edit text in real-time, each action will be transmitted to every connection client.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-16-react-web-socket/real-time-transmitting.png"  alt="Real-time collaborative editor with shared updates" />
</div>

### Handling Disconnections

Handling disconnections is just as crucial to any real-time application as managing connections. The WebSocket initiates a `close` event when a user disconnects. According to the code below, when the user closes their browser or refreshes the page, the server is capable of notifying the remaining users about the disconnection of that user.

```tsx title="/server/index.js"
// Handle disconnection of a client
function handleClientDisconnection(userId) {
  console.log(`${userId} disconnected.`);
  const json = { type: eventTypes.USER_EVENT };
  const username = users[userId]?.username || userId;
  userActivity.push(`${username} left the editor`);
  json.data = { users, userActivity };
  delete clients[userId];
  delete users[userId];
  sendMessageToAllClients(json);
}
```

When user closes the browser window or refreshes the page, application will disconnect client and notify every connected user by broadcasting the message that that user left the editor.

 <div className="centered-image">
  <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-08-16-react-web-socket/handling-disconnections.png"  alt="Disconnection notification in collaborative editor" />
</div>

## Security Considerations with WebSockets

I would like to briefly share my thoughts on security considerations while working with WebSockets, since we are currently using it in our project. This is a great technique for real-time communication, and there are a few security considerations that need to be taken care of so that our application is secure.

### WSS: WebSocket Secure Connections

Please be sure to use secure websocket connections (wss://) not just plain websocket connections (ws://). This would be the equivalent of using HTTPS not HTTP. Secure websocket connections actually encrypt the data traveling between the two points and, for this reason, help secure it from being man-in-the-middled to abuse.

```tsx
const ws = new WebSocket("wss://example.com/socket");
```

```tsx
const https = require("https");
const WebSocket = require("ws");
const server = https.createServer({
  /* SSL options */
});
const wss = new WebSocket.Server({ server });

server.listen(8080, () => {
  console.log("Secure WebSocket server is running on port 8080");
});
```

### Put in Place Authentication and Authorization

Unlike HTTP requests, the WebSocket connection is long-lived and continues to stay open as long as needed. It should also be made sure that opening a WebSocket connection can only be done by an authenticated user. This can be achieved by validating tokens—like JWTs—while a handshake is performed. Finally, these with authorization checks are also responsible for making sure that data reached by all users is allowed.

```tsx
const token = "your_jwt_token";
const ws = new WebSocket(`wss://example.com/socket?token=${token}`);
```

```tsx
const url = require("url");
const jwt = require("jsonwebtoken");

wss.on("connection", (ws, req) => {
  const queryParams = url.parse(req.url, true).query;
  const token = queryParams.token;

  try {
    const decoded = jwt.verify(token, "your_secret_key");
    ws.user = decoded.user; // Attach user info to WebSocket instance
    console.log("User authenticated:", ws.user);
  } catch (err) {
    ws.close(1008, "Unauthorized"); // Close connection with Unauthorized status
  }
});
```

### Protection from Cross-Site WebSocket Hijacking

In a cross-site WebSocket hijack attack, an attacker manipulates a user's browser into opening a WebSocket connection to a server using the user's credentials. Mitigation involves using the authentication tokens as well as other WebSocket messages by doing validation on the server side.

```tsx
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.token !== validToken) {
    ws.close(1008, "Unauthorized");
  } else {
    // Process message
  }
};
```

```tsx
ws.on("message", (message) => {
  const data = JSON.parse(message);
  try {
    const decoded = jwt.verify(data.token, "your_secret_key");
    // Proceed with the message processing
  } catch (err) {
    ws.close(1008, "Unauthorized");
  }
});
```

### Rate Limiting and Message Validation

While it is true that WebSockets allow for real-time data exchange, one should implement rate limiting in order to avoid abuses such as server flooding with messages. In addition, valid content of messages about to be sent can prevent injections and the like.

```tsx
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use("/socket", limiter);

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      // Validate the message content
      if (typeof data !== "object" || !data.action) {
        throw new Error("Invalid message format");
      }
      // Process the message
    } catch (err) {
      ws.send(JSON.stringify({ error: "Invalid message" }));
    }
  });
});
```

### Close Connections Gracefully

This could avert the possibility of resource leakage and reduce the attack surface for attacks in a heavily used application with a large user base. Properly close WebSocket connections: that is, closing should only be done when it is no longer needed.

```tsx
ws.on("close", () => {
  console.log("Connection closed");
  // Clean up resources, e.g., remove user from active users list
});

process.on("SIGINT", () => {
  wss.clients.forEach((client) => {
    client.close(1000, "Server shutting down");
  });
  server.close(() => {
    console.log("Server shut down gracefully");
    process.exit(0);
  });
});
```

## Bonus: WebSocket Protocols and Subprotocols

### What Is WebSocket Protocols?

WebSocket is full-duplex, single TCP connection-oriented, request-response-wise unsynchronized. On the contrary, it always has a connection open between the client and server, unlike HTTP, in which connections are opened as needed. WebSocket involves continuous communication between the two parties, a feature that can be beneficial for many applications: chat applications, live notifications, or shared tools.

### Subprotocols Understanding

Subprotocols are actually an extension of the WebSocket protocol, describing a certain format or, in more detail, the structure of messaging inside the WebSocket connection. Subprotocols allow the client and server to agree on one particular protocol for their data exchange, which is sometimes quite important to remember so that both parties can understand and process the messages properly.

An alternative way to look at subprotocols is to consider them as languages within the WebSocket connection. So, while WebSocket is the medium of communication, the subprotocols are the agreed-upon languages to be spoken between two parties—like English, or Spanish.

### Popular WebSocket Subprotocols

Some common popular sub-protocols that you are likely to come across

- **STOMP (Simple Text Oriented Messaging Protocol):** This is mainly applied to messaging applications. It provides a simple, text-based protocol for messages that can be easily understood and quickly implemented.

- **MQTT (Message Queuing Telemetry Transport):** A lightweight messaging protocol, one of the several applied in low-bandwidth, high-latency networks. It is, therefore, in essence, the most commonly used protocol in IoT applications.
- **WAMP (Web Application Messaging Protocol):** This is a protocol that supports RPC (remote procedure call) and Publish/Subscribe communication patterns in a routed way. It provides a good fit for applications with more structured messaging patterns.

### 4. Realizing Subprotocols through WebSocket Connection

During the creation of a WebSocket connection, a subprotocol to be used is specified for both the client and server. This sets things up so that both the client and server know how to format and interpret the messages in the exchange of information.

**Client-Side Example:**

```javascript
// Specify the desired subprotocol during connection
const ws = new WebSocket("wss://example.com/socket", ["mqtt"]);

ws.onopen = () => {
  console.log("WebSocket connection established with MQTT subprotocol.");
};

ws.onmessage = (message) => {
  // Handle incoming messages according to the MQTT protocol
  console.log("Received message:", message.data);
};
```

**Server Side Example (Node.js with ws library):**

In the example above, there is an agreement between the client and the server to use the subprotocol of MQTT to the effect that the transmitted messages will be properly formatted and understood at either end.

```javascript
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws, req) => {
  const subprotocol = ws.protocol;

  console.log(`Client connected using subprotocol: ${subprotocol}`);

  ws.on("message", (message) => {
    // Process message according to the selected subprotocol
    console.log("Received:", message);
  });

  ws.send("Welcome to the WebSocket server!");
});
```

### 5. Custom Subprotocols

You will sometimes have to define your own subprotocol with fixed ideas for your particular needs. This makes it necessary for you to implement certain custom message format, meaning that both the client and server should be appropriately used.

```tsx
// Custom subprotocol: 'myCustomProtocol'
// Messages could be JSON objects with a specific structure

const ws = new WebSocket("wss://example.com/socket", ["myCustomProtocol"]);

ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  if (data.type === "greeting") {
    console.log("Received greeting:", data.content);
  }
};
```

You would then parse incoming messages on the server side using this custom structure to make sure that the application logic interprets them correctly. ### 6. Select the Correct Sub Protocol Choose sub-protocols that would be appropriate to satisfy your application-specific requirements.

For example:

- **STOMP** is good for messaging apps where a lightweight, readable protocol is needed.
- **MQTT** is applicable to constrained IoT devices with limited bandwidth.
- **WAMP**: Can go fine together with applications which are based on structured RPC or Pub/Sub patterns.

## Conclusion
Full-duplex bidirectional real-time communication is an important aspect of modern web development. WebSockets provides the relevant and most efficient means to achieve real-time communication. In this article, we explored the concept of WebSockets, its benefits, why it is superior to other traditional HTTP methods, and why developers should adopt WebSockets. Finally, we illustrated how to integrate WebSockets into React and Node.js applications.
