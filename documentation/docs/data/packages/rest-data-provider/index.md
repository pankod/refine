---
title: "Rest Data Provider Integration Guide | Best Practices in Refine v5"
display_title: "Rest Data Provider"
sidebar_label: "Rest Data Provider"
description: "Build Rest Data Provider in Refine v5. Learn the key steps. Learn scale REST, GraphQL for custom APIs and scalable data flows. Explore with code snippets."
source: https://github.com/refinedev/refine/tree/main/packages/rest
swizzle: true
---

We've created the `@refinedev/rest` data provider to make it easier to build custom data providers for REST APIs. In the past, this usually meant swizzling `simple-rest` or other providers. With `@refinedev/rest`, the process is now more streamlined and flexible.

The provider is powered by [KY](https://github.com/sindresorhus/ky), a lightweight HTTP client built on the Fetch API.

When using `createDataProvider`, you pass three arguments:

1. **Base URL** – the root endpoint of your REST API.

2. **Data provider options** – defines how each standard method (`getList`, `getOne`, `create`, `update`, etc.) works.
   Inside each method, you can customize helpers like:

   - `getEndpoint`
   - `buildHeaders`
   - `buildQueryParams`
   - `mapResponse`

   These helpers receive the parameters of the current action. Additionally, `mapResponse` and `getTotalCount` also receive the full response object.

3. **KY client options** – any configuration supported by KY. See the [KY options](https://github.com/sindresorhus/ky#options) for details.

## Installation

<InstallPackagesCommand args="@refinedev/rest"/>

## Usage

```tsx
import { createDataProvider } from "@refinedev/rest";

const { dataProvider, kyInstance } = createDataProvider(
  "https://example.com",
  {}, // Create Data Provider Options
  {}, // KY Options
);
```

## `createDataProvider` Options

A data provider is an object that implements a set of methods, where each method corresponds to a core operation Refine performs, such as fetching a list of records (`getList`), creating a new one (`create`), or handling updates and deletions.

Each of these primary operations is broken down into atomic helpers that give you granular control over the request lifecycle. These helpers allow you to precisely build your API request and format the incoming response or errors to match what Refine expects.

- **getEndpoint(params)** → returns the API endpoint.
- **buildHeaders(params)** → adds additional headers.
- **buildQueryParams(params)** → accepts Refine params, such as resource, id, filters, sorters, pagination
- **buildBodyParams(params)** → prepares the request body.
- **mapResponse(response, params)** → transforms API response into the format refine expects.
- **transformError(response, params)** → converts API errors into Refine compatible HttpError. See server side errors sections. Formatted errors can be handled by UI libraries to show form errors in specific fields.

```ts
export type CreateDataProviderOptions = {
  getList?: {
    /* list records */
  };
  getOne?: {
    /* get record by id */
  };
  create?: {
    /* create record */
  };
  update?: {
    /* update record */
  };
  deleteOne?: {
    /* delete record */
  };
  custom?: {
    /* anything special (search, export, etc.) */
  };
};
```

## How to create a custom REST data provider

While Refine provides many built-in data providers like `simple-rest`, `strapi-v4`, and `supabase`, you'll often need to handle APIs with custom request and response formats. This is where @refinedev/rest comes in, giving you the tools to build a bridge between your API and Refine

:::simple The entire process can be simplified to a four-step mental model where your code acts as a translator

**Refine** → **You**: Refine sends your provider the necessary parameters (resource, ID, filters, sorters, pagination, etc.).

**You** → **API**: You translate these parameters to build a valid request for your API, including the endpoint, query, headers, and body.

**API** → **You**: Your API sends back a raw response or error.

**You** → **Refine**: Finally, you map the response data and transform any errors into the precise format that Refine expects.

:::

### getList

The `getList` method is used whenever refine needs to **fetch a list of records**.
This usually powers your list pages, tables, and anything with pagination, sorting, and filtering.

<h3>Understanding the Data Flow</h3>

To implement `getList` effectively, you need to understand how data flows between Refine, your data provider, and your API:

**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

<h3>What Refine Provides</h3>

When Refine calls `getList`, it provides these parameters:

- `resource`: the name of the collection (e.g. `"posts"`)
- `pagination`: `{ currentPage, pageSize }`
- `sorters`: `[ { field, order } ]`
- `filters`: `[ { field, operator, value } ]`

<h3>What Your API Expects</h3>

Your API likely expects a different request format. For example:

:::simple
**Example API Format:**

- Endpoint: `https://example.com/posts`
- Pagination: `?page=<number>&size=<number>`
- Sorting: `?sort=-createdAt,title` (prefix `-` for descending)
- Filters: `?status=PUBLISHED&title_like=react`
- Response: `{ "data": [...], "total": 123 }`

:::

<h3>What Refine Expects Back</h3>

Refine only cares about two things from your response:

1. **An array of records** - the actual data items
2. **Total count** - for pagination calculations

Even if your API returns `{ data, total }`, you must extract these separately using `mapResponse` and `getTotalCount`.

<h3>Available Methods</h3>

The `getList` configuration object provides these methods to transform requests and responses:

- **`getEndpoint`**: Returns the API endpoint path (defaults to resource name)
- **`buildHeaders`**: Adds custom headers to the request
- **`buildQueryParams`**: Transforms Refine params into your API's query format
- **`mapResponse`**: Extracts the data array from your API response
- **`getTotalCount`**: Extracts the total count from your API response

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  getList: {
    // 1. Define the endpoint (optional - defaults to resource name)
    getEndpoint: ({ resource }) => resource, // "posts" → "/posts"

    // 2. Transform Refine's parameters into your API's query format
    buildQueryParams: async ({ pagination, filters, sorters }) => {
      const query: Record<string, any> = {};

      // Handle pagination
      // Refine provides: { currentPage: 1, pageSize: 10 }
      // API expects: ?page=1&size=10
      query.page = pagination?.currentPage ?? 1;
      query.size = pagination?.pageSize ?? 10;

      // Handle sorting
      // Refine provides: [{ field: "createdAt", order: "desc" }]
      // API expects: ?sort[createdAt]=title
      if (sorters?.length) {
        query.sort = sorters.map({ field, order }) => ({ field: order })
      }

      // Handle filters
      // Refine provides: [{ field: "status", operator: "eq", value: "PUBLISHED" }]
      // API expects: ?status=PUBLISHED&title_like=react
      for (const filter of filters ?? []) {
        if (filter.operator === 'eq') {
          query[filter.field] = filter.value;
        }
        if (filter.operator === 'contains') {
          query[`${filter.field}_like`] = filter.value;
        }
        // Add more operators as needed (ne, gt, lt, etc.)
      }

      return query;
    },

    // 3. Extract the data array from API response
    mapResponse: async (response) => {
      const json = await response.json();
      // Your API returns: { data: [...], total: 123 }
      // Refine needs: [...]
      return json.data;
    },

    // 4. Extract the total count for pagination
    getTotalCount: async (response) => {
      const json = await response.json();
      // Your API returns: { data: [...], total: 123 }
      // Refine needs: 123
      return json.total;
    },
  },
};
```

With this implementation, you've created a complete bridge between Refine and your API. Here's what happens when a user interacts with your list component:

1. **User action**: User clicks "next page", sorts a column, or applies a filter (like searching for "Published" posts)
2. **Refine processes**: Refine calculates new parameters (`currentPage: 2`, `pageSize: 10`, `filters: [{ field: "status", operator: "eq", value: "PUBLISHED" }]`)
3. **Your transformation**: `buildQueryParams` converts these to `?page=2&size=10&status=PUBLISHED`
4. **API call**: Request goes to `https://example.com/posts?page=2&size=10&status=PUBLISHED`
5. **Response processing**: `mapResponse` extracts the data array, `getTotalCount` extracts the total
6. **UI update**: Refine renders the filtered data with updated pagination

This pattern makes it easier for your API's specific conventions to adapt to Refine.

### getOne

The `getOne` method fetches a **single record by its ID**. This powers your detail pages, edit forms, and any component that needs to display or modify a specific record.

<h3>Understanding the Data Flow</h3>

The data flow for `getOne` is straightforward since you're fetching just one record:

**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

In this flow, Refine provides a record `id`. Your data provider is then responsible for using that `id` to build the correct endpoint, make the request, and return the single record object from the API's response.

<h3>What Refine Provides</h3>

Refine calls `getOne` with these parameters:

- `resource`: the collection name (e.g. `"posts"`)
- `id`: the unique identifier of the record to fetch
- `meta`: optional metadata for custom behavior

<h3>What Your API Expects</h3>

Your API likely expects a simple ID-based request:

:::simple
**Example API Format:**

- Endpoint: `https://example.com/posts/123`
- Method: `GET`
- Response: `{ "data": { "id": 123, "title": "My Post", "content": "..." } }`

:::

<h3>What Refine Expects Back</h3>

Refine expects just the record object - no wrapping, no arrays, just the data:

:::note Handling Wrapped API Responses
Your API might wrap the record in a data property, but Refine **expects the raw record object**. You must unwrap it inside your mapResponse function.

Example API Response:

```json
{ "data": { "id": 123, "title": "My Post", "content": "..." } }
```

What Refine Expects:

```json
{ "id": 123, "title": "My Post", "content": "..." }
```

:::

<h3>Available Methods</h3>

The `getOne` configuration object provides these methods to transform requests and responses:

- **`getEndpoint`**: Builds the API endpoint path with the record ID
- **`buildHeaders`**: Adds authentication tokens or other custom headers
- **`buildQueryParams`**: Adds query parameters to the request (e.g., for API versioning or extra options)
- **`mapResponse`**: Extracts the record object from your API response

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  getOne: {
    // Build the endpoint with the ID
    getEndpoint: ({ resource, id }) => `${resource}/${id}`, // "posts/123"

    // Add custom header
    buildHeaders: async ({ resource, id }) => ({
      "Accept-Language": "en-US",
    }),

    // Add query parameters if needed
    buildQueryParams: async ({ resource, id }) => {
      const params: Record<string, any> = {};

      if (resource === "posts") {
        // Load author details with the post
        params.expand = "author";
      }

      return params;
    },

    // Extract the record from API response
    mapResponse: async (response, params) => {
      const json = await response.json();

      // Your API returns different response only for categories.
      if (params.resource === "categories") {
        return json.result;
      }

      // Your API wraps the record in a "data" property
      // API returns: { "data": { "id": 123, "title": "My Post" } }
      // Refine needs: { "id": 123, "title": "My Post" }
      return json.data;
    },
  },
};
```

With this `getOne` implementation, here's what happens when a user views a specific record:

1. **User action**: User clicks on a record or navigates to a detail page
2. **Refine processes**: Refine calls `getOne` with the record ID (`id: 123`)
3. **Your transformation**: `getEndpoint` builds the URL (`posts/123`), `buildQueryParams` adds `?expand=author`
4. **API call**: Request goes to `https://example.com/posts/123?expand=author`
5. **Response processing**: `mapResponse` extracts the record object from the wrapped response
6. **UI update**: Refine displays the record with author details in forms, detail views, or other components

