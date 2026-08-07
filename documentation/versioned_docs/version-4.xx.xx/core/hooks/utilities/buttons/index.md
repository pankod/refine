---
title: "Buttons Utility Hooks | Refine v4 Core"
display_title: "Buttons"
sidebar_label: "Buttons"
description: "Discover Refine v4’s built-in button hooks for navigation, actions, and record operations. Learn how to use and customize buttons with core utilities."
source: packages/core/src/hooks/button
---

Refine offers a set of buttons in UI integrations that you can use to perform actions like navigation, deletion and refresh. These buttons include many useful features such as confirmation dialogs, access control, i18n and inferring parameters from the current route.

All these buttons are powered by respective hooks that you can use to create your own custom buttons or customizing the existing ones without having to write the logic from scratch.

## Hooks

### useListButton

`useListButton` provides set of values to be used for navigating to a list view of a resource.

```ts
const {
  to, // The path to navigate to.
  label, // The label to be displayed on the button.
  title, // If the button is disabled, the title will contain the reason for the button being disabled.
  hidden, // Whether the button should be hidden or not.
  disabled, // Whether the button should be disabled or not.
  LinkComponent, // The component to be used as a link. This is provided by the router provider from `<Refine />`.
} = useListButton({
  resource: "posts", // Resource name/identifier, if not provided, it will be inferred from the current route.
  accessControl, // To enable/disable the access control checks and hide/disable the button based on the permissions.
  meta, // Meta object to be passed to the navigation. This can be used to pass additional parameters to the route if needed.
});
```

### useCreateButton

`useCreateButton` provides set of values to be used for navigating to a create view of a resource.

```ts
const {
  to, // The path to navigate to.
  label, // The label to be displayed on the button.
  title, // If the button is disabled, the title will contain the reason for the button being disabled.
  hidden, // Whether the button should be hidden or not.
  disabled, // Whether the button should be disabled or not.
  LinkComponent, // The component to be used as a link. This is provided by the router provider from `<Refine />`.
} = useCreateButton({
  resource: "posts", // Resource name/identifier, if not provided, it will be inferred from the current route.
  accessControl, // To enable/disable the access control checks and hide/disable the button based on the permissions.
  meta, // Meta object to be passed to the navigation. This can be used to pass additional parameters to the route if needed.
});
```

### useShowButton

`useShowButton` provides set of values to be used for navigating to a show view of a resource for a given record.

```ts
const {
  to, // The path to navigate to.
  label, // The label to be displayed on the button.
  title, // If the button is disabled, the title will contain the reason for the button being disabled.
  hidden, // Whether the button should be hidden or not.
  disabled, // Whether the button should be disabled or not.
  LinkComponent, // The component to be used as a link. This is provided by the router provider from `<Refine />`.
} = useShowButton({
  resource: "posts", // Resource name/identifier, if not provided, it will be inferred from the current route.
  id, // Record identifier to navigate to the show view. If not provided, it will be inferred from the current route.
  accessControl, // To enable/disable the access control checks and hide/disable the button based on the permissions.
  meta, // Meta object to be passed to the navigation. This can be used to pass additional parameters to the route if needed.
});
```

### useEditButton

`useEditButton` provides set of values to be used for navigating to an edit view of a resource for a given record.

```ts
const {
  to, // The path to navigate to.
  label, // The label to be displayed on the button.
  title, // If the button is disabled, the title will contain the reason for the button being disabled.
  hidden, // Whether the button should be hidden or not.
  disabled, // Whether the button should be disabled or not.
  LinkComponent, // The component to be used as a link. This is provided by the router provider from `<Refine />`.
} = useEditButton({
  resource: "posts", // Resource name/identifier, if not provided, it will be inferred from the current route.
  id, // Record identifier to navigate to the edit view. If not provided, it will be inferred from the current route.
  accessControl, // To enable/disable the access control checks and hide/disable the button based on the permissions.
  meta, // Meta object to be passed to the navigation. This can be used to pass additional parameters to the route if needed.
});
```

