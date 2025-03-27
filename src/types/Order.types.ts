import { SelectionSet } from "aws-amplify/api";
import { InfiniteData } from "@tanstack/react-query";
import { getOrderStatusName } from "options";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import { CreateOrderShiftInput } from "./OrderShift.types";
import { CreateOrderShiftStaffInput } from "./OrderShiftStaff.types";
import utils from "utils";

export const OrderSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "isActive",
  "customerID",
  "customer.*",
  "contactID",
  "contact.*",
  "invoiceID",
  "invoice.*",
  "invoiceCancelledID",
  "invoiceCancelled.*",
  "customer.ehemaligeAdressen.*",
  "auftragsNummer",
  "veranstaltungsort",
  "month",
  "beginn",
  "ende",
  "beginnZeit",
  "orderStatus",
  "timesheetCompleted",
  "orderHours",
  "anmerkungen",
  "createdAt",
  "shifts.*",
  "staffs.*",
] as const;

// @ts-ignore
export type Order = SelectionSet<
  Schema["Order"]["type"],
  typeof OrderSelectionSet
>;

export const ExtendedOrderSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "isActive",
  "customerID",
  "customer.*",
  "customer.conditions.*",
  "contactID",
  "contact.*",
  "invoiceID",
  "invoice.*",
  "invoiceCancelledID",
  "invoiceCancelled.*",
  "customer.ehemaligeAdressen.*",
  "auftragsNummer",
  "veranstaltungsort",
  "month",
  "beginn",
  "ende",
  "beginnZeit",
  "orderStatus",
  "timesheetCompleted",
  "orderHours",
  "anmerkungen",
  "createdAt",
  "shifts.*",
  "shifts.staffs.*",
  "shifts.staffs.staffType.*",
  "shifts.staffs.staffType.tariffClass.*",
  "shifts.staffs.timesheetEntries.*",
  "shifts.staffs.timesheetEntries.employee.*",
  "staffs.*",
  "staffs.staffType.*",
  "staffs.staffType.tariffClass.*",
  "staffs.timesheetEntries.*",
] as const;

export type ExtendedOrder = SelectionSet<
  Schema["Order"]["type"],
  typeof ExtendedOrderSelectionSet
>;

export const ShortOrderSelectionSet = [
  "id",
  "customerID",
  "month",
  "orderHours",
] as const;

export type ShortOrder = SelectionSet<
  Schema["Order"]["type"],
  typeof ShortOrderSelectionSet
>;

export type CreateOrderInput = Schema["Order"]["createType"];

export type UpdateOrderInput = Schema["Order"]["updateType"];

export type OrderStatus = Schema["OrderStatus"]["type"];

export type InfiniteOrderList = {
  orderList: Order[];
  nextToken: string | null;
};

export type InfiniteOrderData = InfiniteData<InfiniteOrderList>;

type OrderFormResult = {
  orderFormInput: CreateOrderInput;
  orderShiftInputs: CreateOrderShiftInput[];
  orderShiftStaffInputs: CreateOrderShiftStaffInput[];
};

export type OrderFormHandles = {
  validateOrderForm(): OrderFormResult | null;
  resetOrderForm(): void;
};

export const OrderTypeKeys: TypeKeysEnum<Order> = {
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
  isActive: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.isActive ? "Ja" : "Nein"),
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
  invoiceID: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.invoiceID ?? "",
  },
  invoice: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  invoiceCancelledID: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.invoiceCancelledID ?? "",
  },
  invoiceCancelled: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  auftragsNummer: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.auftragsNummer,
  },
  veranstaltungsort: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.veranstaltungsort,
  },
  month: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.month) + " Uhr",
  },
  beginn: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.beginn) + " Uhr",
  },
  ende: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.ende) + " Uhr",
  },
  beginnZeit: {
    type: "time",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getTimeInGermanFromAWSTimeFormat(data.beginnZeit) + " Uhr",
  },
  orderStatus: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => getOrderStatusName(data.orderStatus),
  },
  timesheetCompleted: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.timesheetCompleted ? "Ja" : "Nein"),
  },
  orderHours: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.orderHours.toLocaleString("de-DE"),
  },
  anmerkungen: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.anmerkungen ?? "",
  },
  shifts: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  staffs: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfOrder = (key: string): key is keyof Order =>
  key in OrderTypeKeys;
