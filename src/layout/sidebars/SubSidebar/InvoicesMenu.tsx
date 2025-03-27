"use client"

import React, { useMemo } from "react"
import { usePathname } from "next/navigation"
import { AppRoutes, checkInvoicesRoute, getSubNavigationsAsArray, invoicesmenu } from "routes"
import SidebarEntityMenu from "../SidebarEntityMenu"

const InvoicesMenu: React.FC = () => {
    const pathname = usePathname()

    const isInvoicesRoute = checkInvoicesRoute(pathname)

    const entitySubNavigations = useMemo(() => getSubNavigationsAsArray(invoicesmenu, true), [])

    const isOpenInvoiceListRoute = pathname.includes(AppRoutes.invoices.children.openinvoices.path)

    const isInvoiceOverviewRoute = pathname.includes(AppRoutes.invoices.children.invoiceoverview.path)

    const headerSubtitle = isOpenInvoiceListRoute ? "Offene Rechnungen" : isInvoiceOverviewRoute ? "Rechnungsübersicht" : "Alle Rechnungen"

    return (
        <SidebarEntityMenu
            isEntityRoute={isInvoicesRoute}
            entitySubNavigations={entitySubNavigations}
            headerTitle="Rechnungen"
            headerSubTitle={headerSubtitle}
            headerIcon={AppRoutes.invoices.icon}
            headerLink={AppRoutes.invoices.path}
            params={[]}
            entitySections={{
                edit: "Mitarbeiter bearbeiten",
                relations: "Relationen",
            }}
        />
    )
}

export default InvoicesMenu
