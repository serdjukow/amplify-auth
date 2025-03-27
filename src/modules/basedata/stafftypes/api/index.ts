import { client } from "queryClient";
import {
  CreateStaffTypeInput,
  StaffType,
  StaffTypeSelectionSet,
  UpdateStaffTypeInput,
} from "types";

export const getStaffTypeList = async (
  nextTokenParam: string | null = null,
  prevStaffTypeList: StaffType[] = [],
): Promise<StaffType[]> => {
  const { data, nextToken } = await client.models.StaffType.list(
    // @ts-ignore
    {
      limit: 200,
      nextToken: nextTokenParam,
      selectionSet: StaffTypeSelectionSet,
    },
  );

  const staffTypeList = [...prevStaffTypeList, ...data];

  return nextToken ? getStaffTypeList(nextToken, staffTypeList) : staffTypeList;
};

export const getStaffType = async (id: string): Promise<StaffType | null> => {
  const { data } = await client.models.StaffType.get(
    {
      id,
    },
    // @ts-ignore
    {
      selectionSet: StaffTypeSelectionSet,
    },
  );

  return data;
};

export const createStaffType = async (input: CreateStaffTypeInput) => {
  // @ts-ignore
  const { data } = await client.models.StaffType.create(input);

  if (!data) return null;

  const staffType = await getStaffType(data.id);

  return staffType;
};

export const updateStaffType = async (input: UpdateStaffTypeInput) => {
  // @ts-ignore
  const { data } = await client.models.StaffType.update(input);

  if (!data) return null;

  const staffType = await getStaffType(data.id);

  return staffType;
};

export const deleteStaffType = async (staffType: StaffType) => {
  // @ts-ignore
  const { data } = await client.models.StaffType.delete({
    id: staffType.id,
  });

  if (!data) return null;

  return staffType;
};

export const isStaffTypeUsed = (staffType: StaffType): boolean =>
  staffType.orderShiftStaffs.length > 0;
