"use client"

import React, { useRef, useState } from "react"
import { Collapse, Grid2, Typography } from "@mui/material"
import { useAuthContext, useLayoutContext } from "hooks"
import { useUserCreate, useUserRead, useUserRoutes, useUserUpdate } from "hooks"
import { UserAddIcon, UserBlockIcon, UserCheckIcon } from "icons"
import { BoxHeadlineContainer } from "layout"
import { QueryKeys, client, queryClient } from "queryClient"
import { UserFormHandles } from "types"
import { CustomButton } from "core"
import { BoxLoadingForm } from "components"
import UserBlockDialog from "modules/usermanagement/users/userBlock/UserBlockDialog"
import UserForm from "../UserForm"
import useStyles from "./styles"

type UserFormPageProps = {
    formIntent: "create" | "edit"
}

const UserFormPage: React.FC<UserFormPageProps> = ({ formIntent }) => {
    const { classes } = useStyles()
    const authContext = useAuthContext()
    const { notify } = useLayoutContext()

    const createUserMutation = useUserCreate()
    const updateUserMutation = useUserUpdate()

    const { user, isLoading } = useUserRead()
    const { navigateToUserPage, navigateToUserListPage } = useUserRoutes()

    const [blockUserDialogOpen, setBlockUserDialogOpen] = useState<boolean>(false)

    const userFormRef = useRef<UserFormHandles>(null)

    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const [submitSuccessButton, setSubmitSuccessButton] = useState<boolean>(true)

    const [email, setEmail] = useState<string>("")
    const [temporaryPassword, setTemporaryPassword] = useState<string>("")

    const submitUser = async () => {
        setSubmitLoading(true)

        const userFormResult = await userFormRef.current?.validateUserForm()
        if (!userFormResult) {
            console.error("UserForm is invalid...")
            setSubmitLoading(false)
            return
        }

        if (!authContext.userData) {
            setSubmitLoading(false)
            return notify(`Beim ${formIntent === "edit" ? "Bearbeiten" : "Anlegen"} eines Benutzers ist ein Fehler aufgetreten.`)
        }

        const { userFormInput, userRoles, password, changePassword } = userFormResult

        console.log("userInput: ", userFormInput)

        const mutatedUser = user
            ? await updateUserMutation.mutateAsync({
                  ...userFormInput,
                  id: user.id,
              })
            : await createUserMutation.mutateAsync(userFormInput)

        const userID = mutatedUser?.id

        console.log("userID: ", userID)

        if (!userID) {
            setSubmitLoading(false)
            notify(`Beim ${user ? "Speichern" : "Anlegen"} des Benutzers ist ein Fehler aufgetreten.`)
            return
        }

        setEmail(userFormInput.email)
        setTemporaryPassword(password)

        const { data: cognitoUserResponse, errors } =
            formIntent === "create"
                ? await client.queries.addCognitoUser({
                      email: userFormInput.email,
                      temporaryPassword: password,
                      groups: userRoles,
                      salutation: userFormInput.salutation ?? "Mr",
                      firstName: userFormInput.firstName,
                      lastName: userFormInput.lastName,
                      phone: userFormInput.phone ?? "",
                      username: user ? user.userSUB : userFormInput.username,
                      userID: userID,
                  })
                : await client.queries.updateCognitoUser({
                      changePassword: changePassword,
                      password: password,
                      groups: userRoles,
                      salutation: userFormInput.salutation ?? "Mr",
                      firstName: userFormInput.firstName,
                      lastName: userFormInput.lastName,
                      phone: userFormInput.phone ?? "",
                      username: user ? user.userSUB : userFormInput.username,
                  })

        if (errors) {
            if (errors[0].message === "User account already exists") {
                return notify(
                    "Ein Benutzer mit dieser E-Mail-Adresse existiert bereits! Bitte melde dich an oder setze das Passwort zurück!"
                )
            }
            setSubmitLoading(false)
            setSubmitSuccess(false)
            setSubmitSuccessButton(false)

            if (errors[0].message) {
                return notify(errors[0].message)
            } else {
                return notify(errors[0].errorType)
            }
        }

        if (!cognitoUserResponse) {
            setSubmitLoading(false)
            return notify(`Beim ${formIntent === "edit" ? "Bearbeiten" : "Anlegen"} eines Benutzers ist ein Fehler aufgetreten.`)
        }

        queryClient.invalidateQueries({
            queryKey: [QueryKeys.CognitoUsers],
        })

        const userSUB = cognitoUserResponse.userSUB

        if (formIntent === "create" && userSUB) {
            await updateUserMutation.mutateAsync({
                id: userID,
                userSUB,
            })
        }

        setSubmitLoading(false)
        setSubmitSuccess(true)
        setSubmitSuccessButton(true)

        if (formIntent === "create") {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        } else {
            navigateToUserPage(mutatedUser)
        }
    }

    if (isLoading) {
        return <BoxLoadingForm isLoading={isLoading} entityName="Benutzer" formIntent={formIntent} />
    }

    return (
        <BoxHeadlineContainer
            boxTitle={"Benutzer " + (formIntent === "edit" ? "bearbeiten" : "anlegen")}
            boxDisabled={Boolean(user?.cognitoUser && !user.cognitoUser.enabled)}
            boxDisabledText={
                <>
                    <Typography style={{ textAlign: "center" }}>
                        Der Benutzer ist deaktiviert. Sie können den Benutzer erst dann bearbeiten, wenn er wieder aktiviert ist.
                    </Typography>

                    <CustomButton
                        text="Benutzer aktivieren"
                        size="small"
                        align="center"
                        onClick={() => setBlockUserDialogOpen(true)}
                        rootClassName={classes.generatedPassword}
                        iconBefore={<UserCheckIcon className={classes.userEnableIcon} />}
                    />
                </>
            }
        >
            <UserBlockDialog dialogOpen={blockUserDialogOpen} setDialogOpen={setBlockUserDialogOpen} cognitoUser={user?.cognitoUser} />

            <Collapse in={formIntent === "create" && submitSuccess}>
                <Grid2
                    justifyContent="center"
                    alignItems="center"
                    container
                    direction="column"
                    className={classes.createUserSuccessContainer}
                >
                    <UserAddIcon className={classes.createUserSuccessIcon} />
                    <Typography className={classes.createUserSuccess}>
                        Der Benutzer wurde erfolgreich angelegt!
                        <br />
                        Eine E-Mail mit dem temporären Passwort wurde dem Benutzer zugeschickt.
                    </Typography>

                    <Typography className={classes.createUserSuccessUsername}>
                        Benutzername: <span>{email.toLowerCase()}</span>
                    </Typography>
                    <Typography className={classes.createUserSuccessPassword}>
                        Temporäres Passwort: <span>{temporaryPassword}</span>
                    </Typography>

                    <CustomButton
                        text="Zurück zu Benutzer"
                        size="small"
                        align="center"
                        onClick={() => navigateToUserListPage()}
                        rootClassName={classes.generatedPassword}
                    />
                </Grid2>
            </Collapse>

            <Collapse in={!submitSuccess} classes={{ wrapperInner: classes.registerCollapse }}>
                <UserForm user={user} cognitoUser={user?.cognitoUser ?? null} formIntent={formIntent} ref={userFormRef} />
            </Collapse>

            {!submitSuccess && (
                <Grid2 container direction="row" className={classes.buttons}>
                    {(!user?.cognitoUser || user.cognitoUser.enabled) && (
                        <>
                            <Grid2 className={classes.gridItem}>
                                <CustomButton
                                    text={"Benutzer " + (formIntent === "edit" ? "speichern" : "anlegen")}
                                    onClick={() => submitUser()}
                                    loading={submitLoading}
                                    success={submitSuccessButton}
                                    style="filled"
                                />
                            </Grid2>

                            {formIntent === "edit" && (
                                <Grid2 className={classes.gridItem}>
                                    <CustomButton
                                        onClick={() => setBlockUserDialogOpen(true)}
                                        color="red"
                                        text="Benutzer deaktivieren"
                                        iconBefore={<UserBlockIcon className={classes.userBlockIcon} />}
                                    />
                                </Grid2>
                            )}
                        </>
                    )}

                    <Grid2 className={classes.gridItem}>
                        <CustomButton color="red" text="Abbrechen" onClick={() => navigateToUserListPage()} disabled={submitLoading} />
                    </Grid2>
                </Grid2>
            )}
        </BoxHeadlineContainer>
    )
}

export default UserFormPage
