import React from "react";
import { CognitoUser, User } from "types";
import { CheckIcon, CrossIcon } from "components";

type EnabledColumnFormatterProps = {
  user: User;
  cognitoUserList: CognitoUser[];
};

const EnabledColumnFormatter: React.FC<EnabledColumnFormatterProps> = ({
  user,
  cognitoUserList,
}) => {
  const cognitoUser = cognitoUserList.find(
    (cognitoUserItem) => cognitoUserItem.userSUB === user.userSUB,
  );

  if (!cognitoUser) {
    return <></>;
  }

  return cognitoUser.enabled ? <CheckIcon /> : <CrossIcon />;
};

export default EnabledColumnFormatter;
