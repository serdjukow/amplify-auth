"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Drawer } from "@mui/material"
import { useLayoutContext } from "hooks"
import { checkCustomerOrderRoute, checkCustomerRoute, checkEmployeeRoute, checkInvoicesRoute } from "routes"
import CustomerMenu from "./CustomerMenu"
import EmployeeMenu from "./EmployeeMenu"
import InvoicesMenu from "./InvoicesMenu"
import OrderMenu from "./OrderMenu"
import useStyles from "./styles"

const SubSidebar: React.FC = () => {
    const { classes, cx } = useStyles()
    const layoutContext = useLayoutContext()
    const pathname = usePathname()

    const isCustomerRoute = checkCustomerRoute(pathname)

    const isCustomerOrderRoute = checkCustomerOrderRoute(pathname)

    const isInvoicesRoute = checkInvoicesRoute(pathname)

    const isEmployeeRoute = checkEmployeeRoute(pathname)

    const isSubMenuRoute = isCustomerRoute || isCustomerOrderRoute || isEmployeeRoute || isInvoicesRoute

    useEffect(() => {
        layoutContext.setSubMenuOpen(isSubMenuRoute)
        if (isSubMenuRoute) {
            layoutContext.setMenuOpen(false)
            layoutContext.setMenuLocked(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubMenuRoute])

    return (
        <Drawer
            className={cx(classes.drawer, {
                [classes.drawerOpen]: layoutContext.subMenuOpen,
                [classes.drawerClose]: !layoutContext.subMenuOpen,
            })}
            variant="permanent"
            classes={{
                paper: cx(classes.drawerPaper, {
                    [classes.drawerOpen]: layoutContext.subMenuOpen,
                    [classes.drawerClose]: !layoutContext.subMenuOpen,
                }),
            }}
            anchor="left"
        >
            <div className={classes.drawerMenuItems}>
                <CustomerMenu />

                <OrderMenu />

                <EmployeeMenu />

                <InvoicesMenu />
            </div>
        </Drawer>
    )
}

export default SubSidebar
