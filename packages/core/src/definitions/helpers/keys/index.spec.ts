import { arrayReplace, arrayFindIndex, stripUndefined, keys } from ".";

describe("keys", () => {
  describe("keys()", () => {
    it("keys().get() === []", () => {
      const keyBuilder = keys();
      expect(keyBuilder.get()).toEqual([]);
    });

    it("keys().get() === []", () => {
      const keyBuilder = keys();
      expect(keyBuilder.get()).toEqual([]);
    });

    it("keys().get() === []", () => {
      const keyBuilder = keys();
      expect(keyBuilder.get()).toEqual([]);
    });
  });

  describe("keys().auth()", () => {
    it("keys().auth().get() === [auth]", () => {
      const keyBuilder = keys().auth();
      expect(keyBuilder.get()).toEqual(["auth"]);
    });

    it("keys().auth().get() === [auth]", () => {
      const keyBuilder = keys().auth();
      expect(keyBuilder.get()).toEqual(["auth"]);
    });

    it("keys().auth().get() === [auth]", () => {
      const keyBuilder = keys().auth();
      expect(keyBuilder.get()).toEqual(["auth"]);
    });

    it("keys().auth().action(login).get() === [auth, login]", () => {
      const keyBuilder = keys().auth().action("login");
      expect(keyBuilder.get()).toEqual(["auth", "login"]);
    });

    it("keys().auth().action(login).params({ username: 'test' }) === [auth, login, { username: test }]", () => {
      const keyBuilder = keys().auth().action("login").params({
        username: "test",
      });

      expect(keyBuilder.get()).toEqual(["auth", "login", { username: "test" }]);
    });
  });

  describe("keys().data()", () => {
    it("keys().data().get() === [data, default]", () => {
      const keyBuilder = keys().data();
      expect(keyBuilder.get()).toEqual(["data", "default"]);
    });

    it("keys().data('my-data-provider').get() === [data, my-data-provider]", () => {
      const keyBuilder = keys().data("my-data-provider");
      expect(keyBuilder.get()).toEqual(["data", "my-data-provider"]);
    });

    it("keys().data().resource(users).get() === [data, default, users]", () => {
      const keyBuilder = keys().data().resource("users");
      expect(keyBuilder.get()).toEqual(["data", "default", "users"]);
    });

    it("keys().data().resource(posts).action(list).get() === [data, default, posts, list]", () => {
      const keyBuilder = keys().data().resource("posts").action("list");
      expect(keyBuilder.get()).toEqual(["data", "default", "posts", "list"]);
    });

    it("keys().data().resource(posts).action(list).params({ page: 1 }).get() === [data, default, posts, list, { page: 1 }]", () => {
      const keyBuilder = keys()
        .data()
        .resource("posts")
        .action("list")
        .params({ page: 1 });
      expect(keyBuilder.get()).toEqual([
        "data",
        "default",
        "posts",
        "list",
        { page: 1 },
      ]);
    });

    it("keys().data().resource(posts).action(one).id(1).params({ foo: bar }).get() === [data, default, posts, one, 1, { foo: bar }]", () => {
      const keyBuilder = keys()
        .data()
        .resource("posts")
        .action("one")
        .id(1)
        .params({ foo: "bar" });
      expect(keyBuilder.get()).toEqual([
        "data",
        "default",
        "posts",
        "one",
        "1",
        { foo: "bar" },
      ]);
    });

    it("keys().data().mutation(update).params({ foo: bar }).get() === [data, update, { foo: bar }]", () => {
      const keyBuilder = keys()
        .data()
        .mutation("update")
        .params({ foo: "bar" });
      expect(keyBuilder.get()).toEqual(["data", "update", { foo: "bar" }]);
    });

    it("keys().data().mutation(custom).params({ foo: bar }).get() === [data, default, custom, { foo: bar }]", () => {
      const keyBuilder = keys()
        .data()
        .mutation("custom")
        .params({ foo: "bar" });
      expect(keyBuilder.get()).toEqual([
        "data",
        "default",
        "custom",
        { foo: "bar" },
      ]);
    });
  });

  describe("keys().access()", () => {
    it("keys().access().get() === [access]", () => {
      const keyBuilder = keys().access();
      expect(keyBuilder.get()).toEqual(["access"]);
    });

    it("keys().access().get() === [access]", () => {
      const keyBuilder = keys().access();
      expect(keyBuilder.get()).toEqual(["access"]);
    });

    it("keys().access().get() === [access]", () => {
      const keyBuilder = keys().access();
      expect(keyBuilder.get()).toEqual(["access"]);
    });

    it("keys().access().resource(users).get() === [access, users]", () => {
      const keyBuilder = keys().access().resource("users");
      expect(keyBuilder.get()).toEqual(["access", "users"]);
    });

    it("keys().access().resource(users).action(create).get() === [access, users, create]", () => {
      const keyBuilder = keys().access().resource("users").action("create");
      expect(keyBuilder.get()).toEqual(["access", "users", "create"]);
    });

    it("keys().access().resource(users).action(create).params({ foo: bar }).get() === [access, users, create, { foo: bar }]", () => {
      const keyBuilder = keys()
        .access()
        .resource("users")
        .action("create")
        .params({ foo: "bar" });
      expect(keyBuilder.get()).toEqual([
        "access",
        "users",
        "create",
        { foo: "bar" },
      ]);
    });
  });

  describe("keys().audit()", () => {
    it("keys().audit().get() === [audit]", () => {
      const keyBuilder = keys().audit();
      expect(keyBuilder.get()).toEqual(["audit"]);
    });

    it("keys().audit().get() === [audit]", () => {
      const keyBuilder = keys().audit();
      expect(keyBuilder.get()).toEqual(["audit"]);
    });

    it("keys().audit().get() === [audit]", () => {
      const keyBuilder = keys().audit();
      expect(keyBuilder.get()).toEqual(["audit"]);
    });

    it("keys().audit().action(rename).get() === [audit, rename]", () => {
      const keyBuilder = keys().audit().action("rename");
      expect(keyBuilder.get()).toEqual(["audit", "rename"]);
    });

    it("keys().audit().resource(posts).action(list).params({ foo: bar }).get() === [audit, posts, list, { foo: bar }]", () => {
      const keyBuilder = keys()
        .audit()
        .resource("posts")
        .action("list")
        .params({ foo: "bar" });
      expect(keyBuilder.get()).toEqual([
        "audit",
        "posts",
        "list",
        { foo: "bar" },
      ]);
    });
  });
});

