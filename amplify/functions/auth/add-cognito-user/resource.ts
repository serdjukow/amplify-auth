import { defineFunction } from "@aws-amplify/backend";

export const addCognitoUser = defineFunction({
  name: "addCognitoUser",
  entry: "./handler.ts",
  bundling: {
    minify: false,
  },
});
