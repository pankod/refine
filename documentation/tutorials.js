module.exports = {
  tutorial: {
    label: "Tutorial",
    path_prefix_segment: "tutorial",
    defaultParameters: {
      routerSelection: "react-router",
      uiSelection: "ant-design",
    },
    parameterOptions: {
      routerSelection: [
        {
          label: "React Router",
          value: "react-router",
        },
        {
          label: "Next.js",
          value: "next-js",
          status: "coming-soon",
        },
      ],
      uiSelection: [
        {
          label: "Ant Design",
          value: "ant-design",
        },
        {
          label: "Material UI",
          value: "material-ui",
        },
      ],
    },
    units: [
      {
        title: "Essentials",
        id: "essentials",
        items: [
          "essentials/intro/index",
          "essentials/setup/index",
          "essentials/data-fetching/intro/index",
          "essentials/data-fetching/fetching-data/index",
          "essentials/data-fetching/updating-data/index",
          "essentials/data-fetching/listing-data/index",
          "essentials/forms/index",
          "essentials/tables/index",
        ],
      },
      {
        title: "Authentication",
        id: "authentication",
        items: [
          "authentication/intro/index", // intro
          "authentication/protecting-content/index", // authProvider, check, useIsAuthenticated, <Authenticated />
          "authentication/logging-in-out/index", // useLogin, useLogout, login, logout
          "authentication/user-identity/index", // useGetIdentity, getIdentity
          "authentication/data-provider-integration/index", // onError, dataProvider
        ],
      },
      {
        title: "Routing",
        id: "routing",
        items: [
          "routing/intro/:routerSelection/index",
          "routing/authentication/:routerSelection/index",
          "routing/resource-definition/:routerSelection/index",
          "routing/navigation/:routerSelection/index",
          "routing/inferring-parameters/:routerSelection/index",
          "routing/redirects/:routerSelection/index",
          "routing/syncing-state/:routerSelection/index",
        ],
      },
      {
        title: "UI Libraries",
        id: "ui-libraries",
        items: [
          "ui-libraries/intro/:uiSelection/:routerSelection/index", // introduction, installation, wrapping if necessary
          "ui-libraries/layout/:uiSelection/:routerSelection/index", // layout, sider, header
          "ui-libraries/refactoring/:uiSelection/:routerSelection/index", // form and table refactoring, show with field components
          "ui-libraries/crud-components/:uiSelection/:routerSelection/index", // crud component refactoring, show, list, edit, create
          "ui-libraries/notifications/:uiSelection/:routerSelection/index", // notifications, useNotificationProvider to pass
          "ui-libraries/authentication/:uiSelection/:routerSelection/index", // login, logout, useAuthenticated, useIdentity
        ],
      },
      {
        title: "Next Steps",
        id: "next-steps",
        items: [
          "next-steps/intro/:uiSelection/index",
          "next-steps/inferencer/:routerSelection/:uiSelection/index",
          "next-steps/cli/:routerSelection/:uiSelection/index",
          "next-steps/devtools/:routerSelection/:uiSelection/index",
          "next-steps/summary/:routerSelection/:uiSelection/index",
        ],
      },
    ],
  },
  parameterOptions: {
    routerSelection: [
      {
        label: "React Router",
        value: "react-router",
      },
      {
        label: "Next.js",
        value: "next-js",
        status: "coming-soon",
      },
    ],
    uiSelection: [
      {
        label: "Ant Design",
        value: "ant-design",
      },
      {
        label: "Material UI",
        value: "material-ui",
        status: "coming-soon",
      },
    ],
  },
  units: [
    {
      title: "Essentials",
      id: "essentials",
      items: [
        "essentials/intro/index",
        "essentials/setup/index",
        "essentials/data-fetching/intro/index",
        "essentials/data-fetching/fetching-data/index",
        "essentials/data-fetching/updating-data/index",
        "essentials/data-fetching/listing-data/index",
        "essentials/forms/index",
        "essentials/tables/index",
      ],
    },
    {
      title: "Authentication",
      id: "authentication",
      items: [
        "authentication/intro/index", // intro
        "authentication/protecting-content/index", // authProvider, check, useIsAuthenticated, <Authenticated />
        "authentication/logging-in-out/index", // useLogin, useLogout, login, logout
        "authentication/user-identity/index", // useGetIdentity, getIdentity
        "authentication/data-provider-integration/index", // onError, dataProvider
      ],
    },
    {
      title: "Routing",
      id: "routing",
      items: [
        "routing/intro/:routerSelection/index",
        "routing/authentication/:routerSelection/index",
        "routing/resource-definition/:routerSelection/index",
        "routing/navigation/:routerSelection/index",
        "routing/inferring-parameters/:routerSelection/index",
        "routing/redirects/:routerSelection/index",
        "routing/syncing-state/:routerSelection/index",
      ],
    },
    {
      title: "UI Libraries",
      id: "ui-libraries",
      items: [
        "ui-libraries/intro/:uiSelection/:routerSelection/index", // introduction, installation, wrapping if necessary
        "ui-libraries/layout/:uiSelection/:routerSelection/index", // layout, sider, header
        "ui-libraries/refactoring/:uiSelection/:routerSelection/index", // form and table refactoring, show with field components
        "ui-libraries/crud-components/:uiSelection/:routerSelection/index", // crud component refactoring, show, list, edit, create
        "ui-libraries/notifications/:uiSelection/:routerSelection/index", // notifications, useNotificationProvider to pass
        "ui-libraries/authentication/:uiSelection/:routerSelection/index", // login, logout, useAuthenticated, useIdentity
      ],
    },
    {
      title: "Next Steps",
      id: "next-steps",
      items: [
        "next-steps/intro/:uiSelection/index",
        "next-steps/inferencer/:routerSelection/:uiSelection/index",
        "next-steps/cli/:routerSelection/index",
        "next-steps/devtools/:routerSelection/index",
        "next-steps/summary/index",
      ],
    },
  ],
};
