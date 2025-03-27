import React from "react";
import { Grid2 } from "@mui/material";
import { BooleanFilter } from "options";
import { FilterRow, FilterWrapper } from "components";

const TariffClassListFilter: React.FC = () => (
  <FilterWrapper>
    <FilterRow>
      <Grid2>
        <BooleanFilter
          paramName="Aktiv"
          param="isActive"
          defaultOption="true"
        />
      </Grid2>
    </FilterRow>
  </FilterWrapper>
);

export default TariffClassListFilter;
