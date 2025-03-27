"use client"

import React, { useMemo } from "react"
import { usePathname } from "next/navigation"
import { useDataContext } from "hooks"
import { AppRoutes, checkEmployeeRoute, getSubNavigationsAsArray } from "routes"
import SidebarEntityMenu from "../SidebarEntityMenu"

const EmployeeMenu: React.FC = () => {
    const dataContext = useDataContext()
    const pathname = usePathname()

    const isEmployeeRoute = checkEmployeeRoute(pathname)

    const entitySubNavigations = useMemo(() => getSubNavigationsAsArray(AppRoutes.employees.children.employee.children, true), [])

    return (
        <SidebarEntityMenu
            isEntityRoute={isEmployeeRoute}
            entitySubNavigations={entitySubNavigations}
            backLinkPath={AppRoutes.employees.path}
            backLinkTitle="Zurück zum Personal"
            headerTitle={dataContext.employee?.name}
            headerSubTitle={dataContext.employee?.personalNummer}
            headerIcon={AppRoutes.employees.icon}
            headerLink={AppRoutes.employees.children.employee.path.replace(":employeeID", dataContext.employee?.id ?? "")}
            params={[
                {
                    name: ":employeeID",
                    value: dataContext.employee?.id,
                },
            ]}
            entitySections={{
                edit: "Mitarbeiter bearbeiten",
                relations: "Relationen",
            }}
        />
    )
}

export default EmployeeMenu
