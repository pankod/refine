import type { MetaQuery } from "@refinedev/core";
import {
  generateUseManySubscription,
  genereteUseManySubscription,
} from "../../src/utils";

describe("genereteUseManySubscription (deprecated)", () => {
  const resource = "post";
  const meta: MetaQuery = {
    operation: "posts",
    fields: ["id", "title", "createdAt"],
  };
  const ids = ["1", "2", "3"];

  it("should generate the same result as generateUseManySubscription", () => {
    const generateUseManySubscriptionResult = generateUseManySubscription({
      resource,
      meta,
      ids,
    });

    const genereteUseManySubscriptionResult = genereteUseManySubscription({
      resource,
      meta,
      ids,
    });

    expect(genereteUseManySubscriptionResult).toEqual(
      generateUseManySubscriptionResult,
    );
  });
});
