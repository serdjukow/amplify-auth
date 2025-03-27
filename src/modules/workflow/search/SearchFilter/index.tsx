import React from "react";
import {
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { CustomButton, CustomSwitchiOS } from "core";
import useStyles from "./styles";

type SearchFilterProps = {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  includeCustomers: boolean;
  setIncludeCustomers: (value: React.SetStateAction<boolean>) => void;
  includeEmployees: boolean;
  setIncludeEmployees: (value: React.SetStateAction<boolean>) => void;
  includeOrders: boolean;
  setIncludeOrders: (value: React.SetStateAction<boolean>) => void;
};

const SearchFilter: React.FC<SearchFilterProps> = ({
  isOpen,
  setIsOpen,
  includeCustomers,
  setIncludeCustomers,
  includeEmployees,
  setIncludeEmployees,
  includeOrders,
  setIncludeOrders,
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
          <Typography variant="h3" className={classes.searchFilterTitle}>
            Sucheinstellungen
          </Typography>

          <CustomSwitchiOS
            name="includeCustomers"
            switchLabel="Kunden"
            checkedValue={includeCustomers}
            onChange={(_, value) => setIncludeCustomers(value)}
            classNameLabelRoot={classes.filterItem}
            classNameLabel={classes.filterLabel}
          />

          <CustomSwitchiOS
            name="includeEmployees"
            switchLabel="Mitarbeiter"
            checkedValue={includeEmployees}
            onChange={(_, value) => setIncludeEmployees(value)}
            classNameLabelRoot={classes.filterItem}
            classNameLabel={classes.filterLabel}
          />

          <CustomSwitchiOS
            name="includeOrders"
            switchLabel="Mitarbeiter"
            checkedValue={includeOrders}
            onChange={(_, value) => setIncludeOrders(value)}
            classNameLabelRoot={classes.filterItem}
            classNameLabel={classes.filterLabel}
          />

          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            className={classes.buttons}
          >
            <Grid item>
              <CustomButton
                text="Speichern"
                size="small"
                onClick={() => setIsOpen(false)}
              />
            </Grid>
          </Grid>
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
};

export default SearchFilter;
