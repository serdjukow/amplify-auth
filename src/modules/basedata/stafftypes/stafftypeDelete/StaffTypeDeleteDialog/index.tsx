import React, { useState } from "react";
import {
  useStaffTypeDelete,
  useStaffTypeRoutes,
  useStaffTypeUpdate,
} from "hooks";
import { StaffType } from "types";
import { DeleteDialog } from "components";
import { isStaffTypeUsed } from "../../api";

type StaffTypeDeleteDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
  staffType: StaffType | undefined;
};

const StaffTypeDeleteDialog: React.FC<StaffTypeDeleteDialogProps> = ({
  staffType,
  dialogOpen,
  setDialogOpen,
}) => {
  const updateStaffTypeMutation = useStaffTypeUpdate();
  const deleteStaffTypeMutation = useStaffTypeDelete();
  const { navigateToStaffTypeListPage } = useStaffTypeRoutes();

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  if (!dialogOpen || staffType === undefined) {
    return null;
  }

  const deleteStaffTypeRequest = async () => {
    setDeleteLoading(true);

    const deletedStaffType =
      await deleteStaffTypeMutation.mutateAsync(staffType);

    console.log("deletedStaffType: ", deletedStaffType);
    setDeleteLoading(false);
    setDialogOpen(false);

    navigateToStaffTypeListPage();
  };

  const inactivateStaffTypeRequest = async () => {
    setDeleteLoading(true);

    const updatedStaffType = await updateStaffTypeMutation.mutateAsync({
      id: staffType.id,
      isActive: false,
    });

    console.log("updatedStaffType: ", updatedStaffType);
    setDeleteLoading(false);
    setDialogOpen(false);

    navigateToStaffTypeListPage();
  };

  return (
    <DeleteDialog
      deleteLoading={deleteLoading}
      deleteRequest={deleteStaffTypeRequest}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTitle="Personalart Löschen"
      itemName={staffType.name}
      itemDeleteDescription="die Personalart"
      inactivate={true}
      isUsed={isStaffTypeUsed(staffType)}
      inactivateRequest={inactivateStaffTypeRequest}
      isInactive={!staffType.isActive}
    />
  );
};

export default StaffTypeDeleteDialog;
