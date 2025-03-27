import React from "react";
import { useHolidayList, useHolidayRoutes } from "hooks";
import { BoxHeadlineContainer } from "layout";
import { CustomButton } from "core";
import { AddIcon } from "components";
import { AppRoutes } from "routes";
import HolidayListTable from "../HolidayListTable";

const HolidayListPage: React.FC = () => {
  const { navigateToCreateHolidayPage } = useHolidayRoutes();

  const { holidayList, isLoading } = useHolidayList();

  return (
    <BoxHeadlineContainer
      boxTitle="Feiertage"
      boxIcon={AppRoutes.holidays.icon}
      boxSubTitle={holidayList.length.toString()}
      isLoading={isLoading}
      paddingHorizontal={0}
      paddingVertical={0}
      boxMenu={
        <CustomButton
          text="Neues Feiertags-Jahr"
          size="small"
          iconBefore={<AddIcon />}
          onClick={() => navigateToCreateHolidayPage()}
        />
      }
    >
      <HolidayListTable
        listIntent="list"
        holidayList={holidayList}
        isLoading={isLoading}
      />
    </BoxHeadlineContainer>
  );
};

export default HolidayListPage;
