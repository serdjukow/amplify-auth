"use client"

import React, { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useLayoutStore } from "@/stores/layoutStore"
import { useAuthStore } from "@/stores/authStore"
import { Header, Sidebar, SubSidebar } from "@/layout"
import { Loading } from "@/core"
import { isAuthRoute } from "@/routes"
import useStyles from "./styles"
import { clsx } from "clsx"

type LayoutProps = {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { classes, cx } = useStyles()
    const { setMenuOpen, setMenuLocked, menuLocked, subMenuOpen, menuOpen } = useLayoutStore()
    const { isLoading } = useAuthStore()

    const pathname = usePathname()

    const authRoute = isAuthRoute(pathname)

    useEffect(() => {
        const lockMenuFromLocalStorage = localStorage.getItem("lockMenu")
        if (lockMenuFromLocalStorage === "true") {
            setMenuOpen(true)
            setMenuLocked(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        localStorage.setItem("lockMenu", menuLocked ? "true" : "false")
        if (menuLocked) setMenuOpen(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuLocked])

    return (
        <div className={classes.App}>
            {!authRoute && <Sidebar />}
            {!authRoute && <SubSidebar />}

            <div className={clsx(classes.dashboard, menuOpen || subMenuOpen ? "menuOpen" : "")}>
                <Header layoutType={authRoute ? "authLayout" : "layout"} />
                <main
                    className={
                        authRoute
                            ? classes.authContent
                            : clsx(classes.contentContainer, menuOpen || subMenuOpen ? null : classes.contentContainerMenuClosed)
                    }
                >
                    <div className={classes.content}>{isLoading ? <Loading size="33px" /> : children}</div>
                </main>
            </div>
        </div>
    )
}

export default Layout
