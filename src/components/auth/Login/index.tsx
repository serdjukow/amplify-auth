"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn, confirmSignIn } from "aws-amplify/auth"
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Collapse,
    Container,
    Grid,
    FormControl,
    InputLabel,
    InputAdornment,
    IconButton,
    OutlinedInput,
} from "@mui/material"
import { useSearchParams } from "next/navigation"
import { AuthRoutes } from "@/routes"
import styles from "./styles.module.css"
import { LoadingButton } from "@mui/lab"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { clsx } from "clsx"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

const Login = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newConfirmedPassword, setNewConfirmedPassword] = useState("")
    const [newPasswordRequired, setNewPasswordRequired] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [changePasswordSuccess, setChangePasswordSuccess] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const redirect = searchParams.get("redirect") || "/"

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            if (newPasswordRequired) {
                return await handleNewPassword()
            }

            const { nextStep } = await signIn({
                username: email.trim().toLowerCase(),
                password,
            })

            if (nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED") {
                setNewPasswordRequired(true)
                setLoading(false)
                return
            }

            setSuccess(true)
            setLoading(false)
            router.push(redirect)
        } catch (err) {
            setLoading(false)
            setError("❌ Anmeldung fehlgeschlagen. Bitte überprüfe deine Eingaben.")
            console.error("Login Error:", err)
        }
    }

    const handleNewPassword = async () => {
        if (newPassword.length < 8) {
            setError("❌ Das neue Passwort muss mindestens 8 Zeichen lang sein.")
            return
        }

        setLoading(true)
        try {
            await confirmSignIn({ challengeResponse: newPassword })
            setNewPasswordRequired(false)
            setSuccess(true)
            setLoading(false)
            setChangePasswordSuccess(true)
            router.push(redirect)
        } catch (err) {
            setLoading(false)
            setError("❌ Fehler beim Ändern des Passworts.")
            console.error("Change Password Error:", err)
        }
    }

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <>
            <form className={styles.loginContainer} onSubmit={handleLogin}>
                <Typography style={{ marginBottom: 30 }} variant="h5" align="center">
                    {newPasswordRequired ? "Temporäres Passwort ändern" : "Einloggen"}
                </Typography>
                <Collapse in={changePasswordSuccess}>
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
                            Du kannst dich nun mit den neuen Zugangsdaten einzuloggen.
                        </Typography>
                    </Grid>
                </Collapse>

                <Collapse in={!!error}>
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                </Collapse>

                <Collapse in={success}>
                    <Alert severity="success" sx={{ mb: 2 }}>
                        ✅ Erfolgreich eingeloggt! Du wirst weitergeleitet...
                    </Alert>
                </Collapse>

                <Container>
                    <div className={clsx(styles.formContainer, newPasswordRequired ? styles.temporaryPasswordChange : null)}>
                        <TextField
                            label="E-Mail-Adresse"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            required={true}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="repeat-password">Passwort wiederholen</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={newPasswordRequired ? "Temporäres Passwort" : "Passwort"}
                                required={true}
                            />
                        </FormControl>

                        <Collapse in={newPasswordRequired}>
                            <TextField
                                label="Neues Passwort"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                            />
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel htmlFor="repeat-password">Passwort wiederholen</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? "text" : "password"}
                                    value={newConfirmedPassword}
                                    onChange={(e) => setNewConfirmedPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleTogglePassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Neues Passwort wiederholen"
                                />
                            </FormControl>
                        </Collapse>

                        {!newPasswordRequired && (
                            <Link className={styles.forgotPasswordLink} href={AuthRoutes.forgotPassword}>
                                Passwort vergessen?
                            </Link>
                        )}
                    </div>
                </Container>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: 50,
                    }}
                >
                    <LoadingButton
                        sx={{ px: "25px" }}
                        variant="contained"
                        onClick={() => router.push(AuthRoutes.login)}
                        loading={loading}
                        type="submit"
                    >
                        {newPasswordRequired ? "Passwort ändern" : "Einloggen"}
                    </LoadingButton>
                </div>
            </form>
            {/* <Box maxWidth={800} mx="auto" mt={8} p={3} borderRadius={2} boxShadow={3} bgcolor="white">
                <form onSubmit={handleLogin}>
                    <Typography variant="h5" align="center" gutterBottom>
                        {newPasswordRequired ? "Passwort ändern" : "Einloggen"}
                    </Typography>

                    <Collapse in={!!error}>
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    </Collapse>

                    <Collapse in={success}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ✅ Erfolgreich eingeloggt! Du wirst weitergeleitet...
                        </Alert>
                    </Collapse>
                    <TextField
                        label="E-Mail-Adresse"
                        id="username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextField
                        label={newPasswordRequired ? "Temporäres Passwort" : "Passwort"}
                        id="password"
                        name="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Collapse in={newPasswordRequired}>
                        <TextField
                            label="Neues Passwort"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required={newPasswordRequired}
                        />
                        <TextField
                            label="Neues Passwort wiederholen"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="password"
                            value={newConfirmedPassword}
                            onChange={(e) => setNewConfirmedPassword(e.target.value)}
                            required={newPasswordRequired}
                        />
                    </Collapse>

                    {!newPasswordRequired && <Link href={AuthRoutes.forgotPassword}>Passwort vergessen?</Link>}

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : newPasswordRequired ? "Passwort ändern" : "Einloggen"}
                    </Button>
                </form>
            </Box> */}
        </>
    )
}

export default Login
