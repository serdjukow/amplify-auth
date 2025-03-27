import React, { useRef, useState } from "react";
import { Grid2 } from "@mui/material";
import {
  useAuthContext,
  useHolidayCreate,
  useHolidayList,
  useHolidayRead,
  useHolidayRoutes,
  useHolidayUpdate,
  useLayoutContext,
} from "hooks";
import { HolidayFormHandles } from "types";
import { CustomButton } from "core";
import { BoxLoadingForm } from "components";
import HolidayForm from "../HolidayForm";
import useStyles from "./styles";

type HolidayFormPageProps = {
  formIntent: "create" | "edit";
};

const HolidayFormPage: React.FC<HolidayFormPageProps> = ({ formIntent }) => {
  const { classes } = useStyles();
  const authContext = useAuthContext();
  const { notify } = useLayoutContext();

  const { holiday, isLoading } = useHolidayRead();
  const { holidayList, isLoading: isLoadingHolidayList } = useHolidayList();
  const createHolidayMutation = useHolidayCreate();
  const updateHolidayMutation = useHolidayUpdate();
  const { navigateToHolidayPage, navigateToHolidayListPage } =
    useHolidayRoutes();

  const holidayFormRef = useRef<HolidayFormHandles>(null);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const submitHoliday = async () => {
    const holidayFormInput = holidayFormRef.current?.validateHolidayForm();
    if (!holidayFormInput) {
      console.error("HolidayForm is invalid...");
      return;
    }

    if (!authContext.userData) {
      return notify(
        `Beim ${
          formIntent === "edit" ? "Bearbeiten" : "Anlegen"
        } eines Feiertags-Jahr ist ein Fehler aufgetreten.`,
      );
    }

    setSubmitLoading(true);

    console.log("holidayInput: ", holidayFormInput);

    const mutateHolidayRequest = holiday
      ? await updateHolidayMutation.mutateAsync({
          ...holidayFormInput,
          id: holiday.id,
        })
      : await createHolidayMutation.mutateAsync(holidayFormInput);

    if (!mutateHolidayRequest) {
      setSubmitLoading(false);
      return notify(
        `Beim ${
          formIntent === "edit" ? "Bearbeiten" : "Anlegen"
        } eines Feiertags-Jahres ist ein Fehler aufgetreten.`,
      );
    }

    console.log("mutateHolidayRequest: ", mutateHolidayRequest);

    holidayFormRef.current?.resetHolidayForm();

    setSubmitLoading(false);
    navigateToHolidayPage(mutateHolidayRequest);
  };

  if (isLoading || isLoadingHolidayList) {
    return (
      <BoxLoadingForm
        isLoading={isLoading || isLoadingHolidayList}
        entityName="Feiertags-Jahr"
        formIntent={formIntent}
      />
    );
  }

  return (
    <>
      <HolidayForm
        holiday={holiday}
        formIntent={formIntent}
        holidayList={holidayList}
        ref={holidayFormRef}
      />

      <Grid2
        container
        direction="row"
        className={classes.buttons}
        justifyContent="center"
      >
        <Grid2 className={classes.gridItem}>
          <CustomButton
            text={
              "Feiertags-Jahr " +
              (formIntent === "edit" ? "speichern" : "anlegen")
            }
            onClick={() => submitHoliday()}
            loading={submitLoading}
            accessKey="s"
          />
        </Grid2>
        <Grid2 className={classes.gridItem}>
          <CustomButton
            color="red"
            text="Abbrechen"
            accessKey="a"
            onClick={navigateToHolidayListPage}
            disabled={submitLoading}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default HolidayFormPage;
