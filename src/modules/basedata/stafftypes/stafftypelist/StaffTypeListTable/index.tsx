import React, { SyntheticEvent, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useStaffTypeRoutes } from "hooks";
import { StaffType } from "types";
import { CustomReactTable } from "core";
import { ActionsColumnFormatter } from "components";
import StaffTypeDeleteDialog from "../../stafftypeDelete/StaffTypeDeleteDialog";

type StaffTypeListTableProps = {
  listIntent: "list" | "selection";
  staffTypeList: StaffType[];
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: (loadAll?: boolean) => void;
  staffTypeSelectionHandler?: (staffType: StaffType) => void;
};

const StaffTypeListTable: React.FC<StaffTypeListTableProps> = ({
  listIntent,
  staffTypeList,
  isLoading,
  hasNextPage,
  fetchNextPage,
  staffTypeSelectionHandler,
}) => {
  const { navigateToStaffTypePage, navigateToEditStaffTypePage } =
    useStaffTypeRoutes();

  const [deleteStaffTypeDialogOpen, setDeleteStaffTypeDialogOpen] =
    useState<boolean>(false);
  const [staffTypeToDelete, setStaffTypeToDelete] = useState<
    StaffType | undefined
  >();

  const defaultColumns = React.useMemo<ColumnDef<StaffType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isDefaultSort: true,
          isNowrap: true,
        },
      },
      {
        header: "Tarifklasse",
        accessorKey: "tariffClassID",
        accessorFn: (row) => row.tariffClass?.bezeichnung,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isNowrap: true,
        },
      },
      {
        header: "Aktionen",
        cell: ({ row }) => (
          <ActionsColumnFormatter<StaffType>
            row={row}
            listIntent={listIntent}
            openEditRowPage={(row) => navigateToEditStaffTypePage(row)}
            setRowToDelete={setStaffTypeToDelete}
            setDeleteRowDialogOpen={setDeleteStaffTypeDialogOpen}
            rowSelectionHandler={staffTypeSelectionHandler}
          />
        ),
        footer: (props) => props.column.id,
      },
    ],
    [navigateToEditStaffTypePage, staffTypeSelectionHandler, listIntent],
  );

  const rowClickHandler = (_: SyntheticEvent, row: StaffType) => {
    if (staffTypeSelectionHandler) {
      staffTypeSelectionHandler(row);
    } else {
      navigateToStaffTypePage(row);
    }
  };

  return (
    <>
      <StaffTypeDeleteDialog
        dialogOpen={deleteStaffTypeDialogOpen}
        setDialogOpen={setDeleteStaffTypeDialogOpen}
        staffType={staffTypeToDelete}
      />
      <CustomReactTable<StaffType>
        data={staffTypeList}
        columns={defaultColumns}
        rowClickHandler={rowClickHandler}
        isLoadingDataList={isLoading}
        hasNextData={hasNextPage}
        onClickLoadMore={() => fetchNextPage && fetchNextPage()}
        onClickLoadAll={() => fetchNextPage && fetchNextPage(true)}
        selectable={false}
        sticky={listIntent === "list"}
      />
    </>
  );
};

export default StaffTypeListTable;
