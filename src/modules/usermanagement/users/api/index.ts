import { client } from "@/queryClient";
import { CognitoUser, CreateUserInput, UpdateUserInput, User } from "@/types";

export const getCognitoUserList = async (): Promise<CognitoUser[]> => {
  const { data } = await client.queries.listCognitoUsers();

  const users: CognitoUser[] = data ?? [];

  return users;
};

export const getAllUserList = async (
  nextTokenParam: string | null = null,
  prevUserList: User[] = [],
): Promise<User[]> => {
  const { data, nextToken } = await client.models.User.list({
    limit: 1000,
    nextToken: nextTokenParam,
  });

  console.log("getAllUserList data: ", data);

  const userList = [...prevUserList, ...data];

  return nextToken ? getAllUserList(nextToken, userList) : userList;
};

export const getUserListByUsername = async (
  username: string,
): Promise<User[]> => {
  const { data } = await client.models.User.usersByUsername(
    {
      username,
    },
    {
      limit: 10,
    },
  );

  return data as User[];
};

export const getUser = async (id: string): Promise<User | null> => {
  const [{ data }, cognitoUserList] = await Promise.all([
    client.models.User.get({ id }),
    getCognitoUserList(),
  ]);

  if (!data) return null;

  const cognitoUser =
    cognitoUserList.find(
      (cognitoUserItem) => cognitoUserItem?.userSUB === data.userSUB,
    ) ?? null;

  return { ...data, cognitoUser } as User;
};

export const createUser = async (input: CreateUserInput) => {
  // @ts-ignore
  const { data } = await client.models.User.create(input);

  if (!data) return null;

  const user = await getUser(data.id);

  return user;
};

export const updateUser = async (input: UpdateUserInput) => {
  // @ts-ignore
  const { data } = await client.models.User.update(input);

  if (!data) return null;

  const user = await getUser(data.id);

  return user;
};

export const deleteUser = async (user: User) => {
  // @ts-ignore
  const { data } = await client.models.User.delete({
    id: user.id,
  });

  if (!data) return null;

  return user;
};

export const isUserUsed = async (id: string): Promise<boolean> => {
  console.log("Checking if user is used: ", id);
  return false;
};
