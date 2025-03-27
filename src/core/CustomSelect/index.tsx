"use client"

import React, { useEffect, useImperativeHandle, useRef, useState } from "react"
import { useMediaQuery, useTheme } from "@mui/material"
import { nanoid } from "nanoid"
import { animateScroll } from "react-scroll"
import Select, { GroupBase, PlaceholderProps, SelectInstance, SingleValueProps, StylesConfig, components } from "react-select"
import { CustomSelectOptionProps, FieldHandles, SelectOption } from "@/types"
import CustomFormLabel from "../CustomFormLabel"
import styles from "./styles.module.css"
import { clsx } from "clsx"

interface GroupedOption<DataType> {
    label: string
    options: DataType[]
}

interface CustomSelectProps<DataType> extends CustomSelectOptionProps<DataType> {
    value: DataType | null
    options: DataType[] | SelectOption[] | GroupedOption<DataType>[]
    onChange: (value: DataType) => void
    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>
}

const CustomSelectComponent: <DataType>(
    p: CustomSelectProps<DataType>,
    ref: React.ForwardedRef<FieldHandles>
) => React.ReactElement<CustomSelectProps<DataType>> = (
    {
        placeholder,
        value,
        options,
        onChange,
        onKeyDown,
        getOptionValue,
        getOptionLabel,
        isOptionDisabled,
        isOptionSelected,
        addNewText,
        addNewLabelKey,
        addNewClickHandler,
        className,
        classNameRoot,
        minWidth,
        maxWidth,
        isDisabled = false,
        isClearable = false,
        required = false,
        autoFocus = false,
        useInPortal = true,
        isSearchable = true,
        selectStyle = "default",

        // CustomFormLabelProps
        info,
        infoContent,
        infoTitle,
        label,
        description,
        id = nanoid(),
        showRequiredSymbol,
        nodeBefore,
        nodeAfter,
    },
    customSelectRef
) => {
    const theme = useTheme()
    const mediaQuerySMUp = useMediaQuery(theme.breakpoints.up(theme.breakpoints.values.sm))

    const valueRef = useRef<HTMLElement>(null)
    const placeholderRef = useRef<HTMLElement>(null)

    const [inputStatus, setInputStatus] = useState<"success" | "error" | "default">("default")

    const inputRef = useRef<SelectInstance<any, false, GroupBase<any>>>(null)
    const selectRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(customSelectRef, () => ({
        highlight: (scroll = true) => {
            setInputStatus("error")
            if (scroll) {
                if (selectRef.current) {
                    const scrollTop = selectRef.current.getBoundingClientRect().top + window.scrollY - 150
                    animateScroll.scrollTo(scrollTop)
                }
            }
            inputRef.current?.focus()
        },
    }))

    const selectStyleConfig: StylesConfig<any, false> =
        selectStyle === "default"
            ? {
                  container: (base) => ({
                      ...base,
                      "&:hover": {
                          borderColor: "#3da894 !important",
                      },
                      borderColor: inputStatus === "error" ? "#ddafaf" : inputStatus === "success" ? "#b2d6be" : "#a9bebb",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderRadius: "4px",
                      boxShadow:
                          inputStatus === "error"
                              ? "0 1px 2px 0px rgba(191, 29, 29, 0.21)"
                              : inputStatus === "success"
                                ? "0 1px 2px 0px rgba(21, 183, 70, 0.21)"
                                : "0 1px 2px 0px rgba(0, 0, 0, 0.08)",
                      display: "inline-block",
                      minWidth: minWidth ?? "unset",
                  }),
                  control: (base) => ({
                      ...base,
                      border: 0,
                      // This line disable the blue border
                      boxShadow: "none",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                  }),
                  menu: (provided) => ({
                      ...provided,
                      marginTop: 5,
                      border: "1px solid #a9bebb",
                      boxShadow: "none",
                      width: "max-content",
                      minWidth: "100%",
                  }),
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected ? theme.palette.primary : state.isFocused ? "#fafafc" : "none",
                      color: "#333333",
                      padding: 7,
                      textAlign: "left",
                      whiteSpace: "nowrap",
                  }),
                  dropdownIndicator: (provided, state) => ({
                      ...provided,
                      transition: "all .2s ease",
                      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "",
                      "& svg": {
                          width: 20,
                          height: 20,
                      },
                      padding: "8px 10px",
                  }),
                  indicatorSeparator: (provided) => ({ ...provided, width: 0 }),
                  // placeholder: (provided) => ({
                  //   ...provided,
                  // }),
                  // valueContainer: (provided) => ({
                  //   ...provided,
                  // }),
                  singleValue: (provided) => ({
                      ...provided,
                      position: "relative",
                      marginTop: -2,
                  }),
              }
            : selectStyle === "clean"
              ? {
                    container: (base) => ({
                        ...base,
                        "&:hover": {
                            borderColor: "#3da894 !important",
                        },
                        borderColor: inputStatus === "error" ? "#ddafaf" : inputStatus === "success" ? "#b2d6be" : "#e0e0e0",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: "50px",
                        display: "inline-block",
                        minWidth: minWidth ?? "unset",
                    }),
                    control: (base) => ({
                        ...base,
                        border: 0,
                        // This line disable the blue border
                        boxShadow: "none",
                        backgroundColor: "#fff",
                        "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.02)",
                        },
                        cursor: "pointer",
                        display: "flex",
                        borderRadius: "50px",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                    }),
                    menu: (provided) => ({
                        ...provided,
                        marginTop: 5,
                        border: "1px solid #e0e0e0",
                        borderRadius: 4,
                        boxShadow: "none",
                    }),
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? theme.palette.primary : state.isFocused ? "#fafafc" : "none",
                        color: "#333333",
                        padding: 7,
                        textAlign: "left",
                        whiteSpace: "nowrap",
                    }),
                    dropdownIndicator: (provided, state) => ({
                        ...provided,
                        transition: "all .2s ease",
                        transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "",
                        color: state.selectProps.menuIsOpen ? "#D10A11" : "hsl(0, 0%, 80%)",
                        "&:hover": {
                            color: "#D10A11",
                        },
                        "& svg": {
                            width: 20,
                            height: 20,
                        },
                        padding: "8px 10px",
                    }),
                    indicatorSeparator: (provided) => ({ ...provided, width: 0 }),
                    // placeholder: (provided) => ({
                    //   ...provided,
                    // }),
                    // valueContainer: (provided) => ({
                    //   ...provided,
                    // }),
                    singleValue: (provided) => ({
                        ...provided,
                        position: "relative",
                    }),
                }
              : selectStyle === "solid"
                ? {
                      container: (base) => ({
                          ...base,
                          // border: "1px solid #e0e0e0",
                          // borderRadius: "4px",
                          // boxShadow: "0 1px 2px 0px rgba(0, 0, 0, 0.08)",
                          display: "inline-block",
                          minWidth: minWidth ?? "unset",
                      }),
                      control: (base) => ({
                          ...base,
                          border: 0,
                          // This line disable the blue border
                          boxShadow: "none",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                      }),
                      menu: (provided) => ({
                          ...provided,
                          marginTop: -3,
                          border: "1px solid #e0e0e0",
                          borderRadius: 4,
                          boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.08)",
                          background: "#fff",
                          zIndex: 999,
                          left: "auto",
                          right: "-1px",
                          paddingTop: 10,
                      }),
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      menuList: (provided) => ({
                          ...provided,
                          margin: "0 4px 8px 0",
                          padding: "0 4px 0 8px",
                      }),
                      option: (provided, state) => ({
                          ...provided,
                          backgroundColor: "none",
                          color: state.isSelected ? "#f91942" : state.isFocused ? "#f91942" : "#333333",
                          cursor: "pointer",
                          padding: "9px 10px",
                          lineHeight: "15px",
                          transition: "0.3s",
                          textAlign: "left",
                      }),
                      dropdownIndicator: (provided, state) => ({
                          ...provided,
                          transition: "all .2s ease",
                          transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "",
                          "& svg": {
                              width: 18,
                              height: 18,
                          },
                          color: "#f91942",
                          "&:hover": {
                              color: "#f91942",
                          },
                          padding: "8px 0 8px 0",
                      }),
                      indicatorSeparator: (provided) => ({ ...provided, width: 0 }),
                      // placeholder: (provided) => ({
                      //   ...provided,
                      // }),
                      singleValue: (provided) => ({
                          ...provided,
                          position: "relative",
                      }),
                  }
                : {
                      container: (base) => ({
                          ...base,
                          border: "1px solid #dde6e8",
                          borderRadius: 0,
                          display: "inline-block",
                          minWidth: minWidth ?? "unset",
                      }),
                      control: (base) => ({
                          ...base,
                          border: 0,
                          // This line disable the blue border
                          boxShadow: "none",
                          cursor: "pointer",
                          backgroundColor: "#f2f7f7",
                      }),
                      menu: (provided) => ({
                          ...provided,
                          // border: "1px solid #e0e0e0",
                          // borderTop: 0,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderBottomLeftRadius: 4,
                          borderBottomRightRadius: 4,
                          marginTop: -3,
                          borderTop: 0,
                          borderLeft: "1px solid #e0e0e0",
                          borderRight: "1px solid #e0e0e0",
                          borderBottom: "1px solid #e0e0e0",
                          boxShadow: "none",
                      }),
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isSelected ? "#f2f9fa" : state.isFocused ? "#fafafc" : "none",
                          color: "#333333",
                          padding: 7,
                          textAlign: "left",
                      }),
                      dropdownIndicator: (provided) => ({
                          ...provided,
                          padding: 8,
                          paddingTop: 11,
                          paddingBottom: 11,
                          color: "#7ea0a8",
                      }),
                      indicatorSeparator: (provided) => ({ ...provided, width: 0 }),
                      valueContainer: (provided) => ({
                          ...provided,
                          padding: "2px 2px 2px 12px",
                      }),
                      singleValue: () => ({
                          color: "#7ea0a8",
                      }),
                  }

    useEffect(() => {}, [options])

    const SingleValue = (props: SingleValueProps<any, false, GroupBase<any>>) => (
        <components.SingleValue {...props}>
            <span className={styles.optionValue} ref={valueRef}>
                {props.children}
            </span>
        </components.SingleValue>
    )

    const Placeholder = (props: PlaceholderProps<any, false>) => (
        <components.Placeholder {...props}>
            <span className={styles.placeholder} ref={placeholderRef}>
                {props.children}
            </span>
        </components.Placeholder>
    )

    const onChangeHandler = (value: any) => {
        if (value && (value.id === "addNew" || value.value === "addNew") && addNewClickHandler) {
            addNewClickHandler()
        } else {
            onChange(value)
        }
        if (required) {
            if (value !== null) {
                setInputStatus("success")
            } else {
                setInputStatus("error")
            }
        }
    }

    return (
        <div
            style={{
                maxWidth: maxWidth ?? "unset",
                // minWidth: minWidth ?? "unset",
            }}
            className={clsx(classNameRoot)}
            ref={selectRef}
        >
            <CustomFormLabel
                info={info}
                infoContent={infoContent}
                infoTitle={infoTitle}
                label={label}
                description={description}
                id={id}
                showRequiredSymbol={required && showRequiredSymbol}
                nodeBefore={nodeBefore}
                nodeAfter={nodeAfter}
                errorLabel={inputStatus === "error"}
            />

            <Select<any | SelectOption>
                autoFocus={autoFocus}
                openMenuOnFocus={true}
                id={id}
                value={value}
                placeholder={placeholder}
                styles={selectStyleConfig}
                options={
                    addNewText && addNewLabelKey ? [...options, { id: "addNew", value: "addNew", [addNewLabelKey]: addNewText }] : options
                }
                onChange={onChangeHandler}
                onKeyDown={onKeyDown}
                components={{ SingleValue, Placeholder }}
                className={className}
                isSearchable={isSearchable && mediaQuerySMUp}
                isDisabled={isDisabled}
                isClearable={isClearable}
                getOptionValue={getOptionValue}
                getOptionLabel={getOptionLabel}
                isOptionDisabled={isOptionDisabled}
                isOptionSelected={(option, selectValue) =>
                    isOptionSelected
                        ? isOptionSelected(option, selectValue)
                        : value !== null &&
                          value !== undefined &&
                          typeof value === "object" &&
                          ("id" in value ? (option as any).id === (value as any).id : (option as any).value === (value as any).value)
                }
                ref={inputRef}
                tabSelectsValue={false}
                menuPortalTarget={useInPortal ? document.body : undefined}
            />
        </div>
    )
}

export default React.forwardRef(CustomSelectComponent)
