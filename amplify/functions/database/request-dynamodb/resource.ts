import { defineFunction } from "@aws-amplify/backend";

export const requestDynamoDB = defineFunction({
  name: "requestDynamoDB",
  entry: "./handler.ts",
  timeoutSeconds: 15 * 60,
  memoryMB: 2048,
  bundling: {
    minify: false,
  },
});
