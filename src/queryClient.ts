import { generateClient } from "aws-amplify/data";
import { QueryClient } from "@tanstack/react-query";
import type { Schema } from "../amplify/data/resource";

export const queryClient = new QueryClient();

export const client = generateClient<Schema>();

export type { Schema } from "../amplify/data/resource";

export enum QueryKeys {
  CalendarEntries = "calendarEntries",
  CognitoUsers = "cognitoUsers",
  Comments = "comments",
  Contacts = "contacts",
  Customers = "customers",
  Documents = "documents",
  Employees = "employees",
  GlobalSettings = "globalSettings",
  Holidays = "holidays",
  Invoices = "invoices",
  InvoiceEntries = "invoiceEntries",
  Orders = "orders",
  AllOrders = "allOrders",
  OrderShifts = "orderShifts",
  OrderShiftStaffs = "orderShiftStaffs",
  SearchableEntities = "searchableEntities",
  SentInvoices = "sentInvoices",
  SentTimesheets = "sentTimesheets",
  StaffTypes = "staffTypes",
  TariffClasses = "tariffClasses",
  Tasks = "tasks",
  TimesheetEntries = "timesheetEntries",
  TimesheetSubstitutes = "timesheetSubstitutes",
  Users = "users",
  UserSessions = "userSessions",
}
