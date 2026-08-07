---
title: When to use dangerouslySetInnerHTML in React?
description: Find out when to use dangerouslySetInnerHTML in React and how it can help avoid XSS attacks.
slug: use-react-dangerouslysetinnerhtml
authors: clara_ekekenta
category: "Tutorials"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-25-react-dangerouslyInnerhtml/social-2.png
hide_table_of_contents: false
last_update: 2024-07-03
---

**This article was last updated on July 02, 2024, to add sections for XSS Attacks and Risks of Using innerHTML.**

## Introduction

Rendering HTML markup from rich text created in a WYSIWYG editor might be difficult. Because numerous pieces of logic are required to make things work as they should. This can be attributed to the fact that React uses a browser-independent system to manipulate the DOM elements, thus preventing direct interaction with the DOM. Things can be pretty much easier and faster with dangerouslySetInnerHTML.

In this tutorial, we'll see how to use `dangerouslySetInnerHTML` in a React application.

Step we'll cover:

- [What is dangerouslySetInnerHTML?](#what-is-dangerouslysetinnerhtml)
- [When to use dangerouslySetInnerHTML?](#when-to-use-dangerouslysetinnerhtml)
- [Understanding XSS Attacks and Risks of Using innerHTML in React](#understanding-xss-attacks-and-risks-of-using-innerhtml-in-react)
- [Alternatives to dangerouslySetInnerHTML](#alternatives-to-dangerouslysetinnerhtml)
  - [Safe HTML Rendering Using Libraries](#safe-html-rendering-using-libraries)
  - [Generating HTML-Safe Content](#generating-html-safe-content)

## What is dangerouslySetInnerHTML?

**React dangerouslySetInnerHTML** is an HTML property that makes it easy to programmatically set the HTML elements from an external source. It has replaced the innerHTML used in the browser DOM.
dangerouslySetInnerHTML helps React know how to handle the HTML elements in a component where the contents are to be rendered.

## When to use dangerouslySetInnerHTML?

**dangerouslySetInnerHTML** is mostly used in any application where you need to render formatted text in a div element. Also, you can use it to render content exactly as you have formatted it. For instance, let's consider a blog application. The body of a blog is usually formatted with headers, paragrams, images, code blocks, etc.

To render such contents in a React application, you'll need to manipulate the DOM to get the HTML elements in the contents and set them to an element using innerHTML. Because React does not allow direct interaction with the DOM, your content will end up not being displayed as it should. However, when dangerouslySetInnerHTML is applied, React recognizes the HTML tags and correctly renders them.

Due to its vulnerability to cross-site scripting (XSS) attacks, dangerouslySetInnerHTML might constitute a major threat to your application, as the name suggests. However, DOMPurify has proven to be a highly effective tool in overcoming such difficulties. DOMPurify is a DOM-only XSS sanitizer for HTML for preventing XSS attacks by stripping out all dangerous HTML in content rendered in an application.

## Understanding XSS Attacks and Risks of Using innerHTML in React

This led me to think about the XSS attack and some of the security risks directly related to using `innerHTML` in our React applications. Here is a quick overview:

### What is XSS?

Cross-site scripting, usually known as XSS, is one of the vulnerabilities found in web applications that allow an attacker to inject malicious scripts into web pages accessed by others. In essence, there are three types of XSS attacks:

1. **Stored XSS**: The injected script is stored on the target server—say, in a database—and later appears within web pages.

2. **Reflected XSS**: The script is issued by a web server in response to an error message or a search result and executed within the user's browser.
3. **DOM-Based XSS**: The exploit lies in the client-side code, hence not on the server side, and it would use the DOM to launch the attack.

### How an XSS Attack Works

This is how XSS attacks work by exploiting vulnerabilities in web applications and enabling malicious scripts to be executed under the user's browser's security context. Here are a couple of examples:

**Stored XSS**: An attacker injects a malicious script into one of the comment fields, which gets stored in the database. When a different user reads that comment, the script gets executed in the browser, probably obtaining their session cookies or getting them to redirect to a phishing site.

- **Reflected XSS**: The attacker sends a link with the URL having the malicious script, and the same gets reflected from the server back to the request made by the victim. On clicking, the script executes in the browser, showing a fake login form to capture credentials.

For example, if users are permitted to insert HTML directly into a web page via a form field, hackers can embed malicious code into the application, causing the application to behave inappropriately or even resulting in data loss. Consider the following code:

```tsx
const App = () => {
  const data = `lorem <b onmouseover="alert('mouseover');">ipsum</b>`;

  return <div dangerouslySetInnerHTML={{ __html: data }} />;
};
```

A piece of JavaScript code was embedded in the above code. This will trigger an alert each time a user tries to access the application. This is because the data was not sanitized before being rendered in the application. The above code will return the below result.

```tsx
lorem ipsum <img src="" alt="Malicious image payload" onerror="alert('mailicious message');" />
```

As shown below, you can sanitize the data to remove all malicious code and scripts embedded in it.

```tsx
import DOMPurify from 'dompurify';

const App = () => {
  const data = `lorem <b onmouseover="alert('mailicious message');">test</b>`

  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(data)
  })

  return (
   dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data)}}></div>
  );
}

export default App;
```

The above code will strip out the script in the data that has been rendered on the application and the result below.

```tsx
 lorem test <img src="" alt="Empty image placeholder">
```

### Risks involved with using innerHTML

Using `innerHTML` directly with React can make our application vulnerable to cross-site scripting attacks. The following are the main risks involved :

- **Script Injection**: It allows us to add malicious scripts to our application, which can end in data theft, session hijacking, and unauthorized activities.
- **Data Manipulation**: Threat actors could alter the content displayed in our web pages to deceive users or potentially even manipulate data for the compromise of the integrity of our application.
- **Unauthorized Requests**: Unauthorized API calls or even changes in settings of an application that are unauthorized for a user.

These all can be cleared out only if we ensure not to use `innerHTML` at any cost. Instead, we use libraries like DOMPurify to sanitize any form of HTML content before rendering into our applications.

### Building a simple example app

To demonstrate how dangerouslySetInnerHTML works in a React application, let's build a simple blog application. To make things easier, we'll use [superplate](https://github.com/pankod/superplate) CLI to create React apps.

To get started, create a new app with the command below.

```
npx superplate-cli blog
```

The above command will prompt you to choose the configuration for your project. Your selection should look like the screenshot below.

<div class="img-container" align-items="center" style={{alignSelf:"center", width:"400px"}} >
  <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-25-react-dangerouslyInnerhtml/dangerouslySetInnerhtml-cli.png"  alt="Superplate CLI configuration prompt" />
</div>

<br/>

Once you complete the prompts, Superlate will install all the required packages and set up the project folders for your application.

Now install the Dompurify module to sanitize the HTML codes we'll render in the app.

```
npm install dompurify @types/dompurify
```

Next, open the application in your favorite text editor. Then create a `data.json` file in the src folder of the project and add the dummy data below.

```tsx
{
  "blogs": [
    {
      "title": "<h3>Node.js for begineers</h3>",
      "content": "<p>Lorem ipsum dolor <b>sit</b> amet consectetur adipisicing elit. <strike>Enim ex a</strike> veniam, molestiae praesentium culpa, mollitia officiis quas quia vitae voluptates</p>"
    },
    {
      "title": "<h3>Sit amet consectetur adipisicing eli</h3>",
      "content": "<p>Lorem ipsum dolor <b>sit</b> amet consectetur adipisicing elit. <strike>Enim ex a</strike> veniam, molestiae praesentium culpa, mollitia officiis quas quia vitae voluptates</p>"
    },
    {
      "title": "<h3>Sit amet consectetur adipisicing eli</h3>",
      "content": "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <i>Enim ex a</i> veniam, molestiae praesentium culpa, mollitia officiis quas quia vitae voluptates</p>"
    }
  ]
}
```

In the above JSON data, we created some HTML formatted blog data we'll render to the application.

Now update the code in the `pages/index.ts` file to render the data with the code snippet below.

```tsx
import React from "react";
import DOMPurify from "dompurify";
import { Row, Col, Container, Card } from "react-bootstrap";
import data from "../data.json";

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1 my-5">
        <Row>
          {data.blogs.map((data) => (
            <Col md={4} key={data.title} className="mb-3">
              <Card className="border-none">
                <Card.Body>
                  <Card.Title>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data.title),
                      }}
                    ></div>
                  </Card.Title>
                  <Card.Text>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data.content),
                      }}
                    ></div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
```

In the above code snippet, we imported dompurify to sanitize the contents in the blog, react-bootstrap components to style the application, and the dummy JSON data we created. Then in the card, we looped through the blogs to access and render the data in the objects.

For the Card title and Text, we added div elements and attached the **dangerouslySetInnerHTML** property to render the contents according to how they were formatted.

To allow the div where the contents are rendered to have children, we passed in the `--html` key to **dangerouslySetInnerHTML** and wrapped the content to be rendered in the dompurify **sanitize** method.

<div class="img-container" align-items="center" >
  <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-25-react-dangerouslyInnerhtml/dangerouslySetInnerhtml-usage.png"  alt="Rendered blog cards with sanitized HTML content" />
</div>

<br/>

In the above screenshot, `dangerouslySetInnerHTML` has rendered the contents just the way they were been formatted to look like.

## Alternatives to dangerouslySetInnerHTML

I wanted to take a moment and look at alternatives to using dangerouslySetInnerHTML within our React applications. More secure methods of rendering with HTML can help us eliminate those potential security vulnerabilities, for example, XSS attacks. Here's a quick overview:

### Safe HTML Rendering Using Libraries

#### DOMPurify

DOMPurify is a popular library for HTML sanitizer and removal of potentially dangerous code.

**Pros**

- Works greatly to prevent XSS attacks.
- Easy to integrate with React.
- Regularly maintained and updated.

**Cons**

— Adding a tiny overhead to the application due to the sanitization process.

- Requires extra configuration for a specific use case.

#### Sanitizer.js

Sanitizer.js is yet another library to clean and sanitize HTML content.

**Pros**

- It provides strong protection against XSS attacks.
- Can be configured for different levels of sanitization.

**Cons**
This is less widespread to use and support than DOMPurify.

- May require more initial setup and understanding to use effectively.

### Generating HTML-Safe Content

#### HTML Content Generation Best Practices Safely on the Server Side

1. **Escape HTML Content**: Always ensure you escape any user-generated content before sending it to the client. In many programming languages or libraries, this can be quickly done with built-in functions.
2. Validate user input: All kinds of user input need to be validated and sanitized at the server end, including form data, query parameters, and any other inputs a user might make.

3. Used trusted sources: Always render HTML content from trusted sources. Do not show the raw HTML of some untrusted or unknown source.

4. Regular security audit: Periodic security audits of your codebase should be done to identify all possible loopholes related to HTML rendering.

5. **Content Security Policy (CSP)**: Apply a Content Security Policy to prevent the execution of untrusted scripts.

But by following the practices elaborated above and using libraries like DOMPurify or Sanitizer.js, we can safely render HTML content in our React applications without `dangerouslySetInnerHTML`.

## Conclusion

dangerouslySetInnerHTML in a React application. We started by explaining what dangerouslySetInnerHTML is, when to use it, and the best practices for using it in a React application.
