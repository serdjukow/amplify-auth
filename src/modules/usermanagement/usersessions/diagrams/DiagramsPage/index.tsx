import React from "react";
import { Grid2, Typography } from "@mui/material";
import { useUserRead } from "hooks";
import DailyDiagram from "../DailyDiagram";
import LastOnline from "../LastOnline";
import MonthlyDiagram from "../MonthlyDiagram";
import WeeklyDiagram from "../WeeklyDiagram";

const DiagramsPage: React.FC = () => {
  const { user } = useUserRead();
  return (
    <Grid2 container direction="column" spacing={7} alignItems="center">
      <Typography variant="h1" color="textPrimary">
        Statistiken für {user?.firstName + " " + user?.lastName}
      </Typography>
      <LastOnline />
      <DailyDiagram />
      <WeeklyDiagram />
      <MonthlyDiagram />
    </Grid2>
  );
};

export default DiagramsPage;
