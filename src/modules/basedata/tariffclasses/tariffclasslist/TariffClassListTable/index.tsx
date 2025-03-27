import React, { SyntheticEvent, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useTariffClassRoutes } from "hooks";
import { TariffClass } from "types";
import { CustomReactTable } from "core";
import { ActionsColumnFormatter, DescriptionFormatter } from "components";
import TariffClassDeleteDialog from "../../tariffclassDelete/TariffClassDeleteDialog";

type TariffClassListTableProps = {
  listIntent: "list" | "selection";
  tariffClassList: TariffClass[];
  isLoading: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: (loadAll?: boolean) => void;
  tariffClassSelectionHandler?: (tariffClass: TariffClass) => void;
};

const TariffClassListTable: React.FC<TariffClassListTableProps> = ({
  listIntent,
  tariffClassList,
  isLoading,
  hasNextPage,
  fetchNextPage,
  tariffClassSelectionHandler,
}) => {
  const { navigateToTariffClassPage, navigateToEditTariffClassPage } =
    useTariffClassRoutes();

  const [deleteTariffClassDialogOpen, setDeleteTariffClassDialogOpen] =
    useState<boolean>(false);
  const [tariffClassToDelete, setTariffClassToDelete] = useState<
    TariffClass | undefined
  >();

  const defaultColumns = React.useMemo<ColumnDef<TariffClass>[]>(
    () => [
      {
        header: "Kürzel",
        accessorKey: "kuerzel",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isDefaultSort: true,
          isNowrap: true,
        },
      },
      {
        header: "Bezeichnung",
        accessorKey: "bezeichnung",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isNowrap: true,
        },
      },
      {
        header: "Tätigkeitsbeschreibung",
        accessorKey: "taetigkeitsbeschreibung",
        cell: ({ row }) => (
          <DescriptionFormatter
            description={row.original.taetigkeitsbeschreibung}
          />
        ),
        footer: (props) => props.column.id,
        meta: {
          isNowrap: true,
        },
      },
      {
        header: "Qualifikation",
        accessorKey: "qualifikation",
        cell: ({ row }) => (
          <DescriptionFormatter description={row.original.qualifikation} />
        ),
        footer: (props) => props.column.id,
      },
      {
        header: "Aktionen",
        cell: ({ row }) => (
          <ActionsColumnFormatter<TariffClass>
            row={row}
            listIntent={listIntent}
            openEditRowPage={(row) => navigateToEditTariffClassPage(row)}
            setRowToDelete={setTariffClassToDelete}
            setDeleteRowDialogOpen={setDeleteTariffClassDialogOpen}
            rowSelectionHandler={tariffClassSelectionHandler}
          />
        ),
        footer: (props) => props.column.id,
      },
    ],
    [navigateToEditTariffClassPage, tariffClassSelectionHandler, listIntent],
  );

  const rowClickHandler = (_: SyntheticEvent, row: TariffClass) => {
    if (tariffClassSelectionHandler) {
      tariffClassSelectionHandler(row);
    } else {
      navigateToTariffClassPage(row);
    }
  };

  return (
    <>
      <TariffClassDeleteDialog
        dialogOpen={deleteTariffClassDialogOpen}
        setDialogOpen={setDeleteTariffClassDialogOpen}
        tariffClass={tariffClassToDelete}
      />
      <CustomReactTable<TariffClass>
        data={tariffClassList}
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

export default TariffClassListTable;
