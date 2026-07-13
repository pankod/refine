import { ProjectTypes } from "@definitions/projectTypes";
import { getProviderPath } from ".";

it("should get provider path", () => {
  expect(getProviderPath(ProjectTypes.NEXTJS)).toEqual({
    path: "src/providers",
    alias: "../src/providers",
  });

  expect(getProviderPath(ProjectTypes.REMIX)).toEqual({
    path: "app/providers",
    alias: "~/providers",
  });

  expect(getProviderPath(ProjectTypes.REMIX_VITE)).toEqual({
    path: "app/providers",
    alias: "~/providers",
  });

  expect(getProviderPath(ProjectTypes.REMIX_SPA)).toEqual({
    path: "app/providers",
    alias: "~/providers",
  });

  expect(getProviderPath(ProjectTypes.VITE)).toEqual({
    path: "src/providers",
    alias: "providers",
  });

  expect(getProviderPath(ProjectTypes.REACT_SCRIPT)).toEqual({
    path: "src/providers",
    alias: "providers",
  });

  expect(getProviderPath(ProjectTypes.CRACO)).toEqual({
    path: "src/providers",
    alias: "providers",
  });

  expect(getProviderPath(ProjectTypes.PARCEL)).toEqual({
    path: "src/providers",
    alias: "providers",
  });

  expect(getProviderPath(ProjectTypes.UNKNOWN)).toEqual({
    path: "src/providers",
    alias: "providers",
  });
});
