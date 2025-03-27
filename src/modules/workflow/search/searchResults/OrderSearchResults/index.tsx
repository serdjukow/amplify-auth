import React from "react";
import { Typography } from "@mui/material";
import { ArrowRightIcon, OrderIcon } from "icons";
import { Order, SearchTextParamName } from "types";
import { CustomLink } from "core";
import { getContactName } from "modules/customermanagement/contacts/domain";
import { getCustomerName } from "modules/customermanagement/customers/domain";
import { AppRoutes } from "routes";
import useStyles from "./styles";

type OrderSearchResultsProps = {
  orderList: Order[];
  searchInput: string;
};

const OrderSearchResults: React.FC<OrderSearchResultsProps> = ({
  orderList,
  searchInput,
}) => {
  const { classes } = useStyles();

  if (orderList.length === 0) {
    return null;
  }

  return (
    <div className={classes.resultsContent}>
      <span className={classes.resultsHeader}>
        <OrderIcon className={classes.resultsIcon} />
        <Typography variant="h3" className={classes.resultsTitle}>
          Aufträge
        </Typography>
      </span>
      <ul className={classes.resultList}>
        {orderList.slice(0, 3).map((order) => {
          return (
            <li>
              <CustomLink
                link={AppRoutes.customers.children.customer.children.customerorders.children.customerorder.path
                  .replace(":customerID", order.customerID)
                  .replace(":orderID", order.id)}
                linkText={
                  <div className={classes.resultLink}>
                    <span className={classes.resultName}>
                      {getCustomerName(order.customer)}
                    </span>
                    <span className={classes.resultSubname}>
                      {getContactName(order.contact)}
                    </span>
                  </div>
                }
              />

              <div className={classes.resultInfo}>
                <span className={classes.resultInfo1}>
                  {order.auftragsNummer}
                </span>
                <span className={classes.resultInfo2}>
                  {order.veranstaltungsort}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {orderList.length > 3 && (
        <div className={classes.loadMore}>
          <CustomLink
            link={
              AppRoutes.customers.children.customer.children.customerorders
                .path +
              "?sort=name:asc&" +
              SearchTextParamName.SearchOrder +
              "=" +
              searchInput
            }
            linkText="Mehr laden"
            iconAfter={<ArrowRightIcon className={classes.toSearchIcon} />}
            className={classes.toSearchLink}
          />
        </div>
      )}
    </div>
  );
};

export default OrderSearchResults;
