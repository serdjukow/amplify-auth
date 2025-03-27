import { SelectionSet } from "aws-amplify/api";
import { InfiniteData } from "@tanstack/react-query";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const SentTimesheetSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "sentAt",
  "orderID",
  "order.*",
  "user.*",
  "userID",
  "emailBetreff",
  "emailInhalt",
  "receivers",
  "receiversCC",
  "stundenzettelDokument.*",
  "stundenzettelDokumentName",
] as const;

// @ts-ignore
export type SentTimesheet = SelectionSet<
  Schema["SentTimesheet"]["type"],
  typeof SentTimesheetSelectionSet
>;

export type CreateSentTimesheetInput = Schema["SentTimesheet"]["createType"];

export type UpdateSentTimesheetInput = Schema["SentTimesheet"]["updateType"];

export type InfiniteSentTimesheetList = {
  sentTimesheetList: SentTimesheet[];
  nextToken: string | null;
};

export type InfiniteSentTimesheetData =
  | InfiniteData<InfiniteSentTimesheetList, unknown>
  | undefined;

export const SentTimesheetTypeKeys: TypeKeysEnum<SentTimesheet> = {
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
  sentAt: {
    type: "datetime",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(data.sentAt) +
      " Uhr",
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
  user: {
    type: "entity",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  userID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.userID,
  },
  emailBetreff: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.emailBetreff,
  },
  emailInhalt: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: true,
    formatter: (data) => data.emailInhalt,
  },
  receivers: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (data) => data.receivers.join(", "),
  },
  receiversCC: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (data) => data.receiversCC.join(", "),
  },
  stundenzettelDokument: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: () => "",
  },
  stundenzettelDokumentName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.stundenzettelDokumentName,
  },
};

export const isKeyOfSentTimesheet = (key: string): key is keyof SentTimesheet =>
  key in SentTimesheetTypeKeys;
