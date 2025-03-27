import { RefObject } from "react";
import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { FieldHandles } from "./Components.types";
import { Employee } from "./Employee.types";
import { TypeKeysEnum } from "./General.types";
import { Order } from "./Order.types";
import utils from "utils";

export const InvoiceEntrySelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "invoiceID",
  "invoice.*",
  "employeeID",
  "employee.*",
  "orderID",
  "order.*",
  "beginn",
  "ende",
  "pause",
  "hourlyRate",
  "hourlyRateSurcharge",
  "surcharge",
  "surcharges.*",
] as const;

// @ts-ignore
export type InvoiceEntry = SelectionSet<
  Schema["InvoiceEntry"]["type"],
  typeof InvoiceEntrySelectionSet
>;

export type CreateInvoiceEntryInput = Schema["InvoiceEntry"]["createType"] & {
  id: string;
};

export type UpdateInvoiceEntryInput = Schema["InvoiceEntry"]["updateType"];

export type Surcharge = Schema["Surcharge"]["type"];

export type SurchargeType = Schema["SurchargeType"]["type"];

export type InvoiceDayEntry = {
  isoDate: string;
  date: string;
  hours: number;
  hourlyRate: number;
  total: number;
};

type InvoiceEntriesFormResult = {
  invoiceEntryInputs: CreateInvoiceEntryInput[];
};

export type InvoiceEntriesFormHandles = {
  validateInvoiceEntriesForm(): InvoiceEntriesFormResult | null;
};

export type InvoiceEntryInput = {
  id: string;
  order: Order | InvoiceEntry["order"];
  employee: Employee | InvoiceEntry["employee"];
  beginn: Date | null;
  beginnInputRef: RefObject<FieldHandles | null>;
  ende: Date | null;
  endeInputRef: RefObject<FieldHandles | null>;
  pause: Date | null;
  pauseInputRef: RefObject<FieldHandles | null>;
  hourlyRate: number | "";
  hourlyRateInputRef: RefObject<FieldHandles | null>;
  hourlyRateSurcharge: number | "";
  hourlyRateSurchargeInputRef: RefObject<FieldHandles | null>;
  surcharge: number;
  surcharges: Surcharge[];
};

export const InvoiceEntryTypeKeys: TypeKeysEnum<InvoiceEntry> = {
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
  invoiceID: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.invoiceID,
  },
  invoice: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  orderID: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.orderID,
  },
  order: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  employeeID: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.employeeID,
  },
  employee: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  beginn: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.beginn),
  },
  ende: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.ende),
  },
  pause: {
    type: "time",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getTimeInGermanFromAWSTimeFormat(data.pause),
  },
  hourlyRate: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.hourlyRate.toLocaleString("de-DE") + " €",
  },
  hourlyRateSurcharge: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      data.hourlyRateSurcharge.toLocaleString("de-DE") + " €",
  },
  surcharge: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.surcharge.toLocaleString("de-DE") + " €",
  },
  surcharges: {
    type: "object",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfInvoiceEntry = (key: string): key is keyof InvoiceEntry =>
  key in InvoiceEntryTypeKeys;
