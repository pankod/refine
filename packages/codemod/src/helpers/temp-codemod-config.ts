import fs from "fs";

type ConfigFileSchema = {
  install: {
    [packageName: string]: string;
  };
  uninstall: string[];
};

const empty: ConfigFileSchema = {
  install: {},
  uninstall: [],
};

export const CONFIG_FILE_NAME = ".refine-codemod.json";

export class CodemodConfig {
  filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }

  private readFile(): ConfigFileSchema {
    try {
      const file = fs.readFileSync(this.filename, "utf8");
      if (file) {
        return JSON.parse(file) as ConfigFileSchema;
      }
      try {
        fs.writeFileSync(this.filename, JSON.stringify(empty));
      } catch (_error) {}

      return empty;
    } catch (error) {
      return empty;
    }
  }

  private updateFile(data: ConfigFileSchema): void {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(data));
    } catch (error) {}
  }

  addPackage(packageName: string, version?: string): void {
    const file = this.readFile();

    file.install[packageName] = version ?? "latest";

    this.updateFile(file);
  }

  removePackage(packageName: string): void {
    const file = this.readFile();

    file.uninstall.push(packageName);

    this.updateFile(file);
  }

  getInstalls(): { [packageName: string]: string } {
    return this.readFile().install;
  }

  getUninstalls(): string[] {
    return this.readFile().uninstall;
  }

  destroy(): void {
    try {
      fs.unlinkSync(this.filename);
    } catch (error) {}
  }
}
