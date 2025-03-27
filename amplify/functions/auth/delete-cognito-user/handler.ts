import {
  AdminDeleteUserCommand,
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient, getCognitoUserFromUser } from "../../../auth/utils";
import type { Schema } from "../../../data/resource";
import { USER_POOL_ID } from "../../../utils";

const deleteUser = async (username: string) => {
  const userParams = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };

  const adminGetUserCommand = new AdminGetUserCommand(userParams);
  const user = await cognitoClient.send(adminGetUserCommand);

  const cognitoUser = await getCognitoUserFromUser(user);

  if (!cognitoUser) {
    throw new Error("Der Benutzer konnte nicht gefunden werden");
  }

  const adminDeleteUserCommand = new AdminDeleteUserCommand(userParams);
  await cognitoClient.send(adminDeleteUserCommand);

  return cognitoUser;
};

export const handler: Schema["deleteCognitoUser"]["functionHandler"] = async (
  event,
) => {
  const { username } = event.arguments;

  const cognitoUser = await deleteUser(username);

  return cognitoUser;
};
