import React from "react";
import { SelectOption } from "@/types";
import { CustomSelect } from "@/core";

type UserRoleOptionProps = {
  userRole: SelectOption;
  setUserRole: (value: React.SetStateAction<SelectOption>) => void;
  label?: string;
};

const USER_GROUPS_OPTIONS = [
  {
    value: "Admin",
    label: "Admin",
  },
  {
    value: "production",
    label: "Produktionsleitung",
  },
  {
    value: "office",
    label: "Büro",
  },
  {
    value: "accounting",
    label: "Buchhaltung",
  },
  {
    value: "qualitymanagement",
    label: "QMB",
  },
  {
    value: "logistics",
    label: "Logistik",
  },
];

const UserRoleOption: React.FC<UserRoleOptionProps> = ({
  userRole = {
    label: "Büro",
    value: "office",
  },
  setUserRole,
  label,
}) => {
  return (
    <CustomSelect<SelectOption>
      label={label}
      options={USER_GROUPS_OPTIONS}
      onChange={(userRoleOption) => setUserRole(userRoleOption!)}
      value={userRole}
      selectStyle="clean"
    />
  );
};

export default UserRoleOption;
