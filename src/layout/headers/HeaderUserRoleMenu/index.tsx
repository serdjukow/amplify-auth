"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { MenuItem, MenuList } from "@mui/material"
import { updateUserAttributes } from "aws-amplify/auth"
import { useAuthContext } from "hooks"
import { AccountingIcon, AdminIcon, LogisticsIcon, ManagementIcon, OfficeIcon, ProductionManagerIcon, QualityManagementIcon } from "icons"
import { Loading } from "core"
import useStyles from "./styles"

type HeaderUserRoleMenuProps = {
    handleMenuClose: () => void
}

const HeaderUserRoleMenu: React.FC<HeaderUserRoleMenuProps> = ({ handleMenuClose }) => {
    const { classes } = useStyles()
    const router = useRouter()
    const authContext = useAuthContext()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [roleToSelect, setRoleToSelect] = useState<string | null>(null)

    const user = authContext.cognitoUser

    if (!user) {
        return null
    }

    if (user.groups.length < 2) {
        return null
    }

    const updateUserRole = async (newRole: string) => {
        setRoleToSelect(newRole)
        setIsLoading(true)
        await updateUserAttributes({
            userAttributes: {
                "custom:currentGroup": newRole,
            },
        })
        await authContext.reloadUserData()
        handleMenuClose()
        setRoleToSelect(null)
        setIsLoading(false)
        router.push("/")
    }

    const getUserRoleIcon = (value: string) => {
        switch (value) {
            case "Admin":
                return <AdminIcon />
            case "production":
                return <ProductionManagerIcon />
            case "management":
                return <ManagementIcon />
            case "office":
                return <OfficeIcon />
            case "accounting":
                return <AccountingIcon />
            case "qualitymanagement":
                return <QualityManagementIcon />
            case "logistics":
                return <LogisticsIcon />
            default:
                throw new Error("Could not find userRole " + value)
        }
    }

    return (
        <MenuList className={classes.userRoleMenu}>
            {user.groups.map((group) => (
                <MenuItem
                    key={group.groupID}
                    onClick={() => user.currentGroup.groupID !== group.groupID && updateUserRole(group.groupID)}
                    className={user.currentGroup.groupID === group.groupID ? classes.selectedRole : ""}
                >
                    {isLoading && roleToSelect === group.groupID ? (
                        <Loading size="21px" className={classes.loading} />
                    ) : (
                        getUserRoleIcon(group.groupID)
                    )}
                    {group.groupName}
                </MenuItem>
            ))}
        </MenuList>
    )
}

export default HeaderUserRoleMenu
