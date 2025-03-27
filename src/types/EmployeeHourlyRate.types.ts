import { RefObject } from "react";
import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { FieldHandles } from "./Components.types";
import { TypeKeysEnum } from "./General.types";
import { StaffType } from "./StaffType.types";
import utils from "utils";

export const EmployeeHourlyRateSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "employeeID",
  "employee.*",
  "staffTypeID",
  "staffType.*",
  "hourlyRates.*",
] as const;

export type EmployeeHourlyRate = SelectionSet<
  Schema["EmployeeHourlyRate"]["type"],
  typeof EmployeeHourlyRateSelectionSet
>;

export type CreateEmployeeHourlyRateInput =
  Schema["EmployeeHourlyRate"]["createType"];

export type UpdateEmployeeHourlyRateInput =
  Schema["EmployeeHourlyRate"]["updateType"];

export type HourlyRate = Schema["HourlyRate"]["type"];

type EmployeeHourlyRateFormResult = {
  employeeHourlyRates: CreateEmployeeHourlyRateInput[];
};

export type EmployeeHourlyRateFormHandles = {
  validateEmployeeHourlyRateForm(): EmployeeHourlyRateFormResult | null;
  resetEmployeeHourlyRateForm(): void;
};

export type HourlyRateInput = {
  hourlyRate: number | "";
  hourlyRateInputRef: RefObject<FieldHandles | null>;
  validFrom: Date | null;
  validFromInputRef: RefObject<FieldHandles | null>;
  deleteHourlyRateButtonRef: RefObject<FieldHandles | null>;
};

export type EmployeeHourlyRateInput = {
  isActivated: boolean;
  staffType: StaffType;
  hourlyRates: HourlyRateInput[];
  addHourlyRateButtonRef: RefObject<FieldHandles | null>;
};

export const EmployeeHourlyRateTypeKeys: TypeKeysEnum<EmployeeHourlyRate> = {
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
  hourlyRates: {
    type: "object",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfEmployeeHourlyRate = (
  key: string,
): key is keyof EmployeeHourlyRate => key in EmployeeHourlyRateTypeKeys;