This pattern makes it easier for your API's inconsistenties to adapt to Refine.

### create

The `create` method handles **creating new records**. This powers your create forms, quick-add modals, and any component that needs to save new data to your API.

<h3>Understanding the Data Flow</h3>

The data flow for `create` involves sending form data to your API:
**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

In this flow, Refine provides form variables. Your data provider is then responsible for using those variables to build the correct endpoint, make the request, and return the created record object from the API's response.

<h3>What Refine Provides</h3>

Refine calls `create` with these parameters:

- `resource`: the collection name (e.g. `"posts"`)
- `variables`: the form data to be saved (e.g. `{ title: "My Post", content: "..." }`)
- `meta`: optional metadata for custom behavior

<h3>What Your API Expects</h3>

Your API likely expects a POST request with the data in the request body:

:::simple
**Example API Format:**

- Endpoint: `https://example.com/posts`
- Method: `POST`
- Body: `{ dto: { "title": "My Post", "content": "Hello world" }}`
- Response: `{ "data": { "id": 124, "title": "My Post", "content": "Hello world" } }`

:::

<h3>What Refine Expects Back</h3>

Refine expects the newly created record object with its assigned ID:

API returns:

```json
{ "data": { "id": 124, "title": "My Post", "content": "Hello world" } }
```

Refine expects:

```json
{ "id": 124, "title": "My Post", "content": "Hello world" }
```

<h3>Available Methods</h3>

The `create` configuration object provides these methods to transform requests and responses:

- **`getEndpoint`**: Builds the API endpoint path (defaults to resource name)
- **`buildHeaders`**: Adds authentication tokens or content-type headers
- **`buildQueryParams`**: Adds query parameters to the request
- **`buildBodyParams`**: Transforms form data into your API's expected body format
- **`mapResponse`**: Extracts the created record from your API response
- **`transformError`**: Converts API errors into user-friendly form validation errors

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  create: {
    // Build the endpoint for creating records
    getEndpoint: ({ resource }) => resource, // "posts" → "/posts"

    // Add required headers for POST requests
    buildHeaders: async ({ resource, variables }) => ({
      "Accept-Language": "en-US",
    }),

    // Transform form data into API request body
    buildBodyParams: async ({ resource, variables }) => {
      // Refine provides: { title: "My Post", content: "Hello world" }
      // API expects: { dto: { title: "My Post", content: "Hello world", status: "DRAFT" }}
      return {
        dto: {
          ...variables,
          status: "DRAFT", // Add default status
        },
      };
    },

    // Extract the created record from API response
    mapResponse: async (response, params) => {
      const json = await response.json();

      // Your API wraps the created record in a "data" property
      // API returns: { "data": { "id": 124, "title": "My Post" } }
      // Refine needs: { "id": 124, "title": "My Post" }
      return json.data;
    },

    // Handle API errors and convert to form validation errors
    transformError: async (response) => {
      const json = await response.json();

      // API returns validation errors in different formats:
      // {
      //   "error": "Validation failed",
      //   "field_errors": {
      //     "title": ["Title is required"],
      //     "email": ["Invalid format", "Already exists"],
      //   }
      // }
      // Refine expects:
      // {
      //   message: 'Validation failed',
      //   statusCode: 422,
      //   errors: [
      //     { title: ['Title is required'] },
      //     { email: ['InvalidFormat', 'Already exists] }
      //   ]
      // }

      return {
        message: json.error || "Something went wrong",
        statusCode: response.status,
        errors: json.field_errors,
      };
    },
  },
};
```

With this `create` implementation, here's what happens when a user submits a form:

**Success scenario:**

1. **User action**: User fills out a form and clicks "Save" or "Create"
2. **Refine processes**: Refine calls `create` with form data (`variables: { title: "My Post", content: "..." }`)
3. **Your transformation**: `buildBodyParams` adds default fields (status, timestamp) and formats the request body
4. **API call**: POST request goes to `https://example.com/posts` with the transformed data
5. **Response processing**: `mapResponse` extracts the created record with its new ID
6. **UI update**: Refine redirects to the new record or shows a success message

