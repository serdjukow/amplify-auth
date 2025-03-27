"use client"

import React, { useMemo, useState } from "react"
import { Grid2, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useUserSessionList } from "hooks"
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "icons"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"
import { CustomButton, Loading } from "core"
import useStyles from "../styles"
import { getMonthName } from "utils/dates"

interface DailyAggregation {
    day: string // z.B. "Montag"
    totalDurationMin: number // z.B. 120 (Minuten)
}

const MonthlyDiagram: React.FC = () => {
    const { classes } = useStyles()

    const [startDate, setStartDate] = useState<Date>(new Date())

    const { userSessionList, isLoading } = useUserSessionList(
        dayjs(startDate).startOf("month").toDate(),
        dayjs(startDate).endOf("month").toDate()
    )

    const diagramData: DailyAggregation[] = useMemo(() => {
        const dailyAggregation: DailyAggregation[] = Array.from({ length: dayjs(startDate).daysInMonth() }, (_, index) => {
            const day = (index + 1).toString().padStart(2, "0")
            const totalDurationMin = userSessionList
                .filter((session) => dayjs(session.startTime).date() === index + 1)
                .reduce((acc, session) => acc + session.duration / 60, 0)

            return {
                day,
                totalDurationMin: Math.round(totalDurationMin * 10) / 10,
            }
        })

        return dailyAggregation
    }, [userSessionList, startDate])

    const totalMinutes = useMemo(() => diagramData.reduce((acc, item) => acc + item.totalDurationMin, 0), [diagramData])

    const totalHours = useMemo(() => totalMinutes / 60, [totalMinutes])

    return (
        <div className={classes.card}>
            <Grid2 container direction="row" spacing={2} alignItems="center">
                <CustomButton
                    text={
                        getMonthName(dayjs(startDate).subtract(1, "month").month() + 1) + " " + dayjs(startDate).subtract(1, "month").year()
                    }
                    iconBefore={<ArrowCircleLeftIcon />}
                    onClick={() => setStartDate(dayjs(startDate).subtract(1, "month").toDate())}
                    size="small"
                    color="blue"
                    marginRight={15}
                />
                <Typography variant="h5" color="textPrimary">
                    {getMonthName(dayjs(startDate).month() + 1) + " " + dayjs(startDate).year()}
                </Typography>
                <CustomButton
                    text={getMonthName(dayjs(startDate).add(1, "month").month() + 1) + " " + dayjs(startDate).add(1, "month").year()}
                    iconAfter={<ArrowCircleRightIcon />}
                    onClick={() => setStartDate(dayjs(startDate).add(1, "month").toDate())}
                    size="small"
                    color="blue"
                    marginLeft={15}
                />
            </Grid2>

            {isLoading ? (
                <Loading size="25px" description="Bitte warten. Daten werden geladen..." />
            ) : (
                <BarChart width={600} height={300} data={diagramData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip
                        formatter={(value: number) =>
                            value.toLocaleString("de-DE", {
                                maximumFractionDigits: 1,
                            })
                        }
                    />
                    <Bar dataKey="totalDurationMin" fill="lightblue" name="Aktive Minuten" />
                </BarChart>
            )}

            <Typography variant="h4" color="textPrimary" style={{ marginTop: 33 }}>
                {Math.round(totalMinutes)} Minuten /{" "}
                {totalHours.toLocaleString("de-DE", {
                    maximumFractionDigits: 1,
                })}{" "}
                Stunden
            </Typography>
        </div>
    )
}

export default MonthlyDiagram
