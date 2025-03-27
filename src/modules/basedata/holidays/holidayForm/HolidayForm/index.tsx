import React, { useImperativeHandle, useRef } from "react";
import { Grid2 } from "@mui/material";
import dayjs from "dayjs";
import { useLayoutContext } from "hooks";
import { BoxHeadlineContainer } from "layout";
import {
  CreateHolidayInput,
  FieldHandles,
  Holiday,
  HolidayEntry,
  HolidayFormHandles,
} from "types";
import { CustomButton, CustomDatePicker, CustomTable } from "core";
import HolidayEntryItem from "../HolidayEntryItem";
import useHolidayForm from "../useHolidayForm";
import utils from "utils";

type HolidayFormProps = {
  formIntent: "create" | "edit";
  holiday: Holiday | null | undefined;
  holidayList: Holiday[];
};

const HolidayFormComponent: React.ForwardRefRenderFunction<
  HolidayFormHandles,
  HolidayFormProps
> = ({ formIntent, holiday, holidayList }, holidayFormRef) => {
  const { notify } = useLayoutContext();

  const {
    year,
    setYear,
    holidayEntryInputs,
    setHolidayEntryInputs,
    addNewHolidayEntryHandler,
    resetHolidayForm,
  } = useHolidayForm(formIntent, holiday, holidayList);

  const yearInputRef = useRef<FieldHandles>(null);

  useImperativeHandle(holidayFormRef, () => ({
    validateHolidayForm: () => {
      if (!year) {
        notify("Bitte wähle ein Jahr aus!");
        yearInputRef.current?.highlight();
        return null;
      }

      const holidayEntryInputList: HolidayEntry[] = [];

      for (const holidayEntry of holidayEntryInputs) {
        if (holidayEntry.title.trim() === "") {
          notify("Bitte füge einen Namen für den Feiertag hinzu!");
          holidayEntry.titleInputRef.current?.highlight();
          return null;
        }

        if (!holidayEntry.beginn) {
          notify("Bitte füge den Beginn des Feiertags hinzu!");
          holidayEntry.beginnInputRef.current?.highlight();
          return null;
        }

        if (dayjs(holidayEntry.beginn).minute() % 15 !== 0) {
          notify(
            "Bitte gib einen Beginn für den Feiertag in 15-Minuten-Schritten ein!",
          );
          holidayEntry.beginnInputRef.current?.highlight();
          return null;
        }

        if (!holidayEntry.ende) {
          notify("Bitte füge das Ende des Feiertags hinzu!");
          holidayEntry.endeInputRef.current?.highlight();
          return null;
        }

        if (dayjs(holidayEntry.ende).minute() % 15 !== 0) {
          notify(
            "Bitte gib ein Ende für den Feiertag in 15-Minuten-Schritten ein!",
          );
          holidayEntry.endeInputRef.current?.highlight();
          return null;
        }

        const holidayEntryInput: HolidayEntry = {
          title: holidayEntry.title,
          beginn: utils.dates.convertDateToAWSDateTimeFormat(
            holidayEntry.beginn,
          ),
          ende: utils.dates.convertDateToAWSDateTimeFormat(holidayEntry.ende),
        };

        holidayEntryInputList.push(holidayEntryInput);
      }

      const holidayFormInput: CreateHolidayInput = {
        year: year.getFullYear().toString(),
        holidays: holidayEntryInputList,
      };

      return holidayFormInput;
    },
    resetHolidayForm: () => {
      resetHolidayForm();
    },
  }));

  return (
    <BoxHeadlineContainer
      boxTitle={
        "Feiertags-Jahr " + (formIntent === "edit" ? "bearbeiten" : "anlegen")
      }
      paddingHorizontal={0}
      paddingVertical={0}
      boxMenu={
        <CustomButton
          text="Feiertag hinzufügen"
          onClick={addNewHolidayEntryHandler}
          size="small"
          color="green"
        />
      }
    >
      <Grid2
        container
        direction="row"
        spacing={5}
        style={{ marginLeft: 33, marginTop: 25 }}
      >
        <Grid2 size={4}>
          <CustomDatePicker
            label="Jahr"
            value={year}
            onChange={setYear}
            ref={yearInputRef}
            required={true}
            yearOnly={true}
          />
        </Grid2>
      </Grid2>

      <CustomTable leftSpacing="small">
        <thead>
          <tr>
            <th>Feiertag</th>
            <th>Beginn</th>
            <th>Ende</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {holidayEntryInputs.map((holidayEntry, entryIndex) => (
            <HolidayEntryItem
              key={holidayEntry.id}
              setHolidayEntryInputs={setHolidayEntryInputs}
              holidayEntry={holidayEntry}
              entryIndex={entryIndex}
            />
          ))}
          <tr>
            <td colSpan={99} style={{ textAlign: "center" }}>
              <CustomButton
                text="Feiertag hinzufügen"
                onClick={addNewHolidayEntryHandler}
                size="small"
                color="green"
              />
            </td>
          </tr>
        </tbody>
      </CustomTable>
    </BoxHeadlineContainer>
  );
};

export default React.forwardRef(HolidayFormComponent);
