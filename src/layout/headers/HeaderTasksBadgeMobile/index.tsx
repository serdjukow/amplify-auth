"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Badge, IconButton } from "@mui/material"
import { useTasksNumber } from "hooks"
import { TaskIcon } from "icons"
import { AppRoutes } from "routes"
import useStyles from "./styles"

export const HeaderTasksBadgeMobile: React.FC = () => {
    const { classes } = useStyles()
    const router = useRouter()

    const { numberOfTasks } = useTasksNumber()

    return (
        <IconButton color="inherit" className={classes.action} onClick={() => router.push(AppRoutes.tasks.path)}>
            <Badge
                overlap="circular"
                badgeContent={<>{numberOfTasks.toString()}</>}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                className={classes.badge}
            >
                <TaskIcon className={classes.icon} />
            </Badge>
        </IconButton>
    )
}
