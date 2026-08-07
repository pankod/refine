import React from "react";
import type {
  Action,
  DataProvider,
  IResourceItem,
  ParsedParams,
  RouterProvider,
} from "@refinedev/core";

export const categories = [
  {
    id: 16,
    title: "Numquam Saepe Illo",
  },
  {
    id: 7,
    title: "Sit Natus Voluptatibus",
  },
];

export const users = [
  {
    id: 21,
    firstName: "Eriberto",
    lastName: "Leannon",
    email: "dereck_king@hotmail.com",
    status: false,
    birthday: "2022-11-04T09:46:18.482Z",
    skills: ["redis", "swift", "angular"],
    avatar: [
      {
        name: "Eriberto.jpg",
        percent: 100,
        size: 40088,
        status: "done",
        type: "image/jpeg",
        uid: "rc-upload-1669061034217",
        url: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/670.jpg",
      },
    ],
  },
  {
    id: 49,
    firstName: "Tressie",
    lastName: "Reichel",
    email: "chanel.ullrich@yahoo.com",
    status: true,
    birthday: "2022-09-27T03:22:44.255Z",
    skills: ["postgresql", "refine", "tailwind"],
    avatar: [
      {
        name: "Tressie.jpg",
        percent: 100,
        size: 40088,
        status: "done",
        type: "image/jpeg",
        uid: "rc-upload-1669061034218",
        url: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/900.jpg",
      },
    ],
  },
];

export const tags = [
  {
    id: 5,
    title: "Error Eos Et",
  },
  {
    id: 9,
    title: "Nobis Et Ut",
  },
];

export const posts = [
  {
    id: 11,
    title: "Nobis exercitationem officia quia est.",
    slug: "provident-culpa-facere",
    content:
      "Non velit blanditiis optio quo quaerat nam aperiam. Odit tempore consequatur voluptatibus molestias. Est nemo aut. Fugit aliquam enim eveniet veritatis. Magni et aut. Consequatur aliquid rerum vero. Quaerat debitis enim magnam. Dolorem est delectus architecto et accusantium. Velit quia vero. Aut necessitatibus quia at consequatur soluta accusantium.",
    hit: 920557,
    category: {
      id: 16,
    },
    user: {
      id: 21,
      firstName: "Eriberto",
      lastName: "Leannon",
    },
    status: "draft",
    status_color: "orange",
    createdAt: "2022-04-02T08:25:44.933Z",
    publishedAt: "2021-08-10T08:07:39.705Z",
    image: [
      {
        url: "http://loremflickr.com/640/480/abstract",
        name: "77b8451c-3467-4072-a4cf-bddfd773c5ed",
        status: "done",
        type: "image/jpeg",
        uid: "cdf0ee1d-ccfe-4b7a-bc06-493531729487",
      },
    ],
    tags: [9],
    language: 2,
  },
  {
    id: 21,
    title: "Eaque in nesciunt.",
    slug: "quod-quos-commodi",
    content:
      "Ut velit quo. Sed beatae et sit ea. Perferendis pariatur doloremque deleniti sapiente. Doloribus iste est minima quam laboriosam quia aut. Voluptatem hic debitis. Aut et atque sapiente accusamus et labore consequatur quo eligendi. Harum debitis vel in repellat neque dolor. Dolores itaque eveniet minima aut hic ut incidunt officiis. Accusamus debitis quasi est sint recusandae illum ut unde. Doloribus rem et.",
    hit: 175149,
    category: {
      id: 7,
    },
    user: {
      id: 49,
      firstName: "Tressie",
      lastName: "Reichel",
    },
    status: "published",
    status_color: "lime",
    createdAt: "2022-09-24T08:33:21.883Z",
    publishedAt: "2021-09-01T08:33:43.753Z",
    image: [
      {
        url: "http://loremflickr.com/640/480/abstract",
        name: "496e010f-2db7-4809-8b83-21f735d4957b",
        status: "done",
        type: "image/jpeg",
        uid: "febbcad1-edbb-482a-9a08-b8069d18f1e7",
      },
    ],
    tags: [5, 9],
    language: 2,
  },
];

const data: Record<string, Array<any>> = {
  users,
  tags,
  posts,
  categories,
};

const MockDataProvider = (): DataProvider => {
  return {
    create: ({ resource = "posts" }) => {
      return Promise.resolve({ data: data[resource][0] });
    },
    createMany: ({ resource = "posts" }) =>
      Promise.resolve({ data: data[resource] }),
    deleteOne: ({ resource = "posts" }) =>
      Promise.resolve({ data: data[resource][0] }),
    deleteMany: () => Promise.resolve({ data: [] }),
    getList: ({ resource = "posts" }) => {
      return Promise.resolve({
        data: data[resource],
        total: data[resource].length,
      });
    },
    getMany: ({ resource = "posts" }) =>
      Promise.resolve({ data: [...data[resource]] }),
    getOne: ({ resource = "posts" }) => {
      return Promise.resolve({ data: data[resource][0] });
    },
    update: ({ resource = "posts" }) =>
      Promise.resolve({ data: data[resource][0] }),
    updateMany: () => Promise.resolve({ data: [] }),
    getApiUrl: () => "https://api.fake-rest.refine.dev",
    custom: () => Promise.resolve({ data: [...posts] as any }),
  };
};

export const MockJSONServer = MockDataProvider();

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

export const MockAccessControlProvider: any = {
  can: () => Promise.resolve({ can: true }),
};

export const MockLiveProvider: any = {
  subscribe: () => ({}),
  unsubscribe: () => ({}),
  publish: () => ({}),
};
