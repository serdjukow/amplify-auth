import React from "react";
import { useTariffClassList, useTariffClassRoutes } from "hooks";
import { BoxHeadlineContainer } from "layout";
import { CustomButton } from "core";
import { AddIcon } from "components";
import { AppRoutes } from "routes";
import TariffClassListFilter from "../TariffClassListFilter";
import TariffClassListTable from "../TariffClassListTable";

const TariffClassListPage: React.FC = () => {
  const { navigateToCreateTariffClassPage } = useTariffClassRoutes();

  const { tariffClassList, isLoading } = useTariffClassList();

  return (
    <BoxHeadlineContainer
      boxTitle="Tarifklassen"
      boxIcon={AppRoutes.tariffclasses.icon}
      boxSubTitle={tariffClassList.length.toString()}
      isLoading={isLoading}
      paddingHorizontal={0}
      paddingVertical={0}
      boxMenu={
        <CustomButton
          text="Neue Tarifklasse"
          size="small"
          iconBefore={<AddIcon />}
          onClick={() => navigateToCreateTariffClassPage()}
        />
      }
    >
      <TariffClassListFilter />
      <TariffClassListTable
        listIntent="list"
        tariffClassList={tariffClassList}
        isLoading={isLoading}
      />
    </BoxHeadlineContainer>
  );
};

export default TariffClassListPage;
