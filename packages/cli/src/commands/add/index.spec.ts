import { vi } from "vitest";
import { ProjectTypes } from "@definitions/projectTypes";
import * as utilsProject from "../../utils/project/index";
import * as utilsResource from "../../utils/resource/index";
import { getDefaultPath } from "./sub-commands/provider/create-providers";

describe("add", () => {
  it("should get default provider path for provider", () => {
    vi.spyOn(utilsProject, "getProjectType").mockReturnValue(ProjectTypes.VITE);

    vi.spyOn(utilsResource, "getProviderPath").mockReturnValue({
      alias: "test-alias",
      path: "test-path",
    });

    const path = getDefaultPath();
    expect(path).toEqual("test-path");
  });
});
