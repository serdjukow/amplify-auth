import React from "react";
import { Grid2, Typography } from "@mui/material";
import { useUserLastSessions } from "hooks";
import { CustomTable, CustomTag, Loading } from "core";
import useStyles from "../styles";
import utils from "utils";

const LastOnline: React.FC = () => {
  const { classes } = useStyles();

  const { lastUserSession, lastUserSessions, isLoading } =
    useUserLastSessions();

  return (
    <div className={classes.card}>
      <Grid2 container direction="row" alignItems="center">
        <Grid2>
          <Typography
            variant="h2"
            color="textPrimary"
            style={{ marginBottom: 33 }}
          >
            Letzte Online-Zeit
          </Typography>

          {isLoading ? (
            <Loading
              size="25px"
              description="Bitte warten. Daten werden geladen..."
            />
          ) : !lastUserSession ? (
            <Typography variant="h3" color="textPrimary">
              Noch keine Daten vorhanden
            </Typography>
          ) : (
            <>
              <Grid2 container direction="row" spacing={2} alignItems="center">
                <Typography
                  variant="h3"
                  color="textPrimary"
                  style={{ margin: 0 }}
                >
                  Status:
                </Typography>
                <CustomTag
                  content={
                    lastUserSession.status === "Active" ? "Online" : "Offline"
                  }
                  tagColor={
                    lastUserSession.status === "Active" ? "green" : "red"
                  }
                />
              </Grid2>
              <Typography
                variant="h3"
                color="textPrimary"
                style={{ margin: 0, marginBottom: 25 }}
              >
                Zuletzt Online:{" "}
                {utils.dates.getDateAndTimeInGermanFromAWSDateTimeFormat(
                  lastUserSession.endTime,
                )}{" "}
                Uhr
              </Typography>
              <Typography
                variant="h3"
                color="textPrimary"
                style={{ margin: 0 }}
              >
                Dauer:{" "}
                {Math.round(lastUserSession.duration / 60).toLocaleString(
                  "de-DE",
                )}{" "}
                Minuten
              </Typography>
            </>
          )}
        </Grid2>
        <Grid2>
          <CustomTable>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Start</th>
                <th>Ende</th>
                <th>Dauer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lastUserSessions.map((session) => (
                <tr key={session.id}>
                  <td>
                    {utils.dates.getDateInGermanFromAWSDateTimeFormat(
                      session.startTime,
                    )}
                  </td>
                  <td>
                    {utils.dates.getTimeInGermanFromAWSDateTimeFormat(
                      session.startTime,
                    )}
                  </td>
                  <td>
                    {utils.dates.getTimeInGermanFromAWSDateTimeFormat(
                      session.endTime,
                    )}
                  </td>
                  <td>
                    {Math.round(session.duration / 60).toLocaleString("de-DE")}{" "}
                    Minuten
                  </td>
                  <td>
                    <CustomTag
                      content={
                        session.status === "Active" ? "Online" : "Offline"
                      }
                      tagColor={session.status === "Active" ? "green" : "red"}
                      tagSize="xsmall"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default LastOnline;
