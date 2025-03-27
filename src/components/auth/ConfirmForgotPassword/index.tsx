"use client"

import { ChangeEvent, FC, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { confirmResetPassword } from "aws-amplify/auth"
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
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

const ConfirmForgotPassword: FC = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { notify } = useLayoutStore()

    const [userName, setUsername] = useState<string>(decodeURIComponent(searchParams.get("username") || ""))
    const [code, setCode] = useState<string>(searchParams.get("code") || "")
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmPassword] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(true)
    const [changePasswordSuccess, setChangePasswordSuccess] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const tryChangePassword = async () => {
        try {
            const regularExpressionPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}$/

            console.log("userName: ", userName)
            console.log("code: ", code)
            console.log("password: ", password)
            console.log("confirmedPassword: ", confirmedPassword)

            if (userName === "" || userName.length > 200) {
                return notify("Bitte gib deine E-Mail-Adresse ein!")
            }

            if (code === "" || code.length > 200) {
                return notify("Bitte gib den Code ein, den wir dir per E-Mail zugeschickt haben!")
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
            await confirmResetPassword({
                username: userName,
                newPassword: password,
                confirmationCode: code,
            })
            setSuccess(true)
            setChangePasswordSuccess(true)
            // utils.scroll.scrollToTop()
        } catch (err: unknown) {
            const error = err as LoginErrorType
            if (error?.code === "UserNotFoundException") {
                notify(
                    "Die angegebene E-Mail-Adresse wurde leider nicht gefunden. Bitte überprüfe deine Eingabe oder kontaktiere den Support!"
                )
            } else if (error?.code === "CodeMismatchException") {
                notify("Der angegebene Code stimmt nicht mit dem dir gesendeten Code überein!")
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

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <>
            <Grid justifyContent="center" alignItems="center" container direction="column">
                <Typography className={styles.title} variant="h4">
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
                            <Typography className={styles.codeSend} variant="subtitle1" style={{ fontWeight: 500 }}>
                                Wir haben dir eine E-Mail mit einem Code geschickt.
                                <br />
                                Bitte klicke diesen, um dein Passwort zurückzusetzen.
                            </Typography>
                            <Typography className={styles.checkSpamTitle} variant="subtitle1">
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
                                label="Code"
                                value={code}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
                                type="text"
                                variant="outlined"
                            />
                            <TextField
                                label="E-Mail-Adresse"
                                value={userName}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                variant="outlined"
                            />

                            <TextField
                                label="Passwort"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                            />
                            {/* 
                            <TextField
                                label="Passwort wiederholen"
                                value={confirmedPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                variant="outlined"
                            /> */}

                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="repeat-password">Passwort wiederholen</InputLabel>
                                <OutlinedInput
                                    id="repeat-password"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmedPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Passwort wiederholen"
                                />
                            </FormControl>
                        </div>
                    </div>
                    <Grid justifyContent="center" alignItems="center" container direction="column" className={styles.buttonsContainer}>
                        <LoadingButton sx={{ px: "25px" }} variant="contained" onClick={tryChangePassword} loading={loading}>
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
                    <LoadingButton sx={{ px: "25px" }} variant="contained" onClick={() => router.push(AuthRoutes.login)} loading={loading}>
                        Jetzt Einloggen
                    </LoadingButton>
                </Grid>
            )}
        </>
    )
}

export default ConfirmForgotPassword
