import { useEffect, useState } from "react";
import { usePersistedState } from "hooks";
import { LexicalEditor, createEditor } from "lexical";
import { StaffType, TariffClass } from "types";

const useStaffTypeForm = (
  formIntent: "create" | "edit",
  staffType: StaffType | null | undefined,
) => {
  const [isActive, setIsActive] = usePersistedState<boolean>(
    "staffType_isActive",
    true,
    formIntent,
  );

  const [tariffClass, setTariffClass] = usePersistedState<
    TariffClass | StaffType["tariffClass"] | null
  >("staffType_tariffClass", null, formIntent);

  const [name, setName] = usePersistedState<string>(
    "staffType_name",
    "",
    formIntent,
  );

  const [anmerkungen, setAnmerkungen] = useState<LexicalEditor>(createEditor());

  const resetStaffTypeForm = () => {
    localStorage.removeItem("staffType_isActive");
    localStorage.removeItem("staffType_tariffClass");
    localStorage.removeItem("staffType_name");
    localStorage.removeItem("staffType_veranstaltungsort");
  };

  useEffect(() => {
    if (!staffType) {
      return;
    }

    setIsActive(staffType.isActive);

    setTariffClass(staffType.tariffClass);

    setName(staffType.name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffType]);

  return {
    isActive,
    setIsActive,
    tariffClass,
    setTariffClass,
    name,
    setName,
    anmerkungen,
    setAnmerkungen,
    resetStaffTypeForm,
  };
};

export default useStaffTypeForm;
