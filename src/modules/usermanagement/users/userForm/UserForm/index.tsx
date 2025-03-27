"use client"

import React, { useImperativeHandle, useRef, useState } from "react"
import { Collapse, Grid2, Typography } from "@mui/material"
import { useLayoutContext } from "hooks"
import { SalutationOption, TableHeaderColorOption, TableSpacingOption, TableThemeOption } from "options"
import { CognitoUser, CreateUserInput, FieldHandles, SelectOption, User, UserFormHandles } from "types"
import {
    AvatarDropZone,
    CustomAutoComplete,
    CustomButton,
    CustomSelect,
    CustomSwitch,
    LabeledTypography,
    Phone,
    TextInputField,
} from "core"
import { getCognitoUserList } from "../../api"
import useUserForm from "../useUserForm"
import { normalizePhone } from "utils/phone"
import utils from "utils"
import useStyles from "./styles"

type UserFormProps = {
    formIntent: "create" | "edit"
    user: User | null
    cognitoUser: CognitoUser | null
}

const UserFormComponent: React.ForwardRefRenderFunction<UserFormHandles, UserFormProps> = (
    { formIntent, user, cognitoUser },
    userFormRef
) => {
    const { classes } = useStyles()
    const { notify } = useLayoutContext()

    const {
        username,
        setUsername,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        salutation,
        setSalutation,
        email,
        setEmail,
        phone,
        setPhone,
        phonePrefix,
        setPhonePrefix,
        fax,
        setFax,
        faxPrefix,
        setFaxPrefix,
        avatar,
        setAvatar,
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
        userRoles,
        setUserRoles,
        password,
        setPassword,
        confirmedPassword,
        setConfirmedPassword,
        uploading,
        setUploading,
        uploadProgress,
        setUploadProgress,
        resetUserForm,
    } = useUserForm(formIntent, user, cognitoUser)

    const [changePassword, setChangePassword] = useState<boolean>(false)

    const usernameInputRef = useRef<FieldHandles>(null)
    const firstNameInputRef = useRef<FieldHandles>(null)
    const lastNameInputRef = useRef<FieldHandles>(null)
    const emailInputRef = useRef<FieldHandles>(null)
    const unitTypeInputRef = useRef<FieldHandles>(null)
    const salutationInputRef = useRef<FieldHandles>(null)
    const userRolesInputRef = useRef<FieldHandles>(null)
    const passwordInputRef = useRef<FieldHandles>(null)
    const confirmedPasswordInputRef = useRef<FieldHandles>(null)

    const tableThemeInputRef = useRef<FieldHandles>(null)
    const tableHeaderColorInputRef = useRef<FieldHandles>(null)
    const tableSpacingInputRef = useRef<FieldHandles>(null)

    useImperativeHandle(userFormRef, () => ({
        validateUserForm: async () => {
            if (username === "") {
                notify("Bitte gib den Benutzernamen ein!")
                usernameInputRef.current?.highlight()
                return null
            }

            if (!utils.validation.validateUsername(username)) {
                notify("Bitte gib einen gültigen Benutzernamen ein!")
                usernameInputRef.current?.highlight()
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

            if (email === "") {
                notify("Bitte wähle die Anrede aus!")
                emailInputRef.current?.highlight()
                return null
            }

            if (!utils.validation.validateEmail(email)) {
                notify("Bitte gib eine gültige E-Mail-Adresse ein!")
                emailInputRef.current?.highlight()
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

            if (!unitType) {
                notify(
                    "Bitte gib den Schwellwert für das Überschreiten der Gesamt-Liefermenge einer Lieferung bei Eingabe des Giesslaufs ein!"
                )
                unitTypeInputRef.current?.highlight()
                return null
            }

            if (!salutation) {
                notify("Bitte geben Sie eine Anrede an!")
                salutationInputRef.current?.highlight()
                return null
            }

            if (userRoles.length === 0) {
                notify("Bitte wähle die Nutzerrolle aus!")
                userRolesInputRef.current?.highlight()
                return null
            }

            if (formIntent === "create" || changePassword) {
                if (password === "" || password.length > 200) {
                    notify("Bitte gib dein Passwort ein!")
                    passwordInputRef.current?.highlight()
                    return null
                } else if (!utils.validation.validatePassword(password)) {
                    notify(
                        "Bitte gib ein gültiges Passwort aus mind. 8 Zeichen mit Groß- und Kleinbuchstaben, Zahlen und folgenden Sonderzeichen: ^ $ * . [ ] { } ( ) ?  ! @ # % & / , > <  : ; | _ ~  ein!"
                    )
                    passwordInputRef.current?.highlight()
                    return null
                } else if (password !== confirmedPassword) {
                    notify("Bitte wiederhole dein Passwort!")
                    confirmedPasswordInputRef.current?.highlight()
                    return null
                }
            }

            const userNameExists = await utils.identify.checkUsername(username)

            if ((!user || user.username !== username) && userNameExists) {
                notify("Der Benutzername ist bereits vergeben. Bitte verwende einen anderen.")
                usernameInputRef.current?.highlight()
                return null
            }

            const cognitoUserList = await getCognitoUserList()

            console.log("cognitoUserList: ", cognitoUserList)

            const emailExists = cognitoUserList.some((cognitoUserItem) => cognitoUserItem?.email === email)

            if ((!cognitoUser || cognitoUser.email !== email) && emailExists) {
                notify(
                    "Ein Cognito-Bernutzer mit dieser E-Mail-Adresse existiert bereits. Bitte verwende eine andere E-Mail-Adresse oder lösche den Cognito-Benutzer."
                )
                emailInputRef.current?.highlight()
                return null
            }

            const uploadedBild = await utils.images.uploadS3Resource(avatar, "user", setUploading, setUploadProgress)

            const userFormInput: CreateUserInput = {
                isUserActive: true,
                email: email.trim().toLowerCase(),
                userSUB: user ? user.userSUB : "tobeset",
                username: username.trim(),
                firstName: firstName.trim(),
                lastName: lastName.trim(),
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
                lastActive: user ? user.lastActive : utils.dates.convertDateToAWSTimestampFormat(new Date()),
            }

            console.log("userFormInput: ", userFormInput)

            resetUserForm()

            return {
                userFormInput,
                userRoles: userRoles.map((userRole) => userRole.value),
                password,
                changePassword,
            }
        },
    }))

    return (
        <>
            <Grid2 container direction="row" alignItems="center" spacing={5}>
                <Grid2>
                    <SalutationOption salutation={salutation} setSalutation={setSalutation} salutationInputRef={salutationInputRef} />
                </Grid2>
                <Grid2>
                    <TextInputField
                        id="E-Mail"
                        label="E-Mail"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value.toLowerCase())
                            setUsername(utils.identify.toURLsafeUsername(e.target.value))
                        }}
                        type="text"
                        ref={emailInputRef}
                        required={true}
                        validate={(value) => value.trim() !== "" && utils.validation.validateEmail(value)}
                    />
                </Grid2>
                <Grid2>
                    <TextInputField
                        id="Benutzername"
                        label="Benutzername"
                        description="(folgende Zeichen erlaubt: a-z0-9A-Z-_~)"
                        value={username}
                        onChange={(e) => setUsername(utils.identify.toURLsafeUsername(e.target.value))}
                        validate={(value) => value.trim() !== ""}
                        ref={usernameInputRef}
                        required={true}
                        type="text"
                    />
                </Grid2>
            </Grid2>

            <Grid2 container direction="row" alignItems="center" spacing={5}>
                <Grid2>
                    <TextInputField
                        id="Vorname"
                        label="Vorname"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        ref={firstNameInputRef}
                        required={true}
                        validate={(value) => value.trim() !== ""}
                    />
                </Grid2>
                <Grid2>
                    <TextInputField
                        id="Nachname"
                        label="Nachname"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        ref={lastNameInputRef}
                        required={true}
                        validate={(value) => value.trim() !== ""}
                    />
                </Grid2>{" "}
                <Grid2>{user && <LabeledTypography label="UserSUB" content={user.userSUB} />}</Grid2>
            </Grid2>

            <Grid2 container direction="row" alignItems="center" spacing={5}>
                <Grid2>
                    <Phone
                        label="Telefon"
                        phoneOnChange={(value) => setPhone(value)}
                        phoneValue={phone}
                        prefixOnChange={(value) => value && setPhonePrefix(value)}
                        prefixValue={phonePrefix}
                    />
                </Grid2>
                <Grid2>
                    <Phone
                        label="Fax"
                        phoneOnChange={(value) => setFax(value)}
                        phoneValue={fax}
                        prefixOnChange={(value) => value && setFaxPrefix(value)}
                        prefixValue={faxPrefix}
                    />
                </Grid2>
            </Grid2>

            {formIntent === "create" && (
                <Grid2 container direction="row" alignItems="center" spacing={5}>
                    <Grid2>
                        <TextInputField
                            label="Temporäres Passwort"
                            id="Passwort"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="text"
                            required={true}
                            ref={passwordInputRef}
                        />
                    </Grid2>

                    <Grid2>
                        <TextInputField
                            label="Temporäres Passwort wiederholen"
                            id="PasswortRepeat"
                            value={confirmedPassword}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                            type="text"
                            required={true}
                            ref={confirmedPasswordInputRef}
                        />
                    </Grid2>

                    <Grid2>
                        <CustomButton
                            text="Passwort generieren"
                            size="small"
                            align="center"
                            onClick={() => {
                                const generatedPassword = utils.identify.generatePassword()
                                setPassword(generatedPassword)
                                setConfirmedPassword(generatedPassword)
                            }}
                            rootClassName={classes.generatedPassword}
                        />
                    </Grid2>
                </Grid2>
            )}

            {formIntent === "edit" && (
                <Grid2 container direction="row" alignItems="center" spacing={5}>
                    <Grid2>
                        <Collapse in={!changePassword}>
                            <CustomButton
                                text="Passwort ändern"
                                size="small"
                                align="center"
                                onClick={() => setChangePassword(true)}
                                rootClassName={classes.generatedPassword}
                            />
                        </Collapse>
                        <Collapse in={changePassword}>
                            <TextInputField
                                label="Neues Passwort"
                                id="Passwort"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="text"
                                required={true}
                                ref={passwordInputRef}
                            />
                        </Collapse>
                    </Grid2>

                    <Grid2>
                        <Collapse in={changePassword}>
                            <TextInputField
                                label="Neues Passwort wiederholen"
                                id="PasswortRepeat"
                                value={confirmedPassword}
                                onChange={(e) => setConfirmedPassword(e.target.value)}
                                type="text"
                                required={true}
                                ref={confirmedPasswordInputRef}
                            />
                        </Collapse>
                    </Grid2>

                    <Grid2>
                        <Collapse in={changePassword}>
                            <CustomButton
                                text="Passwort generieren"
                                size="small"
                                align="center"
                                onClick={() => {
                                    const generatedPassword = utils.identify.generatePassword()
                                    setPassword(generatedPassword)
                                    setConfirmedPassword(generatedPassword)
                                }}
                                rootClassName={classes.generatedPassword}
                            />
                            <CustomButton
                                text="Passwort nicht ändern"
                                size="small"
                                align="center"
                                color="flatRed"
                                style="outlined"
                                onClick={() => setChangePassword(false)}
                                rootClassName={classes.generatedPassword}
                            />
                        </Collapse>
                    </Grid2>
                </Grid2>
            )}

            <Grid2 container direction="row" alignItems="center" spacing={5}>
                <Grid2>
                    <Typography variant="h3">Nutzerrolle</Typography>

                    <CustomAutoComplete
                        options={utils.constants.USER_GROUPS_OPTIONS}
                        value={userRoles}
                        onChangeHandler={(values) => setUserRoles(values)}
                        placeholder="Nutzerrolle"
                        required={true}
                        ref={userRolesInputRef}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container direction="row" alignItems="center" spacing={4}>
                <Grid2 size={6}>
                    <TableThemeOption tableTheme={tableTheme} setTableTheme={setTableTheme} tableThemeInputRef={tableThemeInputRef} />
                </Grid2>
                <Grid2 size={6}>
                    <TableHeaderColorOption
                        tableHeaderColor={tableHeaderColor}
                        setTableHeaderColor={setTableHeaderColor}
                        tableHeaderColorInputRef={tableHeaderColorInputRef}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container direction="row" alignItems="center" spacing={4}>
                <Grid2 size={6}>
                    <TableSpacingOption
                        tableSpacing={tableSpacing}
                        setTableSpacing={setTableSpacing}
                        tableSpacingInputRef={tableSpacingInputRef}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <CustomSwitch
                        name="tableSticky"
                        switchLabel="Tabellenkopf fixieren"
                        checkedValue={tableSticky}
                        onChange={(value) => setTableSticky(value.target.checked)}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container direction="row" alignItems="center" spacing={4}>
                <Grid2 size={6}>
                    <CustomSelect<SelectOption>
                        value={unitType}
                        label="Bevorzugte Einheit"
                        placeholder="Bitte auswählen"
                        options={utils.constants.WEIGHT_OPTIONS}
                        onChange={(value) => value && setUnitType(value)}
                    />
                </Grid2>
            </Grid2>

            <Grid2 container direction="row" alignItems="center" spacing={5}>
                <Grid2>
                    <Typography variant="h3">Benutzerbild</Typography>
                    <AvatarDropZone
                        dragActiveText="Bild hier ablegen..."
                        dragInactiveText="Bild hier ablegen oder klicken..."
                        uploading={uploading}
                        avatar={avatar}
                        setAvatar={setAvatar}
                        maxSize={10000000}
                        uploadProgress={uploadProgress}
                    />
                </Grid2>
            </Grid2>
        </>
    )
}

export default React.forwardRef(UserFormComponent)
