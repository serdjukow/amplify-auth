"use client"

import React, { useMemo } from "react"
import { usePathname } from "next/navigation"
import { useDataContext } from "hooks"
import { AppRoutes, checkCustomerOrderRoute, getSubNavigationsAsArray } from "routes"
import SidebarEntityMenu from "../SidebarEntityMenu"

const OrderMenu: React.FC = () => {
    const dataContext = useDataContext()
    const pathname = usePathname()

    const isCustomerOrderRoute = checkCustomerOrderRoute(pathname)

    const order = dataContext.order

    const hasInvoice = Boolean(order?.invoiceID)
    const timesheetCompleted = Boolean(order?.timesheetCompleted)

    const entitySubNavigations = useMemo(
        () =>
            getSubNavigationsAsArray(
                AppRoutes.customers.children.customer.children.customerorders.children.customerorder.children,
                true
            ).filter((subNavigation) => {
                if (subNavigation.key === "customerorderinvoice" && !hasInvoice) return false

                if (subNavigation.key === "customerordercreateinvoice" && (!timesheetCompleted || hasInvoice)) return false

                return true
            }),
        [hasInvoice, timesheetCompleted]
    )

    return (
        <SidebarEntityMenu
            isEntityRoute={isCustomerOrderRoute}
            entitySubNavigations={entitySubNavigations}
            backLinkPath={AppRoutes.customers.children.customer.children.customerorders.path.replace(
                ":customerID",
                dataContext.customer?.id ?? ""
            )}
            backLinkTitle="Zurück zu Aufträgen"
            headerTitle={order?.auftragsNummer}
            headerSubTitle={order?.customer.name}
            headerIcon={AppRoutes.customers.children.customer.children.customerorders.icon}
            headerLink={AppRoutes.customers.children.customer.children.customerorders.children.customerorder.path
                .replace(":customerID", dataContext.customer?.id ?? "")
                .replace(":orderID", order?.id ?? "")}
            params={[
                {
                    name: ":customerID",
                    value: dataContext.customer?.id,
                },
                {
                    name: ":orderID",
                    value: order?.id,
                },
                {
                    name: ":invoiceID",
                    value: order?.invoiceID,
                },
            ]}
            entitySections={{
                edit: "Auftrag bearbeiten",
                relations: "Relationen",
            }}
        />
    )
}

export default OrderMenu
