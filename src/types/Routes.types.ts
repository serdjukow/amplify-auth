import { ReactNode } from "react";

export type AppRouteSection = "general" | "account" | "admin" | "verwaltung";

export interface AppRoute {
  key: string;
  path: string;
  section: AppRouteSection | (string & {});
  title: string;
  element: ReactNode;
  icon: ReactNode;
  groups: string[];
  level: number;
  navigation: boolean;
  indented: boolean;
  isWithParam: boolean;
}

export interface AppRouteMap extends AppRoute {
  children: Record<string, AppRouteMap>;
}

export interface AppRouteArray extends AppRoute {
  children: AppRouteArray[];
}
