import React from "react";
import { HolidayEntryInput } from "types";
import { CustomDateTimePicker, TextInputField } from "core";
import { DeleteButton, RowActions } from "components";

type HolidayEntryItemProps = {
  setHolidayEntryInputs: React.Dispatch<
    React.SetStateAction<HolidayEntryInput[]>
  >;
  holidayEntry: HolidayEntryInput;
  entryIndex: number;
};

const HolidayEntryItem: React.FC<HolidayEntryItemProps> = ({
  setHolidayEntryInputs,
  holidayEntry,
  entryIndex,
}) => (
  <tr>
    <td>
      <TextInputField
        value={holidayEntry.title}
        onChange={(e) =>
          setHolidayEntryInputs((prev) =>
            prev.map((holidayEntryItem) =>
              holidayEntryItem.id === holidayEntry.id
                ? {
                    ...holidayEntryItem,
                    title: e.target.value,
                  }
                : holidayEntryItem,
            ),
          )
        }
        ref={holidayEntry.titleInputRef}
        validate={(value) => value.trim() !== ""}
        required={true}
      />
    </td>
    <td>
      <CustomDateTimePicker
        value={holidayEntry.beginn}
        onChange={(date) => {
          setHolidayEntryInputs((prev) =>
            prev.map((holidayEntryItem) =>
              holidayEntryItem.id === holidayEntry.id
                ? {
                    ...holidayEntryItem,
                    beginn: date,
                  }
                : holidayEntryItem,
            ),
          );
        }}
        ref={holidayEntry.beginnInputRef}
      />
    </td>
    <td>
      <CustomDateTimePicker
        value={holidayEntry.ende}
        onChange={(date) => {
          setHolidayEntryInputs((prev) =>
            prev.map((holidayEntryItem) =>
              holidayEntryItem.id === holidayEntry.id
                ? {
                    ...holidayEntryItem,
                    ende: date,
                  }
                : holidayEntryItem,
            ),
          );
        }}
        ref={holidayEntry.endeInputRef}
      />
    </td>
    <td>
      <RowActions>
        {entryIndex !== 0 && (
          <DeleteButton
            onClick={() =>
              setHolidayEntryInputs((prev) =>
                prev.filter(
                  (holidayEntryItem) => holidayEntryItem.id !== holidayEntry.id,
                ),
              )
            }
          />
        )}
      </RowActions>
    </td>
  </tr>
);

export default HolidayEntryItem;
