import React from "react";
import { useStaffTypeList, useStaffTypeRoutes } from "hooks";
import { BoxHeadlineContainer } from "layout";
import { CustomButton } from "core";
import { AddIcon } from "components";
import { AppRoutes } from "routes";
import StaffTypeListFilter from "../StaffTypeListFilter";
import StaffTypeListTable from "../StaffTypeListTable";

const StaffTypeListPage: React.FC = () => {
  const { navigateToCreateStaffTypePage } = useStaffTypeRoutes();

  const { staffTypeList, isLoading } = useStaffTypeList();

  return (
    <BoxHeadlineContainer
      boxTitle="Personalarten"
      boxIcon={AppRoutes.stafftypes.icon}
      boxSubTitle={staffTypeList.length.toString()}
      isLoading={isLoading}
      paddingHorizontal={0}
      paddingVertical={0}
      boxMenu={
        <CustomButton
          text="Neue Personalart"
          size="small"
          iconBefore={<AddIcon />}
          onClick={() => navigateToCreateStaffTypePage()}
        />
      }
    >
      <StaffTypeListFilter />
      <StaffTypeListTable
        listIntent="list"
        staffTypeList={staffTypeList}
        isLoading={isLoading}
      />
    </BoxHeadlineContainer>
  );
};

export default StaffTypeListPage;
