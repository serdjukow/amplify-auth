"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Collapse, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useLayoutContext } from "hooks"
import { ArrowIcon } from "icons"
import { AppRouteArray } from "types"
import { checkRouteIsSelected } from "routes"
import useStyles from "./styles"

type SidebarSubmenuListProps = {
    route: AppRouteArray
    children: React.ReactNode
    isSubSidebar: boolean
}

const SidebarSubmenuList: React.FC<SidebarSubmenuListProps> = ({ route, children, isSubSidebar }) => {
    const layoutContext = useLayoutContext()
    const { classes, cx } = useStyles()

    const pathname = usePathname()

    const [submenuOpen, setSubmenuOpen] = useState<boolean>(checkRouteIsSelected(pathname, route))

    useEffect(() => {
        const routeIsSelected = checkRouteIsSelected(pathname, route)
        setSubmenuOpen(routeIsSelected)
    }, [pathname, route])

    const isMenuOpen = isSubSidebar ? layoutContext.subMenuOpen : layoutContext.menuOpen

    return (
        <>
            <ListItem
                // selected={submenuOpen}
                className={cx(
                    classes.listItem,
                    isMenuOpen ? null : submenuOpen ? classes.listItemClosedSubmenuOpen : classes.listItemClosed
                )}
                onClick={() => setSubmenuOpen((prev) => !prev)}
                key={route.key}
            >
                {route.icon && <ListItemIcon className={classes.listItemIconBefore}>{route.icon}</ListItemIcon>}

                <ListItemText
                    classes={{
                        primary: cx(classes.listItemText, isMenuOpen ? null : classes.menuClosed),
                    }}
                >
                    {route.title}
                </ListItemText>
                <ListItemIcon className={cx(classes.dropDownIconWrapper, submenuOpen ? classes.dropDownIconExpanded : "")}>
                    <ArrowIcon className={classes.dropDownIcon} />
                </ListItemIcon>
            </ListItem>
            <Collapse in={submenuOpen}>{children}</Collapse>
        </>
    )
}

export default SidebarSubmenuList
