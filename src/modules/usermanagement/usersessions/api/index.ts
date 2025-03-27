import { client } from "queryClient";
import {
  CreateUserSessionInput,
  UpdateUserSessionInput,
  UserSession,
  UserSessionStatus,
} from "types";

export const IDLE_TIME = 2 * 60_000; // 2 Minutes

export const HEARTBEAT_INTERVAL = 60_000; // 1 Minute

export const getUserSessionListByUser = async (
  userID: string,
  startDate: Date,
  endDate: Date,
  nextTokenParam: string | null = null,
  prevUserSessionList: UserSession[] = [],
): Promise<UserSession[]> => {
  const { data, nextToken } = await client.models.UserSession.sessionsByUser(
    {
      userID,
      endTime: {
        between: [startDate.toISOString(), endDate.toISOString()],
      },
    },
    {
      limit: 10,
      nextToken: nextTokenParam,
    },
  );

  const userSessionList = [...prevUserSessionList, ...data];

  return nextToken
    ? getUserSessionListByUser(
        userID,
        startDate,
        endDate,
        nextToken,
        userSessionList,
      )
    : userSessionList;
};

export const getLastUserSession = async (
  userID: string,
): Promise<UserSession[]> => {
  const { data } = await client.models.UserSession.sessionsByUser(
    {
      userID,
    },
    {
      limit: 5,
      sortDirection: "DESC",
    },
  );

  return data;
};

export const createUserSession = async (userID: string) => {
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + 60000); // startTime + 1 Minute

  const createUserSessionInput: CreateUserSessionInput = {
    userID,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    duration: 60,
    status: "Active",
  };

  const { data } = await client.models.UserSession.create(
    createUserSessionInput,
  );

  return data;
};

export const updateUserSession = async (input: UpdateUserSessionInput) => {
  const { data } = await client.models.UserSession.update(input);

  return data;
};

export const canContinueSession = (userSession: UserSession): boolean => {
  const nowMs = Date.now();
  const endTimeMs = new Date(userSession.endTime).getTime();
  const diffMs = nowMs - endTimeMs;

  return diffMs < IDLE_TIME;
};

export const pingSession = async (
  userSession: UserSession,
  status: UserSessionStatus,
): Promise<UserSession | null> => {
  const duration = Math.round(
    (new Date().getTime() - new Date(userSession.startTime).getTime()) / 1000,
  );

  const updateUserSessionInput: UpdateUserSessionInput = {
    id: userSession.id,
    status: status,
    endTime: new Date().toISOString(),
    duration: duration,
  };

  const updatedUserSession = await updateUserSession(updateUserSessionInput);

  return updatedUserSession;
};
