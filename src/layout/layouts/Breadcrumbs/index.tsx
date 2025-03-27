"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDataContext } from "hooks"
import { ArrowIcon, HomeIcon } from "icons"
import { AppRoute } from "types"
import { AppRoutes, checkRoute, getBreadcrumbs, getRouteLastParamName, getRouteParamName } from "routes"
import useStyles from "./styles"

const Breadcrumbs: React.FC = () => {
    const { classes, cx } = useStyles()
    const dataContext = useDataContext()
    const pathname = usePathname()

    const breadcrumbs = getBreadcrumbs(pathname)

    const breadcrumbsContentRef = useRef<HTMLDivElement>(null)

    const breadcrumbsRef = useRef<HTMLDivElement>(null)

    const [isTooLong, setIsTooLong] = useState<boolean>(false)

    useEffect(() => {
        setIsTooLong(breadcrumbsContentRef.current!.offsetWidth > breadcrumbsRef.current!.offsetWidth - 50)
    }, [pathname])

    const getPathOfRoute = (route: AppRoute) => {
        let path = route.path.replace(":customerID", dataContext.customer?.id ?? "").replace(":orderID", dataContext.order?.id ?? "")

        if (route.isWithParam) {
            path = path.replace(getRouteParamName(route.path), dataContext.currentData?.id ?? "")
        }
        return path
    }

    const getNameOfRouteWithParam = (route: AppRoute) => {
        const routeLastParamName = getRouteLastParamName(route.path)

        if (!routeLastParamName) {
            return ""
        }

        if (routeLastParamName === ":customerID" && !checkRoute(pathname, route)) {
            return dataContext.customer?.name
        } else if (routeLastParamName === ":orderID" && !checkRoute(pathname, route)) {
            return dataContext.order?.auftragsNummer
        } else {
            return dataContext.currentData?.name
        }
    }

    return (
        <div ref={breadcrumbsRef} className={classes.breadcrumbs}>
            <div ref={breadcrumbsContentRef} className={classes.breadcrumbsContent}>
                <Link className={cx(classes.breadcrumbLink, classes.breadcrumbLinkNormal, classes.homeLink)} href={AppRoutes.start.path}>
                    <HomeIcon className={classes.homeIcon} />
                </Link>

                <ArrowIcon className={cx(classes.arrowIcon, isTooLong ? classes.arrowIconSmall : classes.arrowIconNormal)} />

                {breadcrumbs.map((route, i) =>
                    i + 1 === breadcrumbs.length ? (
                        route.isWithParam ? (
                            dataContext.isLoadingCurrentData || dataContext.isLoadingStateEntities ? (
                                <span key={i} className={classes.loadingName}></span>
                            ) : (
                                <span className={cx(isTooLong ? classes.breadcrumbNameSmall : classes.breadcrumbNameNormal)} key={i}>
                                    <title>{getNameOfRouteWithParam(route)}</title>
                                    {getNameOfRouteWithParam(route)}
                                </span>
                            )
                        ) : (
                            <span className={cx(isTooLong ? classes.breadcrumbNameSmall : classes.breadcrumbNameNormal)} key={i}>
                                <title>{route.title}</title>
                                {route.title}
                            </span>
                        )
                    ) : (
                        <>
                            <Link
                                className={cx(
                                    classes.breadcrumbLink,
                                    isTooLong ? classes.breadcrumbLinkSmall : classes.breadcrumbLinkNormal
                                )}
                                href={getPathOfRoute(route)}
                            >
                                {route.isWithParam ? getNameOfRouteWithParam(route) : route.title}
                            </Link>

                            <ArrowIcon className={cx(classes.arrowIcon, isTooLong ? classes.arrowIconSmall : classes.arrowIconNormal)} />
                        </>
                    )
                )}
            </div>
        </div>
    )
}

export default Breadcrumbs
