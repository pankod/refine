import { getActionRoutesFromResource } from "../get-action-routes-from-resource";

describe("getActionRoutesFromResource", () => {
  it("should return empty array if no actions are found", () => {
    const result = getActionRoutesFromResource(
      {
        name: "users",
        meta: {},
      },
      [],
    );

    expect(result).toEqual([]);
  });

  it("should return the default routes for a given resource", () => {
    const result = getActionRoutesFromResource(
      {
        name: "users",
        meta: {},
        list: "/users",
        create: "/users/create",
        edit: "/users/edit/:id",
        show: "/users/show/:id",
        clone: "/users/clone/:id",
      },
      [],
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: "list",
          route: "/users",
        }),
        expect.objectContaining({
          action: "create",
          route: "/users/create",
        }),
        expect.objectContaining({
          action: "edit",
          route: "/users/edit/:id",
        }),
        expect.objectContaining({
          action: "show",
          route: "/users/show/:id",
        }),
        expect.objectContaining({
          action: "clone",
          route: "/users/clone/:id",
        }),
      ]),
    );
  });

  it("should return the default routes for a given resource without parent prefix", () => {
    const result = getActionRoutesFromResource(
      {
        name: "users",
        meta: {
          parent: "orgs",
        },
        edit: "/users/edit/:id",
      },
      [],
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: "edit",
          route: "/users/edit/:id",
        }),
      ]),
    );
  });

  it("should use the specific route ", () => {
    const result = getActionRoutesFromResource(
      {
        name: "users",
        meta: {},
        list: "/super-cool-nesting/users/list",
      },
      [],
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          action: "list",
          route: "/super-cool-nesting/users/list",
        }),
      ]),
    );
  });
});
