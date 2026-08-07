---
title: Using Google Lighthouse to improve app performance
description: Learn how to use the Google Chrome Lighthouse performance audit tool to identify and improve problems with your app.
slug: lighthouse-google-chrome
authors: joseph_mawa
category: "Ecosystem / Integrations"
tags: [dev-tools]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-31-google-lighthouse/social-2.png
hide_table_of_contents: false
last_update: 2024-05-24
---

**_This article was last updated on May 24, 2024 to update screenshots, add new sections on advanced configuration, lighthouse metrics and common issues on Google Lighthouse_**

## Introduction

As websites and web applications become more complex, it is necessary to measure and track their overall quality to provide a seamless browsing experience to your clients. Though several other tools exist for this purpose, Google lighthouse is quite popular among web developers mainly because it is part of the Chrome DevTools.

If it doesn't meet your needs as part of Chrome DevTools, Google lighthouse is also readily available as a Node package or command line utility. You can use it for auditing a website for performance, best practices, accessibility, progressive web app (PWA), and search engine optimization(SEO).

You will explore the different ways of using Google Lighthouse in this article. You will also learn how to remedy some of the issues highlighted in the performance measurement and use Google lighthouse in continuous integration(CI) workflow.

<!--truncate-->

Step we'll cover:

- [What is Google Lighthouse](#what-is-google-lighthouse)
- [How to use Google lighthouse from Chrome DevTools](#how-to-use-google-lighthouse-from-chrome-devtools)
- [How to use Google lighthouse Node CLI](#how-to-use-google-lighthouse-node-cli)
- [How to use Google lighthouse Node module](#how-to-use-google-lighthouse-node-module)
- [How to use Google Lighthouse Chrome browser extension](#how-to-use-google-lighthouse-chrome-browser-extension)
- [How to use Google lighthouse for auditing progressive web apps](#how-to-use-google-lighthouse-for-auditing-progressive-web-apps)
- [How to view Google lighthouse report](#how-to-view-google-lighthouse-report)
- [How to add Google lighthouse to a CI workflow](#how-to-add-google-lighthouse-to-a-ci-workflow)
- [Understanding Lighthouse Metrics](#understanding-lighthouse-metrics)
- [Interpreting Lighthouse Scores](#interpreting-lighthouse-scores)
- [Advanced Configuration and Custom Audits](#advanced-configuration-and-custom-audits)
- [Common Issues Identified by Lighthouse and How to Fix Them](#common-issues-identified-by-lighthouse-and-how-to-fix-them)

## Prerequisites

Depending on how you intend to use Google lighthouse, you need to have some or all of the following tools.

- Node version 14 or higher. [Download Node for your system](https://nodejs.org/en/download/) if you haven't.
- Chrome browser. [Download Chrome for your system](https://www.google.com/chrome/) if you haven't.

## What is Google Lighthouse

Google Lighthouse is an open-source, Apache-licensed tool developed and maintained by Google. It is distributed primarily as part of Chrome DevTools and other Chromium-based browsers like Opera, Brave, and Edge.

You can use it for auditing a web page or browser extension primarily for performance, best practices, accessibility, PWA, and SEO. It presents the test results as percentages and goes above and beyond to provide actionable tips on fixing the identified problems in the specified categories.

Though the easiest way of using Google lighthouse is via the Chrome DevTools, you can also run it as a chrome extension, command line tool, or an NPM package. The subsequent sections will explain the different ways you can use Google Lighthouse.

## How to use Google lighthouse from Chrome DevTools

Most Chromium-based browsers package Google lighthouse as part of their DevTools however, we will focus more on the Chrome DevTools in this article. Using it with other browsers should be similar, with slight variations.

Follow the steps below to start using Google lighthouse in Chrome DevTools.

### Step 1 - Navigate to the site you want to audit

To use Google lighthouse in Chrome DevTools, navigate to the site you want to audit. We will use the React landing page for illustration throughout this article.

### Step 2 - Open Chrome DevTools

You can open Chrome DevTools by pressing the <kbd> F12 </kbd> key. Click the lighthouse tab after that.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-31-google-lighthouse/categories-2.png" alt="Lighthouse checked" />

<br/>

### Step 3 - Select categories to audit

As pointed out in the introduction section, you can use Google lighthouse for auditing a website for performance, accessibility, best practices, SEO, and PWA. You can select the different categories you want Google lighthouse to audit. If your site won't run as a PWA, it is unnecessary to leave the PWA category checked.

Similarly, you can choose whether Google lighthouse should emulate a mobile device or desktop when auditing your site.

### Step 4 - Run the audit

You can click the `Analyze page load` button to start auditing the website.

### Step 5 - Interpret the audit results

After successfully analyzing the page, Google lighthouse will present the lighthouse scores and provide suggestions on where to make improvements. The lighthouse scores for the [React](https://react.dev/) landing page look like the image below.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-31-google-lighthouse/score-categories.png" alt="Lighthouse scores for all categories" />

<br/>

You can copy and save the audit data in JSON format from the Tools menu.

As highlighted above, Google Lighthouse audits a web page for performance, best practices, accessibility, SEO, and PWA while simulating a mobile device or desktop. It presents the score for each category as a percentage. It will go above and beyond to explain why a test in a particular category is passing or failing. Let us have an overview of these categories in the sub-sections below.

#### Best practices

There are certain best practices you need to follow in Front-end development. Some of these best practices include adding `doctype` to the `HTML` element, using HTTPS, displaying images with the correct aspect ratio, and serving images with the appropriate resolution. Google Lighthouse will audit your site for some of these best practices and highlight the passing and failing tests.

#### Performance

Performance measurement is one of the main reasons developers use Google Lighthouse. Google Lighthouse uses the metrics below to estimate the ultimate performance score.

- **First Contentful Paint** - Duration, in seconds, it takes to render the first DOM content after navigating to the page.
- **Time to Interactive** - Amount of time, in seconds, for the page to become fully interactive.
- **Speed Index** - It is a measure, in seconds, of how quickly content visually displays during page load.
- **Total Blocking Time** - Total amount of time, in milliseconds, that a page is incapable of responding to user input like mouse clicks.
- **Largest Contentful Paint** - Time, in seconds, at which the browser paints the largest text or image.
- **Cumulative Layout Shift** - Measures the movement of visible elements within the viewport.

The final score is a weighted average of the individual scores of the above metrics. This score can help you optimize your site so users can see and interact with it. It will also highlight potential opportunities for speeding up the page load. Read the [documentation](https://web.dev/performance-scoring/) for more insights on the individual metric scores and how Lighthouse calculates the final weighted score.

#### Accessibility

Google Lighthouse can audit your site and highlight accessibility issues like contrast ratio, input labels, and heading elements. However, it can detect only a certain percentage of accessibility issues. You need to go the extra mile and manually check some accessibility issues. A web page can have an accessibility score of 100 percent and still be inaccessible.

#### Progressive Web Apps

Progressives Webb Apps, better known as PWAs in short, can provide a native experience to your clients. Your PWA must be installable and should serve them from a secure origin. You can use Google lighthouse to test your PWA for some of these basic features and best practices.

#### Search Engine Optimization

Optimizing a website for Search Engines is inevitable in this day and age. Google Lighthouse can audit your site for SEO. Among other items, it can check whether your site has links with descriptive text and are crawlable. You can then use the test results to increase your search rankings.

It is also worth mentioning that newer versions of Google Lighthouse run in three modes (user flows). These modes are the Navigation mode, Time span mode, and Snapshot mode.

The Navigation mode analyzes a single page load and is the default. We will use the default mode throughout this article. The Time span mode analyzes for an arbitrary period, usually as the user interacts with the page. On the other hand, the Snapshot mode analyzes the page in a snapshot when the page is in a particular state.

Each mode has unique use cases, benefits, and limitations which the [Lighthouse documentation](https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/user-flows.md#user-flows-in-lighthouse) articulates in great detail. Do check it out. You can select one of the other modes before analyzing if the default doesn't meet your use case.

## How to use Google lighthouse Node CLI

You have the flexibility of running Google lighthouse as a command line tool. The command line tool requires you to have Node version 14 or higher. If you don't have Node, you can install it for your system from the Node [downloads page](https://nodejs.org/en/download/).

If you have installed Node, you can install lighthouse from the NPM package registry like so:

```sh
# NPM
npm install -g lighthouse

# Yarn
yarn global add lighthouse
```

The code below shows the general syntax for running an audit using the command line tool. The `lighthouse` command requires the URL of the page you want to audit. You can also pass optional arguments to the `lighthouse` command.

```sh
lighthouse <url> <options>
```

The Google lighthouse command line tool has comprehensive documentation accessible using the command below.

```
lighthouse --help
```

The command line tool will generate the audit report and write it in an HTML file by default. You can pass optional arguments to the lighthouse command to change the default behavior. The code below will audit the [React landing page](https://react.dev/) for accessibility and writes the report to a JSON file. You can view the JSON report using the [lighthouse viewer](https://googlechrome.github.io/lighthouse/viewer/).

```sh
lighthouse https://react.dev/  --output=json --output-path=./report.json --only-categories=accessibility
```

You can read the documentation for more options to pass to the `lighthouse` command.

## How to use Google lighthouse Node module

In addition to running Google Lighthouse as a command line tool, you can also run it programmatically as a Node module. You need to install Lighthouse most likely as a development dependency from the NPM package registry like so:

```
# NPM

npm i -D lighthouse

# Yarn

yarn add --dev lighthouse
```

Ordinarily, when running Lighthouse programmatically, you launch a Chrome instance before running Lighthouse, like in the example below. Below, we are launching a headless Chrome instance using the `chrome-launcher` package. It is a tool for launching Google Chrome with ease from Node. Check the [documentation](https://github.com/GoogleChrome/chrome-launcher#chrome-launcher--) to learn how to use it. After running Lighthouse, you can save the audit data to file and terminate the Chrome instance.

For our case, Lighthouse takes the URL of the site you want to audit as its first argument. The first argument is optional if you are running Lighthouse in `auditMode`. The second and third arguments are also optional. If you don't pass them, Lighthouse will use the default.

```ts
const fs = require("fs");
const chromeLauncher = require("chrome-launcher");
const lighthouse = require("lighthouse");

const launchChromeAndAudit = async (url) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const result = await lighthouse(url, {
    output: "json",
    logLevel: "info",
    port: chrome.port,
    onlyCategories: ["accessibility"],
    screenEmulation: { mobile: true },
  });
  fs.writeFileSync(`${Date.now()}-audit-report.json`, result.report);
  chrome.kill();
};

launchChromeAndAudit("https://react.dev/");
```

The code above will audit the [React landing page](https://react.dev/) for accessibility and save the report to a file in JSON format. After that, you can upload the data to the [lighthouse viewer](https://googlechrome.github.io/lighthouse/viewer/) to view it in the browser. Omitting the `onlyCategories` field will audit the site for all categories.

You can also save the audit report as an HTML file by setting the value of the output field to `html` instead of `json`, as we did in the example above. What I have provided above is a simple example. Check the [documentation](https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically) for more on how to run Google lighthouse programmatically.

## How to use Google Lighthouse Chrome browser extension

In addition to being part of the Chrome DevTools, Google lighthouse also comes as a browser extension. The browser extension doesn't allow testing of local sites and authenticated pages. Therefore it is preferable to use Google lighthouse from Chrome DevTools instead of the browser extension.

You can install the browser extension from the [Chrome web store](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) if you have a good reason for using it. After installation, follow the steps below to audit any site using the lighthouse browser extension.

### Step 1 - Navigate to the website you want to audit

Like using Google lighthouse in chrome DevTools, start by navigating to the site you want to audit. For this illustration, navigate to the [React landing page](https://react.dev/).

### Step 2 - Open the extension popup

Open the Google lighthouse chrome extension popup by clicking the extension icon in the Chrome toolbar.

### Step 3 - Select the categories to audit

As pointed out in the introduction section, you can audit a website for performance, accessibility, best practices, SEO, and PWA. In the extension popup, you can click the gear icon to select the categories to audit and the device to emulate.

### Step 4 - Generate report

Finally, click the "Generate Report" button to generate the audit report. The report should be similar to what we got after running Google lighthouse from the Chrome DevTools. You can as well save the data in HTML or JSON format.

## How to use Google lighthouse for auditing progressive web apps

As pointed out above, Google lighthouse can audit a website for performance, best practices, accessibility, SEO, and PWA. In addition to being installable, Progressive web apps come with several progressively enhanced features. You can use Google lighthouse to validate whether a site is installable or optimized for PWA.

If you navigate to the [React landing page](https://react.dev/) and use Lighthouse to audit the site for PWA features and best practices, you will get a report similar to the image below. Because [React](https://react.dev/) is not a PWA, most of the tests will fail. Google lighthouse will highlight the failing test and provide a link to documentation that explains the feature.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-08-31-google-lighthouse/pwa.png" alt="Lighthouse pwa" />

<br/>

It is worth mentioning that PWAs have several features and best practices to follow. Google lighthouse can audit only a handful of these features. You need to check some of them manually. Google lighthouse will also hint at the items you need to check manually.

## How to view Google lighthouse report

Using Google lighthouse via the Chrome DevTools or the browser extension will generate the report and immediately display it in the browser. Depending on how you use Google lighthouse, you can also save the performance data in HTML or JSON format.

View the report by opening the HTML file in the browser or uploading the data in JSON format to the [lighthouse viewer](https://googlechrome.github.io/lighthouse/viewer/). When using [lighthouse viewer](https://googlechrome.github.io/lighthouse/viewer/), it is possible to save the JSON data in a GitHub gist and use the gist URL instead of uploading the data from a storage device.

## How to add Google lighthouse to a CI workflow

If your team uses a continuous integration workflow, you can use the Google lighthouse CI toolset to run Google Lighthouse as part of your workflow. According to the [documentation](https://github.com/GoogleChrome/lighthouse-ci#lighthouse-ci), Google lighthouse CI is a suite of tools that simplify running Google lighthouse scores in your CI workflow.

Lighthouse CI works with CI providers like Circle CI, GitHub actions, and Travis CI. Follow the steps below to learn how to use it with GitHub actions.

### Step 1 - Create GitHub Actions workflow directory

Create a `.github/workflow` directory to store your GitHub workflow files at the root of your project directory to start using GitHub actions.

### Step 2 - Create GitHub Actions workflow file

Create a YAML workflow file that will contain the code for running Google lighthouse CI when certain events occur. We will run Google lighthouse CI when either `push` or `pull_request` event occurs. Give a descriptive name to the YAML file. I will name it `lighthouse.yaml`.

Copy and paste the code below into the YAML file you have just created. The code runs whenever you push changes to the Git repository or open a pull request. I am taking the simplest case, where you have an HTML file at the root of the project directory. You can modify the workflow file slightly if your project requires a build step.

```yaml
name: Run lighthouse CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lhci:
    name: Lighthouse CI
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v1
        with:
          node-version: ${{ matrix.node-version }}
      - name: Run lighthouse CI
        run: |
          npm install -g @lhci/cli@0.3.x && lhci autorun --upload.target=temporary-public-storage --collect.staticDistDir=./
```

The above example also assumes you don't have a configuration file at the root of your project directory.

### Step 3 - Push the changes to GitHub

The code above will run the Google lighthouse CI when you commit and push the changes to GitHub. Each time someone opens a pull request or pushes a commit, GitHub actions will run the specified command so that you are aware of regressions over time.

GitHub is by no means the only CI provider. You can run Google lighthouse with other CI tools like Circle CI and Travis CI. The Google lighthouse CI documentation explains all the supported CI providers.

## Google Lighthouse Metrics Explained

This can help elucidate what Google Lighthouse wants to convey about the variety of metrics. It makes us understand every metric and also how it would affect our app's performance.

### First Contentful Paint (FCP)

FCP measures the time it takes for rendering the first piece of DOM content from initial navigation. This is important because one is able to get to know the discharging speed of the page.

### Time to Interactive (TTI)

TTI is the measure of how long it will take before a page is fully interactive, and it is one of the most important steps toward a great user experience.

### Speed Index

Speed Index: This tells how fast the contents are populated on a page visibly while the loading is in progress. The lower the better.

### Total Blocking Time (TBT)

TBT is the sum of time in which the page is blocked and can't respond because of several user inputs. A low TBT means good interactivity.

### Largest Contentful Paint (LCP)

The LCP identifies the moment when the largest text or image is painted. It helps measure perceived load speed and user experience.

### Cumulative Layout Shift (CLS)

CLS tracks the movements of visible elements in the viewport. Small numbers will indicate less unexpected layout shifts, which is better for the user experience.

## Lighthouse Scores Interpretation

We should explain how to read and understand the Lighthouse scores. Each category score of this report is a score within the range of 0 to 100, where a higher score is an indicator of better performance in that category.

### Performance Score

This is mostly based on the FCP, TTI, speed index, and TBT together in order to get LCP and CLS. In fact, these metrics build each segment of the score, so it helps us realize where to make improvements.

### Accessible Score

This score checks for things like contrast ratios, input labels, and ARIA roles. Still, it's paramount to be mindful of the fact that even with a high score, manual testing for accessibility issues should be done.

### Best Practices Score

That includes correctness of HTTPS usage, having images with an aspect ratio that is correct, and not using API that has been deprecated. A high bar here, then, assures that we are sticking to modern practices of web development.

### SEO Score

This score verifies some essential elements for search engine optimization, such as descriptive link texts, and the correct use of meta tags.

### PWA Score

This confirms that the app meets the basic baseline of being a Progressive Web App, including working offline and loading instantly with appropriate service worker registration.

Such scores enable us, with accuracy, to know what areas exactly we need to focus on for an improvement in the overall quality of our app.

## Advanced Configuration and Custom Audit

We can also help optimize Lighthouse audits to be more adapted with our needs.

### Custom Configuration

Create a custom configuration file that can turn on/off reports in the audit list, adjust the usage of throttling, and modify all the other emulation parameters. This way, we can make sure the audits take into account our performance goals.

### Custom Audits

We can also do custom audits for more specific needs. This involves writing our own definitions of an audit and integrating it with Lighthouse. This will be useful for checking compliance with internal performance standards or any other unique requirements.

Customizing the audits helps us gain more relevant insights and be able to focus only on the aspects of performance that are really important to our projects.

## Common Google Lighthouse issues and suggestions to fix them

Here is where we could list common problems with performance, identified by Lighthouse, and give practical solutions on how to fix them.

### Elimination of render-blocking resources

A very common problem is the large number of render-blocking resources. These can be greatly reduced and some totally removed by either deferring non-critical CSS and JavaScript, or using async attributes.

### Image Optimization

The Lighthouse tool often criticizes images that are not optimized. Further improve performance drastically by compressing images, using next-gen formats like WebP, and serving images at the right size.

### JavaScript Loading Efficiently

Rendering process is delayed by large JavaScript bundles, so splittable code, and using dynamic imports to remove unused code should be applied.

### Reducing Server Response Times

The response time of a server that is slow can also be detected by Lighthouse. A Content Delivery Network (CDN) and database query optimization methods, as well as enabling server-side caching, can help improve the response time. Fixing these issues based on Lighthouse recommendations will vastly boost the performance of our app.

## Conclusion

You can use Google Lighthouse for auditing a website or application for performance, accessibility, best practices, SEO, and PWA. Depending on your preferences, you can use Chrome DevTools, as a Chrome extension, command line tool, or Node module. Several other Chromium-based browsers like Opera, Edge, and Brave also package Google Lighthouse as part of their DevTools.

On the other hand, it is worth mentioning that Google Lighthouse is just a tool. And a tool is only as good as the user. Striving for the highest Google lighthouse scores is commendable but not sufficient. One fine example where the Google lighthouse usually falls short is the accessibility audit. It is common to have an inaccessible site with a perfect Google lighthouse accessibility score.

Therefore, you must go above and beyond to test your site with actual users even though you have perfect Google lighthouse accessibility scores. We have covered the introduction to Google Lighthouse in this article. Check the documentation for in-depth guides.