describe("array-replace", () => {
  it("arrayReplace([1, 2, 3, 4, 5], [2, 3], [6, 7]) === [1, 6, 7, 4, 5]", () => {
    expect(arrayReplace([1, 2, 3, 4, 5], [2, 3], [6, 7])).toEqual([
      1, 6, 7, 4, 5,
    ]);
  });

  it("arrayReplace([1, 2, 3, 4, 5], [2, 3], [6, 7, 8]) === [1, 6, 7, 8, 4, 5]", () => {
    expect(arrayReplace([1, 2, 3, 4, 5], [2, 3], [6, 7, 8])).toEqual([
      1, 6, 7, 8, 4, 5,
    ]);
  });

  it("arrayReplace([1, 2, 3, 4, 5], [2, 3], [6]) === [1, 6, 4, 5]", () => {
    expect(arrayReplace([1, 2, 3, 4, 5], [2, 3], [6])).toEqual([1, 6, 4, 5]);
  });

  it("arrayReplace([1, 2, 3, 4, 5], [2, 3], [6, 7, 8, 9]) === [1, 6, 7, 8, 9, 4, 5]", () => {
    expect(arrayReplace([1, 2, 3, 4, 5], [2, 3], [6, 7, 8, 9])).toEqual([
      1, 6, 7, 8, 9, 4, 5,
    ]);
  });

  it("arrayReplace([1, 2, 3, 4, 5], [2, 3], [6, 7, 8, 9, 10]) === [1, 6, 7, 8, 9, 10, 4, 5]", () => {
    expect(arrayReplace([1, 2, 3, 4, 5], [2, 3], [6, 7, 8, 9, 10])).toEqual([
      1, 6, 7, 8, 9, 10, 4, 5,
    ]);
  });
});

describe("array-find-index", () => {
  it("arrayFindIndex([1, 2, 3, 4, 5], [2, 3]) === 1", () => {
    expect(arrayFindIndex([1, 2, 3, 4, 5], [2, 3])).toEqual(1);
  });

  it("arrayFindIndex([1, 2, 3, 4, 5], [2, 3, 4]) === 1", () => {
    expect(arrayFindIndex([1, 2, 3, 4, 5], [2, 3, 4])).toEqual(1);
  });

  it("arrayFindIndex([1, 2, 3, 4, 5], [ 3, 4, 5]) === 2", () => {
    expect(arrayFindIndex([1, 2, 3, 4, 5], [3, 4, 5])).toEqual(2);
  });

  it("arrayFindIndex([1, 2, 3, 4, 5], [2, 3, 4, 5, 6]) === -1", () => {
    expect(arrayFindIndex([1, 2, 3, 4, 5], [2, 3, 4, 5, 6])).toEqual(-1);
  });

  it("arrayFindIndex([1, 2, 3, 4, 5], [4, 3]) === -1", () => {
    expect(arrayFindIndex([1, 2, 3, 4, 5], [4, 3])).toEqual(-1);
  });
});

describe("strip-undefined", () => {
  it("stripUndefined([1, undefined, 2, undefined, 3]) === [1, 2, 3]", () => {
    expect(stripUndefined([1, undefined, 2, undefined, 3])).toEqual([1, 2, 3]);
  });
});
