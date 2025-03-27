import { defineFunction, secret } from "@aws-amplify/backend";

export const sendMail = defineFunction({
  name: "sendMail",
  entry: "./handler.ts",
  timeoutSeconds: 5 * 60,
  environment: {
    EMAIL_SERVER: secret("email_server"),
    EMAIL_ADDRESS: secret("email_address"),
    EMAIL_PASSWORD: secret("email_password"),
  },
  bundling: {
    minify: false,
  },
});
