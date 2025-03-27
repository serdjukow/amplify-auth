import {
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient, getCognitoUserFromUser } from "../../../auth/utils";
import type { Schema } from "../../../data/resource";
import { USER_POOL_ID } from "../../../utils";

const blockUser = async (blocked: boolean, username: string) => {
  const userParams = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };

  if (blocked) {
    const adminDisableUserCommand = new AdminDisableUserCommand(userParams);
    await cognitoClient.send(adminDisableUserCommand);
  } else {
    const adminEnableUserCommand = new AdminEnableUserCommand(userParams);
    await cognitoClient.send(adminEnableUserCommand);
  }

  const adminGetUserCommand = new AdminGetUserCommand(userParams);
  const user = await cognitoClient.send(adminGetUserCommand);

  const cognitoUser = await getCognitoUserFromUser(user);

  return cognitoUser;
};

export const handler: Schema["blockCognitoUser"]["functionHandler"] = async (
  event,
) => {
  const { blocked, username } = event.arguments;

  const cognitoUser = await blockUser(blocked, username);

  return cognitoUser;
};
