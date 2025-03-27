import { defineFunction } from "@aws-amplify/backend";

export const updateCognitoUser = defineFunction({
  name: "updateCognitoUser",
  entry: "./handler.ts",
  bundling: {
    minify: false,
  },
});