**Error scenario:**

1. **API returns error**: Server responds with 400/422 status and validation errors
2. **Error transformation**: `transformError` converts API errors into consistent format
3. **Form validation**: Refine displays field-specific errors under each input
4. **User feedback**: User sees exactly which fields need to be fixed

These patterns ensure reliable record creation with proper data transformations and comprehensive error handling.

### update

The `update` method handles **updating existing records**. This powers your edit forms, inline editors, and any component that needs to modify existing data in your API.

<h3>Understanding the Data Flow</h3>

The data flow for `update` involves sending modified form data to your API:

**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

In this flow, Refine provides the record `id` and form variables. Your data provider is then responsible for using that `id` and those variables to build the correct endpoint, make the request, and return the updated record object from the API's response.

<h3>What Refine Provides</h3>

Refine calls `update` with these parameters:

- `resource`: the collection name (e.g. `"posts"`)
- `id`: the unique identifier of the record to update
- `variables`: the form data with changes (e.g. `{ title: "Updated Title", content: "..." }`)
- `meta`: optional metadata for custom behavior

<h3>What Your API Expects</h3>

Your API likely expects a `PUT` or `PATCH` request with the updated data:

:::simple
**Example API Format:**

- Endpoint: `https://example.com/posts/123`
- Method: `PUT` or `PATCH`
- Body: `{ dto: { "title": "Updated Title", "content": "Updated content" }}`
- Response: `{ "data": { "id": 123, "title": "Updated Title", "content": "Updated content" } }`

:::

<h3>What Refine Expects Back</h3>

Refine expects the updated record object reflecting all changes:

API returns:

```json
{
  "data": { "id": 123, "title": "Updated Title", "content": "Updated content" }
}
```

Refine expects:

```json
{ "id": 123, "title": "Updated Title", "content": "Updated content" }
```

<h3>Available Methods</h3>

The `update` configuration object provides these methods to transform requests and responses:

- **`getEndpoint`**: Builds the API endpoint path with the record ID
- **`getRequestMethod`**: Specifies request method, `patch` by default.
- **`buildHeaders`**: Adds authentication tokens or content-type headers
- **`buildQueryParams`**: Adds query parameters to the request
- **`buildBodyParams`**: Transforms form data into your API's expected body format
- **`mapResponse`**: Extracts the updated record from your API response
- **`transformError`**: Converts API errors into user-friendly form validation errors

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  update: {
    // Build the endpoint with the record ID
    getEndpoint: ({ resource, id }) => `${resource}/${id}`, // "posts/123"

    // Add required headers for put/patch requests
    getRequestMethod: (params: UpdateParams<any>) => 'put'

    buildHeaders: async ({ resource, id, variables }) => ({
      'Accept-Language': 'en-US',
    }),

    // Add query parameters if needed
    buildQueryParams: async ({ resource, id, variables }) => {
      const params: Record<string, any> = {};

      if (resource === 'posts') {
        // Return updated record with author details
        params.expand = 'author';
      }

      return params;
    },

    // Transform form data into API request body
    buildBodyParams: async ({ resource, id, variables }) => {
      // Refine provides: { title: "Updated Title", content: "Updated content" }
      // API expects: { dto: { title: "Updated Title", content: "Updated content", updatedAt: "2025-09-24T..." }}
      return {
        dto: {
          ...variables,
          updatedAt: new Date().toISOString(),
        }
      };
    },

    // Extract the updated record from API response
    mapResponse: async (response, params) => {
      const json = await response.json();

      // Handle different response formats per resource
      if (params.resource === 'categories') {
        return json.result;
      }

      // Your API wraps the updated record in a "data" property
      // API returns: { "data": { "id": 123, "title": "Updated Title" } }
      // Refine needs: { "id": 123, "title": "Updated Title" }
      return json.data;
    },

    // Handle API errors and convert to form validation errors
    transformError: async (response) => {
      const json = await response.json();

      // API returns validation errors:
      // {
      //   "error": "Validation failed",
      //   "field_errors": {
      //     "title": ["Title cannot be empty"],
      //     "email": ["Invalid format"],
      //   }
      // }

      return {
        message: json.error || 'Update failed',
        statusCode: response.status,
        errors: json.field_errors,
      };
    },
  },
};
```

With this `update` implementation, here's what happens when a user modifies a record:

**Success scenario:**

1. **User action**: User edits a form and clicks "Save" or "Update"
2. **Refine processes**: Refine calls `update` with the record ID and modified data (`id: 123`, `variables: { title: "Updated Title", content: "..." }`)
3. **Your transformation**: `buildBodyParams` adds metadata (updatedAt timestamp) and formats the request body
4. **API call**: `PUT` request goes to `https://example.com/posts/123?expand=author` with the transformed data
5. **Response processing**: `mapResponse` extracts the updated record with expanded author details
6. **UI update**: Refine refreshes the form or redirects with the updated data

**Error scenario:**

1. **API returns error**: Server responds with 400/422 status and validation errors
2. **Error transformation**: `transformError` converts API errors into consistent format
3. **Form validation**: Refine displays field-specific errors under each input
4. **User feedback**: User sees exactly which fields have validation issues

These patterns ensure reliable record creation with proper data transformations and comprehensive error handling.

### deleteOne

The `deleteOne` method handles **deleting existing records**. This powers your delete buttons, bulk delete actions, and any component that needs to remove data from your API.

<h3>Understanding the Data Flow</h3>

The data flow for `deleteOne` involves sending a delete request to your API:

**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

In this flow, Refine provides the record `id`. Your data provider is then responsible for using that `id` to build the correct endpoint, make the delete request, and return the deleted record object from the API's response for confirmation.

<h3>What Refine Provides</h3>

Refine calls `deleteOne` with these parameters:

- `resource`: the collection name (e.g. `"posts"`)
- `id`: the unique identifier of the record to delete
- `variables`: optional data for soft deletes or additional context
- `meta`: optional metadata for custom behavior

<h3>What Your API Expects</h3>

Your API likely expects a DELETE request with the record ID:

:::simple
**Example API Format:**

- Endpoint: `https://example.com/posts/123`
- Method: `DELETE`
- Body: Optional (for soft deletes or additional data)
- Response: `{ "data": { "id": 123, "title": "Deleted Post" } }` or `{ "success": true }`

:::

<h3>What Refine Expects Back</h3>

Refine expects the deleted record object for confirmation and optimistic updates:

API returns:

```json
{ "data": { "id": 123, "title": "Deleted Post" } }
```

Refine expects:

```json
{ "id": 123, "title": "Deleted Post" }
```

<h3>Available Methods</h3>

The `deleteOne` configuration object provides these methods to transform requests and responses:

