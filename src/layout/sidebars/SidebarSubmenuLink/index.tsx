"use client"

import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useLayoutContext } from "hooks"
import { AppRouteArray, NavigationParam } from "types"
import { checkRouteIsSelected } from "routes"
import useStyles from "./styles"

type SidebarSubmenuLinkProps = {
    route: AppRouteArray
    isSubSidebar: boolean
    inSubmenuList: boolean
    params?: NavigationParam[]
}

const getPath = (initPath: string, params: NavigationParam[] | undefined) => {
    if (!params) return initPath

    let path = initPath

    for (const param of params) {
        if (!param.value) continue
        path = path.replace(param.name, param.value)
    }

    const savedFilterParamsFromStorage = sessionStorage.getItem(path)

    if (savedFilterParamsFromStorage) {
        path = path + "?" + savedFilterParamsFromStorage
    }

    return path
}

const SidebarSubmenuLink: React.FC<SidebarSubmenuLinkProps> = ({ route, isSubSidebar, inSubmenuList, params }) => {
    const layoutContext = useLayoutContext()
    const { classes, cx } = useStyles({ isSubSidebar })

    const router = useRouter()
    const pathname = usePathname()

    const [isSelected, setIsSelected] = useState<boolean>(checkRouteIsSelected(pathname, route))

    useEffect(() => {
        const routeIsSelected = checkRouteIsSelected(pathname, route)
        setIsSelected(routeIsSelected)
    }, [pathname, route])

    const isMenuOpen = isSubSidebar ? layoutContext.subMenuOpen : layoutContext.menuOpen

    return (
        <ListItem
            className={cx(
                classes.listItem,
                isSelected ? classes.listItemSelected : null,
                route.indented ? classes.indented : null,
                isMenuOpen ? null : inSubmenuList ? classes.listItemClosedInSubmenu : classes.listItemClosed
            )}
            onClick={() => router.push(getPath(route.path, params))}
            // key={route.key}
        >
            {route.icon && <ListItemIcon className={classes.listItemIconBefore}>{route.icon}</ListItemIcon>}

            <ListItemText
                classes={{
                    primary: cx(classes.listItemText, isMenuOpen ? null : classes.menuClosed),
                }}
            >
                {route.title}
            </ListItemText>
        </ListItem>
    )
}

export default SidebarSubmenuLink
