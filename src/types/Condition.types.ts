import { RefObject } from "react";
import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { FieldHandles } from "./Components.types";
import { TypeKeysEnum } from "./General.types";
import { StaffType } from "./StaffType.types";
import utils from "utils";

export const ConditionSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "customerID",
  "customer.*",
  "staffTypeID",
  "staffType.*",
  "hourlyRate",
  "hasSurcharges",
  "holidaySurcharge",
  "nightSurcharge",
  "sundaySurcharge",
] as const;

export type Condition = SelectionSet<
  Schema["Condition"]["type"],
  typeof ConditionSelectionSet
>;

export type CreateConditionInput = Schema["Condition"]["createType"];

export type UpdateConditionInput = Schema["Condition"]["updateType"];

type ConditionFormResult = {
  conditionInputs: CreateConditionInput[];
};

export type ConditionFormHandles = {
  validateConditionForm(): ConditionFormResult | null;
  resetConditionForm(): void;
};

export type ConditionInput = {
  isActivated: boolean;
  staffType: StaffType;
  hourlyRate: number | "";
  hourlyRateInputRef: RefObject<FieldHandles | null>;
  hasSurcharges: boolean;
  holidaySurcharge: number | "";
  holidaySurchargeInputRef: RefObject<FieldHandles | null>;
  nightSurcharge: number | "";
  nightSurchargeInputRef: RefObject<FieldHandles | null>;
  sundaySurcharge: number | "";
  sundaySurchargeInputRef: RefObject<FieldHandles | null>;
};

export const ConditionTypeKeys: TypeKeysEnum<Condition> = {
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
  customerID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.customerID,
  },
  customer: {
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
  hourlyRate: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.hourlyRate.toLocaleString("de-DE") + " €",
  },
  hasSurcharges: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.hasSurcharges ? "Ja" : "Nein"),
  },
  holidaySurcharge: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.holidaySurcharge.toLocaleString("de-DE") + " %",
  },
  nightSurcharge: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.nightSurcharge.toLocaleString("de-DE") + " %",
  },
  sundaySurcharge: {
    type: "float",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.sundaySurcharge.toLocaleString("de-DE") + " %",
  },
};

export const isKeyOfCondition = (key: string): key is keyof Condition =>
  key in ConditionTypeKeys;
