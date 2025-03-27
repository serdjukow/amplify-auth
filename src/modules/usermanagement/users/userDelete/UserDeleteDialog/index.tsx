"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useLayoutContext, useUserDelete } from "hooks"
import { client } from "queryClient"
import { User } from "types"
import { DeleteDialog } from "components"
import { AppRoutes } from "routes"
import { isUserUsed } from "../../api"

type UserDeleteDialogProps = {
    dialogOpen: boolean
    setDialogOpen: (value: React.SetStateAction<boolean>) => void
    user: User | undefined
    loadUserList?: (nextTokenParam?: string | null | undefined) => Promise<User[]>
}

const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({ user, dialogOpen, setDialogOpen, loadUserList }) => {
    const router = useRouter()
    const { notify } = useLayoutContext()

    const deleteMutation = useUserDelete()

    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

    if (!dialogOpen || user === undefined) {
        return null
    }

    const deleteUserRequest = async () => {
        setDeleteLoading(true)
        const userIsUsed = await isUserUsed(user.id)

        if (userIsUsed) {
            setDeleteLoading(false)
            notify("Diese Benutzer kann nicht gelöscht werden, da sie in Verwendung ist!")
            return
        }

        const { data, errors } = await client.queries.deleteCognitoUser({
            username: user.userSUB,
        })

        if (errors) {
            notify(errors[0].message)
            setDeleteLoading(false)
            return
        } else {
            console.log("Deleted user succesfully: ", data)
        }

        const deletedUser = await deleteMutation.mutateAsync(user)

        if (loadUserList) await loadUserList()

        console.log("deletedUser: ", deletedUser)
        setDeleteLoading(false)
        setDialogOpen(false)
        router.push(AppRoutes.users.path)
    }

    return (
        <DeleteDialog
            deleteLoading={deleteLoading}
            deleteRequest={deleteUserRequest}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            dialogTitle="Benutzer Löschen"
            itemName={user.firstName + " " + user.lastName}
            itemDeleteDescription="der Benutzer"
        />
    )
}

export default UserDeleteDialog
