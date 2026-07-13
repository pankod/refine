import { NodeResolvePlugin } from "@esbuild-plugins/node-resolve";

export const markAsExternalPlugin = NodeResolvePlugin({
  extensions: [".js", "ts", "tsx", "jsx"],
  onResolved: (resolved) => {
    if (resolved.includes("node_modules")) {
      return {
        external: true,
      };
    }
    return resolved;
  },
});
