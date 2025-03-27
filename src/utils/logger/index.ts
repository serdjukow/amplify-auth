import * as Sentry from "@sentry/react";
import { AuthDataProps } from "@/types";

const SHOW_LOGS = /* process.env.NODE_ENV === "development" */ true;

export const info = (...args: any[]) => {
  if (SHOW_LOGS) console.log(...args);

  // if(process.env.NODE_ENV === "production") {
  //   Sentry.captureMessage("this is a debug message", "debug");
  // }
};

export const infoToSentry = (
  contextInfo: string,
  message: string,
  contextData: any,
  authContext: AuthDataProps | null,
) => {
  Sentry.withScope((scope) => {
    if (authContext && authContext.isAuth && authContext.cognitoUser) {
      scope.setUser({
        username: authContext.cognitoUser.username,
        email: authContext.cognitoUser.email,
        name:
          authContext.cognitoUser.firstName +
          " " +
          authContext.cognitoUser.lastName,
      });
      scope.setContext("User Data", authContext.userData);
      scope.setContext("User", authContext.cognitoUser);
    }
    scope.setContext("Context", {
      contextInfo: contextInfo,
      message: message,
      contextData: contextData,
    });
    scope.setContext("Environment", { environment: process.env.NODE_ENV });
    scope.setLevel("info");
    Sentry.captureMessage(message);

    if (process.env.NODE_ENV === "development") {
      console.log("Captured Message: ", contextInfo, message, contextData);
    }
  });
};
