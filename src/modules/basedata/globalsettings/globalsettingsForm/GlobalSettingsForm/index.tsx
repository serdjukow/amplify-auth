"use client"

import React, { useImperativeHandle, useRef } from "react"
import { Grid2 } from "@mui/material"
import { useLayoutContext } from "hooks"
import { BoxHeadlineContainer } from "layout"
import { FieldHandles, GlobalSettings, GlobalSettingsFormHandles, UpdateGlobalSettingsInput } from "types"
import { CustomNumberField, TextInputField } from "core"
import useGlobalSettingsForm from "../useGlobalSettingsForm"

type GlobalSettingsFormProps = {
    globalSettings: GlobalSettings
}

const GlobalSettingsFormComponent: React.ForwardRefRenderFunction<GlobalSettingsFormHandles, GlobalSettingsFormProps> = (
    { globalSettings },
    calculationFormRef
) => {
    const { notify } = useLayoutContext()

    const { currentVersion, setCurrentVersion, versicherungssumme, setVersicherungssumme } = useGlobalSettingsForm(globalSettings)

    const currentVersionInputRef = useRef<FieldHandles>(null)
    const versicherungssummeInputRef = useRef<FieldHandles>(null)

    useImperativeHandle(calculationFormRef, () => ({
        validateGlobalSettingsForm: () => {
            if (currentVersion === "") {
                notify("Bitte gib die aktuelle Version der Software ein!")
                currentVersionInputRef.current?.highlight()
                return null
            }

            if (versicherungssumme === "") {
                notify("Bitte gib die Versicherungssumme ein!")
                versicherungssummeInputRef.current?.highlight()
                return null
            }

            const updateGlobalSettingsInput: UpdateGlobalSettingsInput = {
                id: globalSettings.id,
                currentVersion: currentVersion,
                versicherungssumme: versicherungssumme,
            }

            return updateGlobalSettingsInput
        },
    }))

    return (
        <BoxHeadlineContainer boxTitle="Preisberechnung" marginTop={false}>
            <Grid2 container direction="row" alignItems="center" spacing={4}>
                <Grid2 size={6}>
                    <TextInputField
                        label="Aktuelle Version"
                        value={currentVersion}
                        onChange={({ target: { value } }) => setCurrentVersion(value)}
                        validate={(value) => value.trim() !== ""}
                        required={true}
                        ref={currentVersionInputRef}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <CustomNumberField
                        label="Versicherungssumme"
                        number={versicherungssumme}
                        setNumber={setVersicherungssumme}
                        required={true}
                        ref={versicherungssummeInputRef}
                    />
                </Grid2>
            </Grid2>
        </BoxHeadlineContainer>
    )
}

export default React.memo(React.forwardRef(GlobalSettingsFormComponent))
