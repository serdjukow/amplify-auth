import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const DocumentSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "entityType",
  "entityID",
  "userID",
  "user.*",
  "document.*",
  "documentName",
  "documentCategory",
  "documentType",
  "documentSize",
  "documentDescription",
  "createdAt",
] as const;

export type Document = SelectionSet<
  Schema["Document"]["type"],
  typeof DocumentSelectionSet
>;

export type CreateDocumentInput = Schema["Document"]["createType"];

export type UpdateDocumentInput = Schema["Document"]["updateType"];

export type DocumentType = Schema["DocumentType"]["type"];

export const DocumentTypeKeys: TypeKeysEnum<Document> = {
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
  entityType: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.entityType,
  },
  entityID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.entityID,
  },
  user: {
    type: "entity",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  userID: {
    type: "id",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: false,
    formatter: (data) => data.userID,
  },
  document: {
    type: "entity",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: false,
    formatter: () => "",
  },
  documentName: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.documentName,
  },
  documentCategory: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.documentCategory,
  },
  documentType: {
    type: "enum",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.documentType,
  },
  documentSize: {
    type: "integer",
    isArray: false,
    isRequired: true,
    isSortable: true,
    isSearchable: true,
    formatter: (data) =>
      utils.s3resources.getFormattedDocumentSize(data.documentSize),
  },
  documentDescription: {
    type: "string",
    isArray: false,
    isRequired: false,
    isSortable: true,
    isSearchable: true,
    formatter: (data) => data.documentDescription ?? "",
  },
};

export const isKeyOfDocument = (key: string): key is keyof Document =>
  key in DocumentTypeKeys;
