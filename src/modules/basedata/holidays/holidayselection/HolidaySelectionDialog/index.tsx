import React from "react";
import { useHolidayList } from "hooks";
import { Holiday } from "types";
import { CustomDialog } from "core";
import HolidayListTable from "../../holidaylist/HolidayListTable";

type HolidaySelectionDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
  holidaySelectionHandler: (holiday: Holiday) => void;
};

const HolidaySelectionDialog: React.FC<HolidaySelectionDialogProps> = ({
  dialogOpen,
  setDialogOpen,
  holidaySelectionHandler,
}) => {
  const { holidayList, isLoading } = useHolidayList();

  return (
    <CustomDialog
      dialogOpen={dialogOpen}
      positive={false}
      titleText="Feiertags-Jahr auswählen"
      setDialogOpen={setDialogOpen}
      showConfirm={false}
      showDecline={false}
      fullWidth={true}
      maxWidth="lg"
      contentPadding={0}
    >
      <HolidayListTable
        listIntent="selection"
        holidayList={holidayList}
        isLoading={isLoading}
        holidaySelectionHandler={holidaySelectionHandler}
      />
    </CustomDialog>
  );
};

export default HolidaySelectionDialog;
