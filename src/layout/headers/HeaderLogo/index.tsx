"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { IconButton, Slide } from "@mui/material"
import { useLayoutContext } from "hooks"
import useStyles from "./styles"

type HeaderLogoProps = {
    layoutType: "layout" | "authLayout"
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({ layoutType = "layout" }) => {
    const layoutContext = useLayoutContext()
    const { classes, cx, theme } = useStyles({ layoutType })
    const router = useRouter()

    return (
        <div
            className={cx(
                layoutType === "authLayout" ? classes.headerLogoAuthLayout : classes.headerLogoLayout,
                layoutType === "authLayout" || layoutContext.menuOpen ? null : classes.headerLogoSmall
            )}
        >
            <IconButton
                classes={{
                    root: cx(classes.logoButton, layoutContext.menuOpen ? null : classes.logoButtonSmall),
                }}
                onClick={() => router.push("/")}
            >
                <Slide
                    in={!layoutContext.menuOpen && layoutType === "layout"}
                    direction="left"
                    easing={{
                        enter: theme.transitions.easing.easeInOut,
                        exit: theme.transitions.easing.easeInOut,
                    }}
                >
                    <img
                        src={layoutType === "layout" ? "/logos/logo-default-icon.png" : "/logos/logo-dark-icon.png"}
                        className={cx(classes.logoIcon, layoutContext.menuOpen ? null : classes.logoIconClosed)}
                        alt=""
                    />
                </Slide>
                <Slide in={layoutType === "authLayout" || layoutContext.menuOpen} direction="right">
                    <img
                        src={layoutType === "layout" ? "/logos/logo-default.png" : "/logos/logo-dark.png"}
                        className={classes.logo}
                        alt=""
                    />
                </Slide>
            </IconButton>
        </div>
    )
}

export default HeaderLogo
