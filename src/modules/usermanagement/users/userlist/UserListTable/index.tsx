"use client"

import React, { SyntheticEvent, useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { useUserRoutes } from "hooks"
import { CognitoUser, User } from "types"
import { CustomReactTable } from "core"
import UserBlockDialog from "modules/usermanagement/users/userBlock/UserBlockDialog"
import UserDeleteDialog from "../../userDelete/UserDeleteDialog"
import ActionsColumnFormatter from "../ColumnFormatters/ActionsColumnFormatter"
import EnabledColumnFormatter from "../ColumnFormatters/EnabledColumnFormatter"
import utils from "utils"

type UserListTableProps = {
    isLoading: boolean
    userList: User[]
    cognitoUserList: CognitoUser[]
}

const UserListTable: React.FC<UserListTableProps> = ({ isLoading, userList, cognitoUserList }) => {
    const { navigateToEditUserPage, navigateToUserPage } = useUserRoutes()

    const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState<boolean>(false)
    const [userToDelete, setUserToDelete] = useState<User>()

    const [blockCognitoUserDialogOpen, setBlockCognitoUserDialogOpen] = useState<boolean>(false)
    const [cognitoUserToBlock, setCognitoUserToBlock] = useState<CognitoUser | undefined>()

    // User List UI Context

    const defaultColumns = React.useMemo<ColumnDef<User>[]>(
        () => [
            {
                header: "Name",
                accessorKey: "firstName",
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
                meta: {
                    isDefaultSort: true,
                    defaultSortOrder: "asc",
                },
            },
            {
                header: "E-Mail-Adresse",
                accessorKey: "email",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "Benutzername",
                accessorKey: "username",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "Rollen",
                accessorKey: "roles",
                accessorFn: (row) => {
                    const cognitoUser = cognitoUserList.find((cognitoUserItem) => cognitoUserItem?.email === row.email)

                    if (!cognitoUser) return ""

                    return cognitoUser.groups
                        .map((group) => {
                            const groupOption = utils.constants.USER_GROUPS_OPTIONS.find(
                                (groupOptionItem) => groupOptionItem.value === group.GroupName
                            )
                            return groupOption!.label
                        })
                        .sort()
                        .join(", ")
                },
                cell: (info) => info.getValue(),
                enableSorting: false,
                footer: (props) => props.column.id,
            },
            {
                header: "Telefon",
                accessorKey: "phone",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "Aktiv",
                accessorKey: "active",
                cell: ({ row }) => <EnabledColumnFormatter user={row.original} cognitoUserList={cognitoUserList} />,
                footer: (props) => props.column.id,
            },
            {
                header: "Erstellt am",
                accessorKey: "createdAt",
                accessorFn: (row) => (row.createdAt ? utils.dates.getDateInGermanFromAWSDateFormat(row.createdAt) : ""),
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "Zuletzt Online",
                accessorKey: "lastActive",
                accessorFn: (row) => utils.dates.getDateAndTimeInGermanFromAWSTimestampFormat(row.lastActive),
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                header: "Aktionen",
                cell: ({ row }) => (
                    <ActionsColumnFormatter
                        user={row.original}
                        cognitoUserList={cognitoUserList}
                        listIntent="list"
                        openEditRowPage={(user) => navigateToEditUserPage(user)}
                        setRowToDelete={setUserToDelete}
                        setCognitoUserToBlock={setCognitoUserToBlock}
                        setBlockCognitoUserDialogOpen={setBlockCognitoUserDialogOpen}
                        setDeleteRowDialogOpen={setDeleteUserDialogOpen}
                    />
                ),
                footer: (props) => props.column.id,
            },
        ],
        [cognitoUserList, navigateToEditUserPage]
    )

    const rowClickHandler = (_: SyntheticEvent, user: User) => {
        navigateToUserPage(user)
    }

    return (
        <>
            <UserBlockDialog
                dialogOpen={blockCognitoUserDialogOpen}
                setDialogOpen={setBlockCognitoUserDialogOpen}
                cognitoUser={cognitoUserToBlock}
            />
            <UserDeleteDialog dialogOpen={deleteUserDialogOpen} setDialogOpen={setDeleteUserDialogOpen} user={userToDelete} />
            <CustomReactTable<User>
                data={userList}
                columns={defaultColumns}
                rowClickHandler={rowClickHandler}
                isLoadingDataList={isLoading}
            />
        </>
    )
}

export default UserListTable
