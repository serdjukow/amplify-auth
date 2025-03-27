import { SelectionSet } from "aws-amplify/api";
import { InfiniteData } from "@tanstack/react-query";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const SentInvoiceSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "sentAt",
  "invoiceID",
  "invoice.*",
  "user.*",
  "userID",
  "emailBetreff",
  "emailInhalt",
  "receivers",
  "receiversCC",
  "rechnungDokument.*",
  "rechnungDokumentName",
] as const;

// @ts-ignore
export type SentInvoice = SelectionSet<
  Schema["SentInvoice"]["type"],
  typeof SentInvoiceSelectionSet
>;

export type CreateSentInvoiceInput = Schema["SentInvoice"]["createType"];

export type UpdateSentInvoiceInput = Schema["SentInvoice"]["updateType"];

export type InfiniteSentInvoiceList = {
  sentInvoiceList: SentInvoice[];
  nextToken: string | null;
};

export type InfiniteSentInvoiceData =
  | InfiniteData<InfiniteSentInvoiceList, unknown>
  | undefined;

export const SentInvoiceTypeKeys: TypeKeysEnum<SentInvoice> = {
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
  invoiceID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.invoiceID,
  },
  invoice: {
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
  rechnungDokument: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: () => "",
  },
  rechnungDokumentName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.rechnungDokumentName,
  },
};

export const isKeyOfSentInvoice = (key: string): key is keyof SentInvoice =>
  key in SentInvoiceTypeKeys;
