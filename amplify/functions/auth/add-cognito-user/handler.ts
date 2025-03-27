import {
  AdminCreateUserCommand,
  AdminCreateUserCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import {
  addUserToGroup,
  cognitoClient,
  getCognitoUserFromUser,
} from "../../../auth/utils";
import type { Schema } from "../../../data/resource";
import { USER_POOL_ID } from "../../../utils";

type AddUserArgs = Schema["addCognitoUser"]["args"];

const addNewUser = async ({
  email,
  temporaryPassword,
  groups,
  salutation,
  firstName,
  lastName,
  phone,
  username,
  userID,
}: AddUserArgs) => {
  const userAttributes: AdminCreateUserCommandInput["UserAttributes"] = [
    {
      Name: "email",
      Value: email,
    },
    {
      Name: "custom:group",
      Value: groups.join(","),
    },
    {
      Name: "custom:currentGroup",
      Value: groups[0],
    },
    {
      Name: "given_name",
      Value: firstName,
    },
    {
      Name: "family_name",
      Value: lastName,
    },
    {
      Name: "custom:username",
      Value: username,
    },
    {
      Name: "custom:userID",
      Value: userID,
    },
  ];

  if (salutation) {
    userAttributes.push({
      Name: "gender",
      Value: salutation,
    });
  }

  if (phone) {
    userAttributes.push({
      Name: "phone_number",
      Value: phone,
    });
  }

  const addNewUserParams: AdminCreateUserCommandInput = {
    UserPoolId: USER_POOL_ID,
    Username: email,
    TemporaryPassword: temporaryPassword,
    DesiredDeliveryMediums: ["EMAIL"],
    UserAttributes: userAttributes,
  };

  const adminCreateUserCommand = new AdminCreateUserCommand(addNewUserParams);
  const addedUser = await cognitoClient.send(adminCreateUserCommand);

  for (const group of groups) {
    await addUserToGroup(group, email);
  }

  if (!addedUser.User) {
    throw new Error("User not found!");
  }

  const cognitoUser = await getCognitoUserFromUser(addedUser.User);

  return cognitoUser;
};

export const handler: Schema["addCognitoUser"]["functionHandler"] = async (
  event,
) => {
  const cognitoUser = await addNewUser(event.arguments);

  return cognitoUser;
};
