import { RefObject } from "react";
import { SelectionSet } from "aws-amplify/api";
import { LexicalEditor } from "lexical";
import { Schema } from "queryClient";
import { FieldHandles } from "./Components.types";
import { TypeKeysEnum } from "./General.types";
import {
  CreateOrderShiftStaffInput,
  OrderShiftStaffInput,
} from "./OrderShiftStaff.types";
import utils from "utils";

export const OrderShiftSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "orderID",
  "order.*",
  "position",
  "beginn",
  "ende",
  "name",
  "anmerkungen",
  "staffs.*",
] as const;

// @ts-ignore
export type OrderShift = SelectionSet<
  Schema["OrderShift"]["type"],
  typeof OrderShiftSelectionSet
>;

export type CreateOrderShiftInput = Schema["OrderShift"]["createType"] & {
  id: string;
};

export type UpdateOrderShiftInput = Schema["OrderShift"]["updateType"];

type OrderShiftFormResult = {
  orderShifts: CreateOrderShiftInput[];
  orderShiftStaffs: CreateOrderShiftStaffInput[];
};

export type OrderShiftFormHandles = {
  validateOrderShiftForm(): OrderShiftFormResult | null;
  resetOrderShiftForm(): void;
};

export type OrderShiftInput = {
  id: string;
  name: string;
  nameInputRef: RefObject<FieldHandles | null>;
  position: number;
  beginn: Date | null;
  beginnInputRef: RefObject<FieldHandles | null>;
  ende: Date | null;
  endeInputRef: RefObject<FieldHandles | null>;
  anmerkungenInitial: string | null | undefined;
  anmerkungen: LexicalEditor;
  staffs: OrderShiftStaffInput[];
  deleteShiftButtonRef: RefObject<FieldHandles | null>;
};

export const OrderShiftTypeKeys: TypeKeysEnum<OrderShift> = {
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
  position: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.position.toString(),
  },
  beginn: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.beginn),
  },
  ende: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) =>
      utils.dates.getDateInGermanFromAWSDateFormat(data.ende),
  },
  name: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.name,
  },
  anmerkungen: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.anmerkungen ?? "",
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

export const isKeyOfOrderShift = (key: string): key is keyof OrderShift =>
  key in OrderShiftTypeKeys;
