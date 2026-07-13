import {
  generateUseOneSubscription,
  genereteUseOneSubscription,
} from "../../src/utils";
import type { MetaQuery } from "@refinedev/core";

describe("genereteUseOneSubscription (deprecated)", () => {
  const resource = "post";
  const meta: MetaQuery = {
    operation: "post",
    fields: ["id", "title", "createdAt"],
  };
  const id = "1";

  it("should generate the same result as generateUseOneSubscription", () => {
    const generateUseOneSubscriptionResult = generateUseOneSubscription({
      resource,
      meta,
      id,
    });

    const genereteUseOneSubscriptionResult = genereteUseOneSubscription({
      resource,
      meta,
      id,
    });

    expect(genereteUseOneSubscriptionResult).toEqual(
      generateUseOneSubscriptionResult,
    );
  });
});
