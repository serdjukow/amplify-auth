import React, { useImperativeHandle, useRef } from "react";
import { Grid2 } from "@mui/material";
import { useLayoutContext } from "hooks";
import { TariffClassOption } from "options";
import {
  CreateStaffTypeInput,
  FieldHandles,
  StaffType,
  StaffTypeFormHandles,
} from "types";
import { CustomSwitch, Editor, Spacing, TextInputField } from "core";
import useStaffTypeForm from "../useStaffTypeForm";
import utils from "utils";

type StaffTypeFormProps = {
  formIntent: "create" | "edit";
  staffType: StaffType | null | undefined;
};

const StaffTypeFormComponent: React.ForwardRefRenderFunction<
  StaffTypeFormHandles,
  StaffTypeFormProps
> = ({ formIntent, staffType }, staffTypeFormRef) => {
  const { notify } = useLayoutContext();

  const {
    isActive,
    setIsActive,
    tariffClass,
    setTariffClass,
    name,
    setName,
    anmerkungen,
    setAnmerkungen,
    resetStaffTypeForm,
  } = useStaffTypeForm(formIntent, staffType);

  const nameInputRef = useRef<FieldHandles>(null);
  const tariffClassInputRef = useRef<FieldHandles>(null);

  useImperativeHandle(staffTypeFormRef, () => ({
    validateStaffTypeForm: () => {
      if (name.trim() === "") {
        notify("Bitte gib ein Kürzel ein!");
        nameInputRef.current?.highlight();
        return null;
      }

      if (!tariffClass) {
        notify("Bitte wähle eine Tarifklasse aus!");
        tariffClassInputRef.current?.highlight();
        return null;
      }

      const staffTypeFormInput: CreateStaffTypeInput = {
        isActive: isActive,
        name: name.trim(),
        tariffClassID: tariffClass.id,
        anmerkungen: utils.wysiwyg.getStringFromEditorState(anmerkungen),
      };

      return staffTypeFormInput;
    },
    resetStaffTypeForm: () => {
      resetStaffTypeForm();
    },
  }));

  return (
    <>
      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <TextInputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={nameInputRef}
            validate={(value) => value.trim() !== ""}
            required={true}
          />
        </Grid2>

        <Grid2 size={4}>
          <CustomSwitch
            label="Aktiv"
            switchLabel={isActive ? "Ja" : "Nein"}
            name="isActive"
            checkedValue={isActive}
            onChange={(_e, checked) => setIsActive(checked)}
            required={true}
          />
        </Grid2>
      </Grid2>

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <TariffClassOption
            tariffClass={tariffClass}
            setTariffClass={setTariffClass}
            required={true}
            tariffClassInputRef={tariffClassInputRef}
          />
        </Grid2>
      </Grid2>

      <Spacing height={33} />

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={6}>
          <Editor
            label="Anmerkungen"
            setEditor={setAnmerkungen}
            initialValue={staffType?.anmerkungen}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default React.forwardRef(StaffTypeFormComponent);
