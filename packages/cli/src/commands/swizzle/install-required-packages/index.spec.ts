import { vi } from "vitest";
import inquirer from "inquirer";
import { installPackages, getPreferedPM } from "@utils/package";
import * as utils from "./utils";

vi.mock("inquirer");
vi.mock("@utils/package");

const getPreferedPMMock = getPreferedPM as vi.MockedFunction<
  typeof getPreferedPM
>;
const inquirerMock = inquirer as vi.Mocked<typeof inquirer>;
const installPackagesMock = installPackages as vi.MockedFunction<
  typeof installPackages
>;

import * as installRequiredPackages from "./index";

describe("should prompt for package installation and install packages if confirmed", () => {
  afterEach(() => {
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("should install required packages", async () => {
    inquirerMock.prompt.mockResolvedValueOnce({
      installRequiredPackages: true,
    });

    const requiredPackages = ["react", "react-dom"];

    const installRequiredPackagesSpy = vi.spyOn(
      installRequiredPackages,
      "installRequiredPackages",
    );
    const promptForPackageInstallationSpy = vi.spyOn(
      utils,
      "promptForPackageInstallation",
    );
    const displayManualInstallationCommandSpy = vi.spyOn(
      utils,
      "displayManualInstallationCommand",
    );

    await installRequiredPackages.installRequiredPackages(requiredPackages);

    expect(installRequiredPackagesSpy).toHaveBeenCalledTimes(1);
    expect(installRequiredPackagesSpy).toHaveBeenCalledWith(requiredPackages);

    expect(promptForPackageInstallationSpy).toHaveBeenCalledTimes(1);
    expect(promptForPackageInstallationSpy).toHaveBeenCalledWith(
      requiredPackages,
    );

    expect(displayManualInstallationCommandSpy).toHaveBeenCalledTimes(0);

    expect(installPackagesMock).toHaveBeenCalledTimes(1);
    expect(installPackagesMock).toHaveBeenCalledWith(requiredPackages);
  });

  it("should display manual installation command if not confirmed", async () => {
    inquirerMock.prompt.mockResolvedValueOnce({
      installRequiredPackages: false,
    });
    getPreferedPMMock.mockResolvedValueOnce({
      name: "npm",
      version: "1",
    });

    const requiredPackages = ["react", "react-dom"];

    const installRequiredPackagesSpy = vi.spyOn(
      installRequiredPackages,
      "installRequiredPackages",
    );
    const promptForPackageInstallationSpy = vi.spyOn(
      utils,
      "promptForPackageInstallation",
    );
    const displayManualInstallationCommandSpy = vi.spyOn(
      utils,
      "displayManualInstallationCommand",
    );
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await installRequiredPackages.installRequiredPackages(requiredPackages);

    expect(installRequiredPackagesSpy).toHaveBeenCalledTimes(1);
    expect(installRequiredPackagesSpy).toHaveBeenCalledWith(requiredPackages);

    expect(promptForPackageInstallationSpy).toHaveBeenCalledTimes(1);
    expect(promptForPackageInstallationSpy).toHaveBeenCalledWith(
      requiredPackages,
    );

    expect(displayManualInstallationCommandSpy).toHaveBeenCalledTimes(1);
    expect(displayManualInstallationCommandSpy).toHaveBeenCalledWith(
      requiredPackages,
    );
    expect(getPreferedPM).toHaveBeenCalledTimes(1);

    expect(installPackagesMock).toHaveBeenCalledTimes(0);

    expect(consoleSpy).toHaveBeenCalledWith(
      "\nYou can install them manually by running this command:",
    );
  });
});
