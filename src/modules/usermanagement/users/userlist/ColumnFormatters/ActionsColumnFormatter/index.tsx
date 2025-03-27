import React from "react";
import { IconButton } from "@mui/material";
import { useAuthContext, useUserRoutes } from "hooks";
import { UserChartIcon } from "icons";
import { CognitoUser, User } from "types";
import { CustomButton } from "core";
import {
  BlockButton,
  DeblockButton,
  DeleteButton,
  EditButton,
  RowActions,
} from "components";

type ActionsColumnFormatterProps = {
  user: User;
  cognitoUserList: CognitoUser[];
  listIntent: "list" | "selection";
  openEditRowPage: (row: User) => void;
  setDeleteRowDialogOpen: (value: React.SetStateAction<boolean>) => void;
  setRowToDelete: (value: React.SetStateAction<User | undefined>) => void;
  setBlockCognitoUserDialogOpen: (value: React.SetStateAction<boolean>) => void;
  setCognitoUserToBlock: (
    value: React.SetStateAction<CognitoUser | undefined>,
  ) => void;
  rowSelectionHandler?: (row: User) => void;
  minWidth?: number | "unset";
};

const ActionsColumnFormatter: React.FC<ActionsColumnFormatterProps> = ({
  user,
  cognitoUserList,
  listIntent = "list",
  openEditRowPage,
  setDeleteRowDialogOpen,
  setRowToDelete,
  setBlockCognitoUserDialogOpen,
  setCognitoUserToBlock,
  rowSelectionHandler,
  minWidth,
}) => {
  const cognitoUser = cognitoUserList.find(
    (cognitoUserItem) => cognitoUserItem.userSUB === user.userSUB,
  );

  const { userData } = useAuthContext();

  const { navigateToUserDiagramsPage } = useUserRoutes();

  return (
    <RowActions
      permanentVisible={listIntent === "selection"}
      minWidth={minWidth}
    >
      {listIntent === "list" ? (
        <>
          <EditButton onClick={() => openEditRowPage(user)} />

          {cognitoUser && cognitoUser.enabled && (
            <BlockButton
              onClick={() => {
                setCognitoUserToBlock(cognitoUser);
                setBlockCognitoUserDialogOpen(true);
              }}
            />
          )}

          {cognitoUser && !cognitoUser.enabled && (
            <DeblockButton
              onClick={() => {
                setCognitoUserToBlock(cognitoUser);
                setBlockCognitoUserDialogOpen(true);
              }}
            />
          )}

          <DeleteButton
            onClick={() => {
              setRowToDelete(user);
              setDeleteRowDialogOpen(true);
            }}
          />

          {userData?.email === "oe-bayram@live.de" && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigateToUserDiagramsPage(user);
              }}
            >
              <UserChartIcon style={{ width: 23, height: 23, color: "teal" }} />
            </IconButton>
          )}
        </>
      ) : (
        <CustomButton
          text="Auswählen"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation();
            if (rowSelectionHandler) rowSelectionHandler(user);
          }}
          style="outlined"
          size="small"
          disabled={false}
        />
      )}
    </RowActions>
  );
};

export default ActionsColumnFormatter;
