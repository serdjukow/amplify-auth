import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const TimesheetSubstituteSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "orderID",
  "order.*",
  "employeeID",
  "employee.*",
] as const;

export type TimesheetSubstitute = SelectionSet<
  Schema["TimesheetSubstitute"]["type"],
  typeof TimesheetSubstituteSelectionSet
>;

export type CreateTimesheetSubstituteInput =
  Schema["TimesheetSubstitute"]["createType"];

export type UpdateTimesheetSubstituteInput =
  Schema["TimesheetSubstitute"]["updateType"];

export const TimesheetSubstituteTypeKeys: TypeKeysEnum<TimesheetSubstitute> = {
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
  orderID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.orderID,
  },
  order: {
    type: "entity",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  employeeID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.employeeID,
  },
  employee: {
    type: "entity",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfTimesheetSubstitute = (
  key: string,
): key is keyof TimesheetSubstitute => key in TimesheetSubstituteTypeKeys;
