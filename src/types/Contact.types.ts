import { SelectionSet } from "aws-amplify/api";
import { getSalutationName } from "options";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const ContactSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "isActive",
  "customerID",
  "customer.*",
  "anrede",
  "vorname",
  "name",
  "position",
  "email",
  "telefon",
  "createdAt",
] as const;

// @ts-ignore
export type Contact = SelectionSet<
  Schema["Contact"]["type"],
  typeof ContactSelectionSet
>;

export type CreateContactInput = Schema["Contact"]["createType"];

export type UpdateContactInput = Schema["Contact"]["updateType"];

export type ContactFormHandles = {
  validateContactForm(): CreateContactInput | null;
  resetContactForm(): void;
};

export const ContactTypeKeys: TypeKeysEnum<Contact> = {
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
  customerID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
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
    formatter: (data) => data.vorname ?? "",
  },
  name: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.name,
  },
  position: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.position ?? "",
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
};

export const isKeyOfContact = (key: string): key is keyof Contact =>
  key in ContactTypeKeys;
