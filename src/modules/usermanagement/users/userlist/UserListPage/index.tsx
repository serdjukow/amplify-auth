import React from "react";
import { useUserList, useUserRoutes } from "hooks";
import { BoxHeadlineContainer } from "layout";
import { CustomButton } from "core";
import { AddIcon } from "components";
import { AppRoutes } from "routes";
import UserListFilter from "../UserListFilter";
import UserListTable from "../UserListTable";
import useStyles from "./styles";

const UserListPage: React.FC = () => {
  const { classes } = useStyles();
  const { isLoading, userList, cognitoUserList } = useUserList();
  const { navigateToCreateUserPage } = useUserRoutes();

  return (
    <BoxHeadlineContainer
      boxTitle="Benutzer"
      boxIcon={AppRoutes.users.icon}
      boxSubTitle={userList.length.toString()}
      paddingHorizontal={0}
      paddingVertical={0}
      className={classes.boxHeadlineContainer}
      boxMenu={
        <CustomButton
          text="Neuer Benutzer"
          size="small"
          iconBefore={<AddIcon />}
          onClick={() => navigateToCreateUserPage()}
        />
      }
    >
      <UserListFilter />
      <UserListTable
        isLoading={isLoading}
        userList={userList}
        cognitoUserList={cognitoUserList}
      />
    </BoxHeadlineContainer>
  );
};

export default UserListPage;
