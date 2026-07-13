import { pickDataProvider } from ".";
import type { IResourceItem } from "../../../contexts/resource/types";

describe("pickDataProvider", () => {
  it("should return the dataProvider from the params", () => {
    expect(pickDataProvider("resourceName", "custom-provider", [])).toBe(
      "custom-provider",
    );
  });
  it("should return default if resource is not found in resources and no dataprovidername is provided", () => {
    expect(pickDataProvider("resourceName", undefined, [])).toBe("default");
  });
  it("should return resource's dataprovidername", () => {
    const resources: IResourceItem[] = [
      {
        name: "resourceName",
        meta: {
          dataProviderName: "custom-provider",
        },
      },
    ];

    expect(pickDataProvider("resourceName", undefined, resources)).toBe(
      "custom-provider",
    );
  });
  it("should return dataprovidername from params even if resource matches", () => {
    const resources: IResourceItem[] = [
      {
        name: "resourceName",
        meta: {
          dataProviderName: "custom-provider",
        },
      },
    ];

    expect(
      pickDataProvider("resourceName", "other-custom-provider", resources),
    ).toBe("other-custom-provider");
  });
});
