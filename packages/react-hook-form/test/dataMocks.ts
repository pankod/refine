import type {
  ParsedParams,
  IResourceItem,
  Action,
  RouterProvider,
} from "@refinedev/core";
import { useParams, useLocation, Link, useNavigate } from "react-router";

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
  },
  {
    id: 3,
    title: "Ea culpa eveniet dicta.",
    slug: "explicabo-est-aut",
    content:
      "Aut quo aspernatur quas veniam culpa dolorem sint occaecati. Vitae quos ut occaecati enim rerum sint. Et labore dolorem tenetur asperiores quam ea suscipit ab. Sed voluptatem eius esse exercitationem cumque at voluptatem ut perspiciatis. Sapiente ex blanditiis deserunt quam suscipit provident facilis modi voluptatibus. Facere voluptas velit quam ea. Voluptatum ipsam ratione optio consequatur nisi recusandae non. Est et iste id. Enim sunt non in ipsum reprehenderit laborum. Nisi aut sapiente voluptas tenetur molestiae.",
    category: 44,
    status: "draft",
    tags: [5, 7, 3],
  },
];

const MockDataProvider = () => {
  return {
    create: () => Promise.resolve({ data: posts[0] }),
    createMany: () => Promise.resolve({ data: posts }),
    deleteOne: () => Promise.resolve({ data: posts[0] }),
    deleteMany: () => Promise.resolve({ data: [] }),
    getList: () => Promise.resolve({ data: posts, total: 3 }),
    getMany: () => Promise.resolve({ data: [...posts] }),
    getOne: () => Promise.resolve({ data: posts[0] }),
    update: () => Promise.resolve({ data: posts[0] }),
    updateMany: () => Promise.resolve({ data: [] }),
    getApiUrl: () => "https://api.fake-rest.refine.dev",
    custom: () => Promise.resolve({ data: [...posts] }),
  };
};

export const MockJSONServer = MockDataProvider() as any;

export const MockRouterProvider = {
  useHistory: () => {
    const navigate = useNavigate();

    return {
      push: navigate,
      replace: (path: string) => {
        navigate(path, { replace: true });
      },
      goBack: () => {
        navigate(-1);
      },
    };
  },
  useLocation,
  useParams: () => {
    const params = useParams();

    return params as any;
  },
  Link,
  Prompt: () => null,
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
  const bindings: RouterProvider = {
    go: () => {
      return ({ type }) => {
        if (type === "path") return "";
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

  return bindings;
};
