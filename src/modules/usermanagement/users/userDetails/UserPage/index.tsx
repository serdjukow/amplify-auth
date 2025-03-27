"use client"

import React, { useState } from "react"
import { Grid, Typography } from "@mui/material"
import { useUserRead, useUserRoutes } from "hooks"
import { BoxHeadlineContainer } from "@/layout"
import { getTableHeaderColorName, getTableSpacingName, getTableThemeName } from "@/options"
import { User } from "@/types"
import { CustomAvatar, CustomButton, LabeledTypography } from "@/core"
import { BoxLoadingDetails, DeleteIcon, EditIcon } from "@/components"
import UserDeleteDialog from "../../userDelete/UserDeleteDialog"
import utils from "@/utils"

const UserPage: React.FC = () => {
    const { user, isLoading } = useUserRead()
    const { navigateToEditUserPage } = useUserRoutes()

    const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState<boolean>(false)
    const [userToDelete, setUserToDelete] = useState<User>()

    if (isLoading || !user) {
        return <BoxLoadingDetails isLoading={isLoading} entityName="Benutzer" entity={user} />
    }

    return (
        <BoxHeadlineContainer
            boxTitle={!isLoading && user ? user.firstName + " " + user.lastName : "Benutzer-Details"}
            marginTop={false}
            boxWidth="lg"
            boxMenu={
                <>
                    <CustomButton
                        text="Bearbeiten"
                        iconBefore={<EditIcon />}
                        onClick={() => navigateToEditUserPage(user)}
                        size="small"
                        color="blue"
                        marginRight={15}
                    />
                    <CustomButton
                        text="Löschen"
                        iconBefore={<DeleteIcon />}
                        onClick={() => {
                            setUserToDelete(user)
                            setDeleteUserDialogOpen(true)
                        }}
                        size="small"
                        color="red"
                    />
                </>
            }
        >
            <UserDeleteDialog dialogOpen={deleteUserDialogOpen} setDialogOpen={setDeleteUserDialogOpen} user={userToDelete} />
            <Grid container direction="row" spacing={5}>
                <Grid size={4}>
                    <LabeledTypography label="Anrede" content={user.salutation === "Mrs" ? "Frau" : "Herr"} />
                </Grid>

                <Grid size={4}>
                    <LabeledTypography label="Vorname" content={user.firstName} />
                </Grid>

                <Grid size={4}>
                    <LabeledTypography label="Nachname" content={user.lastName} />
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={5}>
                <Grid size={4}>
                    <LabeledTypography label="E-Mail-Adresse" content={user.email} />
                </Grid>
                <Grid size={4}>
                    <LabeledTypography label="Benutzername" content={user.username} />
                </Grid>
                <Grid size={4}>
                    <LabeledTypography label="UserSUB" content={user.userSUB} />
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={5}>
                <Grid size={4}>
                    <LabeledTypography label="Telefon" content={user.phone} />
                </Grid>
                <Grid size={4}>
                    <LabeledTypography label="Fax" content={user.fax} />
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={5}>
                <Grid size={4}>
                    <LabeledTypography
                        label="Benutzerbild"
                        content={<CustomAvatar showBadge={false} size="100px" s3Resource={user.avatar} />}
                    />
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={5}>
                <Grid size={4}>
                    <LabeledTypography label="Rollen" content={user.cognitoUser?.groups.map((group) => group.GroupName).join(", ")} />
                </Grid>
            </Grid>

            <Typography variant="h2">Benutzereinstellungen</Typography>

            <Grid container direction="row" spacing={5}>
                <Grid size={4}>
                    <LabeledTypography label="Tabellen-Theme" content={getTableThemeName(user.userSettings.tableTheme)} />
                </Grid>
                <Grid size={4}>
                    <LabeledTypography label="Tabellenkopf-Farbe" content={getTableHeaderColorName(user.userSettings.tableHeaderColor)} />
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={5}>
                <Grid size={4}>
                    <LabeledTypography label="Tabellen-Abstand" content={getTableSpacingName(user.userSettings.tableSpacing)} />
                </Grid>
                <Grid size={4}>
                    <LabeledTypography label="Tabellenkopf fixieren" content={user.userSettings.tableSticky ? "Ja" : "Nein"} />
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={5}>
                <Grid size={4}>
                    <LabeledTypography
                        label="Bevorzugte Einheit"
                        content={
                            utils.constants.WEIGHT_OPTIONS.find((weightOption) => weightOption.value === user!.userSettings.unitType)?.label
                        }
                    />
                </Grid>
            </Grid>
        </BoxHeadlineContainer>
    )
}

export default UserPage
