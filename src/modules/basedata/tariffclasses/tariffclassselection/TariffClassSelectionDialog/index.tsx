import React from "react";
import { useTariffClassList } from "hooks";
import { TariffClass } from "types";
import { CustomDialog } from "core";
import TariffClassListFilter from "../../tariffclasslist/TariffClassListFilter";
import TariffClassListTable from "../../tariffclasslist/TariffClassListTable";

type TariffClassSelectionDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: (value: React.SetStateAction<boolean>) => void;
  tariffClassSelectionHandler: (tariffClass: TariffClass) => void;
};

const TariffClassSelectionDialog: React.FC<TariffClassSelectionDialogProps> = ({
  dialogOpen,
  setDialogOpen,
  tariffClassSelectionHandler,
}) => {
  const { tariffClassList, isLoading } = useTariffClassList();

  return (
    <CustomDialog
      dialogOpen={dialogOpen}
      positive={false}
      titleText="Tarifklasse auswählen"
      setDialogOpen={setDialogOpen}
      showConfirm={false}
      showDecline={false}
      fullWidth={true}
      maxWidth="lg"
      contentPadding={0}
    >
      <TariffClassListFilter />
      <TariffClassListTable
        listIntent="selection"
        tariffClassList={tariffClassList}
        isLoading={isLoading}
        tariffClassSelectionHandler={tariffClassSelectionHandler}
      />
    </CustomDialog>
  );
};

export default TariffClassSelectionDialog;
