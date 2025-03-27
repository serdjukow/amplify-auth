"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Grid2 } from "@mui/material"
import { useAuthContext, useLayoutContext } from "hooks"
import { useGlobalSettingsRead, useGlobalSettingsUpdate } from "hooks"
import { GlobalSettingsFormHandles } from "types"
import { CustomButton } from "core"
import { BoxLoadingDetails } from "components"
import { AppRoutes } from "routes"
import GlobalSettingsForm from "../GlobalSettingsForm"
import useStyles from "./styles"

const GlobalSettingsFormPage: React.FC = () => {
    const { classes } = useStyles()
    const router = useRouter()
    const authContext = useAuthContext()
    const { notify } = useLayoutContext()

    const { globalSettings, isLoading } = useGlobalSettingsRead()

    const updateGlobalSettingsMutation = useGlobalSettingsUpdate()

    const globalSettingsFormRequestDataRef = useRef<GlobalSettingsFormHandles>(null)

    const [submitLoading, setSubmitLoading] = useState<boolean>(false)

    const submitGlobalSettings = async () => {
        const globalSettingsFormResult = globalSettingsFormRequestDataRef.current?.validateGlobalSettingsForm()

        if (!globalSettingsFormResult) {
            console.error("GlobalSettingsForm is invalid...")
            return false
        }

        if (!authContext.userData || !globalSettings) {
            notify(`Beim Speichern der Einstellungen ist ein Fehler aufgetreten.`)
            return false
        }

        setSubmitLoading(true)

        await updateGlobalSettingsMutation.mutateAsync(globalSettingsFormResult)

        setSubmitLoading(false)

        router.push(AppRoutes.globalsettings.path)
        return true
    }

    if (isLoading || !globalSettings) {
        return (
            <BoxLoadingDetails isLoading={isLoading} entityName="Einstellungen" entity={globalSettings} isPlural={true} isFeminine={true} />
        )
    }

    return (
        <>
            <GlobalSettingsForm globalSettings={globalSettings} ref={globalSettingsFormRequestDataRef} />

            <Grid2 container direction="row" justifyContent="center" className={classes.globalSettingsButtons}>
                <Grid2 className={classes.gridItem}>
                    <CustomButton
                        text="Einstellungen speichern"
                        onClick={() => submitGlobalSettings()}
                        loading={submitLoading}
                        style="filled"
                    />
                </Grid2>
                <Grid2 className={classes.gridItem}>
                    <CustomButton
                        color="red"
                        text="Abbrechen"
                        onClick={() => {
                            router.push(AppRoutes.start.path)
                        }}
                        disabled={submitLoading}
                    />
                </Grid2>
            </Grid2>
        </>
    )
}

export default GlobalSettingsFormPage
