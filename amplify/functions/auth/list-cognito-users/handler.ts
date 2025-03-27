import { ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cognitoClient, getCognitoUserFromUser } from "../../../auth/utils";
import type { Schema } from "../../../data/resource";
import { CognitoUserType } from "../../../types";
import { USER_POOL_ID } from "../../../utils";

const getUsers = async (): Promise<CognitoUserType[]> => {
  const listUsersParams = {
    UserPoolId: USER_POOL_ID,
    Limit: 60,
  };

  const listUsersCommand = new ListUsersCommand(listUsersParams);

  const usersRequest = await cognitoClient.send(listUsersCommand);

  if (!usersRequest.Users) throw new Error("No users found in Cognito!");

  const userListPromises = usersRequest.Users.map((user) =>
    getCognitoUserFromUser(user),
  );

  const userList: CognitoUserType[] = await Promise.all(userListPromises);

  console.log("Loaded users: ", userList);
  return userList;
};

export const handler: Schema["listCognitoUsers"]["functionHandler"] =
  async () => {
    const users: CognitoUserType[] = await getUsers();

    return users;
  };
