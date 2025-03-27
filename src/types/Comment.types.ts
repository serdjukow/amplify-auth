import { SelectionSet } from "aws-amplify/api";
import { Schema } from "queryClient";
import { TypeKeysEnum } from "./General.types";
import utils from "utils";

export const CommentSelectionSet = [
  "id",
  "owner",
  "createdAt",
  "updatedAt",
  "entityType",
  "entityID",
  "userID",
  "user.*",
  "comment",
  "createdAt",
] as const;

export type Comment = SelectionSet<
  Schema["Comment"]["type"],
  typeof CommentSelectionSet
>;

export type CreateCommentInput = Schema["Comment"]["createType"];

export type UpdateCommentInput = Schema["Comment"]["updateType"];

export type EntityType = Schema["EntityType"]["type"];

export const CommentTypeKeys: TypeKeysEnum<Comment> = {
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
  comment: {
    type: "string",
    isArray: false,
    isRequired: true,
    isSortable: false,
    isSearchable: true,
    formatter: (data) => data.comment,
  },
};

export const isKeyOfComment = (key: string): key is keyof Comment =>
  key in CommentTypeKeys;
