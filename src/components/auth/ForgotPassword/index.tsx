"use client"

import { FC, ChangeEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Grid, TextField, Typography } from "@mui/material"
import { LoadingButton } from "@mui/lab"
import { resetPassword } from "aws-amplify/auth"
import { LoginErrorType } from "@/types"
import { useLayoutStore } from "@/stores/layoutStore"
import { AuthRoutes } from "@/routes"
// import utils from "utils"
import styles from "./styles.module.css"

const ForgotPassword: FC = () => {
    const router = useRouter()
    const { notify } = useLayoutStore()

    const [userName, setUsername] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(true)

    const resetPasswordRequest = async () => {
        try {
            if (userName === "" || userName.length > 200) {
                return notify("Bitte gib deine E-Mail-Adresse ein!")
            }

            setLoading(true)
            const { nextStep } = await resetPassword({
                username: userName,
            })

            setSuccess(true)
            console.log("nextStep: ", nextStep)
            if (nextStep.codeDeliveryDetails) {
                router.push("confirm-forgot-password")
            }
        } catch (err: unknown) {
            const error = err as LoginErrorType

            console.log("err: ", err)
            if (error?.code === "UserNotFoundException") {
                notify("Benutzer nicht gefunden. Bitte überprüfe deine Eingabe!")
            } else if (error?.code === "LimitExceededException") {
                notify("Das Versuchslimit wurde überschritten. Bitte versuche es nach einiger Zeit nochmal.")
            } else {
                notify(error?.message)
            }

            // utils.errorHandling.logToSentry("Error on resetPassword!", "Authentication -> forgotPassword", err, null)
            setSuccess(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Typography className={styles.pageTitle} variant="h3">
                    Passwort vergessen
                </Typography>
                <Typography className={styles.pageSubtitle} variant="subtitle1">
                    Gib die deinem Konto zugeordnete E-Mail-Adresse ein. Wir senden dir dann einen Link zum Zurücksetzen deines Passworts
                    per E-Mail.
                </Typography>
            </Grid>

            <Grid className={styles.formContainer}>
                <TextField
                    label="E-Mail-Adresse"
                    value={userName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    type="text"
                    variant="outlined"
                />
            </Grid>

            <div className={styles.changePasswordTextContainer}>
                <Link className={styles.changePasswordTextLink} href={AuthRoutes.confirmForgotPassword}>
                    Ich habe bereits einen Code.
                </Link>
            </div>

            <Grid className={styles.buttonsContainer}>
                <LoadingButton variant="contained" onClick={resetPasswordRequest} loading={loading}>
                    Passwort zurücksetzen
                </LoadingButton>
            </Grid>
        </>
    )
}

export default ForgotPassword
