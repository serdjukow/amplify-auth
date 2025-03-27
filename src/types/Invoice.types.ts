import { SelectionSet } from "aws-amplify/api";
import { InfiniteData } from "@tanstack/react-query";
import { getInvoiceStatusName, getInvoiceTypeName } from "options";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import {
  CreateInvoiceEntryInput,
  InvoiceDayEntry,
  InvoiceEntry,
} from "./InvoiceEntry.types";
import { PrintPDFDocument, PrintPage } from "./Print.types";
import utils from "utils";

export const InvoiceSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "rechnungsTyp",
  "rechnungsNummer",
  "rechnungsDatum",
  "faelligkeitsDatum",
  "customerID",
  "customer.*",
  "customer.ehemaligeAdressen.*",
  "contactID",
  "contact.*",
  "cancelledInvoiceID",
  "cancelledInvoice.*",
  "veranstaltungsort",
  "invoiceStatus",
  "summe",
  "anmerkungen",
  "invoiceEntries.*",
  "invoiceEntries.order.*",
  "invoiceEntries.employee.*",
  "invoiceEntries.surcharges.*",
  "orders.*",
  "cancelledOrders.*",
  "cancelledInvoices.*",
] as const;

// @ts-ignore
export type Invoice = SelectionSet<
  Schema["Invoice"]["type"],
  typeof InvoiceSelectionSet
>;

export type CreateInvoiceInput = Schema["Invoice"]["createType"];

export type UpdateInvoiceInput = Schema["Invoice"]["updateType"];

export type InvoiceStatus = Schema["InvoiceStatus"]["type"];

export type InvoiceType = Schema["InvoiceType"]["type"];

export type InfiniteInvoiceList = {
  invoiceList: Invoice[];
  nextToken: string | null;
};

export type InfiniteInvoiceData = InfiniteData<InfiniteInvoiceList>;

export type InvoiceDocument = {
  invoice: Invoice;
  invoiceEntryList: InvoiceEntry[];
  invoiceDayEntryList: InvoiceDayEntry[];
  pages: PrintPage<InvoiceDayEntry>[];
  employeePages: PrintPage<InvoiceEntry>[];
  documentName: string;
};

export type InvoicePrintDocument = InvoiceDocument & {
  pdfDocument: PrintPDFDocument;
};

type InvoiceFormResult = {
  invoiceFormInput: CreateInvoiceInput;
  invoiceEntryInputs: CreateInvoiceEntryInput[];
};

export type InvoiceFormHandles = {
  validateInvoiceForm(): InvoiceFormResult | null;
  resetInvoiceForm(): void;
};

export const InvoiceTypeKeys: TypeKeysEnum<Invoice> = {
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
  rechnungsTyp: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => getInvoiceTypeName(data.rechnungsTyp),
  },
  rechnungsNummer: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.rechnungsNummer,
  },
  rechnungsDatum: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.rechnungsDatum),
  },
  faelligkeitsDatum: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.faelligkeitsDatum),
  },
  customerID: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.customerID,
  },
  customer: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  contactID: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.contactID,
  },
  contact: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  cancelledInvoiceID: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.cancelledInvoiceID ?? "",
  },
  cancelledInvoice: {
    type: "object",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  veranstaltungsort: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.veranstaltungsort,
  },
  invoiceStatus: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => getInvoiceStatusName(data.invoiceStatus),
  },
  summe: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.summe.toLocaleString("de-DE") + " €",
  },
  anmerkungen: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.anmerkungen ?? "",
  },
  invoiceEntries: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  orders: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  cancelledOrders: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  cancelledInvoices: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfInvoice = (key: string): key is keyof Invoice =>
  key in InvoiceTypeKeys;
