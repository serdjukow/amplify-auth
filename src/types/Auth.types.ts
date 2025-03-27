import { GlobalSettings } from "./GlobalSettings.types";
import { User } from "./User.types";

export type CurrentData = {
  id: string;
  name: string;
};

export type CognitoUserGroup = {
  groupID: string;
  groupName: string;
};

export type CurrentCognitoUserType = {
  username: string;
  salutation: "Mr" | "Mrs";
  customUsername: string;
  userSUB: string;
  firstName: string;
  lastName: string;
  phone: string;
  fax: string;
  email: string;
  emailVerified: boolean;
  currentGroup: CognitoUserGroup;
  groups: CognitoUserGroup[];
  userID: string;
};

export type AuthDataProps = {
  isLoading: boolean;
  isAuth: boolean;
  cognitoUser: CurrentCognitoUserType | null;
  userData: User | null;
  globalSettings: GlobalSettings | null;
};

export type LoginErrorType = {
  code?: string;
  stack?: string;
  errno?: number;
  message?: string;
};
