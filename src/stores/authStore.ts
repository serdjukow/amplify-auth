"use client"

import { create } from "zustand"
import { CurrentCognitoUserType } from "@/types"

type AuthStore = {
    initAuth: boolean
    isLoading: boolean
    isAuth: boolean
    cognitoUser: CurrentCognitoUserType | null
    login: () => Promise<void>
    reloadUserData: () => Promise<void>}

export const useAuthStore = create<AuthStore>((set, get) => ({
    initAuth: false,
    isLoading: false,
    isAuth: false,
    cognitoUser: null,



    login: async () => {
        set({ isLoading: true })
    },

    reloadUserData: async () => {
        await get().login()
    },  
}))
