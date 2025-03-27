import React from "react";
import { Grid2, Typography } from "@mui/material";
import { useAuthContext, useUserRoutes } from "hooks";
import { BoxHeadlineContainer } from "layout";
import {
  getTableHeaderColorName,
  getTableSpacingName,
  getTableThemeName,
} from "options";
import { CustomAvatar, CustomButton, LabeledTypography } from "core";
import { EditIcon } from "components";
import utils from "utils";

const UserSettingsPage: React.FC = () => {
  const authContext = useAuthContext();

  const { navigateToEditUserSettingsPage } = useUserRoutes();

  const user = authContext.userData;

  if (!user) {
    return (
      <BoxHeadlineContainer boxTitle="Benutzer-Einstellungen">
        Beim Laden der Benutzer-Einstellungen ist ein Fehler aufgetreten!
      </BoxHeadlineContainer>
    );
  }

  return (
    <BoxHeadlineContainer
      boxTitle="Benutzer-Einstellungen"
      marginTop={false}
      boxMenu={
        <CustomButton
          text="Bearbeiten"
          iconBefore={<EditIcon />}
          onClick={() => navigateToEditUserSettingsPage()}
          size="small"
          color="blue"
        />
      }
    >
      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Anrede"
            content={user.salutation === "Mrs" ? "Frau" : "Herr"}
          />
        </Grid2>

        <Grid2 size={4}>
          <LabeledTypography label="Vorname" content={user.firstName} />
        </Grid2>

        <Grid2 size={4}>
          <LabeledTypography label="Nachname" content={user.lastName} />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography label="Telefon" content={user.phone} />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography label="Fax" content={user.fax} />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Benutzerbild"
            content={
              <CustomAvatar
                showBadge={false}
                size="100px"
                s3Resource={user.avatar}
              />
            }
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Rollen"
            content={user.cognitoUser?.groups
              .map((group) => group.GroupName)
              .join(", ")}
          />
        </Grid2>
      </Grid2>

      <Typography variant="h2">Benutzereinstellungen</Typography>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Tabellen-Theme"
            content={getTableThemeName(user.userSettings.tableTheme)}
          />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography
            label="Tabellenkopf-Farbe"
            content={getTableHeaderColorName(
              user.userSettings.tableHeaderColor,
            )}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <LabeledTypography
            label="Tabellen-Abstand"
            content={getTableSpacingName(user.userSettings.tableSpacing)}
          />
        </Grid2>
        <Grid2 size={4}>
          <LabeledTypography
            label="Tabellenkopf fixieren"
            content={user.userSettings.tableSticky ? "Ja" : "Nein"}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row">
        <Grid2 size={4}>
          <LabeledTypography
            label="Bevorzugte Einheit"
            content={
              utils.constants.WEIGHT_OPTIONS.find(
                (weightOption) =>
                  weightOption.value === user!.userSettings.unitType,
              )?.label
            }
          />
        </Grid2>
      </Grid2>
    </BoxHeadlineContainer>
  );
};

export default UserSettingsPage;
