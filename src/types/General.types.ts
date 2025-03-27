import { Schema } from "@/queryClient";

export enum SortDirection {
  asc = "asc",
  desc = "desc",
}

export type KeysEnum<T> = { [P in keyof Required<T>]: true };

export type FieldConstruct<T> = {
  type:
    | "id"
    | "string"
    | "enum"
    | "integer"
    | "float"
    | "boolean"
    | "date"
    | "time"
    | "datetime"
    | "timestamp"
    | "object"
    | "entity";
  isArray: boolean;
  isRequired: boolean;
  isSortable: boolean;
  isSearchable: boolean;
  formatter: (value: T) => string;
};

export type TypeKeysEnum<T> = { [P in keyof Required<T>]: FieldConstruct<T> };

export type Salutation = Schema["Salutation"]["type"];

export type SalutationCompany = Schema["SalutationCompany"]["type"];

export type TableTheme = Schema["TableTheme"]["type"];

export type TableHeaderColor = Schema["TableHeaderColor"]["type"];

export type TableSpacing = Schema["TableSpacing"]["type"];

export type BooleanValue = "true" | "false" | "All";

export type SelectOption = NonNullable<Schema["User"]["type"]["select"]>;

export const isSelectOption = (value: any): value is SelectOption =>
  "value" in value && "label" in value;

export type S3Resource = NonNullable<Schema["User"]["type"]["avatar"]>;

export enum ValueSubmitTrigger {
  Blur = "blur",
  Enter = "enter",
  Escape = "escape",
  Tab = "tab",
  ShiftTab = "shiftTab",
  ArrowUp = "arrowUp",
  ArrowDown = "arrowDown",
  ArrowLeft = "arrowLeft",
  ArrowRight = "arrowRight",
}

export enum LanguageFilterType {
  All = "Alle",
  DE = "DE",
  EN = "EN",
}

export enum SearchTextParamName {
  SearchCalendarEntry = "searchCalendarEntry",
  SearchCustomer = "searchCustomer",
  SearchContact = "searchContact",
  SearchEmployee = "searchEmployee",
  SearchDocument = "searchDocument",
  SearchEmploymentContract = "searchEmploymentContract",
  SearchExpressRequest = "searchExpressRequest",
  SearchInvoice = "searchInvoice",
  SearchMeasuringUnit = "searchMeasuringUnit",
  SearchMovingGood = "searchMovingGood",
  SearchOrder = "searchOrder",
  SearchPredefinedOrderPosition = "searchPredefinedOrderPosition",
  SearchRoom = "searchRoom",
  SearchSentOrder = "searchSentOrder",
  SearchSentInvoice = "searchSentInvoice",
  SearchSentTimesheet = "searchSentTimesheet",
  SearchUser = "searchUser",
  SearchViewing = "searchViewing",
  SearchViewingRequest = "searchViewingRequest",
}
