"use client"

import React, { useMemo, useState } from "react"
import { Grid2, Typography } from "@mui/material"
import dayjs from "dayjs"
import { useUserSessionList } from "hooks"
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from "icons"
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"
import { CustomButton, Loading } from "core"
import useStyles from "../styles"

interface HourlyAggregation {
    hour: string // z.B. "08"
    totalDurationMin: number // z.B. 120 (Minuten)
}

const DailyDiagram: React.FC = () => {
    const { classes } = useStyles()

    const [startDate, setStartDate] = useState<Date>(new Date())

    const { userSessionList, isLoading } = useUserSessionList(
        dayjs(startDate).startOf("day").toDate(),
        dayjs(startDate).endOf("day").toDate()
    )

    const diagramData: HourlyAggregation[] = useMemo(() => {
        // 1) Array von 24 Stunden anlegen
        const hourlyAggregation = Array.from({ length: 24 }, (_, i) => ({
            hour: i.toString().padStart(2, "0"),
            totalDurationMin: 0,
        }))

        // 2) Alle Sessions durchgehen und Zeit aufsplitten
        userSessionList.forEach((session) => {
            const start = dayjs(session.startTime)
            const end = dayjs(session.endTime)

            // Optional: Wenn du nur einen bestimmten Tag hast (z.B. "selectedDay"):
            // const dayStart = selectedDay.startOf("day");
            // const dayEnd = selectedDay.endOf("day");
            // // Clampen:
            // if (start.isBefore(dayStart)) start = dayStart;
            // if (end.isAfter(dayEnd)) end = dayEnd;
            // if (!start.isBefore(end)) return; // kein Zeitfenster

            // Solange current < end iterieren wir stundenweise
            let current = start.clone()
            while (current.isBefore(end)) {
                const currentHour = current.hour() // Zahl 0–23

                // Ende der aktuellen Stunde berechnen
                // endOf("hour") z.B. 12:59:59.999
                // + 1ms, damit wir wirklich an die nächste Stunde springen
                const hourBoundary = current.clone().endOf("hour").add(1, "millisecond")

                // Dies ist das tatsächliche Ende des Teilstücks:
                const chunkEnd = hourBoundary.isAfter(end) ? end : hourBoundary

                // Dauer dieses Teilstücks in Minuten berechnen
                const chunkMinutes = chunkEnd.diff(current, "minute", true)
                hourlyAggregation[currentHour].totalDurationMin += chunkMinutes

                // current ans Ende des Teilstücks setzen
                current = chunkEnd
            }
        })

        // 3) Rundung oder sonstige Verarbeitung
        // z.B. auf eine Nachkommastelle runden:
        hourlyAggregation.forEach((item) => {
            item.totalDurationMin = Math.round(item.totalDurationMin * 10) / 10
        })

        return hourlyAggregation
    }, [userSessionList])

    const totalMinutes = useMemo(() => diagramData.reduce((acc, item) => acc + item.totalDurationMin, 0), [diagramData])

    const totalHours = useMemo(() => totalMinutes / 60, [totalMinutes])

    return (
        <div className={classes.card}>
            <Grid2 container direction="row" spacing={2} alignItems="center">
                <CustomButton
                    text={dayjs(startDate).subtract(1, "day").format("DD.MM.YYYY")}
                    iconBefore={<ArrowCircleLeftIcon />}
                    onClick={() => setStartDate(dayjs(startDate).subtract(1, "day").toDate())}
                    size="small"
                    color="blue"
                    marginRight={15}
                />
                <Typography variant="h5" color="textPrimary">
                    {dayjs(startDate).format("DD.MM.YYYY")}
                </Typography>
                <CustomButton
                    text={dayjs(startDate).add(1, "day").format("DD.MM.YYYY")}
                    iconAfter={<ArrowCircleRightIcon />}
                    onClick={() => setStartDate(dayjs(startDate).add(1, "day").toDate())}
                    size="small"
                    color="blue"
                    marginLeft={15}
                />
            </Grid2>

            {isLoading ? (
                <Loading size="25px" description="Bitte warten. Daten werden geladen..." />
            ) : (
                <BarChart width={600} height={300} data={diagramData}>
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip
                        formatter={(value: number) =>
                            value.toLocaleString("de-DE", {
                                maximumFractionDigits: 1,
                            })
                        }
                    />
                    <Bar dataKey="totalDurationMin" fill="#8884d8" name="Aktive Minuten" />
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

export default DailyDiagram