### useCloneButton

`useCloneButton` provides set of values to be used for navigating to a clone view of a resource for a given record.

```ts
const {
  to, // The path to navigate to.
  label, // The label to be displayed on the button.
  title, // If the button is disabled, the title will contain the reason for the button being disabled.
  hidden, // Whether the button should be hidden or not.
  disabled, // Whether the button should be disabled or not.
  LinkComponent, // The component to be used as a link. This is provided by the router provider from `<Refine />`.
} = useCloneButton({
  resource: "posts", // Resource name/identifier, if not provided, it will be inferred from the current route.
  id, // Record identifier to navigate to the clone view. If not provided, it will be inferred from the current route.
  accessControl, // To enable/disable the access control checks and hide/disable the button based on the permissions.
  meta, // Meta object to be passed to the navigation. This can be used to pass additional parameters to the route if needed.
});
```

### useDeleteButton

`useDeleteButton` provides set of values to be used for deleting a record. This hook will also provide labels for the confirmation dialog.

```ts
const {
  onConfirm, // The function to be called when the user confirms the deletion. This will call the mutation of `useDelete` under the hood.
  label, // The label to be displayed on the button.
  title, // If the button is disabled, the title will contain the reason for the button being disabled.
  disabled, // Whether the button should be disabled or not.
  hidden, // Whether the button should be hidden or not.
  loading, // Whether the button should be in loading state or not.
  confirmTitle, // The title of the confirmation dialog.
  confirmOkLabel, // The label of the confirmation dialog's confirm button.
  cancelLabel, // The label of the confirmation dialog's cancel button.
} = useDeleteButton({
  resource, // Resource name/identifier, if not provided, it will be inferred from the current route.
  id, // Record identifier to delete. If not provided, it will be inferred from the current route.
  onSuccess, // The function to be called when the deletion is successful.
  mutationMode, // The mode of the mutation. If not passed, globally defined mutation mode will be used.
  successNotification, // The notification to be shown when the deletion is successful.
  errorNotification, // The notification to be shown when the deletion fails.
  accessControl, // To enable/disable the access control checks and hide/disable the button based on the permissions.
  meta, // Meta object to be passed to the deletion.
  dataProviderName, // The name of the data provider to be used for the deletion. If not provided, the default data provider will be used.
  invalidates, // The list of scopes of a resource to be invalidated after the deletion.
});
```

### useRefreshButton

`useRefreshButton` provides set of values to be used for refreshing the record of a resource.

```ts
const {
  onClick, // The function to be called when the user clicks the button. This will trigger an invalidation of the query cache.
  label, // The label to be displayed on the button.
  loading, // Whether the button should be in loading state or not.
} = useRefreshButton({
  resource, // Resource name/identifier, if not provided, it will be inferred from the current route.
  id, // Record identifier to refresh. If not provided, it will be inferred from the current route.
  dataProviderName, // The name of the data provider to be used for the refresh. If not provided, the default data provider will be used.
});
```

### useSaveButton

`useSaveButton` provides a label for a save button that can be used in forms. Props related to submission of the form will be provided by the [`useForm`](/core/docs/data/hooks/use-form) hook.

```ts
const {
  label, // The label to be displayed on the button.
} = useSaveButton();
```

### useExportButton

`useExportButton` provides a label for an export button for a resource. Props related to exporting bulk data from the resource will be provided by the [`useExport`](/core/docs/core/hooks/utilities/use-export) hook.

```ts
const {
  label, // The label to be displayed on the button.
} = useExportButton();
```

### useImportButton

`useImportButton` provides a label for an import button for a resource. Props related to importing bulk data to the resource will be provided by the [`useImport`](/core/docs/core/hooks/utilities/use-import) hook.

```ts
const {
  label, // The label to be displayed on the button.
} = useImportButton();
```
