import { client } from "queryClient";
import {
  CreateHolidayInput,
  Holiday,
  HolidaySelectionSet,
  UpdateHolidayInput,
} from "types";

export const getHolidayList = async (
  nextTokenParam: string | null = null,
  prevHolidayList: Holiday[] = [],
): Promise<Holiday[]> => {
  const { data, nextToken } = await client.models.Holiday.list(
    // @ts-ignore
    {
      limit: 200,
      nextToken: nextTokenParam,
      selectionSet: HolidaySelectionSet,
    },
  );

  const holidayList = [...prevHolidayList, ...data];

  return nextToken ? getHolidayList(nextToken, holidayList) : holidayList;
};

export const getHoliday = async (id: string): Promise<Holiday | null> => {
  const { data } = await client.models.Holiday.get(
    {
      id,
    },
    // @ts-ignore
    {
      selectionSet: HolidaySelectionSet,
    },
  );

  return data;
};

export const createHoliday = async (input: CreateHolidayInput) => {
  // @ts-ignore
  const { data } = await client.models.Holiday.create(input);

  if (!data) return null;

  const holiday = await getHoliday(data.id);

  return holiday;
};

export const updateHoliday = async (input: UpdateHolidayInput) => {
  // @ts-ignore
  const { data } = await client.models.Holiday.update(input);

  if (!data) return null;

  const holiday = await getHoliday(data.id);

  return holiday;
};

export const deleteHoliday = async (holiday: Holiday) => {
  // @ts-ignore
  const { data } = await client.models.Holiday.delete({
    id: holiday.id,
  });

  if (!data) return null;

  return holiday;
};

export const isHolidayUsed = (holiday: Holiday): boolean => {
  console.log("Checking if holiday is used: ", holiday);
  return false;
};
