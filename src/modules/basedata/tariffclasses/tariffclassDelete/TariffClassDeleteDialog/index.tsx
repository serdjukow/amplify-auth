import React, { useState } from "react";
import {
  useTariffClassDelete,
  useTariffClassRoutes,
  useTariffClassUpdate,
} from "hooks";
import { TariffClass } from "types";
import { DeleteDialog } from "components";
import { isTariffClassUsed } from "../../api";

type TariffClassDeleteDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
  tariffClass: TariffClass | undefined;
};

const TariffClassDeleteDialog: React.FC<TariffClassDeleteDialogProps> = ({
  tariffClass,
  dialogOpen,
  setDialogOpen,
}) => {
  const updateTariffClassMutation = useTariffClassUpdate();
  const deleteTariffClassMutation = useTariffClassDelete();
  const { navigateToTariffClassListPage } = useTariffClassRoutes();

  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  if (!dialogOpen || tariffClass === undefined) {
    return null;
  }

  const deleteTariffClassRequest = async () => {
    setDeleteLoading(true);

    const deletedTariffClass =
      await deleteTariffClassMutation.mutateAsync(tariffClass);

    console.log("deletedTariffClass: ", deletedTariffClass);
    setDeleteLoading(false);
    setDialogOpen(false);

    navigateToTariffClassListPage();
  };

  const inactivateTariffClassRequest = async () => {
    setDeleteLoading(true);

    const updatedTariffClass = await updateTariffClassMutation.mutateAsync({
      id: tariffClass.id,
      isActive: false,
    });

    console.log("updatedTariffClass: ", updatedTariffClass);
    setDeleteLoading(false);
    setDialogOpen(false);

    navigateToTariffClassListPage();
  };

  return (
    <DeleteDialog
      deleteLoading={deleteLoading}
      deleteRequest={deleteTariffClassRequest}
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      dialogTitle="Tarifklasse Löschen"
      itemName={tariffClass.bezeichnung}
      itemDeleteDescription="die Tarifklasse"
      inactivate={true}
      isUsed={isTariffClassUsed(tariffClass)}
      inactivateRequest={inactivateTariffClassRequest}
      isInactive={!tariffClass.isActive}
    />
  );
};

export default TariffClassDeleteDialog;
