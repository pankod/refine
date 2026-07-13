export type SwizzleFile = {
  /**
   * Group name of the item to group by
   */
  group: string;
  /**
   * Name of the item to display
   */
  label: string;
  /**
   * Array of files with source and destination. `transform` can also be provided to perform transform actions specific to the file.
   */
  files: {
    src: string;
    dest: string;
    transform?: (content: string) => string;
  }[];
  /**
   * Success message shown after swizzle is complete. Supports markdown features.
   */
  message?: string;
  /**
   * Array of packages to install after swizzling
   */
  requiredPackages?: string[];
};

export type SwizzleConfig = {
  /**
   * Array of swizzle items
   */
  items: Array<SwizzleFile>;
  /**
   * Transform function to perform on every swizzled file
   */
  transform?: (content: string, src: string, dest: string) => string;
};

export type RefineConfig = {
  name?: string;
  group?: string;
  /**
   * Swizzle configuration of the package
   */
  swizzle: SwizzleConfig;
};