- **`getEndpoint`**: Builds the API endpoint path with the record ID
- **`buildHeaders`**: Adds authentication tokens or custom headers
- **`buildQueryParams`**: Adds query parameters to the request
- **`buildBodyParams`**: Transforms variables into request body (for soft deletes)
- **`mapResponse`**: Extracts the deleted record from your API response
- **`transformError`**: Converts API errors into user-friendly error messages

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  deleteOne: {
    // Build the endpoint with the record ID
    getEndpoint: ({ resource, id }) => `${resource}/${id}`, // "posts/123"

    // Add required headers for DELETE requests
    buildHeaders: async ({ resource, id, variables }) => ({
      "Accept-Language": "en-US",
    }),

    // Add query parameters if needed
    buildQueryParams: async ({ resource, id, variables }) => {
      const params: Record<string, any> = {};

      if (resource === "posts") {
        // Force hard delete instead of soft delete
        params.force = true;
      }

      return params;
    },

    // Transform variables into request body (for soft deletes)
    buildBodyParams: async ({ resource, id, variables }) => {
      // For soft deletes, send deletion reason or metadata
      if (variables?.softDelete) {
        return {
          deletedAt: new Date().toISOString(),
          deletionReason: variables.reason || "User deleted",
          softDelete: true,
        };
      }

      // Hard delete - no body needed
      return undefined;
    },

    // Extract the deleted record from API response
    mapResponse: async (response, params) => {
      const json = await response.json();

      // Handle different response formats
      if (params.resource === "categories") {
        return json.result;
      }

      // Some APIs return just success confirmation
      if (json.success && !json.data) {
        // Return minimal record with just the ID for confirmation
        return { id: params.id };
      }

      // Your API wraps the deleted record in a "data" property
      // API returns: { "data": { "id": 123, "title": "Deleted Post" } }
      // Refine needs: { "id": 123, "title": "Deleted Post" }
      return json.data;
    },

    // Handle API errors and convert to user-friendly errors
    transformError: async (response) => {
      const json = await response.json();

      // Handle specific delete errors
      if (response.status === 409) {
        return {
          message: "Cannot delete: Record has dependencies",
          statusCode: 409,
        };
      }

      if (response.status === 403) {
        return {
          message: "Not authorized to delete this record",
          statusCode: 403,
        };
      }

      return {
        message: json.error || "Delete failed",
        statusCode: response.status,
      };
    },
  },
};
```

With this `deleteOne` implementation, here's what happens when a user deletes a record:

**Success scenario:**

1. **User action**: User clicks delete button or confirms deletion in a modal
2. **Refine processes**: Refine calls `deleteOne` with the record ID (`id: 123`, optionally `variables: { softDelete: true, reason: "Outdated content" }`)
3. **Your transformation**: `buildBodyParams` formats the request body for soft delete, `buildQueryParams` adds force parameter if needed
4. **API call**: DELETE request goes to `https://example.com/posts/123?force=true` with deletion metadata
5. **Response processing**: `mapResponse` extracts the deleted record for confirmation
6. **UI update**: Refine removes the record from lists and shows success confirmation

**Error scenario:**

1. **API returns error**: Server responds with 409 (conflict) or 403 (forbidden) status
2. **Error transformation**: `transformError` converts specific HTTP codes into user-friendly messages
3. **User feedback**: Refine displays contextual error messages like "Cannot delete: Record has dependencies"
4. **UI state**: Record remains in the list, delete operation is cancelled

**Soft delete scenario:**

1. **User triggers soft delete**: Form includes deletion reason and soft delete flag
2. **Request body**: Contains `deletedAt` timestamp, reason, and soft delete flag
3. **API processing**: Server marks record as deleted without removing from database
4. **Response**: API returns the soft-deleted record with updated status
5. **UI update**: Record is filtered out of active lists but may appear in "deleted items" view

These patterns ensure reliable record creation with proper data transformations and comprehensive error handling.

### getMany

The `getMany` method handles **fetching multiple records by their IDs**. This powers relationship fields, reference selectors, and any component that needs to load specific records by their identifiers.

:::info Optional Method
The `getMany` method is optional. If you don't implement it, Refine will automatically fall back to making individual `getOne` requests for each ID. While this works, implementing `getMany` with batch requests is more efficient for performance.
:::

<h3>Understanding the Data Flow</h3>

The data flow for `getMany` involves sending a request with multiple IDs to your API:

**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

In this flow, Refine provides an array of `ids`. Your data provider is then responsible for using those `ids` to build the correct endpoint and query parameters, make the request, and return the matching record objects from the API's response.

<h3>What Refine Provides</h3>

Refine calls `getMany` with these parameters:

- `resource`: the collection name (e.g. `"posts"`)
- `ids`: array of unique identifiers to fetch (e.g. `[123, 456, 789]`)
- `meta`: optional metadata for custom behavior

<h3>What Your API Expects</h3>

Your API might handle multiple IDs in different ways:

:::simple
**Example API Formats:**

**Option 1 - Query parameter with comma-separated IDs:**

- Endpoint: `https://example.com/posts?ids=123,456,789`
- Method: `GET`

**Option 2 - Query parameter with array format:**

- Endpoint: `https://example.com/posts?id[]=123&id[]=456&id[]=789`
- Method: `GET`

**Option 3 - Multiple separate requests (fallback):**

- Endpoint: `https://example.com/posts/123`, `https://example.com/posts/456`, etc.
- Method: `GET` (multiple requests)
- Note: Less efficient but works when batch endpoints aren't available

**Response:** `{ "data": [{ "id": 123, "title": "Post 1" }, { "id": 456, "title": "Post 2" }] }`
:::

<h3>What Refine Expects Back</h3>

Refine expects an array of record objects matching the requested IDs:

API returns:

```json
{
  "data": [
    { "id": 123, "title": "Post 1" },
    { "id": 456, "title": "Post 2" },
    { "id": 789, "title": "Post 3" }
  ]
}
```

Refine expects:

```json
[
  { "id": 123, "title": "Post 1" },
  { "id": 456, "title": "Post 2" },
  { "id": 789, "title": "Post 3" }
]
```

<h3>Available Methods</h3>

The `getMany` configuration object provides these methods to transform requests and responses:

- **`getEndpoint`**: Builds the API endpoint path (defaults to resource name)
- **`buildHeaders`**: Adds authentication tokens or custom headers
- **`buildQueryParams`**: Transforms ID array into your API's query format
- **`mapResponse`**: Extracts the record array from your API response

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  getMany: {
    // Build the endpoint for batch requests
    getEndpoint: ({ resource, ids }) => {
      // Use different endpoints based on resource type
      if (resource === "users") {
        return `${resource}/batch`;
      }
      return resource; // "posts"
    },

    // Add required headers
    buildHeaders: async ({ resource, ids }) => ({
      "Accept-Language": "en-US",
    }),

    // Transform ID array into query parameters
    buildQueryParams: async ({ resource, ids }) => {
      const params: Record<string, any> = {};

      // Different query formats based on resource
      if (resource === "posts") {
        // Format: ?ids=123,456,789
        params.ids = ids.join(",");
      } else if (resource === "categories") {
        // Format: ?id[]=123&id[]=456&id[]=789
        params.id = ids;
      }

      // Add expansion for related data
      if (resource === "posts") {
        params.expand = "author,category";
      }

      return params;
    },

    // Extract the record array from API response
    mapResponse: async (response, params) => {
      const json = await response.json();

      // Handle different response formats per resource
      if (params.resource === "categories") {
        return json.results;
      }

      // Your API wraps records in a "data" property
      // API returns: { "data": [{ "id": 123 }, { "id": 456 }] }
      // Refine needs: [{ "id": 123 }, { "id": 456 }]
      return json.data;
    },
  },
};
```

With this `getMany` implementation, here's what happens when Refine needs multiple records:

**Success scenario:**

1. **Refine needs records**: Reference field or relationship component requests multiple records (`ids: [123, 456, 789]`)
2. **Your transformation**: `buildQueryParams` formats IDs as comma-separated string (`?ids=123,456,789&expand=author,category`)
3. **API call**: GET request goes to `https://example.com/posts?ids=123,456,789&expand=author,category`
4. **Response processing**: `mapResponse` extracts the record array from wrapped response
5. **UI update**: Refine displays the records in select options, relationship fields, or reference components

