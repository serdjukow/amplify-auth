import React, { SyntheticEvent, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useHolidayRoutes } from "hooks";
import { Holiday } from "types";
import { CustomReactTable } from "core";
import { ActionsColumnFormatter } from "components";
import HolidayDeleteDialog from "../../holidayDelete/HolidayDeleteDialog";

type HolidayListTableProps = {
  listIntent: "list" | "selection";
  holidayList: Holiday[];
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: (loadAll?: boolean) => void;
  holidaySelectionHandler?: (holiday: Holiday) => void;
};

const HolidayListTable: React.FC<HolidayListTableProps> = ({
  listIntent,
  holidayList,
  isLoading,
  hasNextPage,
  fetchNextPage,
  holidaySelectionHandler,
}) => {
  const { navigateToHolidayPage, navigateToEditHolidayPage } =
    useHolidayRoutes();

  const [deleteHolidayDialogOpen, setDeleteHolidayDialogOpen] =
    useState<boolean>(false);
  const [holidayToDelete, setHolidayToDelete] = useState<Holiday | undefined>();

  const defaultColumns = React.useMemo<ColumnDef<Holiday>[]>(
    () => [
      {
        header: "Jahr",
        accessorKey: "year",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isDefaultSort: true,
          isNowrap: true,
        },
      },
      {
        header: "Anzahl Feiertage",
        accessorKey: "holidays",
        accessorFn: (row) => row.holidays.length,
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isNowrap: true,
        },
        enableSorting: false,
      },
      {
        header: "Aktionen",
        cell: ({ row }) => (
          <ActionsColumnFormatter<Holiday>
            row={row}
            listIntent={listIntent}
            openEditRowPage={(row) => navigateToEditHolidayPage(row)}
            setRowToDelete={setHolidayToDelete}
            setDeleteRowDialogOpen={setDeleteHolidayDialogOpen}
            rowSelectionHandler={holidaySelectionHandler}
          />
        ),
        footer: (props) => props.column.id,
      },
    ],
    [navigateToEditHolidayPage, holidaySelectionHandler, listIntent],
  );

  const rowClickHandler = (_: SyntheticEvent, row: Holiday) => {
    if (holidaySelectionHandler) {
      holidaySelectionHandler(row);
    } else {
      navigateToHolidayPage(row);
    }
  };

  return (
    <>
      <HolidayDeleteDialog
        dialogOpen={deleteHolidayDialogOpen}
        setDialogOpen={setDeleteHolidayDialogOpen}
        holiday={holidayToDelete}
      />
      <CustomReactTable<Holiday>
        data={holidayList}
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

export default HolidayListTable;
