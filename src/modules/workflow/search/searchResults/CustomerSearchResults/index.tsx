import React from "react";
import { Typography } from "@mui/material";
import { ArrowRightIcon, CompanyIcon } from "icons";
import { Customer, SearchTextParamName } from "types";
import { CustomLink } from "core";
import { AppRoutes } from "routes";
import utils from "utils";
import useStyles from "./styles";

type CustomerSearchResultsProps = {
  customerList: Customer[];
  searchInput: string;
};

const CustomerSearchResults: React.FC<CustomerSearchResultsProps> = ({
  customerList,
  searchInput,
}) => {
  const { classes } = useStyles();

  if (customerList.length === 0) {
    return null;
  }

  return (
    <div className={classes.resultsContent}>
      <span className={classes.resultsHeader}>
        <CompanyIcon className={classes.resultsIcon} />
        <Typography variant="h3" className={classes.resultsTitle}>
          Kunden
        </Typography>
      </span>
      <ul className={classes.resultList}>
        {customerList.slice(0, 3).map((customer) => {
          return (
            <li>
              <CustomLink
                link={AppRoutes.customers.children.customer.path.replace(
                  ":customerID",
                  customer.id,
                )}
                linkText={
                  <div className={classes.resultLink}>
                    <span className={classes.resultName}>{customer.name}</span>
                    <span className={classes.resultSubname}>
                      {customer.adresse
                        ? utils.geo.getFormattedAddress(customer.adresse)
                        : "N/A"}
                    </span>
                  </div>
                }
              />

              <div className={classes.resultInfo}>
                <span className={classes.resultInfo1}>
                  {customer.kundenNummer}
                </span>
                <span className={classes.resultInfo2}>
                  {customer.email ?? "N/A"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {customerList.length > 3 && (
        <div className={classes.loadMore}>
          <CustomLink
            link={
              AppRoutes.customers.path +
              "?sort=name:asc&" +
              SearchTextParamName.SearchCustomer +
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

export default CustomerSearchResults;
