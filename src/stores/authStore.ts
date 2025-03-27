"use client"

import { create } from "zustand"
import { confirmSignUp, fetchAuthSession, fetchUserAttributes, getCurrentUser, signOut } from "aws-amplify/auth"
import * as Sentry from "@sentry/react"
import { getGlobalSettings } from "@/modules/basedata/globalsettings/api"
import { getUserRoleName } from "@/modules/usermanagement/roles/api"
import { getUser } from "@/modules/usermanagement/users/api"
import utils from "@/utils"
import { CognitoUserGroup, CurrentCognitoUserType, GlobalSettings, User } from "@/types"

type AuthStore = {
    initAuth: boolean
    isLoading: boolean
    isAuth: boolean
    cognitoUser: CurrentCognitoUserType | null
    userData: User | null
    globalSettings: GlobalSettings | null
    login: () => Promise<void>
    logout: () => Promise<void>
    reloadUserData: () => Promise<void>
    checkUserExists: (username: string) => Promise<boolean>
    setGlobalSettings: (settings: GlobalSettings) => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    initAuth: false,
    isLoading: false,
    isAuth: false,
    cognitoUser: null,
    userData: null,
    globalSettings: null,

    logout: async () => {
        await signOut()
        set({ cognitoUser: null, userData: null, isAuth: false })
    },

    checkUserExists: (username: string) => {
        return new Promise<boolean>((resolve, reject) => {
            const code = "000000"
            confirmSignUp({
                username,
                confirmationCode: code,
                options: { forceAliasCreation: false },
            })
                .then((data) => utils.logger.info(data))
                .catch((err) => {
                    switch (err.code) {
                        case "UserNotFoundException":
                            resolve(false)
                            break
                        case "NotAuthorizedException":
                        case "AliasExistsException":
                        case "CodeMismatchException":
                        case "ExpiredCodeException":
                            resolve(true)
                            break
                        default:
                            reject("No case found for confirmSignUp()")
                    }
                })
        })
    },

    login: async () => {
        set({ isLoading: true })

        const getUserSignedInAndAttributes = async () => {
            try {
                const [authSession, currentUser, userAttributes] = await Promise.all([
                    fetchAuthSession(),
                    getCurrentUser(),
                    fetchUserAttributes(),
                ])

                if (authSession.tokens) {
                    return {
                        isSignedIn: true,
                        currentUser,
                        userAttributes,
                    }
                }
                return { isSignedIn: false, currentUser: null, userAttributes: null }
            } catch {
                return { isSignedIn: false, currentUser: null, userAttributes: null }
            }
        }

        const { isSignedIn, currentUser, userAttributes } = await getUserSignedInAndAttributes()

        if (!isSignedIn || !currentUser || !userAttributes) {
            set({ cognitoUser: null, userData: null, isAuth: false })
            return
        }

        const userID = userAttributes["custom:userID"]
        const userData = userID ? await getUser(userID) : null
        if (userData) {
            Sentry.setUser(userData)
            set({ userData })
        }

        const globalSettings = await getGlobalSettings()
        set({ globalSettings })

        const group = userAttributes["custom:group"]
        const userGroups: CognitoUserGroup[] = group
            ? group.split(",").map((groupID) => ({
                  groupID,
                  groupName: getUserRoleName(groupID),
              }))
            : []

        const currentGroupID = userAttributes["custom:currentGroup"] ?? "Admin"

        const currentCognitoUser: CurrentCognitoUserType = {
            username: currentUser.username,
            salutation: userAttributes.gender === "Mr" || userAttributes.gender === "Mrs" ? userAttributes.gender : "Mr",
            customUsername: userAttributes["custom:username"] ?? "",
            userSUB: currentUser.userId,
            firstName: userAttributes.given_name ?? "",
            lastName: userAttributes.family_name ?? "",
            phone: userAttributes.phone_number ?? "",
            fax: userAttributes["custom:fax"] ?? "",
            email: userAttributes.email ?? "",
            emailVerified: userAttributes.email_verified === "true",
            currentGroup: {
                groupID: currentGroupID,
                groupName: getUserRoleName(currentGroupID),
            },
            groups: userGroups,
            userID: userID ?? "",
        }

        set({ cognitoUser: currentCognitoUser, isAuth: true, initAuth: true, isLoading: false })
    },

    reloadUserData: async () => {
        await get().login()
    },

    setGlobalSettings: (settings: GlobalSettings) => {
        set({ globalSettings: settings })
    },
}))
