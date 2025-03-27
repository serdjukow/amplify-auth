"use client"

import React, { useImperativeHandle, useRef } from "react"
import { useRouter } from "next/navigation"
import { Grid, Typography } from "@mui/material"
import { useLayoutContext } from "hooks"
import { SalutationOption, TableHeaderColorOption, TableSpacingOption, TableThemeOption } from "options"
import { CreateUserInput, FieldHandles, SelectOption, UserSettingsFormHandles } from "types"
import { AvatarDropZone, CustomButton, CustomSelect, CustomSwitch, Phone, TextInputField } from "core"
import { AppRoutes } from "routes"
import useUserSettingsForm from "../useUserSettingsForm"
import { normalizePhone } from "utils/phone"
import utils from "utils"

type UserSettingsFormProps = {
    submitUserSettings: () => void
    submitLoading: boolean
    user: CreateUserInput
}

const UserSettingsFormComponent: React.ForwardRefRenderFunction<UserSettingsFormHandles, UserSettingsFormProps> = (
    { submitUserSettings, submitLoading, user },
    userFormRef
) => {
    const router = useRouter()
    const { notify } = useLayoutContext()

    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        salutation,
        setSalutation,
        avatar,
        setAvatar,
        phone,
        setPhone,
        phonePrefix,
        setPhonePrefix,
        fax,
        setFax,
        faxPrefix,
        setFaxPrefix,
        tableTheme,
        setTableTheme,
        tableHeaderColor,
        setTableHeaderColor,
        tableSpacing,
        setTableSpacing,
        tableSticky,
        setTableSticky,
        unitType,
        setUnitType,
        uploading,
        setUploading,
        uploadProgress,
        setUploadProgress,
    } = useUserSettingsForm()

    const salutationInputRef = useRef<FieldHandles>(null)
    const firstNameInputRef = useRef<FieldHandles>(null)
    const lastNameInputRef = useRef<FieldHandles>(null)

    const tableThemeInputRef = useRef<FieldHandles>(null)
    const tableHeaderColorInputRef = useRef<FieldHandles>(null)
    const tableSpacingInputRef = useRef<FieldHandles>(null)

    useImperativeHandle(userFormRef, () => ({
        validateUserSettingsForm: async () => {
            if (salutation === null) {
                notify("Bitte wähle die Anrede aus!")
                salutationInputRef.current?.highlight()
                return null
            }

            if (firstName === "") {
                notify("Bitte gib deinen Vornamen ein!")
                firstNameInputRef.current?.highlight()
                return null
            }

            if (lastName === "") {
                notify("Bitte gib den Nachnamen ein!")
                lastNameInputRef.current?.highlight()
                return null
            }

            if (tableTheme === null) {
                notify("Bitte wähle das Tabellenthema aus!")
                tableThemeInputRef.current?.highlight()
                return null
            }

            if (tableHeaderColor === null) {
                notify("Bitte wähle die Tabellenkopffarbe aus!")
                tableHeaderColorInputRef.current?.highlight()
                return null
            }

            if (tableSpacing === null) {
                notify("Bitte wähle den Tabellenabstand aus!")
                tableSpacingInputRef.current?.highlight()
                return null
            }

            const uploadedBild = await utils.images.uploadS3Resource(avatar, "user", setUploading, setUploadProgress)

            const userSettingsFormInput: CreateUserInput = {
                isUserActive: true,
                email: user.email,
                userSUB: user.userSUB,
                username: user.username,
                firstName: firstName,
                lastName: lastName,
                salutation: salutation,
                avatar: uploadedBild,
                phone: normalizePhone(phonePrefix, phone),
                fax: normalizePhone(faxPrefix, fax),
                userSettings: {
                    tableTheme,
                    tableHeaderColor,
                    tableSpacing,
                    tableSticky,
                    unitType: unitType.value,
                },
                lastActive: user.lastActive,
            }

            return userSettingsFormInput
        },
    }))

    return (
        <>
            <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item xs={6}>
                    <SalutationOption salutation={salutation} setSalutation={setSalutation} salutationInputRef={salutationInputRef} />
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item xs={4}>
                    <TextInputField
                        id="Vorname"
                        label="Vorname"
                        value={firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                        type="text"
                        ref={firstNameInputRef}
                        required
                        validate={(value: string) => value.trim() !== ""}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextInputField
                        label="Nachname"
                        id="Nachname"
                        value={lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                        type="text"
                        ref={lastNameInputRef}
                        required
                        validate={(value: string) => value.trim() !== ""}
                    />
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item xs={4}>
                    <Phone
                        label="Telefon"
                        phoneOnChange={(value) => setPhone(value)}
                        phoneValue={phone}
                        prefixOnChange={(value) => value && setPhonePrefix(value)}
                        prefixValue={phonePrefix}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Phone
                        label="Fax"
                        phoneOnChange={(value) => setFax(value)}
                        phoneValue={fax}
                        prefixOnChange={(value) => value && setFaxPrefix(value)}
                        prefixValue={faxPrefix}
                    />
                </Grid>
            </Grid>
            <Typography variant="h3">Benutzerbild</Typography>
            <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item xs={6}>
                    <AvatarDropZone
                        dragActiveText="Bild hier ablegen..."
                        dragInactiveText="Bild hier ablegen oder klicken..."
                        uploading={uploading}
                        avatar={avatar}
                        setAvatar={setAvatar}
                        maxSize={10000000}
                        uploadProgress={uploadProgress}
                    />
                </Grid>
            </Grid>

            <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item xs={6}>
                    <CustomSelect<SelectOption>
                        value={unitType}
                        label="Bevorzugte Einheit"
                        placeholder="Bitte auswählen"
                        options={utils.constants.WEIGHT_OPTIONS}
                        onChange={(value) => value && setUnitType(value)}
                    />
                </Grid>
            </Grid>

            <Grid container direction="row" alignItems="center" spacing={4}>
                <Grid item xs={6}>
                    <TableThemeOption tableTheme={tableTheme} setTableTheme={setTableTheme} tableThemeInputRef={tableThemeInputRef} />
                </Grid>
                <Grid item xs={6}>
                    <TableHeaderColorOption
                        tableHeaderColor={tableHeaderColor}
                        setTableHeaderColor={setTableHeaderColor}
                        tableHeaderColorInputRef={tableHeaderColorInputRef}
                    />
                </Grid>
            </Grid>

            <Grid container direction="row" spacing={5}>
                <Grid item>
                    <CustomButton text="Einstellungen speichern" onClick={submitUserSettings} loading={submitLoading} style="filled" />
                </Grid>
                <Grid item>
                    <CustomButton color="red" text="Abbrechen" onClick={() => router.push(AppRoutes.start.path)} disabled={submitLoading} />
                </Grid>
            </Grid>
        </>
    )
}

export default React.memo(React.forwardRef(UserSettingsFormComponent))
