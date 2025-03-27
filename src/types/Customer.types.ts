import { RefObject } from "react";
import { SelectionSet } from "aws-amplify/api";
import { InfiniteData } from "@tanstack/react-query";
import { getSalutationCompanyName } from "options";
import { Schema } from "queryClient";
import { FieldHandles } from "./Components.types";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const CustomerSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "isActive",
  "name",
  "kundenNummer",
  "anrede",
  "vorname",
  "kundenArt",
  "email",
  "telefon",
  "fax",
  "mobil",
  "webseite",
  "currentContactID",
  "currentContact.*",
  "veranstaltungsort",
  "zahlungsZiel",
  "stundenzettelVertragsZusatz",
  "anmerkungen",
  "adresse.*",
  "ehemaligeAdressen.*",
  "emailInvoices",
  "emailTimeSheets",
  "attachNamesToInvoice",
  "rechnungsAdresse.*",
  "ehemaligeRechnungsAdressen.*",
  "anmerkungen",
  "createdAt",
  "orders.*",
  "kontaktPersonen.*",
  "conditions.*",
] as const;

// @ts-ignore
export type Customer = SelectionSet<
  Schema["Customer"]["type"],
  typeof CustomerSelectionSet
>;

export type CreateCustomerInput = Schema["Customer"]["createType"];

export type UpdateCustomerInput = Schema["Customer"]["updateType"];

export type CustomerType = Schema["CustomerType"]["type"];

export type Address = Schema["Address"]["type"];

export type AddressChangeReason = Schema["AddressChangeReason"]["type"];

export type AddressFormHandles = {
  validateAddressForm(): Address | null;
  resetAdressForm(): void;
  highlight(scroll?: boolean): void;
};

export type InfiniteCustomerList = {
  customerList: Customer[];
  nextToken: string | null;
};

export type InfiniteCustomerData = InfiniteData<InfiniteCustomerList>;

export type CustomerFormHandles = {
  validateCustomerForm(): CreateCustomerInput | null;
  resetCustomerForm(): void;
};

type CustomerAddressFormResult = {
  adresse: Address;
  rechnungsAdresse: Address;
  ehemaligeAdressen: Address[];
  ehemaligeRechnungsAdressen: Address[];
};

export type CustomerAddressFormHandles = {
  validateCustomerAddressForm(): CustomerAddressFormResult | null;
  resetCustomerAddressForm(): void;
};

export type EmailTimeSheetInput = {
  id: string;
  email: string;
  emailInputRef: RefObject<FieldHandles | null>;
};

export const CustomerTypeKeys: TypeKeysEnum<Customer> = {
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
  name: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.name,
  },
  kundenNummer: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.kundenNummer,
  },
  anrede: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => getSalutationCompanyName(data.anrede),
  },
  vorname: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.vorname ?? "",
  },
  kundenArt: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.kundenArt,
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
  fax: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.fax ?? "",
  },
  mobil: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.mobil ?? "",
  },
  webseite: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.webseite ?? "",
  },
  currentContactID: {
    type: "id",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: (data) => data.currentContactID ?? "",
  },
  currentContact: {
    type: "entity",
    isArray: false,
    isRequired: false,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  veranstaltungsort: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.veranstaltungsort ?? "",
  },
  zahlungsZiel: {
    type: "integer",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) =>
      data.zahlungsZiel ? data.zahlungsZiel.toString() : "",
  },
  stundenzettelVertragsZusatz: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.stundenzettelVertragsZusatz ?? "",
  },
  adresse: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (data) =>
      data.adresse
        ? data.adresse.strasse +
          ", " +
          data.adresse.plz +
          " " +
          data.adresse.ort
        : "",
  },
  ehemaligeAdressen: {
    type: "object",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  emailInvoices: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.emailInvoices,
  },
  emailTimeSheets: {
    type: "string",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (data) => data.emailTimeSheets.join(", "),
  },
  attachNamesToInvoice: {
    type: "boolean",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => (data.attachNamesToInvoice ? "Ja" : "Nein"),
  },
  rechnungsAdresse: {
    type: "object",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: (data) =>
      data.rechnungsAdresse
        ? data.rechnungsAdresse.strasse +
          ", " +
          data.rechnungsAdresse.plz +
          " " +
          data.rechnungsAdresse.ort
        : "",
  },
  ehemaligeRechnungsAdressen: {
    type: "object",
    isArray: true,
    isRequired: true,
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
  orders: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  kontaktPersonen: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  conditions: {
    type: "entity",
    isArray: true,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
};

export const isKeyOfCustomer = (key: string): key is keyof Customer =>
  key in CustomerTypeKeys;
