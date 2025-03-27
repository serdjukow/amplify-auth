import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const StaffTypeSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "isActive",
  "tariffClassID",
  "tariffClass.*",
  "name",
  "anmerkungen",
  "orderShiftStaffs.*",
] as const;

export type StaffType = SelectionSet<
  Schema["StaffType"]["type"],
  typeof StaffTypeSelectionSet
>;

export type CreateStaffTypeInput = Schema["StaffType"]["createType"];

export type UpdateStaffTypeInput = Schema["StaffType"]["updateType"];

export type StaffTypeFormHandles = {
  validateStaffTypeForm(): CreateStaffTypeInput | null;
  resetStaffTypeForm(): void;
};

export const StaffTypeTypeKeys: TypeKeysEnum<StaffType> = {
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
  tariffClassID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.tariffClassID,
  },
  tariffClass: {
    type: "entity",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
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
  orderShiftStaffs: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfStaffType = (key: string): key is keyof StaffType =>
  key in StaffTypeTypeKeys;
