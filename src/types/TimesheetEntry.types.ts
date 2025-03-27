import { RefObject } from "react";
import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { FieldHandles } from "./Components.types";
import { Employee } from "./Employee.types";
import { TypeKeysEnum } from "./General.types";
import { Order } from "./Order.types";
import { OrderShiftStaff } from "./OrderShiftStaff.types";
import { PrintPDFDocument, PrintPage } from "./Print.types";
import { CreateTimesheetSubstituteInput } from "./TimesheetSubstitute.types";
import utils from "utils";

export const TimesheetEntrySelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "orderID",
  "order.*",
  "order.customer.*",
  "orderShiftStaffID",
  "orderShiftStaff.*",
  "orderShiftStaff.shift.*",
  "orderShiftStaff.staffType.*",
  "employeeID",
  "employee.*",
  "employee.hourlyRates.*",
  "employee.hourlyRates.hourlyRates.*",
  "month",
  "beginn",
  "ende",
  "hours",
  "pause",
  "missingPause",
  "rating",
] as const;

// @ts-ignore
export type TimesheetEntry = SelectionSet<
  Schema["TimesheetEntry"]["type"],
  typeof TimesheetEntrySelectionSet
>;

export type CreateTimesheetEntryInput = Schema["TimesheetEntry"]["createType"];

export type UpdateTimesheetEntryInput = Schema["TimesheetEntry"]["updateType"];

export type TimesheetPrintPage = {
  pageID: string;
  entries: TimesheetEntry[];
  itemsBefore: number;
};

export type TimesheetDocument = {
  order: Order;
  timesheetEntryList: TimesheetEntry[];
  pages: PrintPage<TimesheetEntry>[];
  documentName: string;
};

export type TimesheetPrintDocument = TimesheetDocument & {
  pdfDocument: PrintPDFDocument;
};

type TimesheetFormResult = {
  timesheetEntries: CreateTimesheetEntryInput[];
  timesheetSubstitutes: CreateTimesheetSubstituteInput[];
  timesheetCompleted: boolean;
  orderHours: number;
};

export type TimesheetFormHandles = {
  validateTimesheetForm(): TimesheetFormResult | null;
  resetTimesheetForm(): void;
};

export type TimesheetEntryInput = {
  employee: Employee | TimesheetEntry["employee"];
  beginn: Date | null;
  beginnInputRef: RefObject<FieldHandles | null>;
  ende: Date | null;
  endeInputRef: RefObject<FieldHandles | null>;
  pause: Date | null;
  pauseInputRef: RefObject<FieldHandles | null>;
  missingPause: number;
  rating: number | "";
  ratingInputRef: RefObject<FieldHandles | null>;
};

export type TimesheetShiftInput = {
  orderShiftStaff: OrderShiftStaff;
  timesheetEntries: TimesheetEntryInput[];
};

export const TimesheetEntryTypeKeys: TypeKeysEnum<TimesheetEntry> = {
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
  orderShiftStaffID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.orderShiftStaffID,
  },
  orderShiftStaff: {
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
  month: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.month),
  },
  beginn: {
    type: "datetime",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(data.beginn),
  },
  ende: {
    type: "datetime",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(data.ende),
  },
  hours: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.hours.toLocaleString("de-DE"),
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
  missingPause: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.missingPause.toString() + " Minuten",
  },
  rating: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.rating.toString() + " Sterne",
  },
};

export const isKeyOfTimesheetEntry = (
  key: string,
): key is keyof TimesheetEntry => key in TimesheetEntryTypeKeys;