**Fallback behavior scenario:**

1. **No getMany implemented**: You only implement `getOne` in your data provider
2. **Refine needs multiple records**: Component requests records with `ids: [123, 456, 789]`
3. **Automatic fallback**: Refine makes three separate `getOne` calls: `getOne({ resource: "posts", id: 123 })`, `getOne({ resource: "posts", id: 456 })`, `getOne({ resource: "posts", id: 789 })`
4. **Performance impact**: Three HTTP requests instead of one batch request
5. **UI behavior**: Same end result, but slower loading times

**Large ID array scenario:**

1. **Many IDs requested**: Component requests 100+ records at once
2. **Query parameter handling**: Your API must handle long query strings with many IDs
3. **API call**: GET request with all IDs in query parameters (URL length limits may apply)
4. **Response processing**: Same `mapResponse` logic handles the response
5. **Consideration**: If URL length becomes an issue, consider implementing a custom method using the `custom` data provider method with POST requests

**Partial results scenario:**

1. **Some IDs missing**: API returns records for IDs 123 and 456 but not 789
2. **Response processing**: `mapResponse` returns available records `[{ id: 123 }, { id: 456 }]`
3. **UI handling**: Refine components gracefully handle missing records (show placeholder or skip)
4. **No error thrown**: Missing records are handled as normal behavior, not errors

These patterns ensure reliable record creation with proper data transformations and comprehensive error handling.

### createMany

The `createMany` method handles **creating multiple records in a single request**. This powers bulk creation features, import functionality, and any component that needs to efficiently create multiple records at once.

:::info Optional Method
The `createMany` method is optional. If you don't implement it, Refine will automatically fall back to making individual `create` requests for each record. While this works, implementing `createMany` with batch requests is more efficient for performance and provides better transaction handling.
:::

<h3>Understanding the Data Flow</h3>

The data flow for `createMany` involves sending multiple record data to your API in a single request:

**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

In this flow, Refine provides an array of record data. Your data provider is then responsible for using that data to build the correct endpoint, make the request, and return the array of created record objects from the API's response.

<h3>What Refine Provides</h3>

Refine calls `createMany` with these parameters:

- `resource`: the collection name (e.g. `"posts"`)
- `variables`: array of form data to be saved (e.g. `[{ title: "Post 1", content: "..." }, { title: "Post 2", content: "..." }]`)
- `meta`: optional metadata for custom behavior

<h3>What Your API Expects</h3>

Your API likely expects a POST request with multiple records in the request body:

:::simple
**Example API Format:**

- Endpoint: `https://example.com/posts/batch`
- Method: `POST`
- Body: `{ "items": [{ "title": "Post 1", "content": "Hello" }, { "title": "Post 2", "content": "World" }] }`
- Response: `{ "data": [{ "id": 124, "title": "Post 1" }, { "id": 125, "title": "Post 2" }] }`

:::

<h3>What Refine Expects Back</h3>

Refine expects an array of newly created record objects with their assigned IDs:

API returns:

```json
{
  "data": [
    { "id": 124, "title": "Post 1", "content": "Hello" },
    { "id": 125, "title": "Post 2", "content": "World" }
  ]
}
```

Refine expects:

```json
[
  { "id": 124, "title": "Post 1", "content": "Hello" },
  { "id": 125, "title": "Post 2", "content": "World" }
]
```

<h3>Available Methods</h3>

The `createMany` configuration object provides these methods to transform requests and responses:

- **`getEndpoint`**: Builds the API endpoint path (defaults to resource name)
- **`buildHeaders`**: Adds authentication tokens or content-type headers
- **`buildQueryParams`**: Adds query parameters to the request
- **`buildBodyParams`**: Transforms the array of form data into your API's expected body format
- **`mapResponse`**: Extracts the created records array from your API response
- **`transformError`**: Converts API errors into user-friendly form validation errors

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  createMany: {
    // Build the endpoint for batch creation
    getEndpoint: ({ resource }) => `${resource}/batch`, // "posts/batch"

    // Add required headers for POST requests
    buildHeaders: async ({ resource, variables }) => ({
      "Accept-Language": "en-US",
    }),

    // Add query parameters if needed
    buildQueryParams: async ({ resource, variables }) => {
      const params: Record<string, any> = {};

      if (resource === "posts") {
        // Return created records with author details
        params.expand = "author";
      }

      return params;
    },

    // Transform array of form data into API request body
    buildBodyParams: async ({ resource, variables }) => {
      // Refine provides: [{ title: "Post 1" }, { title: "Post 2" }]
      // API expects: { items: [{ title: "Post 1", status: "DRAFT" }, { title: "Post 2", status: "DRAFT" }] }
      const itemsWithDefaults = variables.map((item) => ({
        ...item,
        status: "DRAFT",
        createdAt: new Date().toISOString(),
      }));

      return {
        items: itemsWithDefaults,
      };
    },

    // Extract the created records array from API response
    mapResponse: async (response, params) => {
      const json = await response.json();

      // Handle different response formats per resource
      if (params.resource === "categories") {
        return json.results;
      }

      // Your API wraps the created records in a "data" property
      // API returns: { "data": [{ "id": 124 }, { "id": 125 }] }
      // Refine needs: [{ "id": 124 }, { "id": 125 }]
      return json.data;
    },

    // Handle API errors and convert to form validation errors
    transformError: async (response) => {
      const json = await response.json();

      // Handle batch creation errors
      // API might return errors for individual items:
      // {
      //   "error": "Some items failed validation",
      //   "item_errors": [
      //     { "index": 0, "field_errors": { "title": ["Required"] } },
      //     { "index": 2, "field_errors": { "email": ["Invalid"] } }
      //   ]
      // }

      return {
        message: json.error || "Batch creation failed",
        statusCode: response.status,
        errors: json.item_errors,
      };
    },
  },
};
```

With this `createMany` implementation, here's what happens when multiple records need to be created:

**Success scenario:**

1. **Bulk creation triggered**: User imports CSV data or uses bulk creation form with multiple records
2. **Refine processes**: Refine calls `createMany` with array of form data (`variables: [{ title: "Post 1" }, { title: "Post 2" }]`)
3. **Your transformation**: `buildBodyParams` adds default fields to each item and formats the request body
4. **API call**: POST request goes to `https://example.com/posts/batch?expand=author` with the batch data
5. **Response processing**: `mapResponse` extracts the array of created records with their new IDs
6. **UI update**: Refine updates lists with all newly created records and shows success confirmation

**Fallback behavior scenario:**

1. **No createMany implemented**: You only implement `create` in your data provider
2. **Refine needs to create multiple records**: Component requests batch creation with `variables: [{ title: "Post 1" }, { title: "Post 2" }, { title: "Post 3" }]`
3. **Automatic fallback**: Refine makes three separate `create` calls: `create({ resource: "posts", variables: { title: "Post 1" } })`, etc.
4. **Performance impact**: Three HTTP requests instead of one batch request
5. **Transaction handling**: No atomicity - some records might succeed while others fail
6. **UI behavior**: Same end result, but slower and less reliable for large batches

**Error scenario:**

1. **API returns batch error**: Server responds with validation errors for specific items in the batch
2. **Error transformation**: `transformError` converts item-specific errors into structured format
3. **Partial success handling**: Some records might be created successfully while others fail
4. **User feedback**: Refine can display which specific items had validation issues

