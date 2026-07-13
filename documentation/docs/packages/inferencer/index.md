---
title: "Inferencer Integration Guide | Packages in Refine v5"
display_title: "Inferencer"
sidebar_label: "Inferencer"
description: "Build Inferencer in Refine v5. Learn the key steps. Learn property and field for real-world React admin panels. Learn with code examples."
---

`@refinedev/inferencer` is a package that provides a way to automatically generate views for resources based on the data structure. The aim is to reduce the amount of time spent on creating views for resources by generating the code automatically that can be customized easily.

The package exports components for **List**, **Show**, **Create** and **Edit** views inside UI package scopes. For example, `@refinedev/inferencer/antd` exports components for `@refinedev/antd` package.

## Installation

<InstallPackagesCommand args="@refinedev/inferencer"/>

## Available UI Inferencers

- [Ant Design](/core/docs/ui-integrations/ant-design/components/inferencer/)
- [Material UI](/core/docs/ui-integrations/material-ui/components/inferencer/)
- [Mantine](/core/docs/ui-integrations/mantine/components/inferencer/)
- [Chakra UI](/core/docs/ui-integrations/chakra-ui/components/inferencer/)
- [Headless](/core/docs/core/components/inferencer/)

:::simple Good to know

`@refinedev/inferencer` is an experimental package and it is now in the early stages of development. We are working on improving the package and adding new features.

