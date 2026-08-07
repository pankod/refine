import React from "react";

import type {
  ParsedParams,
  IResourceItem,
  Action,
  RouterProvider,
  AuthProvider,
} from "@refinedev/core";

export const posts = [
  {
    id: "1",
    title:
      "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
    slug: "ut-ad-et",
    content:
      "Cupiditate labore quaerat cum incidunt vel et consequatur modi illo. Et maxime aut commodi occaecati omnis. Est voluptatem quibusdam aliquam. Esse tenetur omnis eaque. Consequatur necessitatibus illum ipsum aspernatur architecto qui. Ut temporibus qui nobis. Reiciendis est magnam ipsa quasi dolor ipsa error. Et eaque cumque est. Eos et odit corporis delectus aut corrupti tempora velit. Perferendis ratione voluptas corrupti id temporibus nam.",
    categoryId: 1,
    status: "active",
    userId: 5,
    tags: [1, 2],
  },
  {
    id: "2",
    title: "Recusandae consectetur aut atque est.",
    slug: "consequatur-molestiae-rerum",
    content:
      "Quia ut autem. Hic dolorum magni est quisquam. Modi est id et est. Est sapiente velit iure non voluptatem natus enim. Distinctio ipsa repellendus est. Sunt ipsam dignissimos vero error est cumque eaque. Consequatur voluptas suscipit optio incidunt doloremque quia harum harum. Totam voluptatibus aperiam quia. Est omnis deleniti et aut at fugit temporibus debitis modi. Magni aut vel quod magnam.",
    categoryId: 2,
    status: "active",
    userId: 36,
    tags: [16, 30, 46],
  },
];

export const MockDataProvider = () => {
  return {
    create: () => Promise.resolve({ data: posts[0] }),
    createMany: () => Promise.resolve({ data: posts }),
    deleteOne: () => Promise.resolve({ data: posts[0] }),
    deleteMany: () => Promise.resolve({ data: [] }),
    getList: () => Promise.resolve({ data: posts, total: 2 }),
    getMany: () => Promise.resolve({ data: [...posts] }),
    getOne: () => Promise.resolve({ data: posts[0] }),
    update: () => Promise.resolve({ data: posts[0] }),
    updateMany: () => Promise.resolve({ data: [] }),
    getApiUrl: () => "https://api.fake-rest.refine.dev",
    custom: () => Promise.resolve({ data: [...posts] }),
  };
};

export const MockJSONServer = MockDataProvider() as any;

export const MockRouterProvider = ({
  pathname,
  params,
  resource,
  action,
  id,
  fns,
}: {
  pathname?: string;
  params?: ParsedParams;
  resource?: IResourceItem;
  action?: Action;
  id?: string;
  fns?: Partial<RouterProvider>;
} = {}): RouterProvider => {
  const routerProvider: RouterProvider = {
    go: () => {
      return ({ type, to }) => {
        if (type === "path") return to || "";
        return undefined;
      };
    },
    parse: () => {
      return () => {
        return {
          params: {
            ...params,
          },
          pathname,
          resource: resource,
          action: action,
          id: id || undefined,
        };
      };
    },
    back: () => {
      return () => undefined;
    },
    Link: ({ children, to, href, ...props }) => (
      <a href={to || href || ""} {...props}>
        {children}
      </a>
    ),
    ...fns,
  };

  return routerProvider;
};

export const MockLiveProvider: any = {
  subscribe: () => ({}),
  unsubscribe: () => ({}),
  publish: () => ({}),
};

export const MockAccessControlProvider: any = {
  can: () => Promise.resolve({ can: true }),
};

export const MockAuthProvider: AuthProvider = {
  login: async () => ({ success: true }),
  check: async () => ({ authenticated: true }),
  onError: async () => ({}),
  logout: async () => ({ success: true }),
};
