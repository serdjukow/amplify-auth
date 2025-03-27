import { defineFunction } from "@aws-amplify/backend";

export const deleteCognitoUser = defineFunction({
  name: "deleteCognitoUser",
  entry: "./handler.ts",
  bundling: {
    minify: false,
  },
});
