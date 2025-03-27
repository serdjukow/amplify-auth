"use client"

import React, { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { updatePassword, updateUserAttributes } from "aws-amplify/auth"
import { useAuthContext, useLayoutContext } from "hooks"
import { useUserUpdate } from "hooks"
import { LockIcon, SettingsIcon } from "icons"
import { BoxHeadlineContainer } from "layout"
import { UserPasswordFormHandles, UserSettingsFormHandles } from "types"
import { CustomTab, CustomTabs } from "core"
import { AppRoutes } from "routes"
import UserPasswordForm from "../UserPasswordForm"
import UserSettingsForm from "../UserSettingsForm"
import useUserPasswordForm from "../useUserPasswordForm"

const UserSettingsFormPage: React.FC = () => {
    const router = useRouter()
    const authContext = useAuthContext()
    const { notify } = useLayoutContext()

    const updateUserMutation = useUserUpdate()

    const { oldPassword, setOldPassword, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword } = useUserPasswordForm()

    const userSettingsFormRequestDataRef = useRef<UserSettingsFormHandles>(null)
    const userPasswordFormRequestDataRef = useRef<UserPasswordFormHandles>(null)

    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [submitPasswordChangeLoading, setSubmitPasswordChangeLoading] = useState<boolean>(false)

    const [selectedTab, setSelectedTab] = useState<number>(0)

    const submitUserSettings = async () => {
        const userSettingsFormInput = await userSettingsFormRequestDataRef.current?.validateUserSettingsForm()

        if (!userSettingsFormInput) {
            console.error("UserSettingsForm is invalid...")
            return false
        }

        if (!authContext.userData) {
            notify(`Beim Speichern der Einstellungen ist ein Fehler aufgetreten.`)
            return false
        }

        setSubmitLoading(true)

        console.log("userSettingsFormInput: ", userSettingsFormInput)

        await updateUserMutation.mutateAsync({
            ...userSettingsFormInput,
            id: authContext.userData.id,
        })

        if (updateUserMutation.isError) {
            setSubmitLoading(false)
            notify(`Beim Speichern der Einstellungen ist ein Fehler aufgetreten.`)
            return false
        }

        console.log("mutateUserSettingsRequest: ", updateUserMutation.data)
        console.log("userSettingsFormInput.phone: ", userSettingsFormInput.phone)

        await updateUserAttributes({
            userAttributes: {
                gender: userSettingsFormInput.salutation ?? "",
                given_name: userSettingsFormInput.firstName,
                family_name: userSettingsFormInput.lastName,
                phone_number: userSettingsFormInput.phone ?? "",
                "custom:fax": userSettingsFormInput.fax ?? "",
            },
        })

        if (updateUserMutation.data) {
            authContext.reloadUserData()
        }

        setSubmitLoading(false)

        router.push(AppRoutes.settings.path)
        router.refresh()
        return true
    }

    const submitPasswordChange = async () => {
        const userPasswordFormResult = userPasswordFormRequestDataRef.current?.validateUserPasswordForm()

        if (!userPasswordFormResult) {
            console.error("UserPasswordForm is invalid...")
            return false
        }

        if (!authContext.userData) {
            notify(`Beim Speichern des neuen Passworts ist ein Fehler aufgetreten.`)
            return false
        }

        setSubmitPasswordChangeLoading(true)

        try {
            await updatePassword({ oldPassword, newPassword })
        } catch (err: any) {
            if (err.code === "NotAuthorizedException") {
                notify(`Bitte überprüfe dein altes Passwort!`)
                return false
            }
            if (err.code === "LimitExceededException") {
                notify(`Das Versuchslimit wurde überschritten. Bitte versuchen Sie es nach einiger Zeit.`)
                return false
            } else {
                notify(`Beim Ändern des Passworts ist ein Fehler aufgetreten!`)
                return false
            }
        } finally {
            setSubmitPasswordChangeLoading(false)
        }

        router.push(AppRoutes.settings.path)
        router.refresh()
        return true
    }

    if (!authContext.userData) {
        return (
            <BoxHeadlineContainer boxTitle="Einstellungen">Beim Laden der Einstellungen ist ein Fehler aufgetreten!</BoxHeadlineContainer>
        )
    }

    return (
        <>
            <CustomTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
                <CustomTab tabLabel="Benutzer-Einstellungen" tabIcon={<SettingsIcon />} />
                <CustomTab tabLabel="Passwort ändern" tabIcon={<LockIcon />} />
            </CustomTabs>
            <BoxHeadlineContainer boxTitle="Benutzer-Einstellungen" marginTop={false} tabBoxValue={selectedTab} tabBoxIndex={0}>
                <UserSettingsForm
                    user={authContext.userData}
                    ref={userSettingsFormRequestDataRef}
                    submitUserSettings={submitUserSettings}
                    submitLoading={submitLoading}
                />
            </BoxHeadlineContainer>
            <BoxHeadlineContainer boxTitle="Passwort ändern" marginTop={false} tabBoxValue={selectedTab} tabBoxIndex={1}>
                <UserPasswordForm
                    {...{
                        oldPassword,
                        setOldPassword,
                        newPassword,
                        setNewPassword,
                        confirmNewPassword,
                        setConfirmNewPassword,
                    }}
                    ref={userPasswordFormRequestDataRef}
                    submitPasswordChange={submitPasswordChange}
                    submitPasswordChangeLoading={submitPasswordChangeLoading}
                />
            </BoxHeadlineContainer>
        </>
    )
}

export default UserSettingsFormPage
