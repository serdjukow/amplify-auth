import { ReactNode } from "react";

export type Section = {
  id: string;
  content: ReactNode;
  height: number;
  marginAfter: number;
};

export type DocumentPage = {
  pageNumber: number;
  usedHeight: number;
  sections: Section[];
};

export type PageStructure = Section[];

export interface PrintPage<T> {
  pageID: string;
  entries: T[];
  itemsBefore: number;
}

export type PrintPDFDocument = {
  body: ArrayBuffer;
  s3Key: string;
  pdfName: string;
  s3ResourceID: string;
  fileSize: number;
};
