import React from "react";
import { useOrderToProcessList } from "hooks";
import { BoxHeadlineContainer } from "layout";
import Scroll from "react-scroll";
// import OrderListTable from "modules/orders/orderlist/OrderListTable";
import { AppRoutes } from "routes";

const Element = Scroll.Element;

const ContractsToProcessListTable: React.FC = () => {
  const { orderList, isLoading } = useOrderToProcessList();

  return (
    <BoxHeadlineContainer
      boxTitle="Abzuarbeitende Aufträge"
      boxIcon={
        AppRoutes.customers.children.customer.children.customerorders.icon
      }
      boxSubTitle={orderList.length.toString()}
      isLoading={isLoading}
      paddingHorizontal={0}
      paddingVertical={0}
    >
      <Element name="contractsToProcess" />
      {/* <OrderListTable
        isLoading={isLoading}
        listIntent="list"
        orderList={orderList}
      /> */}
    </BoxHeadlineContainer>
  );
};

export default ContractsToProcessListTable;
