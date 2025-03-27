import React, { useImperativeHandle, useRef } from "react";
import { Grid2 } from "@mui/material";
import { useLayoutContext } from "hooks";
import {
  CreateTariffClassInput,
  FieldHandles,
  TariffClass,
  TariffClassFormHandles,
} from "types";
import { CustomSwitch, Editor, Spacing, TextInputField } from "core";
import useTariffClassForm from "../useTariffClassForm";
import utils from "utils";

type TariffClassFormProps = {
  formIntent: "create" | "edit";
  tariffClass: TariffClass | null | undefined;
};

const TariffClassFormComponent: React.ForwardRefRenderFunction<
  TariffClassFormHandles,
  TariffClassFormProps
> = ({ formIntent, tariffClass }, tariffClassFormRef) => {
  const { notify } = useLayoutContext();

  const {
    isActive,
    setIsActive,
    kuerzel,
    setKuerzel,
    bezeichnung,
    setBezeichnung,
    taetigkeitsbeschreibung,
    setTaetigkeitsbeschreibung,
    qualifikation,
    setQualifikation,
    anmerkungen,
    setAnmerkungen,
    resetTariffClassForm,
  } = useTariffClassForm(formIntent, tariffClass);

  const kuerzelInputRef = useRef<FieldHandles>(null);
  const bezeichnungInputRef = useRef<FieldHandles>(null);
  const taetigkeitsbeschreibungInputRef = useRef<FieldHandles>(null);
  const qualifikationInputRef = useRef<FieldHandles>(null);

  useImperativeHandle(tariffClassFormRef, () => ({
    validateTariffClassForm: () => {
      if (kuerzel.trim() === "") {
        notify("Bitte gib ein Kürzel ein!");
        kuerzelInputRef.current?.highlight();
        return null;
      }

      if (bezeichnung.trim() === "") {
        notify("Bitte gib eine Bezeichnung ein!");
        bezeichnungInputRef.current?.highlight();
        return null;
      }

      if (utils.wysiwyg.isEditorEmpty(taetigkeitsbeschreibung)) {
        notify("Bitte gib eine Tätigkeitsbeschreibung ein!");
        taetigkeitsbeschreibungInputRef.current?.highlight();
        return null;
      }

      if (utils.wysiwyg.isEditorEmpty(qualifikation)) {
        notify("Bitte gib eine Qualifikation ein!");
        qualifikationInputRef.current?.highlight();
        return null;
      }

      const tariffClassFormInput: CreateTariffClassInput = {
        isActive: isActive,
        kuerzel: kuerzel.trim(),
        bezeichnung: bezeichnung.trim(),
        taetigkeitsbeschreibung: utils.wysiwyg.getStringFromEditorState(
          taetigkeitsbeschreibung,
        ),
        qualifikation: utils.wysiwyg.getStringFromEditorState(qualifikation),
        anmerkungen: utils.wysiwyg.getStringFromEditorState(anmerkungen),
      };

      return tariffClassFormInput;
    },
    resetTariffClassForm: () => {
      resetTariffClassForm();
    },
  }));

  return (
    <>
      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={4}>
          <TextInputField
            label="Kürzel"
            value={kuerzel}
            onChange={(e) => setKuerzel(e.target.value)}
            ref={kuerzelInputRef}
            validate={(value) => value.trim() !== ""}
            required={true}
          />
        </Grid2>

        <Grid2 size={4}>
          <TextInputField
            label="Bezeichnung"
            value={bezeichnung}
            onChange={(e) => setBezeichnung(e.target.value)}
            ref={bezeichnungInputRef}
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
        <Grid2 size={6}>
          <Editor
            label="Tätigkeitsbeschreibung"
            setEditor={setTaetigkeitsbeschreibung}
            initialValue={tariffClass?.taetigkeitsbeschreibung}
            editorRef={taetigkeitsbeschreibungInputRef}
            showDetailFirst={false}
            required={true}
          />
        </Grid2>
        <Grid2 size={6}>
          <Editor
            label="Qualifikation"
            setEditor={setQualifikation}
            initialValue={tariffClass?.qualifikation}
            editorRef={qualifikationInputRef}
            showDetailFirst={false}
            required={true}
          />
        </Grid2>
      </Grid2>

      <Spacing height={33} />

      <Grid2 container direction="row" spacing={5}>
        <Grid2 size={6}>
          <Editor
            label="Anmerkungen"
            setEditor={setAnmerkungen}
            initialValue={tariffClass?.anmerkungen}
          />
        </Grid2>
      </Grid2>
    </>
  );
};

export default React.forwardRef(TariffClassFormComponent);