**Large batch scenario:**

1. **Many records requested**: User tries to import 1000+ records at once
2. **API limitations**: Server might have limits on batch size or request timeout
3. **Consideration**: You might want to implement chunking logic to split large batches into smaller requests
4. **Error handling**: Handle timeout and size limit errors gracefully

These patterns ensure efficient batch record creation with proper transaction handling, performance benefits, and comprehensive error management for individual items within the batch.

### updateMany

The `updateMany` method handles **updating multiple records in a single request**. This powers bulk edit features, batch status changes, and any component that needs to efficiently modify multiple records at once.

:::info Optional Method
The `updateMany` method is optional. If you don't implement it, Refine will automatically fall back to making individual `update` requests for each record. While this works, implementing `updateMany` with batch requests is more efficient for performance and provides better transaction handling.
:::

<h3>Understanding the Data Flow</h3>

The data flow for `updateMany` involves sending multiple record updates to your API in a single request:

**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

In this flow, Refine provides an array of `ids` and update variables. Your data provider is then responsible for using those `ids` and variables to build the correct endpoint, make the request, and return the array of updated record objects from the API's response.

<h3>What Refine Provides</h3>

Refine calls `updateMany` with these parameters:

- `resource`: the collection name (e.g. `"posts"`)
- `ids`: array of unique identifiers to update (e.g. `[123, 456, 789]`)
- `variables`: the form data with changes to apply to all records (e.g. `{ status: "published", updatedAt: "..." }`)
- `meta`: optional metadata for custom behavior

<h3>What Your API Expects</h3>

Your API likely expects a `PUT` or `PATCH` request with multiple record updates:

:::simple
**Example API Format:**

- Endpoint: `https://example.com/posts/batch`
- Method: `PUT` or `PATCH`
- Body: `{ "ids": [123, 456, 789], "updates": { "status": "published", "updatedAt": "2025-09-24T..." } }`
- Response: `{ "data": [{ "id": 123, "status": "published" }, { "id": 456, "status": "published" }] }`

:::

<h3>What Refine Expects Back</h3>

Refine expects an array of updated record objects reflecting the changes:

API returns:

```json
{
  "data": [
    { "id": 123, "title": "Post 1", "status": "published" },
    { "id": 456, "title": "Post 2", "status": "published" },
    { "id": 789, "title": "Post 3", "status": "published" }
  ]
}
```

Refine expects:

```json
[
  { "id": 123, "title": "Post 1", "status": "published" },
  { "id": 456, "title": "Post 2", "status": "published" },
  { "id": 789, "title": "Post 3", "status": "published" }
]
```

<h3>Available Methods</h3>

The `updateMany` configuration object provides these methods to transform requests and responses:

- **`getEndpoint`**: Builds the API endpoint path (defaults to resource name)
- **`getRequestMethod`**: Specifies request method, `patch` by default
- **`buildHeaders`**: Adds authentication tokens or content-type headers
- **`buildQueryParams`**: Adds query parameters to the request
- **`buildBodyParams`**: Transforms IDs and variables into your API's expected body format
- **`mapResponse`**: Extracts the updated records array from your API response
- **`transformError`**: Converts API errors into user-friendly error messages

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  updateMany: {
    // Build the endpoint for batch updates
    getEndpoint: ({ resource }) => `${resource}/batch`, // "posts/batch"

    // Specify request method
    getRequestMethod: ({ resource, ids, variables }) => "put",

    // Add required headers for `PUT`/PATCH requests
    buildHeaders: async ({ resource, ids, variables }) => ({
      "Accept-Language": "en-US",
    }),

    // Add query parameters if needed
    buildQueryParams: async ({ resource, ids, variables }) => {
      const params: Record<string, any> = {};

      if (resource === "posts") {
        // Return updated records with author details
        params.expand = "author";
      }

      return params;
    },

    // Transform IDs and variables into API request body
    buildBodyParams: async ({ resource, ids, variables }) => {
      // Refine provides: ids: [123, 456], variables: { status: "published" }
      // API expects: { ids: [123, 456], updates: { status: "published", updatedAt: "..." } }
      return {
        ids: ids,
        updates: {
          ...variables,
          updatedAt: new Date().toISOString(),
        },
      };
    },

    // Extract the updated records array from API response
    mapResponse: async (response, params) => {
      const json = await response.json();

      // Handle different response formats per resource
      if (params.resource === "categories") {
        return json.results;
      }

      // Your API wraps the updated records in a "data" property
      // API returns: { "data": [{ "id": 123 }, { "id": 456 }] }
      // Refine needs: [{ "id": 123 }, { "id": 456 }]
      return json.data;
    },

    // Handle API errors and convert to user-friendly errors
    transformError: async (response) => {
      const json = await response.json();

      // Handle batch update errors
      if (response.status === 409) {
        return {
          message: "Some records could not be updated due to conflicts",
          statusCode: 409,
        };
      }

      if (response.status === 403) {
        return {
          message: "Not authorized to update some records",
          statusCode: 403,
        };
      }

      return {
        message: json.error || "Batch update failed",
        statusCode: response.status,
      };
    },
  },
};
```

With this `updateMany` implementation, here's what happens when multiple records need to be updated:

**Success scenario:**

1. **Bulk update triggered**: User selects multiple records and changes their status to "published"
2. **Refine processes**: Refine calls `updateMany` with IDs and update data (`ids: [123, 456, 789]`, `variables: { status: "published" }`)
3. **Your transformation**: `buildBodyParams` adds metadata (updatedAt) and formats the request body with IDs and updates
4. **API call**: `PUT` request goes to `https://example.com/posts/batch?expand=author` with the batch data
5. **Response processing**: `mapResponse` extracts the array of updated records
6. **UI update**: Refine refreshes the list view with all updated records showing the new status

**Fallback behavior scenario:**

1. **No updateMany implemented**: You only implement `update` in your data provider
2. **Refine needs to update multiple records**: Component requests batch update with `ids: [123, 456, 789]`, `variables: { status: "published" }`
3. **Automatic fallback**: Refine makes three separate `update` calls: `update({ resource: "posts", id: 123, variables: { status: "published" } })`, etc.
4. **Performance impact**: Three HTTP requests instead of one batch request
5. **Transaction handling**: No atomicity - some records might update while others fail
6. **UI behavior**: Same end result, but slower and less reliable for large batches

**Partial success scenario:**

1. **Some records cannot be updated**: API successfully updates records 123 and 456, but record 789 has validation errors
2. **Response handling**: API returns partial success with updated records and error details
3. **Error transformation**: `transformError` processes mixed success/failure responses
4. **User feedback**: Refine shows which records were updated successfully and which failed

**Large batch scenario:**

1. **Many records selected**: User tries to update 500+ records at once
2. **API limitations**: Server might have limits on batch size or processing time
3. **Performance consideration**: Large batches might need chunking or background processing
4. **Error handling**: Handle timeout errors and suggest smaller batch sizes

This pattern ensures efficient batch record updates with proper transaction handling, performance benefits, and comprehensive error management for bulk operations.

### custom

The `custom` method handles **any special operations** that don't fit into the standard CRUD pattern. This powers search endpoints, export functionality, analytics queries, file uploads, and any unique API operations your application needs.

:::info Required Method
Unlike other data provider methods, the `custom` method is **required** when you need to perform operations beyond standard CRUD. There's no fallback behavior - if you need custom functionality, you must implement this method.
:::

<h3>Understanding the Data Flow</h3>

