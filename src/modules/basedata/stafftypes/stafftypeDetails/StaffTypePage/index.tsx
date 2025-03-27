import React, { useState } from "react";
import { Grid2 } from "@mui/material";
import {
  useStaffTypeRead,
  useStaffTypeRoutes,
  useTariffClassRoutes,
} from "hooks";
import { BoxHeadlineContainer } from "layout";
import { StaffType } from "types";
import { CustomButton, CustomLink, LabeledTypography } from "core";
import {
  BoxLoadingDetails,
  DeleteIcon,
  DescriptionFormatter,
  EditIcon,
} from "components";
import StaffTypeDeleteDialog from "../../stafftypeDelete/StaffTypeDeleteDialog";

const StaffTypePage: React.FC = () => {
  const { staffType, isLoading } = useStaffTypeRead();
  const { navigateToEditStaffTypePage } = useStaffTypeRoutes();
  const { getTariffClassPageRoute } = useTariffClassRoutes();

  const [deleteStaffTypeDialogOpen, setDeleteStaffTypeDialogOpen] =
    useState<boolean>(false);
  const [staffTypeToDelete, setStaffTypeToDelete] = useState<
    StaffType | undefined
  >();

  if (isLoading || !staffType) {
    return (
      <BoxLoadingDetails
        isLoading={isLoading}
        entityName="Kunde"
        entity={staffType}
        customGenitiv="des Kunden"
      />
    );
  }

  console.log("staffType", staffType);

  return (
    <BoxHeadlineContainer
      boxTitle={staffType.name}
      marginTop={false}
      boxMenu={
        <>
          <CustomButton
            text="Bearbeiten"
            iconBefore={<EditIcon />}
            onClick={() => navigateToEditStaffTypePage(staffType)}
            size="small"
            color="blue"
            accessKey="e"
            marginRight={15}
          />
          <CustomButton
            text="Löschen"
            iconBefore={<DeleteIcon />}
            onClick={() => {
              setStaffTypeToDelete(staffType);
              setDeleteStaffTypeDialogOpen(true);
            }}
            size="small"
            color="red"
            accessKey="d"
          />
        </>
      }
    >
      <StaffTypeDeleteDialog
        dialogOpen={deleteStaffTypeDialogOpen}
        setDialogOpen={setDeleteStaffTypeDialogOpen}
        staffType={staffTypeToDelete}
      />
      <Grid2 container direction="row">
        <Grid2 size={4}>
          <LabeledTypography label="Name" content={staffType.name} />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography
            label="Aktiv"
            content={staffType.isActive ? "Ja" : "Nein"}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row">
        <Grid2 size={4}>
          <LabeledTypography
            label="Tarifklasse"
            content={
              <CustomLink
                linkText={staffType.tariffClass.bezeichnung}
                link={getTariffClassPageRoute(staffType.tariffClass)}
              />
            }
          />
        </Grid2>
      </Grid2>

      {staffType.anmerkungen && (
        <Grid2 container direction="row">
          <Grid2>
            <LabeledTypography
              label="Anmerkungen"
              content={
                <DescriptionFormatter description={staffType.anmerkungen} />
              }
            />
          </Grid2>
        </Grid2>
      )}
    </BoxHeadlineContainer>
  );
};

export default StaffTypePage;
