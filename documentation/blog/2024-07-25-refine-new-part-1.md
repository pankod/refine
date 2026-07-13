---
title: Refine.new - Technical Architecture and Engineering Decisions Explored Part - 1
description: We'll discuss the technical architecture, key-concepts, and engineering design decisions made during the development process of Refine.new.
slug: refine-new-explored-part-1
authors: batuhan
category: "Announcement"
tags: []
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-07-25-refine-new-part-1/social.png
hide_table_of_contents: false
---

## Introduction

Hi I'm Batuhan, Tech Lead @ Refine. Today we'll discuss the technical architecture, key-concepts, and engineering design decisions made during the development process of Refine.new. We'll provide insights for developers on the challenges we faced, the solutions we implemented, and the overall journey of building this tool.

This is the first of a two-part series. In part one, we will take time to share the planning and decision-making process involved in creating Refine.new as well as dealing with two big problems we identified. In part two, we get right into the detail of how these plans were brought to life in the implementation stage.

## What is Refine.new?

[refine.new](http://refine.new) is a tool where you can generate [Refine](https://refine.dev/) boilerplates on the browser with a combination of different libraries. You can instantly see the app preview in the browser, share it with others and download the source code.

 <div className="centered-image"  >
  <a href="https://refine.new/">
  <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-07-25-refine-new-part-1/refine-new..gif" alt="refine new" />
</a>
</div>

## What are the key features?

Before diving into the details, let's quickly highlight some of the key features that make Refine.new a powerful tool for developers.

**Streamlined Library Integration**

You can mix and match different frameworks, libraries with your Refine applications.

- React platform ([Vite.js](https://vitejs.dev/), [Next.js](https://nextjs.org/) or [Remix](https://remix.run/)),
- UI framework ( [Ant Design](https://ant.design/), [Material UI](https://mui.com/material-ui/getting-started/overview/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/), or headless UI option),
- Data Provider (REST API, [Supabase](https://supabase.com/), [Strapi](https://strapi.io/), [NestJs](https://nestjs.com/), [Appwrite](https://appwrite.io/), or [Airtable](https://www.airtable.com/)),
- Authentication provider (Google Auth, Keycloak, Auth0, Supabase, Appwrite, Strapi, custom auth).

Considering the build step options provided by refine.new, there are numerous possible project variations. With three React platforms, 5 UI frameworks, 6 data providers, and 8 authentication providers to choose from, you can create 720 different combinations, each tailored to your specific project needs.

**Account-Based Boilerplate Management**

You can also save these boilerplates into your account to be downloaded in the future.

You can download the complete project code and use as a starting point for your project.

**Continuous Updates and Maintenance**

Stay up to date. The next time you download your boilerplate, it will include the latest Refine updates. This means you can create a boilerplate with your favorite libraries once and download it in the future with updated versions.

**Batteries loaded**

The generated application comes with a fully working Authentication, Dashboard and CRUD pages.

**Quickly share previews**

You can easily share URLs of your boilerplates with your library combinations.

**Configure in the browser**

You can change the theme color, logo and preview the app in real-time.

At the time of this post being written, 30.000+ users created more than 110.000 boilerplates using Refine.new.

## Why we build Refine.new?

[Refine](https://github.com/refinedev/refine) is an open-source React meta-framework designed to create CRUD-centric web applications. We’ve started Refine because we wanted to have a framework that we can deliver high quality apps without compromising the flexibility. We didn’t like being vendor locked to a certain UI library, react framework, any authentication or data layer.

Due to Refine’s flexible nature, there are thousands different ways you can use Refine by mixing and matching different libraries with different UI, Data, Auth layers.

Starting a greenfield project is fun, but it’s also stressful. The decisions you are making in the beginning, could either simplify people’s lives or make them suffer for years to come. For this reason, It’s a good practice to evaluate different ideas, build POCs and make the decision based on these examples. Going through this process avoid bike-shedding and allows you to make better, more based decisions.

If you already made your decisions and start a new project is also tedious thing to do. You need to do things repetitively over and over again. Install packages, do some imports, make some config etc.. For this reason, almost every framework has their generator to speed up this process.

But that doesn’t solve the entire problem. Starter project for the frameworks includes bare-minimum code. Then you would need to setup your frameworks, libraries manually again.

### At this point, the create-refine-app comes into play

With `create-refine-app`, we simplified this process by making it possible for Refine users to not only start a bare project, but also a way to generate a project with various libraries and frameworks already set-up. We believe it’s a good DX improvement. You spend time on actually building features you need, instead of setting up things.

You can try the command like below:

```
npm create refine-app@latest
```

<br/>

 <div className="centered-image"  >
  <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-07-25-refine-new-part-1/cli.avif" alt="refine new" />
</div>

<br/>

We also provide an option `Install example pages` which adds Blog Posts and Categories CRUD pages to your application. These create, list, edit pages are consist of tables, cards and forms. Including common components like tables, pagination, navigation buttons, forms saves even more time, and only add your customizations on top.

While `create-refine-app` makes it quicker to generate Refine applications, there are more than 700+ combinations that you can try. Setting up an app, installing packages, running them locally could be tedious, if you want to explore many different options.

On top of that, it’s not easy to show these apps to your colleagues as you play around. We wanted to provide a way for our users to easily share previews online, without a deployment steps.

Being sweet spot between low-code and full-code, we are aiming to make it easier for developers to build applications, without sacrificing flexibility or limiting their options.

So, speed-running the tedious application creation process in the browser sounds like a perfect idea for us. At the end of the day, you still have the code to add, remove, or change as you wish, but a big part is already set up. With create-refine-app simplifying project setup, developers can focus more on building features.

Now, let's dive into the technical architecture of Refine.new, exploring the design choices and solutions that made it possible.

## Designing the Technical Architecture

Once the requirements were clear, we identified two critical features:

**1. Generating boilerplates in the backend.**
**2. Rendering the app in the browser.**

These features would enable us to build the rest of the project. We needed a backend to orchestrate processes and a frontend to handle user choices and communication with the backend. Then, we would optimize performance and cloud usage to ensure scalability before delivering the final product.

### Generating boilerplate application based on user choices

To streamline the process of generating boilerplate applications, we decided to use the `create-refine-app` and its templates, allowing us to reuse most of the business logic and templates without maintaining additional repositories.

However, adapting the CLI tool to work with a NodeJS backend and keeping the backend in sync with the git repository templates created some challenges:

- **CLI Tool Adaptation:** Since `create-refine-app` was originally built as a CLI tool, it required modifications to work with a NodeJS backend.
- **Template Synchronization:** We use a git repository for templates, so the backend must stay updated with these templates to keep everything consistent.

We will detail the solutions to these challenges in the following sections.

### Rendering the Boilerplate Application in the Browser

To be able to render boilerplates in the browser, we decided to use our existing solution: Live Previews https://previews.refine.dev.

We are already using live-previews in our documentation to render simple examples.Live previews application accepts encoded `lz-string`.

`https://previews.refine.dev/preview?code={lz string encoded code here}`

And then decodes it, renders using `react-live` package.

While we can use live previews for that, it had several challenges:

- Adapting the setup to render entire applications, which we hadn't done before.
- Ensuring the previews are responsive, fast, and reflect user changes in real-time.
- Bundling all application TypeScript and CSS files into a single JS file.
- Avoiding duplicate imports and exports.
- Handling the potential length of the encoded strings.
- Rendering NextJS and Remix applications end-to-end.
- Managing OAuth logins.

### Planning the User Flow

After identifying the solutions and addressing the challenges, the next step was to create a simple, happy-path user flow:

We designed this initial flow in three parts:

#### User

1. Navigates to [Refine.new](http://refine.new/).
2. Selects libraries (Platform, UI Library, Data Provider, Auth Provider)

#### Backend

1. Generates boilerplate files using `create-refine-app` and it’s templates.
2. ZIPs the files and uploads them to a bucket.
3. Compiles application source code into a single file.
4. Encodes the file content with `lz-string`.
5. Stores `downloadURL` and `previewString`.

#### Refine.new

1. Shows a button to download boilerplate using `downloadURL`
2. Uses [`live-previews.refine.dev`](http://live-previews.refine.dev) in an iFrame to render preview.

We can represent this flow in a diagram as follows:

<br/>

 <div className="centered-image"  >
  <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-07-25-refine-new-part-1/user-flow.png" alt="refine new user flow" />
</div>

<br/>

Having this flow decided allowed us to start planning the implementation. While this was a basic flow without much details, doing this would allow us to build additional features, improvements around it.

Next, let's move into the implementation phase, starting with modifying the create-refine-app for NodeJS.

## Implementation phase

### Modify create-refine-app for NodeJS

As mentioned earlier, we wanted to reuse `create-refine-app`. Since we are already maintaining this project and it’s templates, our updates would be useful for both create-refine app and also refine.new

`create-refine-app` has 2 main parts.

<br/>

 <div className="centered-image"  >
  <img   src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2024/2024-07-25-refine-new-part-1/create-refine.png" alt="cli flow" />
</div>

<br/>

#### CLI layer

It’s responsible for asking initial questions like project name and also can modify SAO variables, which git repository to get templates, which git branch, having presets and passing them to SAO.

#### SAO package

It takes care of prompting additional, template specific questions to user from provided templates, providing answers as variables to the templates, generating the files, doing package installation and so on.

Eventually, after Commander starts the flow, it initializes a SAO instance.

```tsx
const sao = new SAO({
  generator,
  outDir: process.cwd(),
  logLevel: program.debug ? 4 : 1,
  appName: appName,
  answers: hasAnswers,
  extras: {
    debug: !!program.debug,
    commitMessage: process.env.INITIAL_COMMIT_MESSAGE,
    disableTelemetry: !!program.disableTelemetry,
    projectType,
    paths: {
      sourcePath,
    },
    presetAnswers,
  },
} as Options);

await sao.run().catch((err) => {
  // ...
});
```

We had to do some modifications to the SAO logic to make it compatible with API.

- Skip additional prompts: API will already provide all required answers.
- Disable debug mode.
- Disable optional telemetry by default: It will be ran by our backend.
- Skip post installation: No need to install dependencies and commit the files.

So we’ve added an extra prop to `extras` field called `apiMode`. Passing it true would take care of these changes in SAOFile.

Eventually, our `api.ts` looked like this:

```tsx
export interface IPreset {
  name: string;
  type: string;
  answers: Record<string, string>;
}

const generator = path.resolve(__dirname, "./");

export const api = async (
  applicationName: string,
  outDir: string,
  sourcePath: string,
  preset: IPreset, // Instead of getting from Commander, NodeJS sends these params.
): Promise<void> => {
  const sao = new SAO({
    generator,
    outDir,
    logLevel: 1,
    appName: applicationName,
    answers: true,
    extras: {
      apiMode: true,
      debug: false,
      projectType: preset.type,
      paths: {
        sourcePath,
      },
      presetAnswers: preset.answers,
    },
  } as Options);

  await sao.run().catch((err) => {
    console.error("Error happened", err);
  });
};
```

### Prepare lz-string

Now we can create boilerplate files, next thing was to generate what we call `previewString`.

For that, we used `rollup` with some additional plugins. Rollup allows us to bundle the project into a single file. Additionally, we used `rollup-plugin-import-css`, `rollup-plugin-tsconfig-paths`, `@rollup/plugin-node-resolve`, `@rollup/plugin-sucrase` . These plugins allowed us to bundle app and eventually.

```tsx
function bundleBoilerplate(boilerplate: Boilerplate) {
  const bundle = await rollup({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onwarn: () => {}, // Skip bloated logs.
    input: inputPath,
    maxParallelFileOps: 1, // Single thread.
    treeshake: false,
    cache: false,
    perf: false,
    plugins: [
      css(),
      tsConfigPaths({
        tsConfigPath: `tmp/boilerplates/${boilerplate.id}/${boilerplate.projectName}/tsconfig.json`,
      }),
      resolve({
        extensions: [".ts", ".tsx"],
      }),
      sucrase({
        exclude: ["**/*.css"],
        transforms: ["typescript", "jsx"],
      }),
    ],
    external: ["axios", "./reportWebVitals"],
  });

  const { output } = await bundle.generate({});

  await bundle.close();

  const codeOutputRaw = output[0].code;

  const codeOutputArr = codeOutputRaw.split("\n");

  codeOutputArr.push("render(<App />)");

  const codeOutput = codeOutputArr.join("\n");

  const compressedString = compressToEncodedURIComponent(codeOutput);

  return compressedString;
}
```

Finally, we used `lz-string`'s `compressToEncodedURIComponent` function to encode the file into a URL compatible string to pass to our preview.

## Conclusion

In this part of the series, we explored the technical architecture and engineering decisions behind Refine.new. . We covered the process of generating boilerplate applications with `create-refine-app` and the challenges of adapting it for NodeJS.

We also detailed rendering live previews in the browser using `react-live` and addressed the associated challenges. Lastly, we outlined the initial user flow and began the implementation phase, including modifications to `create-refine-app` and generating the `previewString`.

These steps provide a comprehensive overview of how Refine.new was designed and implemented to streamline the development process for developers.

In the second article of this series, we will delve into the back-end components, exploring the following topics:

- Orchestrating the backend processes
- Handling user choices and communication with the backend
- Optimizing performance and cloud usage for scalability
- Implementing the backend architecture and addressing challenges