The data flow for `custom` is flexible since it handles any type of operation:

**Refine Hooks → Your Data Provider → API → Your Data Provider → Refine**

In this flow, Refine provides the operation parameters. Your data provider is then responsible for using those parameters to build and send the appropriate request to your custom endpoint, and return the raw response data from the API.

<h3>What Refine Provides</h3>

Refine calls `custom` with these parameters:

- `url`: the custom endpoint URL (e.g. `"/posts/search"` or `"/analytics/dashboard"`)
- `method`: HTTP method (e.g. `"get"`, `"post"`, `"put"`, `"delete"`)
- `payload`: optional request data for POST/`PUT` operations
- `query`: optional query parameters
- `headers`: optional custom headers
- `meta`: optional metadata for additional context

<h3>What Your API Expects</h3>

Your API endpoints can have any format since `custom` handles specialized operations:

:::simple
**Example API Formats:**

**Search endpoint:**

- Endpoint: `https://example.com/posts/search`
- Method: `POST`
- Body: `{ "query": "react hooks", "filters": { "category": "tutorial" } }`

**Export endpoint:**

- Endpoint: `https://example.com/posts/export?format=csv`
- Method: `GET`

**Analytics endpoint:**

- Endpoint: `https://example.com/analytics/dashboard`
- Method: `GET`
- Response: `{ "metrics": { "totalPosts": 150, "publishedToday": 5 } }`

:::

<h3>What Refine Expects Back</h3>

Refine expects the raw response data from your custom endpoint:

API returns:

```json
{ "results": [...], "facets": {...}, "total": 42 }
```

Refine expects:

```json
{ "results": [...], "facets": {...}, "total": 42 }
```

The `custom` method passes through the exact response, allowing complete flexibility.

<h3>Available Methods</h3>

The `custom` configuration object provides these methods to transform requests and responses:

- **`buildHeaders`**: Adds authentication tokens or custom headers
- **`buildQueryParams`**: Transforms query parameters for the request
- **`buildBodyParams`**: Transforms payload data into your API's expected body format
- **`mapResponse`**: Transforms your API response into the format your components expect

<h3>Implementation Example</h3>

```tsx
export const myDataProvider: CreateDataProviderOptions = {
  custom: {
    // Add required headers for custom requests
    buildHeaders: async ({ url, method, payload, query, headers, meta }) => {
      const customHeaders: Record<string, string> = {
        "Accept-Language": "en-US",
      };

      // Add specific headers based on the custom operation
      if (url.includes("/search")) {
        customHeaders["X-Search-Engine"] = "elasticsearch";
      }

      if (url.includes("/export")) {
        customHeaders["Accept"] = "text/csv";
      }

      return customHeaders;
    },

    // Transform query parameters for custom endpoints
    buildQueryParams: async ({
      url,
      method,
      payload,
      query,
      headers,
      meta,
    }) => {
      const params: Record<string, any> = { ...query };

      // Add default parameters for search endpoints
      if (url.includes("/search")) {
        params.highlight = true;
        params.spell_check = true;
      }

      // Add format parameter for export endpoints
      if (url.includes("/export")) {
        params.format = params.format || "csv";
        params.timestamp = new Date().toISOString();
      }

      return params;
    },

    // Transform payload data for custom endpoints
    buildBodyParams: async ({ url, method, payload, query, headers, meta }) => {
      // Search endpoint expects specific body format
      if (url.includes("/search")) {
        return {
          searchQuery: payload?.query || "",
          filters: payload?.filters || {},
          pagination: {
            page: payload?.page || 1,
            size: payload?.size || 20,
          },
          sort: payload?.sort || "relevance",
        };
      }

      // Analytics endpoint might need date ranges
      if (url.includes("/analytics")) {
        return {
          ...payload,
          dateRange: payload?.dateRange || {
            from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            to: new Date().toISOString(),
          },
        };
      }

      // Default: pass payload as-is
      return payload;
    },

    // Transform response data from custom endpoints
    mapResponse: async (
      response,
      { url, method, payload, query, headers, meta },
    ) => {
      const json = await response.json();

      // Search endpoint returns results in specific format
      if (url.includes("/search")) {
        return {
          data: json.hits || [],
          total: json.total_count || 0,
          facets: json.aggregations || {},
          suggestions: json.suggestions || [],
        };
      }

      // Export endpoint might return file metadata
      if (url.includes("/export")) {
        return {
          downloadUrl: json.file_url,
          filename: json.filename,
          size: json.file_size,
          expiresAt: json.expires_at,
        };
      }

      // Analytics endpoint returns metrics
      if (url.includes("/analytics")) {
        return {
          metrics: json.data || {},
          period: json.period,
          updatedAt: json.last_updated,
        };
      }

      // Default: return response as-is
      return json;
    },
  },
};
```

With this `custom` implementation, here's what happens for different custom operations:

**Search scenario:**

1. **User performs search**: Search component calls `custom` with `url: "/posts/search"`, `method: "post"`, `payload: { query: "react hooks", filters: { category: "tutorial" } }`
2. **Your transformation**: `buildBodyParams` formats search parameters, `buildHeaders` adds search engine header
3. **API call**: POST request goes to `https://example.com/posts/search?highlight=true&spell_check=true`
4. **Response processing**: `mapResponse` transforms search results into consistent format with data, total, facets, and suggestions
5. **UI update**: Search components display results with highlighting, faceted navigation, and spelling suggestions

**Export scenario:**

1. **User requests export**: Export component calls `custom` with `url: "/posts/export"`, `method: "get"`, `query: { format: "xlsx" }`
2. **Your transformation**: `buildQueryParams` adds format and timestamp, `buildHeaders` sets appropriate Accept header
3. **API call**: GET request goes to `https://example.com/posts/export?format=xlsx&timestamp=2025-09-24T...`
4. **Response processing**: `mapResponse` extracts download URL and file metadata
5. **UI update**: Component provides download link or triggers automatic download

**Analytics scenario:**

1. **Dashboard loads**: Analytics component calls `custom` with `url: "/analytics/dashboard"`, `method: "get"`
2. **Your transformation**: `buildBodyParams` adds default date range for last 30 days
3. **API call**: GET request goes to `https://example.com/analytics/dashboard`
4. **Response processing**: `mapResponse` structures metrics data with period information
5. **UI update**: Dashboard displays charts and metrics with last updated timestamp

**File upload scenario:**

1. **User uploads file**: Upload component calls `custom` with `url: "/files/upload"`, `method: "post"`, `payload: formData`
2. **Your transformation**: `buildHeaders` adds multipart content type, `buildBodyParams` passes FormData through
3. **API call**: POST request goes to `https://example.com/files/upload` with file data
4. **Response processing**: `mapResponse` extracts file ID and metadata
5. **UI update**: Component shows upload success with file details

The `custom` method provides complete flexibility for any specialized API operations while maintaining the consistent transformation pattern used throughout the data provider.

## Hooks

The `@refinedev/rest` data provider uses KY as its HTTP client, which provides powerful hooks for intercepting and modifying requests and responses. We provide several pre-built hooks for common use cases, and you can also create custom hooks or swizzle existing ones to match your specific needs.

