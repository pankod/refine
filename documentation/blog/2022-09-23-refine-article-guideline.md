---
title: An article guideline for Refine blog posts
description: A guideline for writing articles
slug: article-guideline
authors: necati
category: "Announcement"
tags: []
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-09-23-refine-article-guideline/social.png
hide_table_of_contents: false
---

## Inroduction

We use Docusaurus for our blog pages. Your article should follow some standards.

- The article needs to be written in markdown format. Do not publish the article on platforms like hackmd.io and your personal blog.

- You need to be wait minimum one month before publishing the article on your personal blog due SEO purpose. Do not forget to give a canonical url to the article on your personal blog.

- Add the word count at the end of your article - excluding the code.

- Use tools like Grammarly https://app.grammarly.com/ to fix all grammar mistakes and spellings

## Project installation for example app

If you need to bootstrap a new project with React or Next.js for the article, please use `create refine-app` CLI.

It is a CLI tool that helps you to bootstrap a new project with a lot of features.

To create a project called my-app, run this command:

```bash
npm create refine-app@latest my-app
```

## Adding table of contents

Covered sections need to be shown at the beginning of the article.

Imagine you have 3 headings in your article.

## What is Refine?

## How to use Refine?

## How to customize Refine?

You need to add the following code with proper heading link to the top of the article.

```markdown
-[What is Refine?](#what-is-refine) -[How to use Refine?](#how-to-use-refine) -[How to customize Refine?](#how-to-customize-refine)
```

The result will be like this when the post is published.

## Code blocks

Explain the topic contents step by step. Imagine you are reading the article for the first time. You need to explain the topic in a way that a beginner can understand.

### Code block structure

- Keep your code blocks content as much as minimal.

- Add the component imports, functions definitions, etc., into the code blocks if they are only required for the code to work successfully.
  Otherwise, do not show any code that is not explained or implemented in the section at that time. Shortly, please add the required code blocks only.

### File path and code block syntax

- For code block language syntax, we always use `"tsx"` option whetever your code is written in Typescript or not. This is just useful for syntax coloring.

- We use `title` attribute to show the file name of the codeblock.

```tsx title="src/App.tsx"
function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
    />
  );
}
```

The result will be like this in the blog post when published.

```tsx title="src/App.tsx"
function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
    />
  );
}
```

We recommended to use title attribute for all codeblocks to make it easier to understand file structure of the project.

### Syntax highlighting

- When you add a new codes to the existing code block, you should use syntax highlighting technique.

For example, you should use `//highlight-next-line` to highlight the new added code, if you want to add a resources property `<Refine />` component

```tsx title="src/App.tsx"
function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      //highlight-next-line
      resources={[{ name: "posts", list: Posts }]}
    />
  );
}
```

The result will be like this in the blog post when published.

```tsx title="src/App.tsx"
function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      //highlight-next-line
      resources={[{ name: "posts", list: Posts }]}
    />
  );
}
```

<br />

- For more than one line highlighting, you can use `//highlight-start` and `//highlight-end` to highlight the code block.

```tsx title="src/App.tsx"
function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      //highlight-start
      resources={[
        { name: "posts", list: Posts }
        { name: "users", list: Users }]}
      //highlight-end
    />
  );
}
```

The result will be like this in the blog post when published.

```tsx title="src/App.tsx"
function App() {
 return (
   <Refine
     routerProvider={routerProvider}
     dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
     //highlight-start
     resources={[
       { name: "posts", list: Posts }
       { name: "users", list: Users }]}
     //highlight-end
   />
 );
}
```

We recommended to use highlighting technique for codeblocks to make it easier to readers to follow the code.

For more detailed usage of syntax highlighting, you can check [this](https://docusaurus.io/docs/markdown-features/code-blocks) page.

## Screenshots & Images

We recommend to add screenshots and images to show outputs if you building an example app.

Please design your example app outputs to look cool and understandable.

If you want yo use gifs, please optimize gif size before adding to the article. You can use [this](https://ezgif.com/optimize) tool to optimize gif size.