If you have any suggestions or feedback, please let us know in the [**GitHub Discussions**](https://github.com/refinedev/refine/discussions/3046)

`@refinedev/inferencer` components are meant to be used in development environments. They are not meant to be used in production environments.

:::

## How it works?

Simply, `@refinedev/inferencer` generates views and codes based on the data structure of the resource by fetching it using the `dataProvider` of `<Refine/>` component.

### How the data is obtained?

For, `edit` and `show` actions, we send the request with `resource` and `id`. For `list` and `create` actions, we send a list request with `resource` and use one of the items to generate the view. These actions will take place in your app.

### How the fields are inferred?

While inferring the field types, we use a set of functions that each checks the field for a specific type and returns the inferred type. These functions also can return a `priority` field that is used to determine the type of the field. For example, if we have a `created_at` property with a string value, we can infer it as a `date` type and a `text` type. In this case, we use the `priority` field to determine the type of the field. The higher the priority, the more accurate the type of the field.

Properties with multiple values are identified as `array` type but also repeats the same process for their values to determine the type of the values. Same also happens for `object` type properties. Both can have `accessor` field in return value to access the values of the property which is used when creating the view and the code.

If the property is an `object` type, we try to pick a key to represent that property. For example, if we have a `category` field with `{ label: string; id: string; }` type, we pick `label` as the key to represent the property. These `object` fields with keys to represent them have the property `fieldable` set to `true` in the return value.

#### Available field types and functions

```ts
type Types =
  | "relation"
  | "array"
  | "object"
  | "date"
  | "email"
  | "image"
  | "url"
  | "richtext"
  | "text"
  | "number"
  | "boolean"
  | "unknown"
  | `custom_${string}`;
```

`custom_${string}` is used by the inferencer components of UI packages when they have custom representations, for now users can't pass custom types and functions to the inferencer components.

#### Keys to represent `object` type properties

```ts
type PresentationalKeys =
  | "name"
  | "label"
  | "title"
  | "count"
  | "content"
  | "username"
  | "nickname"
  | "login"
  | "firstName"
  | "lastName"
  | "url";
```

### How the relations are determined?

There are some conditions we look for before determining if a field is can be a `relation`. These won't trigger any API calls to the resources.

- If the property name ends with `id` or `ids`. camelCase, PascalCase, snake_case, kebab-case, UPPER_CASE, lower_case are all supported with or without array brackets([]).
- If the property is an object with a single property `id`.
- If the property is an array of objects with a single property `id` or UUID compatible strings or numbers.
- If the property is a string or number and the property name matches with one of the known resources (singular or plural).

If one of these conditions is met, we consider the property as a `relation` type and try to determine the related resource.

To determine the relations;

- First, we try to find a resource that matches with the property name (singular or plural).
- If a resource is found in the `resources` array with a match, we use that resource as the related resource.
- If no resource is found, we send two requests to the `default` `dataProvider` one with singular property name and one with plural property name, both stripped from the `id` suffixes if there are any.
- If a resource is found we use that resource and its `dataProvider` (if specified) and make the API call with the property value.
- If any of these requests succeed with `200` status code, we consider the property as a `relation` type and set the resource as the related resource.
- If none of these requests succeed, we remove the `relation` mark from the property and consider it as a normal field. If it's an `object` type, then we will try to find the best suitable property to represent it.

:::simple Manually setting relations and resources

If your `dataProvider` and `resources` has a different way of work that makes it impossible for Inferencer to find the `relation` resources. You can manually modify the inferred fields by using the `fieldTransformer` function. You can find more information about it in the [**Modifying the inferred fields**](#modifying-the-inferred-fields) section.

:::

### How the components are rendered and the code is generated?

To render the components we use a [fork](https://github.com/aliemir/react-live) of [`react-live`](https://github.com/FormidableLabs/react-live) package with Typescript support.

After the fields are determined, we use the `renderer` functions to create the code for the components and also use the same code to render the components in the view. `renderer` functions are constructed per action type and the UI package. This means, `@refinedev/inferencer/antd` and other UI scopes has different `renderer` functions for `list`, `show`, `edit` and `create` actions.

`renderer` function returns a `string` that includes the code for the component which is presented to user to copy and paste to their project. The same code is also used to render the component in the view.

Component name is determined by the active `resource` element and the active action. If the resource has `option.label` field, it will be used as the part of the component name. Otherwise, the `resource.name` will be used. For example, if the resource name is `categories` and the action is `list`, the component name will be `CategoryList`.

### Usage with GraphQL backends and `meta` values

Refine handles the GraphQL backends by using the `meta` properties in its data hooks. Inferencer lets you define meta values for your resources and methods in a single prop and uses it when generating the code and inferring the fields. Unlike the `meta` property of the data hooks, Inferencer components uses the `meta` property with a nested structure, letting you define the `meta` values per resource and action.

Here's the syntax for defining the `meta` values in Inferencer components:

```tsx
<AntdListInferencer
    meta={{
        [resourceNameOrIdentifier: string]: {
            [methodName: "default" | "getList" | "getMany" | "getOne" | "update"]: Record<string, unknown>,
        }
    }}
/>
```

`default` is the default `meta` value for all the methods. In the absence of a specific `meta` value for a method for a resource, the `default` value will be used.

This structure is designed to let users provide `meta` values for multiple resources and actions at once since the Inferencer might find relations and try to use hooks to fetch the necessary data.

#### Example Usage

```tsx
<AntdListInferencer
  meta={{
    posts: {
      getList: {
        fields: ["id", "title", "content", "category_id", "created_at"],
      },
    },
    categories: {
      default: {
        fields: ["id", "title"],
      },
    },
  }}
/>
```

### Modifying the inferred fields

If you want to customize the output of the Inferencer such as setting a custom `accessor` property for `object` type fields or changing the `type` of a field, or changing the `resource` for a `relation` type, you can use`fieldTransformer` prop in Inferencer components. It is a function that takes the field as an argument and returns the modified field. If `undefined | false | null` is returned, the field will be removed from the output, both for the preview and the code.

### Hiding the Code Viewer and Development Warning

If you want to hide the code viewer and the warning components, you can use the `hideCodeViewerInProduction` prop. This will only work in production mode. In development mode, the code viewer and the information block will always be visible.

Please note that the Inferencer components are not meant to be used in production. They are meant to be used in development mode to help you generate the code for your components.
