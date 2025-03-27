"use client"

import { FC, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Grid, TextField, Typography } from "@mui/material"
import { confirmSignIn } from "aws-amplify/auth"
import { useLayoutStore } from "@/stores/layoutStore"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead"
import DraftsIcon from "@mui/icons-material/Drafts"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { LoginErrorType } from "@/types"
import { AuthRoutes } from "@/routes"
// import utils from "utils"
import styles from "./styles.module.css"
import { LoadingButton } from "@mui/lab"

const ChangeTemporaryPassword: FC = () => {
    const router = useRouter()
    const { notify } = useLayoutStore()

    const [userName, setUsername] = useState<string>("")
    const [temporaryPassword, setTemporaryPassword] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(true)
    const [changePasswordSuccess, setChangePasswordSuccess] = useState<boolean>(false)

    const errorRef = useRef<HTMLElement>(null)

    const tryChangePassword = async () => {
        try {
            const regularExpressionPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}$/

            console.log("userName: ", userName)
            console.log("temporaryPassword: ", temporaryPassword)
            console.log("password: ", password)
            console.log("confirmedPassword: ", confirmedPassword)

            if (userName === "" || userName.length > 200) {
                return notify("Bitte gib deine E-Mail-Adresse ein!")
            }

            if (temporaryPassword === "" || temporaryPassword.length > 200) {
                return notify("Bitte gib das temporäre Passwort ein, das dir per E-Mail zugeschickt wurde!")
            }

            if (password === "" || password.length > 200) {
                return notify("Bitte gib dein Passwort ein!")
            } else if (confirmedPassword === "" || confirmedPassword.length > 200) {
                return notify("Bitte wiederhole dein Passwort!")
            }

            if (!regularExpressionPassword.test(password)) {
                return notify(
                    "Bitte gib ein gültiges Passwort aus mind. 8 Zeichen mit Groß- und Kleinbuchstaben, Zahlen und folgenden Sonderzeichen: ^ $ * . [ ] { } ( ) ?  ! @ # % & / , > <  : ; | _ ~  ein!"
                )
            } else if (password !== confirmedPassword) {
                return notify("Bitte wiederhole dein Passwort!")
            }

            setLoading(true)
            await confirmSignIn({
                challengeResponse: password,
            })

            setSuccess(true)
            setChangePasswordSuccess(true)
            // utils.scroll.scrollToRef(errorRef)
        } catch (err: unknown) {
            const error = err as LoginErrorType

            if (error?.code === "UserNotFoundException") {
                notify(
                    "Die angegebene E-Mail-Adresse wurde leider nicht gefunden. Bitte überprüfe deine Eingabe oder kontaktiere den Support!"
                )
            } else if (error?.code === "CodeMismatchException") {
                notify("Das angegebene temporäre Passwort stimmt nicht mit dem dir gesendeten Passwort überein!")
            } else {
                notify(error?.message)
            }
            // utils.errorHandling.logToSentry("Error on tryChangePassword!", "Authentication -> confirmForgotPassword", err, authContext)
            setSuccess(false)
            console.log("err: ", err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Grid justifyContent="center" alignItems="center" container direction="column">
                <Typography className={styles.title} variant="h3">
                    Passwort ändern
                </Typography>
                {!changePasswordSuccess && (
                    <>
                        <Grid container direction="row" justifyContent="center">
                            <div className={styles.iconTextContainer}>
                                <MarkEmailReadIcon className={styles.icon} />
                                <Typography className={styles.iconText}>Postfach prüfen</Typography>
                            </div>
                            <div className={styles.iconTextContainer}>
                                <DraftsIcon className={styles.icon} />
                                <Typography className={styles.iconText}>E-Mail öffnen</Typography>
                            </div>
                            <div className={styles.iconTextContainer}>
                                <OpenInNewIcon className={styles.icon} />
                                <Typography className={styles.iconText}>Link in E-Mail klicken</Typography>
                            </div>
                        </Grid>
                        <Grid>
                            <Typography className={styles.codeSend} variant="h3" style={{ fontWeight: 500 }}>
                                Wir haben dir eine E-Mail mit einem Code geschickt.
                                <br />
                                Bitte klicke diesen, um dein Passwort zurückzusetzen.
                            </Typography>
                            <Typography className={styles.checkSpamTitle} variant="h3">
                                E-Mail nicht erhalten?
                            </Typography>
                            <Typography className={styles.checkSpam} variant="body1">
                                Es kann passieren, dass Dein E-Mail Provider dieses E-Mail als Spam angesehen hat.
                                <br />
                                Überprüfe dann bitte Deinen Spam- bzw. Junk-E-Mail-Ordner auf Erhalt unserer Nachricht.
                            </Typography>
                        </Grid>
                    </>
                )}
            </Grid>
            {!changePasswordSuccess && (
                <Grid justifyContent="center" alignItems="center" container direction="column">
                    <div className={styles.sectionContainer}>
                        <div className={styles.formContainer}>
                            <TextField
                                label="Temporäres Passwort"
                                value={temporaryPassword}
                                onChange={(e) => setTemporaryPassword(e.target.value)}
                                type="text"
                            />
                            <TextField label="E-Mail-Adresse" value={userName} onChange={(e) => setUsername(e.target.value)} type="text" />
                            <TextField
                                label="Neues Passwort"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                            <TextField
                                label="Neues Passwort wiederholen"
                                value={confirmedPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                            />
                        </div>
                    </div>
                    <Grid justifyContent="center" alignItems="center" container direction="column" className={styles.buttonsContainer}>
                        <LoadingButton sx={{ px: "25px" }} variant="contained" onClick={tryChangePassword} loading={loading} fullWidth>
                            Passwort ändern
                        </LoadingButton>
                        <div className={styles.resendCodeContainer}>
                            <Link className={styles.resendCodeLink} href={AuthRoutes.forgotPassword}>
                                Code erneut senden
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            )}

            {changePasswordSuccess && (
                <Grid
                    justifyContent="center"
                    alignItems="center"
                    container
                    direction="column"
                    className={styles.passwordChangeSuccessContainer}
                >
                    <CheckCircleIcon className={styles.passwordChangeSuccessIcon} />
                    <Typography className={styles.passwordChangeSuccess}>
                        Dein Passwort wurde erfolgreich geändert!
                        <br />
                        Wechsle nun zum Login-Fenster, um dich mit den neuen Zugangsdaten einzuloggen.
                    </Typography>
                    <LoadingButton
                        sx={{ px: "25px" }}
                        variant="contained"
                        onClick={() => router.push(AuthRoutes.login)}
                        loading={loading}
                    >
                        Jetzt Einloggen
                    </LoadingButton>
                </Grid>
            )}
        </>
    )
}

export default ChangeTemporaryPassword
