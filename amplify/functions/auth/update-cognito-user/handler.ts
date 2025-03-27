import {
  AdminGetUserCommand,
  AdminListGroupsForUserCommand,
  AdminRemoveUserFromGroupCommand,
  AdminSetUserPasswordCommand,
  AdminSetUserPasswordCommandInput,
  AdminUpdateUserAttributesCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import {
  addUserToGroup,
  cognitoClient,
  getCognitoUserFromUser,
} from "../../../auth/utils";
import type { Schema } from "../../../data/resource";
import { USER_POOL_ID } from "../../../utils";

const removeUserFromGroup = async (username: string, groupName: string) => {
  try {
    const removeUserFromGroupParams = {
      GroupName: groupName,
      UserPoolId: USER_POOL_ID,
      Username: username,
    };

    const adminRemoveUserFromGroupCommand = new AdminRemoveUserFromGroupCommand(
      removeUserFromGroupParams,
    );
    const removeFromGroupResponse = await cognitoClient.send(
      adminRemoveUserFromGroupCommand,
    );

    console.log("removeFromGroupResponse: ", removeFromGroupResponse);
  } catch (err) {
    console.log("Error on removing user from group: ", err);
  }
};

const changeUserPassword = async (username: string, password: string) => {
  const changeUserPasswordParams: AdminSetUserPasswordCommandInput = {
    UserPoolId: USER_POOL_ID,
    Username: username,
    Password: password,
    Permanent: true,
  };

  try {
    const changePasswordCommand = new AdminSetUserPasswordCommand(
      changeUserPasswordParams,
    );
    await cognitoClient.send(changePasswordCommand);
  } catch (err) {
    console.log("Error on changing user password: ", err);
  }
};

const updateUserAttributes = async (
  username: string,
  salutation: string,
  firstName: string,
  lastName: string,
  phone: string,
  group: string,
) => {
  // Add attribute custom:group to user if he is external
  try {
    const updateUserAttributesParams = {
      UserAttributes: [
        {
          Name: "gender",
          Value: salutation,
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
          Name: "phone_number",
          Value: phone,
        },
        {
          Name: "custom:group",
          Value: group,
        },
      ],
      UserPoolId: USER_POOL_ID,
      Username: username,
    };

    const adminUpdateUserAttributesCommand =
      new AdminUpdateUserAttributesCommand(updateUserAttributesParams);
    const updateUserAttributesResponse = await cognitoClient.send(
      adminUpdateUserAttributesCommand,
    );

    console.log("updateUserAttributesResponse: ", updateUserAttributesResponse);
  } catch (err) {
    console.log("Error on updating user attributes: ", err);
  }
};

type UpdateUserArgs = Schema["updateCognitoUser"]["args"];

const updateUser = async ({
  changePassword,
  password,
  groups,
  salutation,
  firstName,
  lastName,
  phone,
  username,
}: UpdateUserArgs) => {
  await updateUserAttributes(
    username,
    salutation,
    firstName,
    lastName,
    phone,
    groups.join(","),
  );

  const listGroupsForUserParams = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };

  const adminListGroupsForUserCommand = new AdminListGroupsForUserCommand(
    listGroupsForUserParams,
  );
  const userGroupsRequest = await cognitoClient.send(
    adminListGroupsForUserCommand,
  );

  const userGroups = userGroupsRequest.Groups;

  if (!userGroups) {
    throw new Error("Error on fetching user groups!");
  }

  for (const userGroup of userGroups) {
    if (!userGroup.GroupName) {
      continue;
    }

    if (!groups.includes(userGroup.GroupName)) {
      await removeUserFromGroup(username, userGroup.GroupName);
    }
  }

  for (const group of groups) {
    const inGroup = userGroups.find(
      (userGroup) => userGroup.GroupName === group,
    );

    if (!inGroup) {
      await addUserToGroup(group, username);
    }
  }

  if (changePassword) {
    await changeUserPassword(username, password);
  }

  const getUserParams = {
    UserPoolId: USER_POOL_ID /* required */,
    Username: username /* required */,
  };

  const adminGetUserCommand = new AdminGetUserCommand(getUserParams);
  const user = await cognitoClient.send(adminGetUserCommand);

  const cognitoUser = await getCognitoUserFromUser(user);

  return cognitoUser;
};

export const handler: Schema["updateCognitoUser"]["functionHandler"] = async (
  event,
) => {
  const cognitoUser = await updateUser(event.arguments);

  return cognitoUser;
};
