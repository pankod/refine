import type { AccessControlProvider } from "../src/contexts/accessControl/types";
import type { AuthProvider } from "../src/contexts/auth/types";
import type { DataProviders } from "../src/contexts/data/types";
import type { LiveProvider } from "../src/contexts/live/types";
import type { IResourceItem } from "../src/contexts/resource/types";
import type {
  Action,
  ParsedParams,
  RouterProvider,
} from "../src/contexts/router/types";

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
    tags: [16, 31, 45],
    nested: {
      title:
        "Necessitatibus necessitatibus id et cupiditate provident est qui amet.",
    },
  },
  {
    id: "2",
    title: "Recusandae consectetur aut atque est.",
    slug: "consequatur-molestiae-rerum",
    content:
      "Quia ut autem. Hic dolorum magni est quisquam. Modi est id et est. Est sapiente velit iure non voluptatem natus enim. Distinctio ipsa repellendus est. Sunt ipsam dignissimos vero error est cumque eaque. Consequatur voluptas suscipit optio incidunt doloremque quia harum harum. Totam voluptatibus aperiam quia. Est omnis deleniti et aut at fugit temporibus debitis modi. Magni aut vel quod magnam.",
    categoryId: 38,
    status: "active",
    userId: 36,
    tags: [16, 30, 46],
    nested: {
      title: "Recusandae consectetur aut atque est.",
    },
  },
];

export const categories = [
  { id: 1, name: "refine" },
  { id: 2, name: "react" },
];

const MockDataProvider = () => {
  return {
    default: {
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
    },
    categories: {
      create: () => Promise.resolve({ data: categories[0] }),
      createMany: () => Promise.resolve({ data: categories }),
      deleteOne: () => Promise.resolve({ data: categories[0] }),
      deleteMany: () => Promise.resolve({ data: [] }),
      getList: () => Promise.resolve({ data: categories, total: 2 }),
      getMany: () => Promise.resolve({ data: [...categories] }),
      getOne: () => Promise.resolve({ data: categories[0] }),
      update: () => Promise.resolve({ data: categories[0] }),
      updateMany: () => Promise.resolve({ data: [] }),
      getApiUrl: () => "https://categories.api.fake-rest.refine.dev",
      custom: () => Promise.resolve({ data: [...categories] }),
    },
  };
};

export const MockJSONServer = MockDataProvider() as DataProviders;

export const MockAccessControlProvider: AccessControlProvider = {
  can: () => Promise.resolve({ can: true }),
};

export const MockLiveProvider: LiveProvider = {
  subscribe: () => ({}),
  unsubscribe: () => ({}),
  publish: () => ({}),
};

export const mockRouterProvider = ({
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
    Link: () => null,
    ...fns,
  };

  return routerProvider;
};

export const mockAuthProvider: AuthProvider = {
  login: async () => ({ success: true }),
  logout: async () => ({ success: true }),
  onError: async () => ({}),
  check: async () => ({ authenticated: true }),
  getIdentity: async () => ({ name: "John Doe", avatar: "localhost:3000" }),
};
