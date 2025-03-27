"use client"

import React, { useMemo } from "react"
import { usePathname } from "next/navigation"
import { useDataContext } from "hooks"
import { AppRoutes, checkCustomerRoute, getSubNavigationsAsArray } from "routes"
import SidebarEntityMenu from "../SidebarEntityMenu"

const CustomerMenu: React.FC = () => {
    const dataContext = useDataContext()
    const pathname = usePathname()

    const isCustomerRoute = checkCustomerRoute(pathname)

    const entitySubNavigations = useMemo(() => getSubNavigationsAsArray(AppRoutes.customers.children.customer.children, true), [])

    return (
        <SidebarEntityMenu
            isEntityRoute={isCustomerRoute}
            entitySubNavigations={entitySubNavigations}
            backLinkPath={AppRoutes.customers.path}
            backLinkTitle="Zurück zur Kundenliste"
            headerTitle={dataContext.customer?.name}
            headerSubTitle={dataContext.customer?.kundenNummer}
            headerIcon={AppRoutes.customers.icon}
            headerLink={AppRoutes.customers.children.customer.path.replace(":customerID", dataContext.customer?.id ?? "")}
            params={[
                {
                    name: ":customerID",
                    value: dataContext.customer?.id,
                },
            ]}
            entitySections={{
                edit: "Kunde",
                relations: "Relationen",
                collective: "Sammlung",
            }}
        />
    )
}

export default CustomerMenu
