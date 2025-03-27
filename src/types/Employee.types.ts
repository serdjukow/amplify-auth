import { SelectionSet } from "aws-amplify/api";
import { InfiniteData } from "@tanstack/react-query";
import { getSalutationName } from "options";
import { Schema } from "queryClient";
import { getEmployeeBillingMethodName } from "../options/enumoptions/EmployeeBillingMethod";
import { CreateEmployeeHourlyRateInput } from "./EmployeeHourlyRate.types";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const EmployeeSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "isActive",
  "personalNummer",
  "anrede",
  "vorname",
  "name",
  "geburtsdatum",
  "geburtsort",
  "nationalitaet",
  "abrechnungsArt",
  "abrechnungsArtMitMwSt",
  "adresse.*",
  "ehemaligeAdressen.*",
  "email",
  "telefon",
  "mobil",
  "haarfarbe",
  "augenfarbe",
  "koerpergroesse",
  "schuhgroesse",
  "konfektionsgroesse",
  "sprachen",
  "fuehrerscheinklassen",
  "gesundheitspass",
  "gesundheitspassNaechsteBelehrung",
  "personalbogen",
  "rahmenvereinbarung",
  "anforderungsstandards",
  "schulung",
  "gewerbeschein",
  "faFormular",
  "namensschild",
  "bewertung",
  "personalausweisnummer",
  "bilder.*",
  "anmerkungen",
  "hourlyRates.*",
  "hourlyRates.staffType.*",
  "hourlyRates.hourlyRates.*",
] as const;

export type Employee = SelectionSet<
  Schema["Employee"]["type"],
  typeof EmployeeSelectionSet
>;

export type CreateEmployeeInput = Schema["Employee"]["createType"];

export type UpdateEmployeeInput = Schema["Employee"]["updateType"];

export type EmployeeBillingMethod = Schema["EmployeeBillingMethod"]["type"];

export type InfiniteEmployeeList = {
  employeeList: Employee[];
  nextToken: string | null;
};

export type InfiniteEmployeeData = InfiniteData<InfiniteEmployeeList>;

type EmployeeFormResult = {
  employeeFormInput: CreateEmployeeInput;
  employeeHourlyRates: CreateEmployeeHourlyRateInput[];
};

export type EmployeeFormHandles = {
  validateEmployeeForm(): Promise<EmployeeFormResult | null>;
  resetEmployeeForm(): void;
  resetAddressForm(): void;
  resetEmployeeHourlyRateForm(): void;
};

export const EmployeeTypeKeys: TypeKeysEnum<Employee> = {
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
  personalNummer: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.personalNummer,
  },
  anrede: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => getSalutationName(data.anrede),
  },
  vorname: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.vorname,
  },
  name: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.name,
  },
  geburtsdatum: {
    type: "date",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      data.geburtsdatum
        ? utils.dates.getDateInGermanFromAWSDateFormat(data.geburtsdatum)
        : "",
  },
  geburtsort: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.geburtsort ?? "",
  },
  nationalitaet: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.nationalitaet ?? "",
  },
  abrechnungsArt: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => getEmployeeBillingMethodName(data.abrechnungsArt),
  },
  abrechnungsArtMitMwSt: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.abrechnungsArtMitMwSt ? "Ja" : "Nein"),
  },
  adresse: {
    type: "entity",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  ehemaligeAdressen: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  email: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.email ?? "",
  },
  telefon: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.telefon ?? "",
  },
  mobil: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.mobil ?? "",
  },
  haarfarbe: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.haarfarbe ?? "",
  },
  augenfarbe: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.augenfarbe ?? "",
  },
  koerpergroesse: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.koerpergroesse ?? "",
  },
  schuhgroesse: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.schuhgroesse ?? "",
  },
  konfektionsgroesse: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.konfektionsgroesse ?? "",
  },
  sprachen: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (data) => data.sprachen ?? "",
  },
  fuehrerscheinklassen: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: true,
    formatter: (data) => data.fuehrerscheinklassen ?? "",
  },
  gesundheitspass: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.gesundheitspass ? "Ja" : "Nein"),
  },
  gesundheitspassNaechsteBelehrung: {
    type: "date",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: false,
    formatter: (data) =>
      data.gesundheitspassNaechsteBelehrung
        ? utils.dates.getDateInGermanFromAWSDateFormat(
            data.gesundheitspassNaechsteBelehrung,
          )
        : "",
  },
  personalbogen: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.personalbogen ? "Ja" : "Nein"),
  },
  rahmenvereinbarung: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.rahmenvereinbarung ? "Ja" : "Nein"),
  },
  anforderungsstandards: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.anforderungsstandards ? "Ja" : "Nein"),
  },
  schulung: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.schulung ? "Ja" : "Nein"),
  },
  gewerbeschein: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.gewerbeschein ? "Ja" : "Nein"),
  },
  faFormular: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.faFormular ? "Ja" : "Nein"),
  },
  namensschild: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.namensschild ? "Ja" : "Nein"),
  },
  bewertung: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.bewertung ?? "",
  },
  personalausweisnummer: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.personalausweisnummer ?? "",
  },
  bilder: {
    type: "entity",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  anmerkungen: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.anmerkungen ?? "",
  },
  hourlyRates: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfEmployee = (key: string): key is keyof Employee =>
  key in EmployeeTypeKeys;
