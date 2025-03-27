import { Schema } from "queryClient";
import { getUserSessionStatusName } from "../options/enumoptions/UserSessionStatus";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export type UserSession = Schema["UserSession"]["type"];

export type CreateUserSessionInput = Schema["UserSession"]["createType"];

export type UpdateUserSessionInput = Schema["UserSession"]["updateType"];

export type UserSessionStatus = Schema["UserSessionStatus"]["type"];

export const UserSessionTypeKeys: TypeKeysEnum<UserSession> = {
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
  userID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.userID,
  },
  startTime: {
    type: "datetime",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(data.startTime) +
      " Uhr",
  },
  endTime: {
    type: "datetime",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      data.startTime
        ? utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(
            data.startTime,
          ) + " Uhr"
        : "",
  },
  duration: {
    type: "integer",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.duration ? data.duration.toString() : ""),
  },
  status: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => getUserSessionStatusName(data.status),
  },
};

export const isKeyOfUserSession = (key: string): key is keyof UserSession =>
  key in UserSessionTypeKeys;
