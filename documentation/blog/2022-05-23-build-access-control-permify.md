---
title: Build Access Control Mechanism using Permify
description: In this article, I will explain how to build an Access Control n Refine using Permify; an authorization API that helps you to create any kind of authorization system easily with its panel.
slug: build-access-control-permify
authors: ege
category: "Ecosystem / Integrations"
tags: [admin-panel, tech-industry]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-05-21-build-access-control-permify/social.jpg
hide_table_of_contents: false
---

## Build Access Control Mechanism using Permify

In this article, we will examine how to build an Access Control mechanism in Refine using Permify; an authorization as a service that helps you to create any kind of authorization system easily with its panel.

<!--truncate-->

### Introduction

As an overview, we will:

- Setup Permify to Refine application
- Create a access control mechanism in Refine Access Control Provider
- Define access control rules & options on Permify Panel to check user accesses.

### Step 1: Setup the Permify in Refine application

First let's create a demo react application using refine. You can follow the [tutorial to create a simple](https://refine.dev/core/tutorial) admin panel for a CMS-like application.

If you're application is ready, lets create a free instant account at Permify from [here](https://panel.permify.co/auth/registration).

Then, we need to install permify js package to our app with following command:

```tsx
npm install @permify/permify-service-js
```

And initialize permify client with workspace id and public token which can be found in the [Workspace Settings](https://panel.permify.co/settings/workspace) section.

```tsx
//initialize permify client
const permify = new PermifyClient({
  workspace_id: "workspace_id",
  public_key: "public_token",
});
```

Before diving into more; if you’re using your API rather than Refine’s test API, you need to complete the setup for your backend as well.

On the server side you just need to match your users and resources. You can follow the [Getting Started](https://docs.permify.co/docs/getting-started) on Permify docs.

If you’re using Refine’s demo API, create a data folder and add sample users there. We will use the **Header** layout component to change logged in sample users.

Check out the example demo environment for the data folder and full UI layer.

### Step 2: Create a access control mechanism in Refine Access Control Provider

Refine provides an agnostic API via the [accessControlProvider](https://refine.dev/core/docs/core/providers/accessControl-provider/) to manage access control throughout your app.

Lets create a mechanism in our Access Control Provider using Permify client’s **isAuthorized** function.

```tsx
accessControlProvider={{
 can: async ({ resource, action, params }) => {
   if (action === "delete" || action === "edit" || action === "show") {
     return Promise.resolve({
       can: await permify.isAuthorized(
         user.id,
         resource,
         action,
         params.id.toString(),
         resource
       )
     });
   }

   return Promise.resolve({
     can: await permify.isAuthorized(user.id, resource, action)
   });
 }
}}
```

With this set up, each access request can be captured by Permify and returns a decision according to your pre-defined rules and conditions on the Permify Panel.

### Step 3: Run application & Create Resources

Run the application and then open your [Policies](https://panel.permify.co/access-control/policies) section on the Permify Panel to see created policies.

**isAuthorized** function works in the first or create methodology. As an example, if the action is **create** and resource is **posts** it will automatically create its policy.

Since it's newly created and no rules attached, it will return a true to access request.

**Note:** If you’re testing this access mechanism without creating resources beforehand on Permify. You won’t see the policies for **delete**, **show** and **edit** actions since these are unique resource items related so that these fields are hidden.

To create resources use [createResource](https://docs.permify.co/docs/api-reference/resource/create/) request on your backend.

For testing purposes, let’s create resource from Panel with entering Refine **params.id** as **resource.id** and **type** as **_resource name_** as shown below

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-05-21-build-access-control-permify/create_resource.png" alt="Permify create resource form" />

### Step 4: Define access control rules & options on Permify

Now we’ll define some rules and rule sets (options) to check specific conditions on access requests on resources.

Let's say we have **“admin”** and **“editor”** role and the basic access conditions are:

- Users with admin role can access everywhere
- Users with an editor role only edit or delete specific content if he/she is the owner of the resource.

Let’s create rules for these comparisons. Open [Rules Section](https://panel.permify.co/access-control/rules) and click **Create Rule** button

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-05-21-build-access-control-permify/create_rule.png" alt="Permify create rule dialog" />

We can create an **is-editor** rule to check the editor role as same as checking admin.

As an overview you can create a role checking rule with a statement

```tsx
“role_name” === user.roles[].guard_name
```

Alternatively you can create rules using or modifying **rule templates**. For our example we need to create a resource owner rule.

Click use a template button and choose **is Owner** rule template for checking whether user is owner of the resource.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-05-21-build-access-control-permify/rule_template.png" alt="Permify rule template selection" />

Then let's attach these rules to our policies in order to meet with our access conditions defined above. After editing **policies** your table should look like this

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-05-21-build-access-control-permify/policy_table.png" alt="Permify policies table" />

Before testing these policies, let's set the owner of the test resource (params.id === 1000) as our editor rule user.

Open up [Resources Section](https://panel.permify.co/customers/resources) and change the attributes object of **post item 1000** as follows:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-05-21-build-access-control-permify/edit_owner_id_attribute.png" alt="Permify resource attributes editor" />

Now let's run the application again to see results for both roles.

### Step 5: Creating rule sets (Options)

There are times when authorization structure conditions can’t be straight forward as we demonstrated.

Sometimes business needs force you to check multiple complex rules or rule sets.

To demonstrade that lets add a custom role to create **rule sets (Options)** on Permify.

Lets say

- Users with an editor role can edit any post if he/she is in working hours.

Basically if the user is in working hours approximately (8:00 am to 6.00 pm) users with an editor role can access edit of any given resource.

Firstly we need to create a rule to check whether user perform access checks in working hours or not. Create this rule like below:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-05-21-build-access-control-permify/create_rule_working_hours.png" alt="Permify working hours rule" />

Also we need to check that the user should have an editor role to access content. There is the point where rule sets(options) come up. Lets create an option from option section as follows:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2022/2022-05-21-build-access-control-permify/create_option.png" alt="Permify create option form" />

Now add this rule to our edit policy and test the results with running our app.

Select the Editor role and you should see edit button disabled when you're performing that action outside the time interval we have determined (8:00 am to 6.00 pm)

### Conclusion

In this article, we create a couple access check examples using Permify.

We mostly focused on the client side using Refine access control provider hence Permify is a full stack solution which you can implement your authorization logic for every layer of your application from backend to frontend.

So, if you are looking for an access control mechanism, you can create any kind of role or attribute based authorization structures easily with Permify.

## Example

<iframe src="https://codesandbox.io/embed/github/Permify/permify-refine?autoresize=1&fontsize=14&theme=dark&view=preview"
     style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
     title="access-control-permify-example"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
