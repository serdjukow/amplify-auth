import { Schema } from "queryClient";

export type GlobalSettings = Schema["GlobalSettings"]["type"];

export type UpdateGlobalSettingsInput = Schema["GlobalSettings"]["updateType"];

export type GlobalSettingsFormHandles = {
  validateGlobalSettingsForm(): UpdateGlobalSettingsInput | null;
};
