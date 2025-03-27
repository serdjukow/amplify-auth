import { RefObject } from "react";
import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { FieldHandles } from "./Components.types";
import { TypeKeysEnum } from "./General.types";
import { StaffType } from "./StaffType.types";
import utils from "utils";

export const OrderShiftStaffSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "orderID",
  "order.*",
  "shiftID",
  "shift.*",
  "staffTypeID",
  "staffType.*",
  "staffType.tariffClass.*",
  "anzahl",
] as const;

// @ts-ignore
export type OrderShiftStaff = SelectionSet<
  Schema["OrderShiftStaff"]["type"],
  typeof OrderShiftStaffSelectionSet
>;

export type CreateOrderShiftStaffInput =
  Schema["OrderShiftStaff"]["createType"] & {
    id: string;
  };

export type UpdateOrderShiftStaffInput =
  Schema["OrderShiftStaff"]["updateType"];

export type OrderShiftStaffInput = {
  id: string;
  staffType: StaffType;
  anzahl: number | "";
  anzahlInputRef: RefObject<FieldHandles | null>;
};

export const OrderShiftStaffTypeKeys: TypeKeysEnum<OrderShiftStaff> = {
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
  shiftID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.shiftID,
  },
  shift: {
    type: "entity",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  staffTypeID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.staffTypeID,
  },
  staffType: {
    type: "entity",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  anzahl: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.anzahl.toString(),
  },
};

export const isKeyOfOrderShiftStaff = (
  key: string,
): key is keyof OrderShiftStaff => key in OrderShiftStaffTypeKeys;
