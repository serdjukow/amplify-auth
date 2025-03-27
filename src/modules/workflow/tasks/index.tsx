import React from "react";
import ContractsToProcessListTable from "./ContractsToProcess/contractstoprocess/ContractsToProcessListTable";
import { TasksOverview } from "./NumberOfTasks/TasksOverview";
import useStyles from "./styles";

export const Tasks: React.FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.tasksPage}>
      <TasksOverview />

      <ContractsToProcessListTable />
    </div>
  );
};
