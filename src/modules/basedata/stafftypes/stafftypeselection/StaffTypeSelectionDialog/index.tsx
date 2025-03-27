import React from "react";
import { useStaffTypeList } from "hooks";
import { StaffType } from "types";
import { CustomDialog } from "core";
import StaffTypeListFilter from "../../stafftypelist/StaffTypeListFilter";
import StaffTypeListTable from "../../stafftypelist/StaffTypeListTable";

type StaffTypeSelectionDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
  staffTypeSelectionHandler: (staffType: StaffType) => void;
};

const StaffTypeSelectionDialog: React.FC<StaffTypeSelectionDialogProps> = ({
  dialogOpen,
  setDialogOpen,
  staffTypeSelectionHandler,
}) => {
  const { staffTypeList, isLoading } = useStaffTypeList();

  return (
    <CustomDialog
      dialogOpen={dialogOpen}
      positive={false}
      titleText="Personalart auswählen"
      setDialogOpen={setDialogOpen}
      showConfirm={false}
      showDecline={false}
      fullWidth={true}
      maxWidth="lg"
      contentPadding={0}
    >
      <StaffTypeListFilter />
      <StaffTypeListTable
        listIntent="selection"
        staffTypeList={staffTypeList}
        isLoading={isLoading}
        staffTypeSelectionHandler={staffTypeSelectionHandler}
      />
    </CustomDialog>
  );
};

export default StaffTypeSelectionDialog;
