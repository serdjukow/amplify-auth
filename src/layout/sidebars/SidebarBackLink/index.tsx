"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useLayoutContext } from "hooks"
import { ArrowCircleLeftIcon } from "icons"
import useStyles from "./styles"

const getLinkPath = (link: string) => {
    const savedFilterParamsFromStorage = sessionStorage.getItem(link)

    if (savedFilterParamsFromStorage) {
        return link + "?" + savedFilterParamsFromStorage
    }

    return link
}

type SidebarBackLinkProps = {
    title: string
    link: string
}

const SidebarBackLink: React.FC<SidebarBackLinkProps> = ({ title, link }) => {
    const layoutContext = useLayoutContext()
    const { classes, cx } = useStyles()
    const router = useRouter()

    return (
        <ListItem
            className={cx(classes.listItem, layoutContext.subMenuOpen ? null : classes.listItemClosed)}
            onClick={() => router.push(getLinkPath(link))}
        >
            <ListItemIcon className={classes.listItemIcon}>
                <ArrowCircleLeftIcon />
            </ListItemIcon>

            <ListItemText
                classes={{
                    primary: cx(classes.listItemText, layoutContext.subMenuOpen ? null : classes.menuClosed),
                }}
            >
                {title}
            </ListItemText>
        </ListItem>
    )
}

export default SidebarBackLink
