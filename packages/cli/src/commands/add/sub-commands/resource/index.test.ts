import { vi } from "vitest";
import { ProjectTypes } from "@definitions/projectTypes";
import * as utilsProject from "../../../../utils/project/index";
import * as testTargetModule from "@commands/add/sub-commands/resource/create-resources";
import * as getCommandRootDir from "./get-command-root-dir";
import { existsSync, readFileSync, rmdirSync } from "fs-extra";

const srcDirPath = `${__dirname}/../../../..`;

describe("add", () => {
  beforeAll(() => {
    // useful for speed up the tests.
    vi.spyOn(console, "log").mockImplementation(() => {});

    vi.spyOn(testTargetModule, "installInferencer").mockImplementation(
      async () => {},
    );
  });

  it("should generate next js pages", async () => {
    vi.spyOn(utilsProject, "getProjectType").mockReturnValue(
      ProjectTypes.NEXTJS,
    );

    // if the execution path is left as it is, it will be "src\commands\add\sub-commands\resource",
    // so you will not be able to find the template directory unless you move it up.
    vi.spyOn(getCommandRootDir, "getCommandRootDir").mockReturnValue(
      srcDirPath,
    );

    const actions = testTargetModule.defaultActions;
    await testTargetModule.createResources({ actions: actions.join(",") }, [
      "tmps",
    ]);

    const nextComponentDirPath = `${srcDirPath}/components/tmps`;
    const nextPageRootDirPath = `${srcDirPath}/app`;

    expect(existsSync(nextComponentDirPath)).toBe(true);
    expect(existsSync(`${nextPageRootDirPath}/tmps`)).toBe(true);

    // cleanup
    rmdirSync(nextComponentDirPath, { recursive: true });
    rmdirSync(nextPageRootDirPath, { recursive: true });
  });

  it("should include use client in the component if use Next.js", () => {
    vi.spyOn(utilsProject, "getProjectType").mockReturnValue(
      ProjectTypes.NEXTJS,
    );

    vi.spyOn(getCommandRootDir, "getCommandRootDir").mockReturnValue(
      srcDirPath,
    );

    const actions = testTargetModule.defaultActions;
    testTargetModule.createResources({ actions: actions.join(",") }, ["tmps"]);

    const nextComponentDirPath = `${srcDirPath}/components/tmps`;

    actions.forEach((action) => {
      const componentFilePath = `${nextComponentDirPath}/${action}.tsx`;
      const componentContent = readFileSync(componentFilePath, "utf-8");
      expect(componentContent).toContain("use client");
    });

    // cleanup
    const nextPageRootDirPath = `${srcDirPath}/app`;
    rmdirSync(nextComponentDirPath, { recursive: true });
    rmdirSync(nextPageRootDirPath, { recursive: true });
  });

  it("should not include use client in the component if don't use Next.js", async () => {
    vi.spyOn(utilsProject, "getProjectType").mockReturnValue(
      ProjectTypes.REACT_SCRIPT,
    );

    vi.spyOn(getCommandRootDir, "getCommandRootDir").mockReturnValue(
      srcDirPath,
    );

    const actions = testTargetModule.defaultActions;
    await testTargetModule.createResources({ actions: actions.join(",") }, [
      "tmps",
    ]);

    const reactComponentRootDirPath = `${srcDirPath}/pages`;

    actions.forEach((action) => {
      const componentFilePath = `${reactComponentRootDirPath}/tmps/${action}.tsx`;
      const componentContent = readFileSync(componentFilePath, "utf-8");
      expect(componentContent).not.toContain("use client");
    });

    // cleanup
    rmdirSync(reactComponentRootDirPath, { recursive: true });
  });

  it.each([
    {
      resourceName: "blog-posts",
      folderName: "blog-posts",
      componentNamesByActions: {
        list: "BlogPostsList",
        create: "BlogPostsCreate",
        show: "BlogPostsShow",
        edit: "BlogPostsEdit",
      },
    },
    {
      resourceName: "blog-post",
      folderName: "blog-posts",
      componentNamesByActions: {
        list: "BlogPostList",
        create: "BlogPostCreate",
        show: "BlogPostShow",
        edit: "BlogPostEdit",
      },
    },
    {
      resourceName: "product",
      folderName: "products",
      componentNamesByActions: {
        list: "ProductList",
        create: "ProductCreate",
        show: "ProductShow",
        edit: "ProductEdit",
      },
    },
    {
      resourceName: "blogPosts",
      folderName: "blogposts",
      componentNamesByActions: {
        list: "BlogPostsList",
        create: "BlogPostsCreate",
        show: "BlogPostsShow",
        edit: "BlogPostsEdit",
      },
    },
  ])(
    "should generate components and folders for '$resourceName'",
    async (testCase) => {
      vi.spyOn(utilsProject, "getProjectType").mockReturnValue(
        ProjectTypes.VITE,
      );

      vi.spyOn(getCommandRootDir, "getCommandRootDir").mockReturnValue(
        srcDirPath,
      );

      const actions = ["list", "create", "show", "edit"] as const;
      await testTargetModule.createResources({ actions: actions.join(",") }, [
        testCase.resourceName,
      ]);

      const reactComponentRootDirPath = `${srcDirPath}/pages`;

      actions.forEach((action) => {
        const componentFilePath = `${reactComponentRootDirPath}/${testCase.folderName}/${action}.tsx`;
        const componentContent = readFileSync(componentFilePath, "utf-8");
        expect(componentContent).toContain(
          `const ${testCase.componentNamesByActions[action]} = () => {`,
        );
      });

      // cleanup
      rmdirSync(reactComponentRootDirPath, { recursive: true });
    },
  );
});
