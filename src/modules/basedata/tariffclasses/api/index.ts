import { client } from "queryClient";
import {
  CreateTariffClassInput,
  TariffClass,
  TariffClassSelectionSet,
  UpdateTariffClassInput,
} from "types";

export const getTariffClassList = async (
  nextTokenParam: string | null = null,
  prevTariffClassList: TariffClass[] = [],
): Promise<TariffClass[]> => {
  const { data, nextToken } = await client.models.TariffClass.list(
    // @ts-ignore
    {
      limit: 200,
      nextToken: nextTokenParam,
      selectionSet: TariffClassSelectionSet,
    },
  );

  const tariffClassList = [...prevTariffClassList, ...data];

  return nextToken
    ? getTariffClassList(nextToken, tariffClassList)
    : tariffClassList;
};

export const getTariffClass = async (
  id: string,
): Promise<TariffClass | null> => {
  const { data } = await client.models.TariffClass.get(
    {
      id,
    },
    // @ts-ignore
    {
      selectionSet: TariffClassSelectionSet,
    },
  );

  return data;
};

export const createTariffClass = async (input: CreateTariffClassInput) => {
  // @ts-ignore
  const { data } = await client.models.TariffClass.create(input);

  if (!data) return null;

  const tariffClass = await getTariffClass(data.id);

  return tariffClass;
};

export const updateTariffClass = async (input: UpdateTariffClassInput) => {
  // @ts-ignore
  const { data } = await client.models.TariffClass.update(input);

  if (!data) return null;

  const tariffClass = await getTariffClass(data.id);

  return tariffClass;
};

export const deleteTariffClass = async (tariffClass: TariffClass) => {
  // @ts-ignore
  const { data } = await client.models.TariffClass.delete({
    id: tariffClass.id,
  });

  if (!data) return null;

  return tariffClass;
};

export const isTariffClassUsed = (tariffClass: TariffClass): boolean =>
  tariffClass.staffTypes.length > 0;
