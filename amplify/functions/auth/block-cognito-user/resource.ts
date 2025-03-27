import { defineFunction } from "@aws-amplify/backend";

export const blockCognitoUser = defineFunction({
  name: "blockCognitoUser",
  entry: "./handler.ts",
  bundling: {
    minify: false,
  },
});
