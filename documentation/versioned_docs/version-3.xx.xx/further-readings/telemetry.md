---
id: telemetry
title: Telemetry
sidebar_label: Telemetry
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Telemetry

## Summary

**refine** implements a **simple** and **transparent** telemetry module for collecting usage statistics defined in a **very limited scope**.

Tracking is totally **secure** and **anonymous**. It includes no personally identifiable information and **does not use cookies**. Participation is optional and users may easily **opt-out**.

## Why do we need this?

We try to answer the question **how many users are actively using the Refine framework**. This information is critical for open-source projects like Refine to better understand their communities and measure their growth metrics.

## How do we collect data?

<Tabs>
    <TabItem value="refine-core" label="refine core" default>
The tracking happens when a Refine application is loaded on the user's browser. On application init, a single HTTP request is sent to "https://telemetry.refine.dev". The request body is encoded with Base64 to be decoded on Refine servers.

There are no consequent requests for that session, as we do NOT collect any behavioral information such as _page views_, _button clicks_, etc.

<h2>What is collected?</h2>

The HTTP call has a JSON payload having the following application-specific attributes:

| Value         | Type        | Description                                                                                                     |
| ------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| providers     | `boolean[]` | List of providers used in the project (auth, data, router, live, notification, auditLog, i18n or accessControl) |
| version       | `string`    | Version of the refine package.                                                                                  |
| resourceCount | `number`    | Number of total resources.                                                                                      |

Additionally, the following information is extracted and collected from the HTTP header:

| Value      | Description                                           |
| ---------- | ----------------------------------------------------- |
| IP Address | IP Address of the machine the request is coming from. |
| Hostname   | Hostname of the machine the request is coming from.   |
| Browser    | Browser and browser version.                          |
| OS         | OS and OS version.                                    |

<h2>How to opt-out?</h2>

You can opt out of telemetry by simply adding `disableTelemetry` prop to the `<Refine />` component.

  </TabItem>

<TabItem value="refine-cli" label="refine CLI">

After running a command with the `refine` CLI, a single HTTP POST request is sent to `https://telemetry.refine.dev/cli`.

<h2>What is collected?</h2>

| Value            | Type                                          | Description                                                   |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------- |
| nodeEnv          | `string`                                      | Specifies the environment in which an application is running. |
| nodeVersion      | `string`                                      | Installed Node.js version.                                    |
| os               | `string`                                      | Operating system name.                                        |
| osVersion        | `string`                                      | Operating system version.                                     |
| command          | `string`                                      | Running script name.                                          |
| packages         | `{ "name": "string", "version": "string" }[]` | Installed `refine` packages.                                  |
| projectFramework | `string`                                      | Installed `react` framework.                                  |

Additionally, the following information is extracted and collected from the HTTP header:

| Value      | Description                                           |
| ---------- | ----------------------------------------------------- |
| IP Address | IP Address of the machine the request is coming from. |

<h2>How to opt-out?</h2>

You can opt out of telemetry by simply adding `REFINE_NO_TELEMETRY=true` to environment variables.

</TabItem>
</Tabs>
