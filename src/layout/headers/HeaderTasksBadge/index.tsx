import React from "react";
import { useRouter } from "next/navigation"
import { Badge } from "@mui/material";
import { useTasksNumber } from "hooks";
import { TaskIcon } from "icons";
import { CustomButton } from "core";
import { AppRoutes } from "routes";
import useStyles from "./styles";

export const HeaderTasksBadge: React.FC = () => {
  const { classes } = useStyles();
  const router = useRouter()

  const { numberOfTasks } = useTasksNumber();

  return (
      <CustomButton
          text="Aufgaben"
          color="grey"
          style="outlined"
          onClick={() => router.push(AppRoutes.tasks.path)}
          rootClassName={classes.action}
          textClassName={classes.buttonText}
          iconBefore={
              <Badge overlap="circular" badgeContent={<>{numberOfTasks.toString()}</>} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} className={classes.badge}>
                  <TaskIcon className={classes.icon} />
              </Badge>
          }
      />
  )
};
