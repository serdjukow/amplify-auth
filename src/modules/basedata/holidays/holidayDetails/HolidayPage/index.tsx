import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useHolidayRead, useHolidayRoutes } from "hooks";
import { BoxHeadlineContainer } from "layout";
import { Holiday, HolidayEntry } from "types";
import { CustomButton, CustomReactTable } from "core";
import { BoxLoadingDetails, DeleteIcon, EditIcon } from "components";
import HolidayDeleteDialog from "../../holidayDelete/HolidayDeleteDialog";
import utils from "utils";

const HolidayPage: React.FC = () => {
  const { holiday, isLoading } = useHolidayRead();
  const { navigateToEditHolidayPage } = useHolidayRoutes();

  const [deleteHolidayDialogOpen, setDeleteHolidayDialogOpen] =
    useState<boolean>(false);
  const [holidayToDelete, setHolidayToDelete] = useState<Holiday | undefined>();

  const defaultColumns = React.useMemo<ColumnDef<HolidayEntry>[]>(
    () => [
      {
        header: "Feiertag",
        accessorKey: "title",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isDefaultSort: true,
          isNowrap: true,
        },
      },
      {
        header: "Beginn",
        accessorKey: "beginn",
        accessorFn: (row) =>
          utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(row.beginn),
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isNowrap: true,
        },
      },
      {
        header: "Ende",
        accessorKey: "ende",
        accessorFn: (row) =>
          utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(row.ende) +
          " Uhr",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        meta: {
          isNowrap: true,
        },
      },
    ],
    [],
  );

  if (isLoading || !holiday) {
    return (
      <BoxLoadingDetails
        isLoading={isLoading}
        entityName="Feiertags-Jahr"
        entity={holiday}
        customGenitiv="des Feiertags-Jahres"
      />
    );
  }

  console.log("holiday", holiday);

  return (
    <BoxHeadlineContainer
      boxTitle={holiday.year}
      marginTop={false}
      paddingHorizontal={0}
      paddingVertical={0}
      boxMenu={
        <>
          <CustomButton
            text="Bearbeiten"
            iconBefore={<EditIcon />}
            onClick={() => navigateToEditHolidayPage(holiday)}
            size="small"
            color="blue"
            accessKey="e"
            marginRight={15}
          />
          <CustomButton
            text="Löschen"
            iconBefore={<DeleteIcon />}
            onClick={() => {
              setHolidayToDelete(holiday);
              setDeleteHolidayDialogOpen(true);
            }}
            size="small"
            color="red"
            accessKey="d"
          />
        </>
      }
    >
      <HolidayDeleteDialog
        dialogOpen={deleteHolidayDialogOpen}
        setDialogOpen={setDeleteHolidayDialogOpen}
        holiday={holidayToDelete}
      />
      <CustomReactTable<HolidayEntry>
        data={holiday.holidays}
        columns={defaultColumns}
        isLoadingDataList={isLoading}
        selectable={false}
      />
    </BoxHeadlineContainer>
  );
};

export default HolidayPage;
