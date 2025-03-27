import { useEffect, useState } from "react";
import { usePersistedState } from "hooks";
import { LexicalEditor, createEditor } from "lexical";
import { TariffClass } from "types";

const useTariffClassForm = (
  formIntent: "create" | "edit",
  tariffClass: TariffClass | null | undefined,
) => {
  const [isActive, setIsActive] = usePersistedState<boolean>(
    "tariffClass_isActive",
    true,
    formIntent,
  );

  const [kuerzel, setKuerzel] = usePersistedState<string>(
    "tariffClass_kuerzel",
    "",
    formIntent,
  );

  const [bezeichnung, setBezeichnung] = usePersistedState<string>(
    "tariffClass_bezeichnung",
    "",
    formIntent,
  );

  const [taetigkeitsbeschreibung, setTaetigkeitsbeschreibung] =
    useState<LexicalEditor>(createEditor());
  const [qualifikation, setQualifikation] =
    useState<LexicalEditor>(createEditor());

  const [anmerkungen, setAnmerkungen] = useState<LexicalEditor>(createEditor());

  const resetTariffClassForm = () => {
    localStorage.removeItem("tariffClass_isActive");
    localStorage.removeItem("tariffClass_kuerzel");
    localStorage.removeItem("tariffClass_bezeichnung");
  };

  useEffect(() => {
    if (!tariffClass) {
      return;
    }

    setIsActive(tariffClass.isActive);

    setKuerzel(tariffClass.kuerzel);
    setBezeichnung(tariffClass.bezeichnung);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tariffClass]);

  return {
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
  };
};

export default useTariffClassForm;
