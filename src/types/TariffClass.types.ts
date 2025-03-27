import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const TariffClassSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "isActive",
  "kuerzel",
  "bezeichnung",
  "taetigkeitsbeschreibung",
  "qualifikation",
  "anmerkungen",
  "staffTypes.*",
] as const;

export type TariffClass = SelectionSet<
  Schema["TariffClass"]["type"],
  typeof TariffClassSelectionSet
>;

export type CreateTariffClassInput = Schema["TariffClass"]["createType"];

export type UpdateTariffClassInput = Schema["TariffClass"]["updateType"];

export type TariffClassFormHandles = {
  validateTariffClassForm(): CreateTariffClassInput | null;
  resetTariffClassForm(): void;
};

export const TariffClassTypeKeys: TypeKeysEnum<TariffClass> = {
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
  kuerzel: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.kuerzel,
  },
  bezeichnung: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.bezeichnung,
  },
  taetigkeitsbeschreibung: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.taetigkeitsbeschreibung,
  },
  qualifikation: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.qualifikation,
  },
  anmerkungen: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.anmerkungen ?? "",
  },
  staffTypes: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfTariffClass = (key: string): key is keyof TariffClass =>
  key in TariffClassTypeKeys;
