import { client } from "queryClient";
import { GlobalSettings, UpdateGlobalSettingsInput } from "types";
import { GLOBAL_SETTINGS_ID } from "utils/constants";

export const getGlobalSettings = async (): Promise<GlobalSettings | null> => {
  // @ts-ignore
  const { data } = await client.models.GlobalSettings.get({
    id: GLOBAL_SETTINGS_ID,
  });

  return data;
};

export const updateGlobalSettings = async (
  input: UpdateGlobalSettingsInput,
) => {
  // @ts-ignore
  const { data } = await client.models.GlobalSettings.update(input);

  if (!data) return null;

  const globalSettings = await getGlobalSettings();

  return globalSettings;
};
