import { SequentialNumber } from "types";
import { getCustomerListByKundenNummer } from "modules/customermanagement/customers/api";
import { getEmployeeListByKundenNummer } from "modules/employeemanagement/employees/api";
import { getInvoiceListByRechnungsNummer } from "modules/ordermanagement/invoices/api";
import { getOrderListByAuftragsNummer } from "modules/ordermanagement/orders/api";
import { getSequentialNumber } from "../api";

export type EntityType =
  | "auftragsNummer"
  | "kundenNummer"
  | "personalNummer"
  | "rechnungsNummer";

export type EntityNumberClass = {
  entityType: EntityType;
  entityNumberTitle: string;
  exampleEntityNumber: string;
  entityPrefixPlaceholder: string;
  minValue: number;
  placesCount: number;
  sequentialNumberPrefix: string;
  isEntityNumberFree: (entityNumber: string) => Promise<boolean>;
  getEntityNumberSequential: (entityNumber: string) => number | null;
  getSequentialNumber: (
    entityPrefix: string,
  ) => Promise<SequentialNumber | null>;
};

export const getEntityNumberClass = (
  entityType: EntityType,
): EntityNumberClass => {
  switch (entityType) {
    case "auftragsNummer":
      return auftragsNummer;
    case "kundenNummer":
      return kundenNummer;
    case "personalNummer":
      return personalNummer;
    case "rechnungsNummer":
      return rechnungsNummer;
  }
};

export const auftragsNummer: EntityNumberClass = {
  entityType: "auftragsNummer",
  entityNumberTitle: "Auftragsnummer",
  exampleEntityNumber: "KVA-24001",
  entityPrefixPlaceholder: "",
  minValue: 1,
  placesCount: 3,
  sequentialNumberPrefix: "000",
  isEntityNumberFree: async (entityNumber: string) => {
    const orderList = await getOrderListByAuftragsNummer(entityNumber);
    return orderList.length === 0;
  },
  getEntityNumberSequential: (entityNumber: string) => {
    const sequentialNumber = parseInt(entityNumber.slice(-3));
    return sequentialNumber;
  },
  getSequentialNumber: (entityPrefix: string) =>
    getSequentialNumber(entityPrefix),
};

export const AuftragsNummer_Prefix = "A-";

export const kundenNummer: EntityNumberClass = {
  entityType: "kundenNummer",
  entityNumberTitle: "Kundennummer",
  exampleEntityNumber: "AY-001",
  entityPrefixPlaceholder: "",
  minValue: 1,
  placesCount: 3,
  sequentialNumberPrefix: "000",
  isEntityNumberFree: async (entityNumber: string) => {
    const customerList = await getCustomerListByKundenNummer(entityNumber);
    return customerList.length === 0;
  },
  getEntityNumberSequential: (entityNumber: string) => {
    const sequentialNumber = parseInt(entityNumber.slice(-3));
    return sequentialNumber;
  },
  getSequentialNumber: (entityPrefix: string) =>
    getSequentialNumber(entityPrefix),
};

export const KundenNummer_Prefix = "AY-";

export const personalNummer: EntityNumberClass = {
  entityType: "personalNummer",
  entityNumberTitle: "Personalnummer",
  exampleEntityNumber: "P-001",
  entityPrefixPlaceholder: "",
  minValue: 1,
  placesCount: 3,
  sequentialNumberPrefix: "000",
  isEntityNumberFree: async (entityNumber: string) => {
    const employeeList = await getEmployeeListByKundenNummer(entityNumber);
    return employeeList.length === 0;
  },
  getEntityNumberSequential: (entityNumber: string) => {
    const sequentialNumber = parseInt(entityNumber.slice(-3));
    return sequentialNumber;
  },
  getSequentialNumber: (entityPrefix: string) =>
    getSequentialNumber(entityPrefix),
};

export const PersonalNummer_Prefix = "P-";

export const rechnungsNummer: EntityNumberClass = {
  entityType: "rechnungsNummer",
  entityNumberTitle: "Rechnungsnummer",
  exampleEntityNumber: "2025/225",
  entityPrefixPlaceholder: "",
  minValue: 225,
  placesCount: 3,
  sequentialNumberPrefix: "000",
  isEntityNumberFree: async (entityNumber: string) => {
    const invoiceList = await getInvoiceListByRechnungsNummer(entityNumber);
    return invoiceList.length === 0;
  },
  getEntityNumberSequential: (entityNumber: string) => {
    const sequentialNumber = parseInt(entityNumber.slice(-3));
    return sequentialNumber;
  },
  getSequentialNumber: (entityPrefix: string) =>
    getSequentialNumber(entityPrefix),
};

export const RechnungsNummer_Prefix = new Date().getFullYear().toString() + "/";
