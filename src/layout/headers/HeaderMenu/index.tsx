"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { IconButton, Menu, Typography } from "@mui/material"
import { useAuthContext } from "hooks"
import { ExpandMoreIcon, SimpleLineLoginIcon } from "icons"
import { CustomAvatar, CustomButton } from "core"
import { AppRoutes, AuthRoutes } from "routes"
import HeaderSearchBar from "../HeaderSearchBar"
import { HeaderTasksBadge } from "../HeaderTasksBadge"
import { HeaderTasksBadgeMobile } from "../HeaderTasksBadgeMobile"
import HeaderUserRoleMenu from "../HeaderUserRoleMenu"
import useStyles from "./styles"

const HeaderMenu: React.FC = () => {
    const { classes, cx } = useStyles()
    const router = useRouter()
    const authContext = useAuthContext()

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <div className={classes.sectionDesktop}>
                {authContext.isAuth ? (
                    <>
                        <HeaderSearchBar />
                        <HeaderTasksBadge />

                        <div className={classes.userAction}>
                            <CustomAvatar s3Resource={authContext.userData?.avatar} showBadge={false} size="45px" />
                            <div className={classes.userNameWrapper}>
                                <Typography variant="subtitle2" className={classes.userName}>
                                    {authContext.cognitoUser ? authContext.cognitoUser.firstName : "Nutzer"}
                                </Typography>
                                <Typography className={classes.userRole}>
                                    {authContext.cognitoUser ? authContext.cognitoUser.currentGroup.groupName : "Rolle"}
                                </Typography>
                            </div>
                            <IconButton
                                onClick={handleProfileMenuOpen}
                                aria-label="account of current user"
                                aria-controls="header-menu"
                                aria-haspopup="true"
                                className={classes.settingsIcon}
                            >
                                {isMenuOpen ? <ExpandMoreIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </div>
                    </>
                ) : (
                    <CustomButton
                        text="Anmelden"
                        paddingHorizontal="25px"
                        onClick={() => router.push(AuthRoutes.login)}
                        iconBefore={<SimpleLineLoginIcon className={classes.loginArrowIcon} />}
                        rootClassName={classes.loginButton}
                    />
                )}
            </div>
            <div className={classes.sectionMobile}>
                {authContext.isAuth ? (
                    <HeaderTasksBadgeMobile />
                ) : (
                    <CustomButton
                        text="Anmelden"
                        size="small"
                        onClick={() => router.push(AuthRoutes.login)}
                        responsiveOnlyIcon={true}
                        iconBefore={<SimpleLineLoginIcon className={classes.loginArrowIcon} />}
                        rootClassName={classes.loginButton}
                    />
                )}
            </div>
            <Menu
                className={classes.styledMenu}
                PopoverClasses={{ paper: classes.customMenu }}
                classes={{
                    list: cx(classes.customMenuList),
                }}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id="header-menu"
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <div className={classes.userHeader}>
                    <CustomAvatar s3Resource={authContext.userData?.avatar} showBadge={false} size="75px" />
                    <Typography className={classes.firstName}>
                        {authContext.cognitoUser ? authContext.cognitoUser.firstName : "Nutzer"}
                    </Typography>
                    <Typography className={classes.groupName}>
                        {authContext.cognitoUser ? authContext.cognitoUser.currentGroup.groupName : "Nutzer"}
                    </Typography>
                </div>
                <div className={classes.userButtons}>
                    <CustomButton
                        color="white"
                        size="small"
                        text="Einstellungen"
                        onClick={() => {
                            handleMenuClose()
                            router.push(AppRoutes.globalsettings.path)
                        }}
                        style="filled"
                    />
                    <CustomButton
                        color="white"
                        rootClassName={classes.logoutButton}
                        size="small"
                        style="filled"
                        text="Abmelden"
                        onClick={() =>
                            authContext.logoutHandler().then(() => {
                                handleMenuClose()
                                router.push(AuthRoutes.login)
                            })
                        }
                    />
                </div>
                <HeaderUserRoleMenu handleMenuClose={handleMenuClose} />
            </Menu>
        </>
    )
}

export default HeaderMenu
