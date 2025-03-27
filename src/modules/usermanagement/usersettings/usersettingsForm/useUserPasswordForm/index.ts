"use client"

import { useEffect, useState } from "react"

const useUserPasswordForm = () => {
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("")

    useEffect(() => {
        setOldPassword("")
        setNewPassword("")
        setConfirmNewPassword("")
    }, [])

    return {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
    }
}

export default useUserPasswordForm
