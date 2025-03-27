import { createRef, useCallback, useEffect, useState } from "react";
import { getHolidays } from "feiertagejs";
import { FieldHandles, Holiday, HolidayEntryInput } from "types";
import { getUUID } from "utils/identify";
import utils from "utils";

const useHolidayForm = (
  formIntent: "create" | "edit",
  yearHoliday: Holiday | null | undefined,
  holidayList: Holiday[],
) => {
  const [year, setYear] = useState<Date | null>(null);

  const [holidayEntryInputs, setHolidayEntryInputs] = useState<
    HolidayEntryInput[]
  >([]);

  const resetHolidayForm = () => {
    localStorage.removeItem("holiday_year");
    localStorage.removeItem("holiday_holidayEntryInputs");
  };

  const initiateHolidayListForYear = useCallback(async (inputYear: number) => {
    const holidaysOfLatestYear = getHolidays(inputYear, "BE");

    const holidayEntryInputList: HolidayEntryInput[] = holidaysOfLatestYear.map(
      (holiday) => {
        const title = holiday.translate("de");
        const datum = holiday.date;
        const uhrzeitVon = new Date(datum);
        uhrzeitVon.setHours(0, 0, 0, 0);
        const uhrzeitBis = new Date(
          datum.getFullYear(),
          datum.getMonth(),
          datum.getDate() + 1,
        );
        uhrzeitBis.setHours(0, 0, 0, 0);

        const holidayEntryInput: HolidayEntryInput = {
          id: getUUID(),
          title: title,
          titleInputRef: createRef<FieldHandles>(),
          beginn: uhrzeitVon,
          beginnInputRef: createRef<FieldHandles>(),
          ende: uhrzeitBis,
          endeInputRef: createRef<FieldHandles>(),
          deleteHolidayEntryButtonRef: createRef<FieldHandles>(),
        };

        return holidayEntryInput;
      },
    );

    const heiligabendInput: HolidayEntryInput = {
      id: getUUID(),
      title: "Heiligabend",
      titleInputRef: createRef<FieldHandles>(),
      beginn: new Date(inputYear, 11, 24, 15, 0, 0, 0),
      beginnInputRef: createRef<FieldHandles>(),
      ende: new Date(inputYear, 11, 25, 0, 0, 0, 0),
      endeInputRef: createRef<FieldHandles>(),
      deleteHolidayEntryButtonRef: createRef<FieldHandles>(),
    };

    const silvesterInput: HolidayEntryInput = {
      id: getUUID(),
      title: "Silvester",
      titleInputRef: createRef<FieldHandles>(),
      beginn: new Date(inputYear, 11, 31, 15, 0, 0, 0),
      beginnInputRef: createRef<FieldHandles>(),
      ende: new Date(inputYear + 1, 0, 1, 0, 0, 0, 0),
      endeInputRef: createRef<FieldHandles>(),
      deleteHolidayEntryButtonRef: createRef<FieldHandles>(),
    };

    holidayEntryInputList.push(heiligabendInput);
    holidayEntryInputList.push(silvesterInput);

    const holidayEntryInputListSorted = holidayEntryInputList.sort((a, b) => {
      if (a.beginn && b.beginn) {
        return a.beginn.getTime() - b.beginn.getTime();
      }

      return 0;
    });

    console.log("holidaysOfLatestYear", holidaysOfLatestYear);
    console.log("holidayEntryInputListSorted", holidayEntryInputListSorted);

    setHolidayEntryInputs(holidayEntryInputListSorted);
  }, []);

  useEffect(() => {
    if (!year) return;

    initiateHolidayListForYear(year.getFullYear());
  }, [year, initiateHolidayListForYear]);

  useEffect(() => {
    if (yearHoliday || year) {
      return;
    }

    const latestHoliday = holidayList.reduce(
      (prev, current) =>
        prev > parseInt(current.year) ? prev : parseInt(current.year),
      new Date().getFullYear() - 1,
    );
    const latestYear = latestHoliday + 1;

    setYear(new Date(latestYear, 0, 1));
  }, [holidayList, year, yearHoliday]);

  const loadExistingYearHoliday = useCallback(
    async (existingYearHoliday: Holiday) => {
      const holidayEntryInputList: HolidayEntryInput[] =
        existingYearHoliday.holidays.map((holiday) => {
          const holidayEntryInput: HolidayEntryInput = {
            id: getUUID(),
            title: holiday.title,
            titleInputRef: createRef<FieldHandles>(),
            beginn: utils.dates.getDateFromAWSDateTimeFormat(holiday.beginn),
            beginnInputRef: createRef<FieldHandles>(),
            ende: utils.dates.getDateFromAWSDateTimeFormat(holiday.ende),
            endeInputRef: createRef<FieldHandles>(),
            deleteHolidayEntryButtonRef: createRef<FieldHandles>(),
          };

          return holidayEntryInput;
        });

      setHolidayEntryInputs(holidayEntryInputList);
      const holidaysYearDate = new Date(
        parseInt(existingYearHoliday.year),
        0,
        1,
      );
      setYear(holidaysYearDate);
    },
    [],
  );

  useEffect(() => {
    if (formIntent === "create" || !yearHoliday) {
      return;
    }

    loadExistingYearHoliday(yearHoliday);
  }, [formIntent, yearHoliday, loadExistingYearHoliday]);

  const addNewHolidayEntryHandler = () => {
    const holidayEntryInput: HolidayEntryInput = {
      id: getUUID(),
      title: "",
      titleInputRef: createRef<FieldHandles>(),
      beginn: null,
      beginnInputRef: createRef<FieldHandles>(),
      ende: null,
      endeInputRef: createRef<FieldHandles>(),
      deleteHolidayEntryButtonRef: createRef<FieldHandles>(),
    };

    setHolidayEntryInputs((prev) => [...prev, holidayEntryInput]);
  };

  return {
    year,
    setYear,
    holidayEntryInputs,
    setHolidayEntryInputs,
    addNewHolidayEntryHandler,
    resetHolidayForm,
  };
};

export default useHolidayForm;
