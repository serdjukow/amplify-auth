import React, { useState } from "react";
import { Grid2 } from "@mui/material";
import { useTariffClassRead, useTariffClassRoutes } from "hooks";
import { BoxHeadlineContainer } from "layout";
import { TariffClass } from "types";
import { CustomButton, LabeledTypography } from "core";
import {
  BoxLoadingDetails,
  DeleteIcon,
  DescriptionFormatter,
  EditIcon,
} from "components";
import TariffClassDeleteDialog from "../../tariffclassDelete/TariffClassDeleteDialog";

const TariffClassPage: React.FC = () => {
  const { tariffClass, isLoading } = useTariffClassRead();
  const { navigateToEditTariffClassPage } = useTariffClassRoutes();

  const [deleteTariffClassDialogOpen, setDeleteTariffClassDialogOpen] =
    useState<boolean>(false);
  const [tariffClassToDelete, setTariffClassToDelete] = useState<
    TariffClass | undefined
  >();

  if (isLoading || !tariffClass) {
    return (
      <BoxLoadingDetails
        isLoading={isLoading}
        entityName="Kunde"
        entity={tariffClass}
        customGenitiv="des Kunden"
      />
    );
  }

  console.log("tariffClass", tariffClass);

  return (
    <BoxHeadlineContainer
      boxTitle={tariffClass.bezeichnung}
      marginTop={false}
      boxMenu={
        <>
          <CustomButton
            text="Bearbeiten"
            iconBefore={<EditIcon />}
            onClick={() => navigateToEditTariffClassPage(tariffClass)}
            size="small"
            color="blue"
            accessKey="e"
            marginRight={15}
          />
          <CustomButton
            text="Löschen"
            iconBefore={<DeleteIcon />}
            onClick={() => {
              setTariffClassToDelete(tariffClass);
              setDeleteTariffClassDialogOpen(true);
            }}
            size="small"
            color="red"
            accessKey="d"
          />
        </>
      }
    >
      <TariffClassDeleteDialog
        dialogOpen={deleteTariffClassDialogOpen}
        setDialogOpen={setDeleteTariffClassDialogOpen}
        tariffClass={tariffClassToDelete}
      />
      <Grid2 container direction="row">
        <Grid2 size={4}>
          <LabeledTypography label="Kürzel" content={tariffClass.kuerzel} />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography
            label="Bezeichnung"
            content={tariffClass.bezeichnung}
          />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography
            label="Aktiv"
            content={tariffClass.isActive ? "Ja" : "Nein"}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row">
        <Grid2 size={6}>
          <LabeledTypography
            label="Tätigkeitsbeschreibung"
            content={
              <DescriptionFormatter
                description={tariffClass.taetigkeitsbeschreibung}
              />
            }
          />
        </Grid2>
        <Grid2 size={6}>
          <LabeledTypography
            label="Qualifikation"
            content={
              <DescriptionFormatter description={tariffClass.qualifikation} />
            }
          />
        </Grid2>
      </Grid2>

      {tariffClass.anmerkungen && (
        <Grid2 container direction="row">
          <Grid2>
            <LabeledTypography
              label="Anmerkungen"
              content={
                <DescriptionFormatter description={tariffClass.anmerkungen} />
              }
            />
          </Grid2>
        </Grid2>
      )}
    </BoxHeadlineContainer>
  );
};

export default TariffClassPage;
