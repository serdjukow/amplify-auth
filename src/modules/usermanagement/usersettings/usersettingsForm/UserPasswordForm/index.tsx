"use client"

import React, { useImperativeHandle, useRef } from "react"
import { useRouter } from "next/navigation"
import { Grid2 } from "@mui/material"
import { useLayoutContext } from "hooks"
import { FieldHandles, UserPasswordFormHandles } from "types"
import { CustomButton, TextInputField } from "core"
import { AppRoutes } from "routes"

type UserPasswordFormProps = {
    oldPassword: string
    setOldPassword: (value: React.SetStateAction<string>) => void
    newPassword: string
    setNewPassword: (value: React.SetStateAction<string>) => void
    confirmNewPassword: string
    setConfirmNewPassword: (value: React.SetStateAction<string>) => void
    submitPasswordChange: () => void
    submitPasswordChangeLoading: boolean
}

const UserPasswordFormComponent: React.ForwardRefRenderFunction<UserPasswordFormHandles, UserPasswordFormProps> = (
    {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        submitPasswordChange,
        submitPasswordChangeLoading,
    },
    userPasswordFormRef
) => {
    const router = useRouter()
    const { notify } = useLayoutContext()

    const oldPasswordInputRef = useRef<FieldHandles>(null)
    const newPasswordInputRef = useRef<FieldHandles>(null)
    const confirmNewPasswordInputRef = useRef<FieldHandles>(null)

    useImperativeHandle(userPasswordFormRef, () => ({
        validateUserPasswordForm: () => {
            if (oldPassword === "") {
                notify("Bitte gib dein altes Passwort ein!")
                oldPasswordInputRef.current?.highlight()
                return null
            }

            if (newPassword === "") {
                notify("Bitte gib dein neues Passwort ein!")
                newPasswordInputRef.current?.highlight()
                return null
            }

            if (newPassword.length > 30) {
                notify("Dein neues Passwort darf maximal nur 30 Zeichen enthalten!")
                newPasswordInputRef.current?.highlight()
                return null
            }

            if (confirmNewPassword === "") {
                notify("Bitte wiederhole dein neues Passwort!")
                confirmNewPasswordInputRef.current?.highlight()
                return null
            }

            const regularExpressionPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}$/

            if (!regularExpressionPassword.test(newPassword)) {
                notify(
                    "Bitte gib ein gültiges Passwort aus mind. 8 Zeichen mit Groß- und Kleinbuchstaben, Zahlen und folgenden Sonderzeichen: ^ $ * . [ ] { } ( ) ?  ! @ # % & / , > <  : ; | _ ~  ein!"
                )
                newPasswordInputRef.current?.highlight()
                return null
            }

            if (newPassword !== confirmNewPassword) {
                notify("Die Wiederholung des Passworts stimmt nicht mit deinem eingegebenem Passeort überein!")
                confirmNewPasswordInputRef.current?.highlight()
                return null
            }

            return { oldPassword, newPassword }
        },
    }))

    return (
        <>
            <Grid2 container direction="row" alignItems="center" spacing={4}>
                <Grid2 size={4}>
                    <TextInputField
                        id="oldPassword"
                        label="Altes Passwort"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        type="password"
                        ref={oldPasswordInputRef}
                        required={true}
                        validate={(value) => value.trim() !== ""}
                    />
                </Grid2>
            </Grid2>
            <Grid2 container direction="row" alignItems="center" spacing={4}>
                <Grid2 size={4}>
                    <TextInputField
                        id="newPassword"
                        label="Neues Passwort"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type="password"
                        ref={newPasswordInputRef}
                        required={true}
                        validate={(value) => value.trim() !== ""}
                    />
                </Grid2>
                <Grid2 size={4}>
                    <TextInputField
                        label="Neues Passwort wiederholen"
                        id="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        type="password"
                        ref={confirmNewPasswordInputRef}
                        required={true}
                        validate={(value) => value.trim() !== ""}
                    />
                </Grid2>
            </Grid2>
            <Grid2 container direction="row" spacing={5}>
                <Grid2>
                    <CustomButton
                        text="Passwort ändern"
                        onClick={() => submitPasswordChange()}
                        loading={submitPasswordChangeLoading}
                        style="filled"
                    />
                </Grid2>
                <Grid2>
                    <CustomButton
                        color="red"
                        text="Abbrechen"
                        onClick={() => {
                            router.push(AppRoutes.start.path)
                        }}
                        disabled={submitPasswordChangeLoading}
                    />
                </Grid2>
            </Grid2>
        </>
    )
}

export default React.memo(React.forwardRef(UserPasswordFormComponent))
