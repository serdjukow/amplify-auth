import React from "react";
import { Grid2 } from "@mui/material";
import { SearchTextFilter } from "options";
import { SearchTextParamName } from "types";
import { FilterRow, FilterWrapper } from "components";

const UserListFilter: React.FC = () => (
  <FilterWrapper>
    <FilterRow>
      <Grid2>
        <SearchTextFilter
          searchTextParamName={SearchTextParamName.SearchUser}
        />
      </Grid2>
    </FilterRow>
  </FilterWrapper>
);

export default UserListFilter;
