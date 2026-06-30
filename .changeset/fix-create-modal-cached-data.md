---
"@refinedev/refine-core": patch
"@refinedev/refine-react-hook-form": patch
---

fix(core, react-hook-form): prevent cached show-page data from overwriting create modal defaultValues

When opening a create modal on a show page for the same resource, the form's `defaultValues` were overwritten by cached data from the show page's `useOne` query. This happened because `useForm` passed the URL-derived `id` to `useOne` even for create actions, causing a query key collision with the cached entry.

- **core:** Don't pass `id` to `useOne` for create actions, preventing the cache key collision at the source.
- **react-hook-form:** Guard the `useModalForm` visibility reset effect against create actions.
