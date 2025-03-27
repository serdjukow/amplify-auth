"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useDataContext, useLayoutContext } from "hooks"
import useStyles from "./styles"

type SidebarSubmenuHeaderProps = {
    title: string | undefined
    subTitle: string | undefined | null
    icon: React.ReactNode
    link: string
}

const SidebarSubmenuHeader: React.FC<SidebarSubmenuHeaderProps> = ({ title, subTitle, icon, link }) => {
    const { classes, cx } = useStyles()
    const dataContext = useDataContext()
    const layoutContext = useLayoutContext()
    const router = useRouter()

    return (
        <ListItem
            className={cx(classes.listItem, layoutContext.subMenuOpen ? null : classes.listItemClosed)}
            onClick={() => router.push(link)}
        >
            <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
            <ListItemText
                classes={{
                    primary: cx(classes.listItemText, layoutContext.subMenuOpen ? null : classes.menuClosed),
                }}
            >
                <div className={cx(title && !dataContext.isLoadingStateEntities ? classes.title : classes.titleLoading)}>
                    {dataContext.isLoadingStateEntities ? "" : title}
                </div>
                <div className={cx(subTitle && !dataContext.isLoadingStateEntities ? classes.subTitle : classes.subTitleLoading)}>
                    {dataContext.isLoadingStateEntities ? "" : subTitle}
                </div>
            </ListItemText>
        </ListItem>
    )
}

export default SidebarSubmenuHeader
