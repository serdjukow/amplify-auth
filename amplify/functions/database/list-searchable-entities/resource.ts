import { defineFunction } from "@aws-amplify/backend";

export const listSearchableEntities = defineFunction({
  name: "listSearchableEntities",
  entry: "./handler.ts",
  timeoutSeconds: 5 * 60,
  bundling: {
    minify: false,
  },
});
