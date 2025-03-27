import React from "react";
import { ClickAwayListener, Paper, Popper, Typography } from "@mui/material";
import { FileDuoIcon } from "icons";
import { Customer, Employee, Order } from "types";
import CustomerSearchResults from "../CustomerSearchResults";
import EmployeeSearchResults from "../EmployeeSearchResults";
import OrderSearchResults from "../OrderSearchResults";
import useStyles from "./styles";

type SearchResultsProps = {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  customerList: Customer[];
  employeeList: Employee[];
  orderList: Order[];
  searchInput: string;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  isOpen,
  setIsOpen,
  customerList,
  employeeList,
  orderList,
  searchInput,
}) => {
  const { classes } = useStyles();

  if (!isOpen) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <Popper
        className={classes.popper}
        open={isOpen}
        placement="bottom-start"
        transition
        disablePortal
      >
        <Paper className={classes.paper}>
          {customerList.length === 0 && employeeList.length === 0 && (
            <div className={classes.noResultsContent}>
              <FileDuoIcon className={classes.noResultsIcon} />
              <Typography className={classes.noResultsTitle}>
                Keine Ergebnisse gefunden
              </Typography>
              <Typography className={classes.noResultsText}>
                Bitte versuchen Sie eine andere Abfrage
              </Typography>
            </div>
          )}

          <CustomerSearchResults
            customerList={customerList}
            searchInput={searchInput}
          />

          <EmployeeSearchResults
            employeeList={employeeList}
            searchInput={searchInput}
          />

          <OrderSearchResults orderList={orderList} searchInput={searchInput} />
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
};

export default SearchResults;
