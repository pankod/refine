# @refinedev/cli

## 2.16.52

### Patch Changes

- [#7315](https://github.com/refinedev/refine/pull/7315) [`b319c8a7a2f11896008f349481b03ddcf9ed2de0`](https://github.com/refinedev/refine/commit/b319c8a7a2f11896008f349481b03ddcf9ed2de0) Thanks [@Aaron3312](https://github.com/Aaron3312)! - fix: resolve bin path from cwd to support monorepo workspace hoisting

  `resolveBin()` now walks up from `process.cwd()` to find `node_modules/.bin/<name>`, fixing `MODULE_NOT_FOUND` errors when running `refine dev` in npm/bun/yarn workspaces where packages are hoisted to a parent `node_modules`.

## 2.16.51

### Patch Changes

- Updated dependencies [[`a851672404703243df7ea150d0f918f002d1571d`](https://github.com/refinedev/refine/commit/a851672404703243df7ea150d0f918f002d1571d)]:
  - @refinedev/devtools-server@2.0.2

## 2.16.50

### Patch Changes

- [#7086](https://github.com/refinedev/refine/pull/7086) [`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: disable minify

  Resolves #6417

- Updated dependencies [[`5c57073cf7584a7ca28ad7e78dc25a16c72e83d3`](https://github.com/refinedev/refine/commit/5c57073cf7584a7ca28ad7e78dc25a16c72e83d3)]:
  - @refinedev/devtools-server@2.0.1

## 2.16.49

### Patch Changes

- [#7008](https://github.com/refinedev/refine/pull/7008) [`b07be7596fd72b1f83421a14098f0b44b6cdc8de`](https://github.com/refinedev/refine/commit/b07be7596fd72b1f83421a14098f0b44b6cdc8de) Thanks [@BatuhanW](https://github.com/BatuhanW)! - refactor: small refactors on create-resource, check-updates, swizzle, commands. During Vitest migration, some refactors were needed to properly mock some functions.

## 2.16.48

### Patch Changes

- [#6945](https://github.com/refinedev/refine/pull/6945) [`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix(test): update Jest assertions and configuration for v30 compatibility

  - Updated test infrastructure with modern Jest API usage and improved configuration.
  - Internal development dependency updates and tooling modernization - no public API changes.

- Updated dependencies [[`44a8c7663c42a2aa91074c33294e9d6a88d9ba98`](https://github.com/refinedev/refine/commit/44a8c7663c42a2aa91074c33294e9d6a88d9ba98)]:
  - @refinedev/devtools-server@2.0.0

## 2.16.47

### Patch Changes

- [#6870](https://github.com/refinedev/refine/pull/6870) [`992f202624c3f71a39fde26c71fe0ab6b8125b40`](https://github.com/refinedev/refine/commit/992f202624c3f71a39fde26c71fe0ab6b8125b40) Thanks [@typed-sigterm](https://github.com/typed-sigterm)! - Fix bun compatability.

## 2.16.46

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.42

## 2.16.45

### Patch Changes

- Updated dependencies [[`274fa2c92afdf4e5b9ee8ba057861bf9fb39cab5`](https://github.com/refinedev/refine/commit/274fa2c92afdf4e5b9ee8ba057861bf9fb39cab5)]:
  - @refinedev/devtools-server@1.1.41

## 2.16.44

### Patch Changes

📢 **Refine Community Release** 📢

- fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 2.16.43

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6683](https://github.com/refinedev/refine/pull/6683) [`a12a0821e3c573386c2a8eea4ac1582cc46dd26d`](https://github.com/refinedev/refine/commit/a12a0821e3c573386c2a8eea4ac1582cc46dd26d) Thanks [@aliemir](https://github.com/aliemir)! - fix(types): remove path aliases from type imports

  Since typescript doesn't resolve and replace path aliases, using them for the type imports will cause `d.ts` files to reference unresolvable paths and types.

  While this doesn't break everything, it breaks the types in places where the path aliases are used for type imports.

  This change removes the path aliases from the type imports and replaces them with relative imports.

## 2.16.42

### Patch Changes

📢 **Refine Community Release** 📢

- chore: update package descriptions

📢 **Refine Community Release** 📢

- feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.40

## 2.16.41

### Patch Changes

⚡ **Refine Enterprise Release** ⚡

- [#6554](https://github.com/refinedev/refine/pull/6554) [`3cb2ca6f687398e422b867692b597b0c0d911706`](https://github.com/refinedev/refine/commit/3cb2ca6f687398e422b867692b597b0c0d911706) Thanks [@necatiozmen](https://github.com/necatiozmen)! - chore: update package descriptions

⚡ **Refine Enterprise Release** ⚡

- [#6556](https://github.com/refinedev/refine/pull/6556) [`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: React Router v7 support added.

  🚨 These packages are not dependent on `react-router`. However, they use the `react-router` package for testing purposes on [Jest](https://jestjs.io/) environment.

- Updated dependencies [[`1ced1baa1dda3251b2a3d058a9168533126efb53`](https://github.com/refinedev/refine/commit/1ced1baa1dda3251b2a3d058a9168533126efb53)]:
  - @refinedev/devtools-server@1.1.39

## 2.16.40

### Patch Changes

- [`6f2c1c22112a19ba89a9298469158d4da6096aa8`](https://github.com/refinedev/refine/commit/6f2c1c22112a19ba89a9298469158d4da6096aa8) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update master references to main

- Updated dependencies [[`6f2c1c22112a19ba89a9298469158d4da6096aa8`](https://github.com/refinedev/refine/commit/6f2c1c22112a19ba89a9298469158d4da6096aa8)]:
  - @refinedev/devtools-server@1.1.38

## 2.16.39

### Patch Changes

- [#6400](https://github.com/refinedev/refine/pull/6400) [`451016a207d4dd6aecb4d56133efc1ad6229acff`](https://github.com/refinedev/refine/commit/451016a207d4dd6aecb4d56133efc1ad6229acff) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): handle errors while fetching dependencies in get-project-type

  When working with `deno` or missing `package.json` file, an error was thrown while determining the project type. This was causing the CLI to crash even though the fallbacks were provided. This PR handles such errors in `getProjectType` and lets it use the fallback type.

  [Resolves #6335](https://github.com/refinedev/refine/issues/6335)

- [#6354](https://github.com/refinedev/refine/pull/6354) [`da9da4ed1a9700c7a48db6520d683168c48b226e`](https://github.com/refinedev/refine/commit/da9da4ed1a9700c7a48db6520d683168c48b226e) Thanks [@arndom](https://github.com/arndom)! - chore(cli): remove unused express dependency

  Removed `express` dependency which triggers a vulnerability warning from `serve-static`.

  [Resolves #6321](https://github.com/refinedev/refine/issues/6321)

- Updated dependencies [[`da9da4ed1a9700c7a48db6520d683168c48b226e`](https://github.com/refinedev/refine/commit/da9da4ed1a9700c7a48db6520d683168c48b226e)]:
  - @refinedev/devtools-server@1.1.37

## 2.16.38

### Patch Changes

- [#6246](https://github.com/refinedev/refine/pull/6246) [`f5501f93a818d6e5811aa94cb354d77a2b1eb1ff`](https://github.com/refinedev/refine/commit/f5501f93a818d6e5811aa94cb354d77a2b1eb1ff) Thanks [@YusukeSano](https://github.com/YusukeSano)! - feat: added scripts for Remix SPA Mode

  It is now possible to execute the Remix SPA Mode script by selecting it from the platform options.

  Two new project types are added `remix-vite` and `remix-spa`. `remix-vite` is Remix + Vite and `remix-spa` is Remix + Vite SPA Mode. While `remix-vite` type can be inferred from the project configuration without needing to specify it in the command, `remix-spa` type needs to be specified explicitly.

  [Resolves #6127](https://github.com/refinedev/refine/issues/6127)

- Updated dependencies [[`6963e591f8f307aee9362d5dfff99972eb64bf03`](https://github.com/refinedev/refine/commit/6963e591f8f307aee9362d5dfff99972eb64bf03)]:
  - @refinedev/devtools-server@1.1.36

## 2.16.37

### Patch Changes

- [#6162](https://github.com/refinedev/refine/pull/6162) [`d7fb07e59ddcbef49437c64d3a92b3d47d850225`](https://github.com/refinedev/refine/commit/d7fb07e59ddcbef49437c64d3a92b3d47d850225) Thanks [@noritsune](https://github.com/noritsune)! - feat(cli): improve the resource add command to generate page files for Next.js

  When using the add resource command in a project using Next.js, a page will be generated to perform the selected actions for that resource.

  These pages simply display generated components that perform actions on the resource. The placement of page files assumes operation with the App Router. If you prefer to use the Page Router instead, you'll need to move them manually.

  [Resolves #6091](https://github.com/refinedev/refine/issues/6091)

- [#6221](https://github.com/refinedev/refine/pull/6221) [`cbf2fd70a6a0d54722b6541c948ce8cb3f682fb4`](https://github.com/refinedev/refine/commit/cbf2fd70a6a0d54722b6541c948ce8cb3f682fb4) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: Automatically install `@refinedev/inferencer` if missing after generating new resources.

  [Resolves #6220](https://github.com/refinedev/refine/issues/6220)

- [#6135](https://github.com/refinedev/refine/pull/6135) [`c3a75139f82de022b54855e87e200ab38c803af5`](https://github.com/refinedev/refine/commit/c3a75139f82de022b54855e87e200ab38c803af5) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `yarn refine update` removes semver range specifiers(`^`, `~`) from `package.json`. #6134

- [#6226](https://github.com/refinedev/refine/pull/6226) [`9806a3629256d73bdc18ae808dce217f0108aad2`](https://github.com/refinedev/refine/commit/9806a3629256d73bdc18ae808dce217f0108aad2) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: `refine add resource` generating invalid React component name. #6225

  `refine add resource blog-posts` command was generating invalid React component name when the resource name contains a hyphen. This issue has been fixed by converting the resource name to PascalCase before generating the React component name.

  ```diff
  - export const Blog-PostsList: React.FC = () => {};
  + export const BlogPostsList: React.FC = () => {};
  ```

  [Resolves #6225](https://github.com/refinedev/refine/issues/6225)

- [#6196](https://github.com/refinedev/refine/pull/6196) [`e2b467528f6a799c3219e3a8fefd4834a0ca0431`](https://github.com/refinedev/refine/commit/e2b467528f6a799c3219e3a8fefd4834a0ca0431) Thanks [@aliemir](https://github.com/aliemir)! - feat(cli): create base translation files for i18n provider in add provider command

  Currently `refine add provider i18n` command is only creating a demo i18n provider implementation but misses the translation files. This PR adds the base translation files for the i18n provider which is used by Refine internally in hooks, notifications and components.

  Now `locale/en.json` will be added with primarily used translation keys and values for the i18n provider.

  [Resolves #5918](https://github.com/refinedev/refine/issues/5918)

- [#6185](https://github.com/refinedev/refine/pull/6185) [`603c73eb7d376fc2357a577f5921f844a8f444e4`](https://github.com/refinedev/refine/commit/603c73eb7d376fc2357a577f5921f844a8f444e4) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): avoid polluting `process.env` with unwanted environment variables

  Previously, the `@refinedev/cli` used `dotenv` to load environment variables from `.env` files and populate `process.env`. This caused issues when the users app has a different convention for environment variables, e.g. `.env.development`, `.env.production`, etc.

  Now, the `@refinedev/cli` will read the file but avoid populating `process.env` with the variables and keep the values in its scope without passing them to the child processes. This will prevent unwanted environment variables from being passed to the child processes and avoid conflicts with the user's environment variables.

  [Resolves #5803](https://github.com/refinedev/refine/issues/5803)

- [#6185](https://github.com/refinedev/refine/pull/6185) [`603c73eb7d376fc2357a577f5921f844a8f444e4`](https://github.com/refinedev/refine/commit/603c73eb7d376fc2357a577f5921f844a8f444e4) Thanks [@aliemir](https://github.com/aliemir)! - feat(devtools): ability to change the port of the devtools server

  Now users can change the port of the devtools server by setting the `REFINE_DEVTOOLS_PORT` environment variable. Previously, the port was hardcoded to "5001" and could not be changed.

  If you're using `@refinedev/cli`'s runner commands to start your development server, `REFINE_DEVTOOLS_PORT` will be propagated to your app with appropriate prefix. E.g. if you're using Vite, the environment variable will be `VITE_REFINE_DEVTOOLS_PORT` and it will be used by the `@refinedev/devtools`'s `<DevtoolsProvider />` component to connect to the devtools server.

  - In Next.js apps, it will be prefixed with `NEXT_PUBLIC_`
  - In Craco and Create React App apps, it will be prefixed with `REACT_APP_`
  - In Remix apps and other custom setups, the environment variable will be used as is.

  In some scenarios where the environment variables are not passed to the browser, you may need to manually set the Refine Devtools URL in the `<DevtoolsProvider />` component via the `url` prop. Remix apps do not automatically pass environment variables to the browser, so you will need to set the URL manually. If not set, the default URL will be used.

  While the port can be changed, this feature also allows users to host the devtools server on a different machine or domain and provide the `<DevtoolsProvider />` with the custom domain URL. This such case will be useful if you're dockerizing your app and devtools server separately.

  **Enterprise Edition**: Refine Devtools running on ports other than "5001" is only available in the Enterprise Edition. If you're using the Community Edition, Refine Devtools will not work if the port is changed.

  [Resolves #5111](https://github.com/refinedev/refine/issues/5111)

- Updated dependencies [[`603c73eb7d376fc2357a577f5921f844a8f444e4`](https://github.com/refinedev/refine/commit/603c73eb7d376fc2357a577f5921f844a8f444e4)]:
  - @refinedev/devtools-server@1.1.35

## 2.16.36

### Patch Changes

- [#6098](https://github.com/refinedev/refine/pull/6098) [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a) Thanks [@aliemir](https://github.com/aliemir)! - chore(cli): remove unused command

  Previously `@refinedev/cli` had a `proxy` command that is no longer in use and not required in any of the projects. This change removes the command from the CLI without a fallback.

- [#6039](https://github.com/refinedev/refine/pull/6039) [`24db047aea42e307a9662c46fde50ea69ca8c381`](https://github.com/refinedev/refine/commit/24db047aea42e307a9662c46fde50ea69ca8c381) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): type imports are breaking the code structure on swizzle

  When exporting elements with `swizzle` command, it will try to replace and combine imports from Refine packages. This process was broken if the target file was using `import type` syntax. This PR updates swizzle command to handle `import type` syntax separately.

  Resolves [#6035](https://github.com/refinedev/refine/issues/6035)

- Updated dependencies [[`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a), [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a), [`8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a`](https://github.com/refinedev/refine/commit/8bc2c1c6790d1e098ce0d98e01f608e3310f7b4a), [`50d21076928ca738ec54cc5bcd17fad2683653dd`](https://github.com/refinedev/refine/commit/50d21076928ca738ec54cc5bcd17fad2683653dd)]:
  - @refinedev/devtools-server@1.1.34

## 2.16.34

### Patch Changes

- [#6059](https://github.com/refinedev/refine/pull/6059) [`ad42665ad9ccb07f6090da353377d016b67acdd0`](https://github.com/refinedev/refine/commit/ad42665ad9ccb07f6090da353377d016b67acdd0) Thanks [@aliemir](https://github.com/aliemir)! - fix(devtools): failing authentication checks

  Devtools was failing on determining the auth status and always ended up redirecting to the login page or the onboarding step regardless of the actual authentication status.

  Resolves [#6047](https://github.com/refinedev/refine/issues/6047)

- Updated dependencies [[`ad42665ad9ccb07f6090da353377d016b67acdd0`](https://github.com/refinedev/refine/commit/ad42665ad9ccb07f6090da353377d016b67acdd0)]:
  - @refinedev/devtools-server@1.1.32

## 2.16.33

### Patch Changes

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: remove hardcoded path prefix from bin resolve for remix run command.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: capitalize Refine

  Capitalized "Refine" in the user-facing texts

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix(cli): prevent exit on devtools error

  Updated the `dev` command's devtools runner logic to prevent the process from exiting when devtools server fails to start. Previously, the process would exit if devtools server failed to start regardless of the development server's status.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat(cli): prompt to update all in `update` command

  Previously, if users doesn't provide `--all` option, `update` command will display an interactive prompt to pick which packages to update. Now, before displaying the prompt, it will ask if users want to update all packages.

- [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046), [`6bd14228760d3e1e205ea9248e427f9afa2ec046`](https://github.com/refinedev/refine/commit/6bd14228760d3e1e205ea9248e427f9afa2ec046)]:
  - @refinedev/devtools-server@1.1.31

## 2.16.32

### Patch Changes

- [#5945](https://github.com/refinedev/refine/pull/5945) [`45b68cc3450618468e938f9540dc52ff088b555a`](https://github.com/refinedev/refine/commit/45b68cc3450618468e938f9540dc52ff088b555a) Thanks [@aliemir](https://github.com/aliemir)! - fix: remove hardcoded path prefix from bin resolve for remix run command.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`429009db854653ab3ca00fbfb84561de38b3a255`](https://github.com/refinedev/refine/commit/429009db854653ab3ca00fbfb84561de38b3a255) Thanks [@aliemir](https://github.com/aliemir)! - fix: capitalize Refine

  Capitalized "Refine" in the user-facing texts

- [#5945](https://github.com/refinedev/refine/pull/5945) [`6c22ece19f44ca2b99ad70543f9ee40b4b139863`](https://github.com/refinedev/refine/commit/6c22ece19f44ca2b99ad70543f9ee40b4b139863) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): prevent exit on devtools error

  Updated the `dev` command's devtools runner logic to prevent the process from exiting when devtools server fails to start. Previously, the process would exit if devtools server failed to start regardless of the development server's status.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`429009db854653ab3ca00fbfb84561de38b3a255`](https://github.com/refinedev/refine/commit/429009db854653ab3ca00fbfb84561de38b3a255) Thanks [@aliemir](https://github.com/aliemir)! - feat(cli): prompt to update all in `update` command

  Previously, if users doesn't provide `--all` option, `update` command will display an interactive prompt to pick which packages to update. Now, before displaying the prompt, it will ask if users want to update all packages.

- [#5945](https://github.com/refinedev/refine/pull/5945) [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d) Thanks [@aliemir](https://github.com/aliemir)! - chore: added `type` qualifier to imports used as type only.

  ```diff
  - import { A } from "./example.ts";
  + import type { A } from "./example.ts";
  ```

- Updated dependencies [[`429009db854653ab3ca00fbfb84561de38b3a255`](https://github.com/refinedev/refine/commit/429009db854653ab3ca00fbfb84561de38b3a255), [`6c22ece19f44ca2b99ad70543f9ee40b4b139863`](https://github.com/refinedev/refine/commit/6c22ece19f44ca2b99ad70543f9ee40b4b139863), [`6c22ece19f44ca2b99ad70543f9ee40b4b139863`](https://github.com/refinedev/refine/commit/6c22ece19f44ca2b99ad70543f9ee40b4b139863), [`90930b381d8d369c63bc59beedf69c391875166d`](https://github.com/refinedev/refine/commit/90930b381d8d369c63bc59beedf69c391875166d), [`bb89dc34bf6ef061d0bcdcf0cb3173fe7014ae5e`](https://github.com/refinedev/refine/commit/bb89dc34bf6ef061d0bcdcf0cb3173fe7014ae5e)]:
  - @refinedev/devtools-server@1.1.30

## 2.16.31

### Patch Changes

- [#5928](https://github.com/refinedev/refine/pull/5928) [`db9756e7908`](https://github.com/refinedev/refine/commit/db9756e79086ff80774ee75d570d610bf0d5d76d) Thanks [@aliemir](https://github.com/aliemir)! - fix: type errors on typescript <5

  Due to the changes in #5881, typescript users below version 5 are facing type errors. This PR fixes the type errors by updating the file extensions required by the `d.mts` declaration files to provide a compatible declarations for both typescript 4 and 5 users.

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.29

## 2.16.30

### Patch Changes

- [#5881](https://github.com/refinedev/refine/pull/5881) [`ba719f6ea26`](https://github.com/refinedev/refine/commit/ba719f6ea264ee87226f42de900a754e81f1f22f) Thanks [@aliemir](https://github.com/aliemir)! - fix: declaration files in node10, node16 and nodenext module resolutions

- Updated dependencies [[`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`1c9a95f22ab`](https://github.com/refinedev/refine/commit/1c9a95f22ab8c3f1d1e48c7c889227ce1d9160cf), [`a9dbd808782`](https://github.com/refinedev/refine/commit/a9dbd808782212ed0bf6cf4401f85b675975a744)]:
  - @refinedev/devtools-server@1.1.28

## 2.16.29

### Patch Changes

- Updated dependencies [[`aedc6a2961c`](https://github.com/refinedev/refine/commit/aedc6a2961cfe69309d4e14292147a858f94e3bf)]:
  - @refinedev/devtools-server@1.1.27

## 2.16.28

### Patch Changes

- [#5807](https://github.com/refinedev/refine/pull/5807) [`b20a18e4dfc`](https://github.com/refinedev/refine/commit/b20a18e4dfc97481be865a2a012ea1c588bd76c6) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update jscodeshift version to 0.15.2

- [#5765](https://github.com/refinedev/refine/pull/5765) [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45) Thanks [@aliemir](https://github.com/aliemir)! - refactor: package bundles and package.json configuration for exports

  Previously, Refine packages had exported ESM and CJS bundles with same `.js` extension and same types for both with `.d.ts` extensions. This was causing issues with bundlers and compilers to pick up the wrong files for the wrong environment. Now we're outputting ESM bundles with `.mjs` extension and CJS bundles with `.cjs` extension. Also types are now exported with both `.d.mts` and `.d.cts` extensions.

  In older versions ESM and CJS outputs of some packages were using wrong imports/requires to dependencies causing errors in some environments. This will be fixed since now we're also enforcing the module type with extensions.

  Above mentioned changes also supported with changes in `package.json` files of the packages to support the new extensions and types. All Refine packages now include `exports` fields in their configuration to make sure the correct bundle is picked up by the bundlers and compilers.

- [#5799](https://github.com/refinedev/refine/pull/5799) [`33a8a80d80f`](https://github.com/refinedev/refine/commit/33a8a80d80f160101907ad3a6e808b9d04b80107) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update semver package version to 7.5.2.

- [#5754](https://github.com/refinedev/refine/pull/5754) [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: TypeScript upgraded to [v5.x.x](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html). #5752

- [#5739](https://github.com/refinedev/refine/pull/5739) [`e9bbb1aa5af`](https://github.com/refinedev/refine/commit/e9bbb1aa5af94125cf0de562b3154302373a308f) Thanks [@aliemir](https://github.com/aliemir)! - Removed redundant usage of `IResourceComponentsProps` type in component templates of `add resource` command. This type only works with legacy routers and `<RefineRoutes />` component, its usage outside of these scopes are unnecessary.

- Updated dependencies [[`b20a18e4dfc`](https://github.com/refinedev/refine/commit/b20a18e4dfc97481be865a2a012ea1c588bd76c6), [`0c197d82393`](https://github.com/refinedev/refine/commit/0c197d823939ae1fd4e0ee4b5a422322853b1e45), [`51f368eab1a`](https://github.com/refinedev/refine/commit/51f368eab1a72e2134981e999dc0b3e26e2b74e8), [`56ed144a0f5`](https://github.com/refinedev/refine/commit/56ed144a0f5af218fd9e6edbfd999ae433329927)]:
  - @refinedev/devtools-server@1.1.26

## 2.16.27

### Patch Changes

- [#5695](https://github.com/refinedev/refine/pull/5695) [`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: apply biome format and fix lint errors.

- Updated dependencies [[`79865affa1c`](https://github.com/refinedev/refine/commit/79865affa1c657e6b14ed34585caeec1f3d3da7f)]:
  - @refinedev/devtools-server@1.1.25

## 2.16.26

### Patch Changes

- [#5663](https://github.com/refinedev/refine/pull/5663) [`363fd4ed5f6`](https://github.com/refinedev/refine/commit/363fd4ed5f6dffbd70c2acf43ce310ab773589fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: demo access control provider typing.

## 2.16.25

### Patch Changes

- [#5640](https://github.com/refinedev/refine/pull/5640) [`e504c5b043c`](https://github.com/refinedev/refine/commit/e504c5b043c8cef7341356eeaa16df10e5e79a60) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: added "integration" option to "add" command.

  Now you can run the following command to add integration into your existing project:

  ```bash
  > npm run refine add integration

  ? Which integration do you want to add? (Use arrow keys)
  ❯ Ant Design - Setup Ant Design with Refine
    React Router - Setup routing with React Router
  ```

  For now, `Ant Design` integration doesn't support `NextJS` and `Remix` projects.

## 2.16.24

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.24

## 2.16.23

### Patch Changes

- Updated dependencies [[`ee0f7867c3`](https://github.com/refinedev/refine/commit/ee0f7867c3648dcbf1e2504f430a0b5814d91019)]:
  - @refinedev/devtools-server@1.1.23

## 2.16.22

### Patch Changes

- [#5398](https://github.com/refinedev/refine/pull/5398) [`fda3494215`](https://github.com/refinedev/refine/commit/fda349421509197b5a2be225bd3794adb2a7925c) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: Remix v2 requires build path as argument for `remix-serve` but Refine CLI was not passing it.
  From now on, Refine CLI will pass the build path as argument to `remix-serve` command and uses the default `./build/index.js` if not provided.

  You can pass the build path as argument to `refine start` command.

  ```json
  // package.json

  {
    "scripts": {
      "start": "refine start ./build/index.js"
    }
  }
  ```

## 2.16.21

### Patch Changes

- [#5425](https://github.com/refinedev/refine/pull/5425) [`190af9fce2`](https://github.com/refinedev/refine/commit/190af9fce292bc46b169e3e121be6bf1c2a939a5) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/core` peer dependencies to latest (`^4.46.1`)

## 2.16.20

### Patch Changes

- [#5296](https://github.com/refinedev/refine/pull/5296) [`1b031a2c19`](https://github.com/refinedev/refine/commit/1b031a2c19126ec1c01a85ecfbc794dc82480776) Thanks [@aliemir](https://github.com/aliemir)! - Updated `--devtools` flag in dev command to allow disabling devtools by `--devtools=false`. (Issue: #5215)

- Updated dependencies [[`1b031a2c19`](https://github.com/refinedev/refine/commit/1b031a2c19126ec1c01a85ecfbc794dc82480776)]:
  - @refinedev/devtools-server@1.1.22

## 2.16.19

### Patch Changes

- [#5292](https://github.com/refinedev/refine/pull/5292) [`714841da4b24`](https://github.com/refinedev/refine/commit/714841da4b24ef0b392eb9cbb7320cb3be122292) Thanks [@aliemir](https://github.com/aliemir)! - Bump `node-emoji` dependency resolution to `^2.1.3` to fix broken CJS builds.

## 2.16.18

### Patch Changes

- [#5290](https://github.com/refinedev/refine/pull/5290) [`404f16a947f3`](https://github.com/refinedev/refine/commit/404f16a947f330aad494f11545022684133bf2d0) Thanks [@BatuhanW](https://github.com/BatuhanW)! - fix: override `node-emoji` package version used by `marked-terminal` to `2.1.0`

  fixes the issue: https://github.com/refinedev/refine/issues/5279

## 2.16.17

### Patch Changes

- [#5281](https://github.com/refinedev/refine/pull/5281) [`97d5d9c98b28`](https://github.com/refinedev/refine/commit/97d5d9c98b28a1d69cada0a746202f82bec45622) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the version of `node-emoji` to `2.1.0`. Since `v2.1.1` depends on an ESM-only package, it breaks the build.

## 2.16.16

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.21

## 2.16.15

### Patch Changes

- [#5208](https://github.com/refinedev/refine/pull/5208) [`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update announcements source from next to master branch.

- Updated dependencies [[`72f9f608f42`](https://github.com/refinedev/refine/commit/72f9f608f4205cf4f3266068326d029546cd9f88)]:
  - @refinedev/devtools-server@1.1.20

## 2.16.14

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.19

## 2.16.13

### Patch Changes

- Updated dependencies []:
  - @refinedev/devtools-server@1.1.18

## 2.16.12

### Patch Changes

- [#5151](https://github.com/refinedev/refine/pull/5151) [`b5f93f60f1d`](https://github.com/refinedev/refine/commit/b5f93f60f1d9d7ed105cf50512b090337a4dde2d) Thanks [@aliemir](https://github.com/aliemir)! - Update `@refinedev/core` version check for devtools runner to do a wider check to locate the package and its version. If the location is not found, it will start devtools without a version check.

- Updated dependencies [[`2bd813f62bf`](https://github.com/refinedev/refine/commit/2bd813f62bf55eb1be55ffe5b2c1c7079d7a93f0), [`38f2a9b2e71`](https://github.com/refinedev/refine/commit/38f2a9b2e7149ad3d5e5c2780e05ddde0285ac3c)]:
  - @refinedev/devtools-server@1.1.17

## 2.16.11

### Patch Changes

- [#5151](https://github.com/refinedev/refine/pull/5151) [`b5f93f60f1d`](https://github.com/refinedev/refine/commit/b5f93f60f1d9d7ed105cf50512b090337a4dde2d) Thanks [@aliemir](https://github.com/aliemir)! - Update `@refinedev/core` version check for devtools runner to do a wider check to locate the package and its version. If the location is not found, it will start devtools without a version check.

- Updated dependencies [[`2bd813f62bf`](https://github.com/refinedev/refine/commit/2bd813f62bf55eb1be55ffe5b2c1c7079d7a93f0), [`38f2a9b2e71`](https://github.com/refinedev/refine/commit/38f2a9b2e7149ad3d5e5c2780e05ddde0285ac3c)]:
  - @refinedev/devtools-server@1.1.16

## 2.16.10

### Patch Changes

- Updated dependencies [[`be419eb31bc`](https://github.com/refinedev/refine/commit/be419eb31bc7b7a3934f39bcfcbaaa0b9db60be8)]:
  - @refinedev/devtools-server@1.1.15

## 2.16.9

### Patch Changes

- Updated dependencies [[`be419eb31bc`](https://github.com/refinedev/refine/commit/be419eb31bc7b7a3934f39bcfcbaaa0b9db60be8)]:
  - @refinedev/devtools-server@1.1.14

## 2.16.8

### Patch Changes

- Updated dependencies [[`78117485899`](https://github.com/refinedev/refine/commit/781174858992bb1d077069d2858a37b44344879e)]:
  - @refinedev/devtools-server@1.1.13

## 2.16.7

### Patch Changes

- Updated dependencies [[`78117485899`](https://github.com/refinedev/refine/commit/781174858992bb1d077069d2858a37b44344879e)]:
  - @refinedev/devtools-server@1.1.12

## 2.16.6

### Patch Changes

- [#5073](https://github.com/refinedev/refine/pull/5073) [`6c40a720140`](https://github.com/refinedev/refine/commit/6c40a720140a8fe7141033a282500d354b1e621f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: The packages `ink`, `ink-markdown`, and `ink-table` have been replaced with `marked`, `marked-terminal`, and `cli-table3` packages.

- Updated dependencies [[`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d)]:
  - @refinedev/devtools-server@1.1.11

## 2.16.5

### Patch Changes

- [#5073](https://github.com/refinedev/refine/pull/5073) [`6c40a720140`](https://github.com/refinedev/refine/commit/6c40a720140a8fe7141033a282500d354b1e621f) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - chore: The packages `ink`, `ink-markdown`, and `ink-table` have been replaced with `marked`, `marked-terminal`, and `cli-table3` packages.

- Updated dependencies [[`61366ebd866`](https://github.com/refinedev/refine/commit/61366ebd86694328fe5a7f4dcf322db3c43bbc9d)]:
  - @refinedev/devtools-server@1.1.10

## 2.16.4

### Patch Changes

- [#26](https://github.com/TheRakeshPurohit/refine/pull/26) [`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17) Thanks [@pull](https://github.com/apps/pull)! - feat: From now on, `npm run refine devtools init` updates `@refinedev/core` to latest version.

- Updated dependencies [[`7533e541739`](https://github.com/refinedev/refine/commit/7533e541739faadffb763feef8739ac46f62bd17)]:
  - @refinedev/devtools-server@1.1.9

## 2.16.3

### Patch Changes

- [#5055](https://github.com/refinedev/refine/pull/5055) [`68f24d5b596`](https://github.com/refinedev/refine/commit/68f24d5b596eaf1b5b1690c7a57baf3e93fcf42b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: From now on, `npm run refine devtools init` updates `@refinedev/core` to latest version.

- Updated dependencies [[`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8)]:
  - @refinedev/devtools-server@1.1.8

## 2.16.2

### Patch Changes

- [#5055](https://github.com/refinedev/refine/pull/5055) [`68f24d5b596`](https://github.com/refinedev/refine/commit/68f24d5b596eaf1b5b1690c7a57baf3e93fcf42b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: From now on, `npm run refine devtools init` updates `@refinedev/core` to latest version.

- Updated dependencies [[`1fa531ebe89`](https://github.com/refinedev/refine/commit/1fa531ebe89bdab2af0dd57db121e2c0e72d44e8)]:
  - @refinedev/devtools-server@1.1.7

## 2.16.1

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

- [#5024](https://github.com/refinedev/refine/pull/5024) [`1bb29d9fc3d`](https://github.com/refinedev/refine/commit/1bb29d9fc3d0f34ba8152963e99919a929b485d2) Thanks [@aliemir](https://github.com/aliemir)! - Added dynamic announcements to the CLI to show when a command is executed. Users will be able to receive news and updates about refine without having to update their dependencies.

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b), [`20f5b6128d4`](https://github.com/refinedev/refine/commit/20f5b6128d4ae85904b9b0e2845c1bb2dcae1a44)]:
  - @refinedev/devtools-server@1.1.6

## 2.16.0

### Minor Changes

- [#5024](https://github.com/refinedev/refine/pull/5024) [`1bb29d9fc3d`](https://github.com/refinedev/refine/commit/1bb29d9fc3d0f34ba8152963e99919a929b485d2) Thanks [@aliemir](https://github.com/aliemir)! - Added dynamic announcements to the CLI to show when a command is executed. Users will be able to receive news and updates about refine without having to update their dependencies.

### Patch Changes

- [#5022](https://github.com/refinedev/refine/pull/5022) [`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - chore: update README.md

  - fix grammar errors.
  - make all README.md files consistent.
  - add code example code snippets.

- Updated dependencies [[`80513a4e42f`](https://github.com/refinedev/refine/commit/80513a4e42f8dda39e01157643594a9e4c32001b), [`20f5b6128d4`](https://github.com/refinedev/refine/commit/20f5b6128d4ae85904b9b0e2845c1bb2dcae1a44)]:
  - @refinedev/devtools-server@1.1.5

## 2.15.4

### Patch Changes

- [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `@refinedev/devtools-server` dependency version for following the releases easily.

- Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
  - @refinedev/devtools-server@1.1.4

## 2.15.3

### Patch Changes

- [#5008](https://github.com/refinedev/refine/pull/5008) [`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94) Thanks [@aliemir](https://github.com/aliemir)! - Fixed the `@refinedev/devtools-server` dependency version for following the releases easily.

- Updated dependencies [[`c8499114e55`](https://github.com/refinedev/refine/commit/c8499114e55968d8b440a8cd6eb2f29fbf3deb94)]:
  - @refinedev/devtools-server@1.1.3

## 2.15.2

### Patch Changes

- [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Updated `@refinedev/devtools-server` dependency

- Updated dependencies [[`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082), [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082)]:
  - @refinedev/devtools-server@1.1.2

## 2.15.1

### Patch Changes

- [#4995](https://github.com/refinedev/refine/pull/4995) [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082) Thanks [@omeraplak](https://github.com/omeraplak)! - Updated `@refinedev/devtools-server` dependency

- Updated dependencies [[`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082), [`ab01e8e32d8`](https://github.com/refinedev/refine/commit/ab01e8e32d8c1f141c4284b9c32727e905094082)]:
  - @refinedev/devtools-server@1.1.1

## 2.15.0

### Minor Changes

- [#4979](https://github.com/refinedev/refine/pull/4979) [`1958c77e7e3`](https://github.com/refinedev/refine/commit/1958c77e7e304e9422e141354d15d27d71824528) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `devtools init` command.
  From now on, you can install refine devtools with a single command and add the necessary components to your project.

  ```bash
  npm run refine devtools init
  ```

## 2.14.0

### Minor Changes

- [#4979](https://github.com/refinedev/refine/pull/4979) [`1958c77e7e3`](https://github.com/refinedev/refine/commit/1958c77e7e304e9422e141354d15d27d71824528) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `devtools init` command.
  From now on, you can install refine devtools with a single command and add the necessary components to your project.

  ```bash
  npm run refine devtools init
  ```

## 2.13.0

### Minor Changes

- [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Integration with refine devtools.

  Now you can start the Devtools server using the `refine devtools` command or when the server will be started automatically when you start your app in development mode using `refine dev` command if you have `@refinedev/devtools` installed.

### Patch Changes

- [#4971](https://github.com/refinedev/refine/pull/4971) [`34b23d84368`](https://github.com/refinedev/refine/commit/34b23d843682f3e1c2404bbfa48cea57da57d357) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: add refine devtools warning

- [#4976](https://github.com/refinedev/refine/pull/4976) [`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@refinedev/devtools-server`

- [`25539d23320`](https://github.com/refinedev/refine/commit/25539d2332094e74736c2507172650be36ab4632) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/devtools-server` dependency

- Updated dependencies [[`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3), [`246b3cb6a00`](https://github.com/refinedev/refine/commit/246b3cb6a0000a5b70557d31940cb69113e0397b), [`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb)]:
  - @refinedev/devtools-server@1.1.0

## 2.12.2

### Patch Changes

- [#4971](https://github.com/refinedev/refine/pull/4971) [`34b23d84368`](https://github.com/refinedev/refine/commit/34b23d843682f3e1c2404bbfa48cea57da57d357) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: add refine devtools warning

- [#4976](https://github.com/refinedev/refine/pull/4976) [`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb) Thanks [@aliemir](https://github.com/aliemir)! - Updated dependency of `@refinedev/devtools-server`

- Updated dependencies [[`ed026da4239`](https://github.com/refinedev/refine/commit/ed026da4239af5f15afa74fcb180f1086bce63cb)]:
  - @refinedev/devtools-server@1.0.2

## 2.12.1

### Patch Changes

- [`25539d23320`](https://github.com/refinedev/refine/commit/25539d2332094e74736c2507172650be36ab4632) Thanks [@aliemir](https://github.com/aliemir)! - Updated `@refinedev/devtools-server` dependency

- Updated dependencies [[`246b3cb6a00`](https://github.com/refinedev/refine/commit/246b3cb6a0000a5b70557d31940cb69113e0397b)]:
  - @refinedev/devtools-server@1.0.1

## 2.12.0

### Minor Changes

- [#4960](https://github.com/refinedev/refine/pull/4960) [`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3) Thanks [@aliemir](https://github.com/aliemir)! - Integration with refine devtools.

  Now you can start the Devtools server using the `refine devtools` command or when the server will be started automatically when you start your app in development mode using `refine dev` command if you have `@refinedev/devtools` installed.

### Patch Changes

- Updated dependencies [[`d8e464fa2c4`](https://github.com/refinedev/refine/commit/d8e464fa2c461d0fd60050cf18247758ecdc42e3)]:
  - @refinedev/devtools-server@1.0.0

## 2.11.0

### Minor Changes

- [#4904](https://github.com/refinedev/refine/pull/4904) [`b1ab9a23520`](https://github.com/refinedev/refine/commit/b1ab9a23520c42f9747bcb5ef3ffce76b3d4a0fd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `add` command to add new features to the project
  Now you can add a new provider or resource to the project using the command `npm run refine add <arg>`.

  - `npm run refine add resource posts`: will add a new resource to the project with the name `posts`.
  - `npm run refine add auth`: will add a new auth provider to the project.
  - `npm run refine add data`: will add a new data provider to the project.
  - `npm run refine add live`: will add a new live provider to the project.
  - `npm run refine add access-control`: will add a new access control provider to the project.
  - `npm run refine add audit-log`: will add a new audit log provider to the project.
  - `npm run refine add i18n`: will add a new i18n provider to the project.
  - `npm run refine add notification`: will add a new notification provider to the project.

## 2.10.0

### Minor Changes

- [#4904](https://github.com/refinedev/refine/pull/4904) [`b1ab9a23520`](https://github.com/refinedev/refine/commit/b1ab9a23520c42f9747bcb5ef3ffce76b3d4a0fd) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added `add` command to add new features to the project
  Now you can add a new provider or resource to the project using the command `npm run refine add <arg>`.

  - `npm run refine add resource posts`: will add a new resource to the project with the name `posts`.
  - `npm run refine add auth`: will add a new auth provider to the project.
  - `npm run refine add data`: will add a new data provider to the project.
  - `npm run refine add live`: will add a new live provider to the project.
  - `npm run refine add access-control`: will add a new access control provider to the project.
  - `npm run refine add audit-log`: will add a new audit log provider to the project.
  - `npm run refine add i18n`: will add a new i18n provider to the project.
  - `npm run refine add notification`: will add a new notification provider to the project.

## 2.9.0

### Minor Changes

- [#4833](https://github.com/refinedev/refine/pull/4833) [`9a24e46020d`](https://github.com/refinedev/refine/commit/9a24e46020df8568dc7dddd03fbc386981d75bcc) Thanks [@mikeyfarina](https://github.com/mikeyfarina)! - add "--platform" option on cli to start, dev, and build to specify project type

## 2.8.0

### Minor Changes

- [#4833](https://github.com/refinedev/refine/pull/4833) [`9a24e46020d`](https://github.com/refinedev/refine/commit/9a24e46020df8568dc7dddd03fbc386981d75bcc) Thanks [@mikeyfarina](https://github.com/mikeyfarina)! - add "--platform" option on cli to start, dev, and build to specify project type

## 2.7.6

### Patch Changes

- [#4777](https://github.com/refinedev/refine/pull/4777) [`e33f22da1c3`](https://github.com/refinedev/refine/commit/e33f22da1c31e5e041914d41e677d48360bec8f1) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: added `changelog` link to version table generated with `check-updates` command

## 2.7.5

### Patch Changes

- [#4777](https://github.com/refinedev/refine/pull/4777) [`e33f22da1c3`](https://github.com/refinedev/refine/commit/e33f22da1c31e5e041914d41e677d48360bec8f1) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - feat: added `changelog` link to version table generated with `check-updates` command

## 2.7.4

### Patch Changes

- [#4696](https://github.com/refinedev/refine/pull/4696) [`35a2c695a74`](https://github.com/refinedev/refine/commit/35a2c695a7465492e7aa59c50f3bb80a56aff19b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: CLI will try to read `projectId` from package.json if exists and send it to the telemetry server.

  Also removed redundant comment lines on resource generation.

## 2.7.3

### Patch Changes

- [#4696](https://github.com/refinedev/refine/pull/4696) [`35a2c695a74`](https://github.com/refinedev/refine/commit/35a2c695a7465492e7aa59c50f3bb80a56aff19b) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: CLI will try to read `projectId` from package.json if exists and send it to the telemetry server.

  Also removed redundant comment lines on resource generation.

## 2.7.2

### Patch Changes

- [#4614](https://github.com/refinedev/refine/pull/4614) [`c9fecca3c33`](https://github.com/refinedev/refine/commit/c9fecca3c332671e836bb42d06afc62c3e28d4d2) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: add refine cloud early access message

## 2.7.1

### Patch Changes

- [#4614](https://github.com/refinedev/refine/pull/4614) [`c9fecca3c33`](https://github.com/refinedev/refine/commit/c9fecca3c332671e836bb42d06afc62c3e28d4d2) Thanks [@omeraplak](https://github.com/omeraplak)! - chore: add refine cloud early access message

## 2.7.0

### Minor Changes

- [#4516](https://github.com/refinedev/refine/pull/4516) [`6fdf9c002c5`](https://github.com/refinedev/refine/commit/6fdf9c002c55359a7c6fcd7e03b3ca0698a44996) Thanks [@omeraplak](https://github.com/omeraplak)! - feat: added HeadlessInferencer support for the `create-resource` command.

## 2.6.0

### Minor Changes

- [#4516](https://github.com/refinedev/refine/pull/4516) [`6fdf9c002c5`](https://github.com/refinedev/refine/commit/6fdf9c002c55359a7c6fcd7e03b3ca0698a44996) Thanks [@omeraplak](https://github.com/omeraplak)! - feat: added HeadlessInferencer support for the `create-resource` command.

## 2.5.5

### Patch Changes

- [#4350](https://github.com/refinedev/refine/pull/4350) [`79955f1dfef`](https://github.com/refinedev/refine/commit/79955f1dfefc558798e5f3af4e4548a391ec488d) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: added proxy command to CLI

## 2.5.4

### Patch Changes

- [#4350](https://github.com/refinedev/refine/pull/4350) [`79955f1dfef`](https://github.com/refinedev/refine/commit/79955f1dfefc558798e5f3af4e4548a391ec488d) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: added proxy command to CLI

## 2.5.3

### Patch Changes

- [#4195](https://github.com/refinedev/refine/pull/4195) [`18f955a064e`](https://github.com/refinedev/refine/commit/18f955a064ef7524eef3f4434fb030d30058b4f9) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): add file system check to find installed packages

  Updated the package find logic and added file system check for double checking if the package is installed or not.

## 2.5.2

### Patch Changes

- [#4195](https://github.com/refinedev/refine/pull/4195) [`18f955a064e`](https://github.com/refinedev/refine/commit/18f955a064ef7524eef3f4434fb030d30058b4f9) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): add file system check to find installed packages

  Updated the package find logic and added file system check for double checking if the package is installed or not.

## 2.5.1

### Patch Changes

- [#4195](https://github.com/refinedev/refine/pull/4195) [`18f955a064e`](https://github.com/refinedev/refine/commit/18f955a064ef7524eef3f4434fb030d30058b4f9) Thanks [@aliemir](https://github.com/aliemir)! - fix(cli): add file system check to find installed packages

  Updated the package find logic and added file system check for double checking if the package is installed or not.

## 2.5.0

### Minor Changes

- [#4187](https://github.com/refinedev/refine/pull/4187) [`014ad4d5e79`](https://github.com/refinedev/refine/commit/014ad4d5e79069b0a5e393d0bfc5e30f66f99c49) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use `require.resolve` to find script executables.

  Updated the runner command to use `require.resolve` to find the script executable. This allows the script to be run from anywhere in the project and allow mono-repos with workspaces to work.

- [#4187](https://github.com/refinedev/refine/pull/4187) [`014ad4d5e79`](https://github.com/refinedev/refine/commit/014ad4d5e79069b0a5e393d0bfc5e30f66f99c49) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use `require.resolve` to find refine package paths.

  Updated the refine package search to use `require.resolve` to find the package path. This allows the package to be run from anywhere in the project and allow mono-repos with workspaces to work.

## 2.4.0

### Minor Changes

- [#4187](https://github.com/refinedev/refine/pull/4187) [`014ad4d5e79`](https://github.com/refinedev/refine/commit/014ad4d5e79069b0a5e393d0bfc5e30f66f99c49) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use `require.resolve` to find script executables.

  Updated the runner command to use `require.resolve` to find the script executable. This allows the script to be run from anywhere in the project and allow mono-repos with workspaces to work.

- [#4187](https://github.com/refinedev/refine/pull/4187) [`014ad4d5e79`](https://github.com/refinedev/refine/commit/014ad4d5e79069b0a5e393d0bfc5e30f66f99c49) Thanks [@aliemir](https://github.com/aliemir)! - refactor: use `require.resolve` to find refine package paths.

  Updated the refine package search to use `require.resolve` to find the package path. This allows the package to be run from anywhere in the project and allow mono-repos with workspaces to work.

## 2.3.0

### Minor Changes

- [#4149](https://github.com/refinedev/refine/pull/4149) [`ca6a2b18576`](https://github.com/refinedev/refine/commit/ca6a2b185762e7dbae120da4090c47af5391fe45) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added required packages to install after swizzling.
  Now with this feature, users can automatically install the required packages after swizzling.

### Patch Changes

- [#4138](https://github.com/refinedev/refine/pull/4138) [`a15634d6621`](https://github.com/refinedev/refine/commit/a15634d66219f12de7cc195b5e97c9461e4b7164) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: When the project type is vite, the `refine dev` command was running `vite start`. It is now changed to `vite dev`, because there is no `start` command in vite.

## 2.2.0

### Minor Changes

- [#4149](https://github.com/refinedev/refine/pull/4149) [`ca6a2b18576`](https://github.com/refinedev/refine/commit/ca6a2b185762e7dbae120da4090c47af5391fe45) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - feat: added required packages to install after swizzling.
  Now with this feature, users can automatically install the required packages after swizzling.

### Patch Changes

- [#4138](https://github.com/refinedev/refine/pull/4138) [`a15634d6621`](https://github.com/refinedev/refine/commit/a15634d66219f12de7cc195b5e97c9461e4b7164) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - fix: When the project type is vite, the `refine dev` command was running `vite start`. It is now changed to `vite dev`, because there is no `start` command in vite.

## 2.1.2

### Patch Changes

- [#3976](https://github.com/refinedev/refine/pull/3976) [`7e793ee9dc3`](https://github.com/refinedev/refine/commit/7e793ee9dc343751e6e9ee8aeaf00260afdf1c50) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: added parcel support

  fixed: refine --version doesn't return refine cli's version.
  fixed: add error message if user tries to run script with unsupported package.
  fixed: added "unknown" project type as fallback.

## 2.1.1

### Patch Changes

- [#3976](https://github.com/refinedev/refine/pull/3976) [`7e793ee9dc3`](https://github.com/refinedev/refine/commit/7e793ee9dc343751e6e9ee8aeaf00260afdf1c50) Thanks [@BatuhanW](https://github.com/BatuhanW)! - feat: added parcel support

  fixed: refine --version doesn't return refine cli's version.
  fixed: add error message if user tries to run script with unsupported package.
  fixed: added "unknown" project type as fallback.

## 2.1.0

### Minor Changes

- Thanks [@aliemir](https://github.com/aliemir), [@alicanerdurmaz](https://github.com/alicanerdurmaz), [@batuhanW](https://github.com/batuhanW), [@salihozdemir](https://github.com/salihozdemir), [@yildirayunlu](https://github.com/yildirayunlu), [@recepkutuk](https://github.com/recepkutuk)!
  **Moving to the `@refinedev` scope 🎉🎉**

  Moved to the `@refinedev` scope and updated our packages to use the new scope. From now on, all packages will be published under the `@refinedev` scope with their new names.

  Now, we're also removing the `refine` prefix from all packages. So, the `@pankod/refine-core` package is now `@refinedev/core`, `@pankod/refine-antd` is now `@refinedev/antd`, and so on.

### Patch Changes

## 1.19.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 1.18.0

### Minor Changes

- [#3822](https://github.com/refinedev/refine/pull/3822) [`0baa99ba787`](https://github.com/refinedev/refine/commit/0baa99ba7874394d9d28d0a7b29c082c604258fb) Thanks [@BatuhanW](https://github.com/BatuhanW)! - - refine v4 release announcement added to "postinstall". - refine v4 is released 🎉 The new version is 100% backward compatible. You can upgrade to v4 with a single command! See the migration guide here: https://refine.dev/docs/migration-guide/3x-to-4x

## 1.17.2

### Patch Changes

- [#3685](https://github.com/refinedev/refine/pull/3685) [`b6812af2293`](https://github.com/refinedev/refine/commit/b6812af22931c6d505914e452756fafe2d56b96b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: `provideCliHelpers` function type error.

## 1.17.1

### Patch Changes

- [#3685](https://github.com/refinedev/refine/pull/3685) [`b6812af2293`](https://github.com/refinedev/refine/commit/b6812af22931c6d505914e452756fafe2d56b96b) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - - Fixed: `provideCliHelpers` function type error.

## 1.17.0

### Minor Changes

- [#3349](https://github.com/refinedev/refine/pull/3349) [`4853ac484df`](https://github.com/refinedev/refine/commit/4853ac484dfe8647050997a97183dcd44fc2d0cb) Thanks [@vanflux](https://github.com/vanflux)! - Ignoring "npm ls" exit code to get package list

### Patch Changes

- [#3367](https://github.com/refinedev/refine/pull/3367) [`e850fe25400`](https://github.com/refinedev/refine/commit/e850fe2540080ab7c5da75b76160e2b71d6f7148) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `ReferenceError: btoa is not defined`. #3366 use `Buffer.from` when `btoa` is `"undefined"` for base64 encoding.

## 1.16.0

### Minor Changes

- [#3349](https://github.com/refinedev/refine/pull/3349) [`4853ac484df`](https://github.com/refinedev/refine/commit/4853ac484dfe8647050997a97183dcd44fc2d0cb) Thanks [@vanflux](https://github.com/vanflux)! - Ignoring "npm ls" exit code to get package list

### Patch Changes

- [#3367](https://github.com/refinedev/refine/pull/3367) [`e850fe25400`](https://github.com/refinedev/refine/commit/e850fe2540080ab7c5da75b76160e2b71d6f7148) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `ReferenceError: btoa is not defined`. #3366 use `Buffer.from` when `btoa` is `"undefined"` for base64 encoding.

## 1.15.0

### Minor Changes

- [#3330](https://github.com/refinedev/refine/pull/3330) [`ff2b87f92af`](https://github.com/refinedev/refine/commit/ff2b87f92af66dc583e614f746646567d6d56eb9) Thanks [@aliemir](https://github.com/aliemir)! - Do not prompt the component selection if there is only one component to swizzle.

## 1.14.0

### Minor Changes

- [#3330](https://github.com/refinedev/refine/pull/3330) [`ff2b87f92af`](https://github.com/refinedev/refine/commit/ff2b87f92af66dc583e614f746646567d6d56eb9) Thanks [@aliemir](https://github.com/aliemir)! - Do not prompt the component selection if there is only one component to swizzle.

## 1.13.6

### Patch Changes

- [#3315](https://github.com/refinedev/refine/pull/3315) [`dda827e9a58`](https://github.com/refinedev/refine/commit/dda827e9a581b4427f6423740aed399090a5631f) Thanks [@yasnbouz](https://github.com/yasnbouz)! - Fixed: `Ctrl+c` not killing running dev; leaving ports open - #3175
  Fixed: terminal output color w/ env `FORCE_COLOR=true`

## 1.13.5

### Patch Changes

- [#3315](https://github.com/refinedev/refine/pull/3315) [`dda827e9a58`](https://github.com/refinedev/refine/commit/dda827e9a581b4427f6423740aed399090a5631f) Thanks [@yasnbouz](https://github.com/yasnbouz)! - Fixed: `Ctrl+c` not killing running dev; leaving ports open - #3175
  Fixed: terminal output color w/ env `FORCE_COLOR=true`

## 1.13.4

### Patch Changes

- [#3282](https://github.com/refinedev/refine/pull/3282) [`996b9077ea0`](https://github.com/refinedev/refine/commit/996b9077ea0c65a36550d0d6e5890652f6bc64bb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `npm -ls` was always throws an error. From now returns `null`, with this way `error` handling can be done when needed.

## 1.13.3

### Patch Changes

- [#3282](https://github.com/refinedev/refine/pull/3282) [`996b9077ea0`](https://github.com/refinedev/refine/commit/996b9077ea0c65a36550d0d6e5890652f6bc64bb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `npm -ls` was always throws an error. From now returns `null`, with this way `error` handling can be done when needed.

## 1.13.2

### Patch Changes

- [#3239](https://github.com/refinedev/refine/pull/3239) [`989ba9f13a1`](https://github.com/refinedev/refine/commit/989ba9f13a1f28cf23d8e4e9eb18ebb55cae1e61) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: the build command was exiting with "0" exit code on error - #3234

## 1.13.1

### Patch Changes

- [#3239](https://github.com/refinedev/refine/pull/3239) [`989ba9f13a1`](https://github.com/refinedev/refine/commit/989ba9f13a1f28cf23d8e4e9eb18ebb55cae1e61) Thanks [@omeraplak](https://github.com/omeraplak)! - fix: the build command was exiting with "0" exit code on error - #3234

## 1.13.0

### Minor Changes

- [#3136](https://github.com/refinedev/refine/pull/3136) [`b5b99b485f2`](https://github.com/refinedev/refine/commit/b5b99b485f213147a436c6fe7e69ef8974408981) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Downgrade `jscodeshift` `"^0.14.0"` to `"0.13.0"`.

### Patch Changes

- [#3133](https://github.com/refinedev/refine/pull/3133) [`87c875fcf51`](https://github.com/refinedev/refine/commit/87c875fcf51b7f1c88a4a3687d61a09ce3abbedb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: add await to `telemetry` `fetch()`

## 1.12.0

### Minor Changes

- [#3136](https://github.com/refinedev/refine/pull/3136) [`b5b99b485f2`](https://github.com/refinedev/refine/commit/b5b99b485f213147a436c6fe7e69ef8974408981) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Downgrade `jscodeshift` `"^0.14.0"` to `"0.13.0"`.

### Patch Changes

- [#3133](https://github.com/refinedev/refine/pull/3133) [`87c875fcf51`](https://github.com/refinedev/refine/commit/87c875fcf51b7f1c88a4a3687d61a09ce3abbedb) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: add await to `telemetry` `fetch()`

## 1.11.0

### Minor Changes

- [#3130](https://github.com/refinedev/refine/pull/3130) [`0b428512b98`](https://github.com/refinedev/refine/commit/0b428512b98ac010cbff9d343f6b12fa2980a662) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Removed UI framework requirement in `create-resource` command.

## 1.10.0

### Minor Changes

- [#3130](https://github.com/refinedev/refine/pull/3130) [`0b428512b98`](https://github.com/refinedev/refine/commit/0b428512b98ac010cbff9d343f6b12fa2980a662) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Removed UI framework requirement in `create-resource` command.

## 1.9.0

### Minor Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - - Updated command order (`swizzle` to the top)
  - Added installed packages notification at the start of the `swizzle` command.
  - Updated `swizzle` command to respect project file paths (`/src` or `/app`)
  - Added grouping option for installed packages at the first prompt of the `swizzle` command.
  - Syntax highlighting and improvements for `swizzle` success messages.

## 1.8.0

### Minor Changes

- [#3109](https://github.com/refinedev/refine/pull/3109) [`16549ed3012`](https://github.com/refinedev/refine/commit/16549ed30128750f04ae17da12024b9734d5adae) Thanks [@aliemir](https://github.com/aliemir)! - - Updated command order (`swizzle` to the top)
  - Added installed packages notification at the start of the `swizzle` command.
  - Updated `swizzle` command to respect project file paths (`/src` or `/app`)
  - Added grouping option for installed packages at the first prompt of the `swizzle` command.
  - Syntax highlighting and improvements for `swizzle` success messages.

## 1.7.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - `swizzle` command added to the CLI. 🎉

  It allows you to copy the latest version of supported components and functions to your project and customize it the way you want. `swizzle` command will prompt you with package and component selection, then copy the latest version of the component to your project and log the path of the copied files.

## 1.6.0

### Minor Changes

- [#3062](https://github.com/refinedev/refine/pull/3062) [`6c2ed708a9a`](https://github.com/refinedev/refine/commit/6c2ed708a9a76faddb9d27a0aca9f4ada3c270af) Thanks [@aliemir](https://github.com/aliemir)! - `swizzle` command added to the CLI. 🎉

  It allows you to copy the latest version of supported components and functions to your project and customize it the way you want. `swizzle` command will prompt you with package and component selection, then copy the latest version of the component to your project and log the path of the copied files.

## 1.5.3

### Patch Changes

- [#3101](https://github.com/refinedev/refine/pull/3101) [`355937d7032`](https://github.com/refinedev/refine/commit/355937d703280e6c8c3cd66d744d07363126f84d) Thanks [@omeraplak](https://github.com/omeraplak)! - No more joke for CLI :(

## 1.5.2

### Patch Changes

- [#3101](https://github.com/refinedev/refine/pull/3101) [`355937d7032`](https://github.com/refinedev/refine/commit/355937d703280e6c8c3cd66d744d07363126f84d) Thanks [@omeraplak](https://github.com/omeraplak)! - No more joke for CLI :(

## 1.5.1

### Patch Changes

- [#3092](https://github.com/refinedev/refine/pull/3092) [`984f1c21ab6`](https://github.com/refinedev/refine/commit/984f1c21ab66fedcedb8630248e7429f7d4f26c3) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: Warning command description changed according `refine CLI` installed or not.

  - If `refine CLI` is installed, It will be shown as `npm run refine update` command.
  - IF `refine CLI` is not installed, It will be shown as `npx refine update` command.
    - package manager will be detected automatically.

## 1.5.0

### Minor Changes

- [#3085](https://github.com/refinedev/refine/pull/3085) [`1ff8002f31d`](https://github.com/refinedev/refine/commit/1ff8002f31d5a9970d41c8853cbd5ed9a2d7059e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Inferencer support added to the resources created with the `refine-cli`.

## 1.4.0

### Minor Changes

- [#3085](https://github.com/refinedev/refine/pull/3085) [`1ff8002f31d`](https://github.com/refinedev/refine/commit/1ff8002f31d5a9970d41c8853cbd5ed9a2d7059e) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Inferencer support added to the resources created with the `refine-cli`.

## 1.3.1

### Patch Changes

- [#3083](https://github.com/refinedev/refine/pull/3083) [`9a2f3bd2d61`](https://github.com/refinedev/refine/commit/9a2f3bd2d6174e1cced430868ff63a3907b09e32) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: undefined `process.NODE_ENV` value set to the `development` from `production`.

## 1.3.0

### Minor Changes

- [#3067](https://github.com/refinedev/refine/pull/3067) [`6f83ddba2ad`](https://github.com/refinedev/refine/commit/6f83ddba2ad35f02f4aa352d0f1587fd61a9f704) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `whoami` command to `refine-cli`. It's shows details of the development environment.
  Added: telemetry to `refine-cli` commands.

### Patch Changes

- [#3080](https://github.com/refinedev/refine/pull/3080) [`407250fba24`](https://github.com/refinedev/refine/commit/407250fba2474b276944f80a69ee00d6ed253ced) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `@types/figlet` as a `devDependencies`

- [#3078](https://github.com/refinedev/refine/pull/3078) [`37fac3e9cfa`](https://github.com/refinedev/refine/commit/37fac3e9cfa05df59d8c14f3cb1d5c56b31f466d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `figlet` moved to `dependencies` from `devDependencies`

## 1.2.0

### Minor Changes

- [#3067](https://github.com/refinedev/refine/pull/3067) [`6f83ddba2ad`](https://github.com/refinedev/refine/commit/6f83ddba2ad35f02f4aa352d0f1587fd61a9f704) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `whoami` command to `refine-cli`. It's shows details of the development environment.
  Added: telemetry to `refine-cli` commands.

### Patch Changes

- [#3080](https://github.com/refinedev/refine/pull/3080) [`407250fba24`](https://github.com/refinedev/refine/commit/407250fba2474b276944f80a69ee00d6ed253ced) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: `@types/figlet` as a `devDependencies`

- [#3078](https://github.com/refinedev/refine/pull/3078) [`37fac3e9cfa`](https://github.com/refinedev/refine/commit/37fac3e9cfa05df59d8c14f3cb1d5c56b31f466d) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed: `figlet` moved to `dependencies` from `devDependencies`

## 1.1.4

### Patch Changes

- [`1fa9e25ac23`](https://github.com/refinedev/refine/commit/1fa9e25ac23c01a7a673d069d54aa2b6d3dc4701) Thanks [@omeraplak](https://github.com/omeraplak)! - Added some fun

## 1.1.3

### Patch Changes

- [#3063](https://github.com/refinedev/refine/pull/3063) [`949b8bd6ac9`](https://github.com/refinedev/refine/commit/949b8bd6ac9fbb50e5bc30b8521bb618b7ecdc1c) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Added unique check on `create-resource` with `refine-cli`.

## 1.1.2

### Patch Changes

- [#3058](https://github.com/refinedev/refine/pull/3058) [`5f43dc6361f`](https://github.com/refinedev/refine/commit/5f43dc6361fa4621f098d3411ac58d2bd6e4d2e8) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Added: The description of `dev`,`start`,`build` commands changed according to project type.

- [#3060](https://github.com/refinedev/refine/pull/3060) [`1a53f4c4699`](https://github.com/refinedev/refine/commit/1a53f4c46992b532946e5e5438cf909f446da8e2) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Rename command name `generate:resource` to `create-resource`.

  - Removed the requirement for the `resource name` parameter. Ask for `resource name` and `actions` with `inquirer`.
  - Add multiple resource create support. (`refine create-resource post category user`)

- [#3056](https://github.com/refinedev/refine/pull/3056) [`29417155780`](https://github.com/refinedev/refine/commit/294171557809ffa46d298b8aeeaa64392316aeee) Thanks [@alicanerdurmaz](https://github.com/alicanerdurmaz)! - Fixed `refine check-updates` showing packages when current version ahead of next

## 1.1.1

### Patch Changes

- [#3049](https://github.com/refinedev/refine/pull/3049) [`da4d6320580`](https://github.com/refinedev/refine/commit/da4d63205801824ece5a8ee5ba0c936d32496b90) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - - Fix `create-refine-app` argument error.
  - Add bin params on `refine-cli` package.json

## 1.1.0

### Minor Changes

- [#3028](https://github.com/refinedev/refine/pull/3028) [`2af26e9b91b`](https://github.com/refinedev/refine/commit/2af26e9b91bed8a8b5e5a6792deed398270cf7f5) Thanks [@yildirayunlu](https://github.com/yildirayunlu)! - Initial release for `@pankod/refine-cli` and `refine-create-app` 🎉