:::info KY Hooks
These are KY hooks, not Refine hooks. They operate at the HTTP request/response level and run for every API call made by the data provider. For more information about KY hooks, see the [KY documentation](https://github.com/sindresorhus/ky#hooks).
:::

<h3>Using Hooks</h3>

Hooks are passed as the third parameter to `createDataProvider` in the KY options:

```tsx
import {
  createDataProvider,
  authHeaderBeforeRequestHook,
} from "@refinedev/rest";

const { dataProvider } = createDataProvider(
  "https://api.example.com",
  {}, // Data provider options
  {
    // KY options
    hooks: {
      beforeRequest: [
        authHeaderBeforeRequestHook({ ACCESS_TOKEN_KEY: "accessToken" }),
        // Add more beforeRequest hooks here
      ],
      afterResponse: [
        // Add afterResponse hooks here
      ],
      beforeError: [
        // Add beforeError hooks here
      ],
    },
  },
);
```

### Available Hooks

KY provides several hook types for different stages of the request lifecycle:

- **`beforeRequest`**: Modify the request before it's sent
- **`beforeRetry`**: Handle retry logic for failed requests
- **`afterResponse`**: Process the response after it's received
- **`beforeError`**: Transform errors before they're thrown

#### Auth Header Hook

:::simple Swizzle
You can swizzle this hook to customize it with the [**refine CLI**](/core/docs/packages/cli/)
:::

Automatically adds Bearer token authentication to all requests:

```tsx
import { authHeaderBeforeRequestHook } from "@refinedev/rest";

const { dataProvider } = createDataProvider(
  "https://api.example.com",
  {},
  {
    hooks: {
      beforeRequest: [
        authHeaderBeforeRequestHook({ ACCESS_TOKEN_KEY: "accessToken" }),
      ],
    },
  },
);
```

**Parameters:**

- `ACCESS_TOKEN_KEY`: The localStorage key where your access token is stored

**Behavior:**

- Retrieves the token from `localStorage.getItem(ACCESS_TOKEN_KEY)`
- Adds `Authorization: Bearer <token>` header to all requests
- Silently skips if no token is found

#### Refresh Token Hook

:::simple Swizzle
You can swizzle this hook to customize it with the [**refine CLI**](/core/docs/3.xx.xx/packages/documentation/cli)
:::

Automatically handles token refresh when receiving 401 responses:

```tsx
import { refreshTokenAfterResponseHook } from "@refinedev/rest";

const { dataProvider } = createDataProvider(
  "https://api.example.com",
  {},
  {
    hooks: {
      afterResponse: [
        refreshTokenAfterResponseHook({
          ACCESS_TOKEN_KEY: "accessToken",
          REFRESH_TOKEN_KEY: "refreshToken",
          REFRESH_TOKEN_URL: "https://api.example.com/refresh-token",
        }),
      ],
    },
  },
);
```

**Parameters:**

- `ACCESS_TOKEN_KEY`: The localStorage key where your access token is stored
- `REFRESH_TOKEN_KEY`: The localStorage key where your refresh token is stored
- `REFRESH_TOKEN_URL`: The endpoint URL for refreshing tokens

**Behavior:**

- Intercepts 401 responses and attempts to refresh the access token
- Sends POST request to refresh endpoint with current refresh token in body
- Updates localStorage with new access and refresh tokens
- Retries the original request with the new access token
- Returns original 401 response if token refresh fails

### Creating Custom Hooks

You can create custom hooks to handle your specific authentication, logging, or request modification needs:

```tsx
import type { Hooks } from "ky";

// Custom beforeRequest hook for API versioning
const apiVersionHook: NonNullable<Hooks["beforeRequest"]>[number] = async (
  request,
) => {
  request.headers.set("API-Version", "2.0");
  request.headers.set("X-Client", "refine-app");
};

// Custom afterResponse hook for response logging
const responseLoggerHook: NonNullable<Hooks["afterResponse"]>[number] = async (
  request,
  options,
  response,
) => {
  console.log(`${request.method} ${request.url} - ${response.status}`);
  return response;
};

// Custom beforeError hook for error transformation
const errorTransformHook: NonNullable<Hooks["beforeError"]>[number] = async (
  error,
) => {
  if (error.response?.status === 401) {
    // Redirect to login or refresh token
    window.location.href = "/login";
  }
  return error;
};

const { dataProvider } = createDataProvider(
  "https://api.example.com",
  {},
  {
    hooks: {
      beforeRequest: [apiVersionHook],
      afterResponse: [responseLoggerHook],
      beforeError: [errorTransformHook],
    },
  },
);
```

### Swizzling Existing Hooks

You can swizzle (copy and modify) our pre-built hooks to customize their behavior. Use the Refine CLI to swizzle hooks:

```bash
npm run refine swizzle
```

Then select the hook you want to customize. This will copy the hook to your project where you can modify it:

```tsx
import type { Hooks } from "ky";

// Swizzled version of authHeaderBeforeRequestHook with custom logic
const customAuthHeaderHook =
  (options: {
    ACCESS_TOKEN_KEY: string;
  }): NonNullable<Hooks["beforeRequest"]>[number] =>
  async (request) => {
    const token = localStorage.getItem(options.ACCESS_TOKEN_KEY);

    if (token) {
      // Custom: Add both Bearer token and API key
      request.headers.set("Authorization", `Bearer ${token}`);
      request.headers.set("X-API-Key", "your-api-key");
    } else {
      // Custom: Redirect to login if no token
      window.location.href = "/login";
      throw new Error("No authentication token found");
    }
  };

const { dataProvider } = createDataProvider(
  "https://api.example.com",
  {},
  {
    hooks: {
      beforeRequest: [
        customAuthHeaderHook({ ACCESS_TOKEN_KEY: "accessToken" }),
      ],
    },
  },
);
```

### Common Hook Patterns

<h4>Request/Response Logging</h4>

```tsx
const requestLoggerHook: NonNullable<Hooks["beforeRequest"]>[number] = async (
  request,
) => {
  console.log(`Making ${request.method} request to ${request.url}`);
};

const responseLoggerHook: NonNullable<Hooks["afterResponse"]>[number] = async (
  request,
  options,
  response,
) => {
  console.log(`Response ${response.status} from ${request.url}`);
  return response;
};
```

<h4>Request Timeout</h4>

```tsx
const timeoutHook: NonNullable<Hooks["beforeRequest"]>[number] = async (
  request,
  options,
) => {
  // Set 30-second timeout for all requests
  options.timeout = 30000;
};
```

<h4>Retry Logic with Custom Conditions</h4>

```tsx
const customRetryHook: NonNullable<Hooks["beforeRetry"]>[number] = async ({
  request,
  options,
  error,
  retryCount,
}) => {
  // Only retry for specific error codes
  if (error.response?.status === 503 && retryCount < 3) {
    console.log(
      `Retrying request to ${request.url} (attempt ${retryCount + 1})`,
    );
    // Add exponential backoff
    await new Promise((resolve) =>
      setTimeout(resolve, Math.pow(2, retryCount) * 1000),
    );
  }
};
```

<h4>Global Error Handling</h4>

```tsx
const globalErrorHook: NonNullable<Hooks["beforeError"]>[number] = async (
  error,
) => {
  if (error.response?.status === 401) {
    // Clear auth and redirect
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  } else if (error.response?.status >= 500) {
    // Show global error notification
    console.error("Server error:", error.message);
  }
  return error;
};
```

<h4>Hook Execution Order</h4>

Hooks execute in the order they're defined in the array:

```tsx
const { dataProvider } = createDataProvider(
  "https://api.example.com",
  {},
  {
    hooks: {
      beforeRequest: [
        firstHook, // Runs first
        secondHook, // Runs second
        thirdHook, // Runs third
      ],
    },
  },
);
```

This allows you to compose multiple hooks and control their execution sequence for complex request/response processing.
