import { RefObject } from "react";
import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { FieldHandles } from "./Components.types";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const HolidaySelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "year",
  "holidays.*",
] as const;

export type Holiday = SelectionSet<
  Schema["Holiday"]["type"],
  typeof HolidaySelectionSet
>;

export type CreateHolidayInput = Schema["Holiday"]["createType"];

export type UpdateHolidayInput = Schema["Holiday"]["updateType"];

export type HolidayEntry = Schema["HolidayEntry"]["type"];

export type HolidayEntryInput = {
  id: string;
  title: string;
  titleInputRef: RefObject<FieldHandles | null>;
  beginn: Date | null;
  beginnInputRef: RefObject<FieldHandles | null>;
  ende: Date | null;
  endeInputRef: RefObject<FieldHandles | null>;
  deleteHolidayEntryButtonRef: RefObject<FieldHandles | null>;
};

export type HolidayFormHandles = {
  validateHolidayForm(): CreateHolidayInput | null;
  resetHolidayForm(): void;
};

export const HolidayTypeKeys: TypeKeysEnum<Holiday> = {
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
  year: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.year,
  },
  holidays: {
    type: "object",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfHoliday = (key: string): key is keyof Holiday =>
  key in HolidayTypeKeys;
