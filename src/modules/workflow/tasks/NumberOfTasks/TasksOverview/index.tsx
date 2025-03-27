import React from "react";
import { useTasksNumber } from "hooks";
import { TaskIcon } from "icons";
import { BoxHeadlineContainer } from "layout";
import { scroller } from "react-scroll";
import { CustomTable, Loading } from "core";

export const TasksOverview: React.FC = () => {
  const { isLoading, numberOfTasks, contractsToProcess } = useTasksNumber();

  if (isLoading) {
    return (
      <BoxHeadlineContainer
        boxTitle="Aufgaben-Übersicht"
        boxIcon={<TaskIcon />}
      >
        <Loading description="Bitte warten. Aufgaben-Übersicht wird geladen..." />
      </BoxHeadlineContainer>
    );
  }

  return (
    <BoxHeadlineContainer
      boxTitle="Aufgaben-Übersicht"
      boxIcon={<TaskIcon />}
      paddingHorizontal={0}
      paddingVertical={0}
    >
      <CustomTable
        leftSpacing="medium"
        headerSpacing="small"
        cellSpacing="small"
        clickable={true}
      >
        <thead>
          <tr>
            <th>Aufgaben-Typ</th>
            <th>Anzahl</th>
          </tr>
        </thead>
        <tbody>
          <tr
            onClick={() =>
              scroller.scrollTo("contractsToProcess", {
                duration: 700,
                smooth: true,
                offset: -175,
              })
            }
          >
            <td>Abzuarbeitende Aufträge</td>
            <td>{contractsToProcess}</td>
          </tr>
          <tr style={{ cursor: "text" }}>
            <td>
              <strong>Aufgaben insgesamt</strong>
            </td>
            <td>
              <strong>{numberOfTasks}</strong>
            </td>
          </tr>
        </tbody>
      </CustomTable>
    </BoxHeadlineContainer>
  );
};
