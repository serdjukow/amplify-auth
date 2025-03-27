import React from "react";
import { Typography } from "@mui/material";
import { ArrowRightIcon, EmployeeIcon } from "icons";
import { Employee, SearchTextParamName } from "types";
import { CustomLink } from "core";
import { AppRoutes } from "routes";
import utils from "utils";
import useStyles from "./styles";

type EmployeeSearchResultsProps = {
  employeeList: Employee[];
  searchInput: string;
};

const EmployeeSearchResults: React.FC<EmployeeSearchResultsProps> = ({
  employeeList,
  searchInput,
}) => {
  const { classes } = useStyles();

  if (employeeList.length === 0) {
    return null;
  }

  return (
    <div className={classes.resultsContent}>
      <span className={classes.resultsHeader}>
        <EmployeeIcon className={classes.resultsIcon} />
        <Typography variant="h3" className={classes.resultsTitle}>
          Mitarbeiter
        </Typography>
      </span>
      <ul className={classes.resultList}>
        {employeeList.slice(0, 3).map((employee) => {
          return (
            <li>
              <CustomLink
                link={AppRoutes.employees.children.employee.path.replace(
                  ":employeeID",
                  employee.id,
                )}
                linkText={
                  <div className={classes.resultLink}>
                    <span className={classes.resultName}>
                      {employee.vorname + " " + employee.name}
                    </span>
                    <span className={classes.resultSubname}>
                      {employee.adresse
                        ? utils.geo.getFormattedAddress(employee.adresse)
                        : "N/A"}
                    </span>
                  </div>
                }
              />

              <div className={classes.resultInfo}>
                <span className={classes.resultInfo1}>
                  {employee.personalNummer}
                </span>
                <span className={classes.resultInfo2}>
                  {employee.mobil ?? "N/A"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      {employeeList.length > 3 && (
        <div className={classes.loadMore}>
          <CustomLink
            link={
              AppRoutes.employees.path +
              "?sort=name:asc&" +
              SearchTextParamName.SearchEmployee +
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

export default EmployeeSearchResults;
