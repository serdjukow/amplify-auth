import { defineFunction } from "@aws-amplify/backend";

export const listCognitoUsers = defineFunction({
  name: "listCognitoUsers",
  entry: "./handler.ts",
  bundling: {
    minify: false,
  },
});
