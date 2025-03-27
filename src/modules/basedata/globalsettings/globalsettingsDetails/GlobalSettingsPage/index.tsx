"use client"

import React, { useState } from "react"
import { Grid2 } from "@mui/material"
import { useAuthContext } from "hooks"
import { useGlobalSettingsRead, useGlobalSettingsRoutes, useGlobalSettingsUpdate } from "hooks"
import { BoxHeadlineContainer } from "layout"
import { CustomButton, LabeledTypography } from "core"
import { BoxLoadingDetails, EditIcon } from "components"
import utils from "utils"

const GlobalSettingsPage: React.FC = () => {
    const { userData } = useAuthContext()

    const { globalSettings, isLoading } = useGlobalSettingsRead()
    const { navigateToEditGlobalSettingsPage } = useGlobalSettingsRoutes()

    const updateGlobalSettingsMutation = useGlobalSettingsUpdate()

    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    if (isLoading || !globalSettings) {
        return (
            <BoxLoadingDetails isLoading={isLoading} entityName="Einstellungen" entity={globalSettings} isPlural={true} isFeminine={true} />
        )
    }

    const changeCurrentVersionHandler = async () => {
        setSubmitLoading(true)

        await updateGlobalSettingsMutation.mutateAsync({
            id: globalSettings.id,
            currentVersion: utils.identify.getUUID(),
        })

        setSubmitLoading(false)
    }

    console.log("userData: ", userData)

    return (
        <BoxHeadlineContainer
            boxTitle="Einstellungen"
            marginTop={false}
            boxMenu={
                <CustomButton
                    text="Bearbeiten"
                    iconBefore={<EditIcon />}
                    onClick={() => navigateToEditGlobalSettingsPage()}
                    size="small"
                    color="blue"
                />
            }
        >
            {userData?.email === "oe-bayram@live.de" && (
                <Grid2 container direction="row" spacing={5}>
                    <Grid2>
                        <CustomButton
                            text="LocalStorage leeren"
                            onClick={() => {
                                localStorage.clear()
                                window.location.reload()
                            }}
                            size="small"
                        />
                    </Grid2>
                    <Grid2>
                        <CustomButton
                            text="Aktuelle Version ändern"
                            onClick={() => changeCurrentVersionHandler()}
                            size="small"
                            loading={submitLoading}
                        />
                    </Grid2>
                </Grid2>
            )}

            <Grid2 container direction="row">
                <Grid2 size={4}>
                    <LabeledTypography
                        label="Versicherungssumme"
                        content={globalSettings.versicherungssumme.toLocaleString("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        })}
                    />
                </Grid2>
            </Grid2>
        </BoxHeadlineContainer>
    )
}

export default GlobalSettingsPage
