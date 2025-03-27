import { Variant } from "@mui/material/styles/createTypography";
import { GetOptionLabel, GetOptionValue, Options } from "react-select";
import { SelectOption } from "./General.types";

export type ButtonColor =
  | "blue"
  | "white"
  | "red"
  | "flatRed"
  | "yellow"
  | "grey"
  | "green"
  | "default";

export type ButtonSize = "xsmall" | "small" | "medium" | "large";

export type ButtonStyle = "filled" | "outlined";

export type FieldHandles = {
  highlight(scroll?: boolean): void;
};

export interface CustomFormLabelProps {
  info?: boolean;
  infoContent?: React.ReactNode;
  infoTitle?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  id?: string;
  showRequiredSymbol?: boolean;
  nodeBefore?: React.ReactNode;
  nodeAfter?: React.ReactNode;
  errorLabel?: boolean;
}

export interface CustomRadioButtonProps extends CustomFormLabelProps {
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (value: SelectOption) => void;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  row?: boolean;
  radioSize?: number;
  spaceBetween?: number;
}

export type CustomReactTableHandles<DataType> = {
  exportToExcel(): void;
  getSelectedRows(): DataType[];
};

export interface CustomSelectOptionProps<DataType>
  extends CustomFormLabelProps {
  placeholder?: React.ReactNode;
  getOptionValue?: GetOptionValue<DataType> | undefined;
  getOptionLabel?: GetOptionLabel<DataType> | undefined;
  isOptionDisabled?: (
    option: DataType,
    selectValue: Options<DataType>,
  ) => boolean;
  isOptionSelected?: (
    option: DataType,
    selectValue: Options<DataType>,
  ) => boolean;
  addNewText?: string;
  addNewLabelKey?: string;
  addNewClickHandler?: () => void;
  className?: string;
  classNameRoot?: string;
  minWidth?: number;
  maxWidth?: number;
  isDisabled?: boolean;
  isClearable?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  useInPortal?: boolean;
  isSearchable?: boolean;
  selectStyle?: "default" | "clean" | "solid" | "flat";
}

export interface AutoCompleteOptionProps<DataType>
  extends CustomFormLabelProps {
  getOptionLabel?: (option: DataType) => string;
  sort?: boolean;
  limitTags?: number;
  size?: "small" | "medium";
  rootClass?: string;
  placeholder?: string;
  required?: boolean;
  colorMode?: "dark" | "light";
}

export type NavigationParam = {
  name: string;
  value: string | null | undefined;
};

export interface TextInputFieldProps extends CustomFormLabelProps {
  className?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => void;
  type?: "text" | "password";
  maxWidth?: number;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  marginBottom?: boolean;
  validate?: (value: string) => boolean;
  tabIndex?: number;
  autoFocus?: boolean;
  required?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  unitAdornment?: string | React.ReactNode;
}

export interface TypographyProps {
  content: React.ReactNode;
  size?: "small" | "medium" | "big";
  color?:
    | "default"
    | "blue"
    | "white"
    | "red"
    | "orange"
    | "yellow"
    | "grey"
    | "green";
  accent?: "saturated" | "flat" | "pale";
  variant?: "inherit" | Variant | undefined;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}
