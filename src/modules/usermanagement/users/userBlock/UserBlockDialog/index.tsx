"use client"

import React, { useState } from "react"
import { TextField, Typography } from "@mui/material"
import { useAuthContext, useLayoutContext } from "hooks"
import { QueryKeys, client, queryClient } from "@/queryClient"
import { CognitoUser, User } from "@/types"
import { CustomDialog, TextInputField } from "core"
import useStyles from "./styles"

type UserBlockDialogProps = {
    dialogOpen: boolean
    setDialogOpen: (value: React.SetStateAction<boolean>) => void
    cognitoUser: CognitoUser | null | undefined
    loadUserList?: (nextTokenParam?: string | null | undefined) => Promise<User[]>
}

const UserBlockDialog: React.FC<UserBlockDialogProps> = ({ cognitoUser, dialogOpen, setDialogOpen }) => {
    const { classes } = useStyles()
    const authContext = useAuthContext()
    const { notify } = useLayoutContext()

    const [approveText, setApproveText] = useState<string>("")

    const [blockLoading, setBlockLoading] = useState<boolean>(false)

    if (!dialogOpen || !cognitoUser) {
        return null
    }

    const APPROVEMENT_TEXT = cognitoUser.enabled ? "Deaktivieren" : "Aktivieren"

    const blockUserRequest = async () => {
        try {
            if (approveText === "") {
                return notify("Bitte geben Sie den Bestätigungstext ein!")
            }
            if (approveText !== APPROVEMENT_TEXT) {
                return notify("Bitte geben Sie den Bestätigungstext korrekt ein!")
            }

            setBlockLoading(true)

            const { data, errors } = await client.queries.blockCognitoUser({
                username: cognitoUser.username,
                blocked: cognitoUser.enabled ? true : false,
            })

            if (errors) {
                notify(errors[0].message)
                setBlockLoading(false)
                return
            } else {
                console.log("Blocked user succesfully: ", data)
            }

            queryClient.invalidateQueries({
                queryKey: [QueryKeys.Users],
            })
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.CognitoUsers],
            })

            setBlockLoading(false)
            setDialogOpen(false)
        } catch {
            notify("Beim " + APPROVEMENT_TEXT + " des Benutzers ist ein Fehler aufgetreten!")
        }
    }

    return (
        <CustomDialog
            confirmText={APPROVEMENT_TEXT}
            dialogOpen={dialogOpen}
            positive={cognitoUser.enabled ? false : true}
            titleText={"Benutzer " + APPROVEMENT_TEXT}
            setDialogOpen={setDialogOpen}
            confirmAction={() => blockUserRequest()}
            showConfirm={true}
            showDecline={true}
            confirmDisabled={authContext.cognitoUser?.username === cognitoUser.username}
            confirmButtonLoading={blockLoading}
        >
            {authContext.cognitoUser?.username === cognitoUser.username ? (
                <Typography variant="h3" className={classes.deleteApproveText}>
                    Sie können sich selbst als Benutzer nicht deaktivieren. Bitte melden Sie sich als einen anderen Admin ein!
                </Typography>
            ) : (
                <>
                    <Typography variant="h3" className={classes.deleteApproveText}>
                        Sind Sie sicher, dass Sie den Benutzer {APPROVEMENT_TEXT.toLowerCase()} möchten?
                    </Typography>

                    <Typography variant="body1">
                        Bitte geben Sie zur Bestätigung das Wort <strong>&quot;{APPROVEMENT_TEXT}&quot;</strong> in das Eingabefeld ein!
                    </Typography>

                    <TextField
                        label={APPROVEMENT_TEXT + " Bestätigen"}
                        value={approveText}
                        onChange={(e) => setApproveText(e.target.value)}
                    />
                </>
            )}
        </CustomDialog>
    )
}

export default UserBlockDialog
