import { getSalutationName } from "options";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export type User = Schema["User"]["type"];

export type CreateUserInput = Schema["User"]["createType"];

export type UpdateUserInput = Schema["User"]["updateType"];

export type CognitoUser = NonNullable<Schema["User"]["type"]["cognitoUser"]>;

export type UserSettings = Schema["User"]["type"]["userSettings"];

type UserFormResult = {
  userFormInput: CreateUserInput;
  userRoles: string[];
  password: string;
  changePassword: boolean;
};

export type UserFormHandles = {
  validateUserForm(): Promise<UserFormResult | null>;
};

export type UserSettingsFormHandles = {
  validateUserSettingsForm(): Promise<CreateUserInput | null>;
};

type UserPasswordFormResult = {
  oldPassword: string;
  newPassword: string;
};

export type UserPasswordFormHandles = {
  validateUserPasswordForm(): UserPasswordFormResult | null;
};

export const UserTypeKeys: TypeKeysEnum<User> = {
  id: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.id,
  },
  createdAt: {
    type: "datetime",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(data.createdAt) +
      " Uhr",
  },
  updatedAt: {
    type: "datetime",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(data.updatedAt) +
      " Uhr",
  },
  owner: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (data) => data.owner ?? "",
  },
  isUserActive: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.isUserActive ? "Ja" : "Nein"),
  },
  username: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.username,
  },
  userSUB: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.userSUB,
  },
  firstName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.firstName,
  },
  lastName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.lastName,
  },
  salutation: {
    type: "enum",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) =>
      data.salutation ? getSalutationName(data.salutation) : "",
  },
  email: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.email,
  },
  lastActive: {
    type: "timestamp",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateAndTimeInGermanFromAWSTimestampFormat(
        data.lastActive,
      ) + " Uhr",
  },
  phone: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.phone ?? "",
  },
  fax: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.fax ?? "",
  },
  avatar: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  select: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  userSettings: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  comments: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  documents: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  cognitoUser: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  cognitoUserGroup: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) =>
      data.cognitoUserGroup ? data.cognitoUserGroup.GroupName : "",
  },
  sentTimesheets: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  sentInvoices: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfUser = (key: string): key is keyof User =>
  key in UserTypeKeys;
