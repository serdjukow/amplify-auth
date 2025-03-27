"use client"

import React, { useState } from "react"
import { IconButton, Popover, Typography } from "@mui/material"
import { InfoRoundIcon } from "icons"
import { CustomFormLabelProps } from "types"
import CustomDialog from "../CustomDialog"
import useStyles from "./styles"

const CustomFormLabel: React.FC<CustomFormLabelProps> = ({
    info = false,
    infoContent,
    infoTitle,
    label,
    description,
    id,
    showRequiredSymbol = true,
    nodeBefore,
    nodeAfter,
    errorLabel = false,
}) => {
    const { classes, cx } = useStyles()
    const [infoDialogOpen, setInfoDialogOpen] = useState<boolean>(false)

    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<HTMLElement>()

    if (!label) {
        return null
    }

    return (
        <label className={cx(classes.textInputLabel, errorLabel && classes.inputErrorLabel)} htmlFor={id}>
            {nodeBefore}
            {label}
            {showRequiredSymbol && <span className={classes.requiredSymbol}>*</span>}
            {info && (
                <>
                    <CustomDialog
                        showConfirm={false}
                        showDecline={false}
                        dialogOpen={infoDialogOpen}
                        titleText={infoTitle}
                        confirmText={infoTitle}
                        setDialogOpen={setInfoDialogOpen}
                    >
                        {infoContent}
                    </CustomDialog>
                    <IconButton onClick={() => setInfoDialogOpen(true)} className={classes.infoButton}>
                        <InfoRoundIcon className={classes.infoIcon} />
                    </IconButton>
                </>
            )}
            {description && (
                <>
                    <Popover
                        open={popoverOpen}
                        anchorEl={anchorEl}
                        onClose={() => {
                            setPopoverOpen(false)
                            setAnchorEl(undefined)
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Typography className={classes.descriptionPopup}>{description}</Typography>
                    </Popover>
                    <IconButton
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget)
                            setPopoverOpen(true)
                        }}
                        className={classes.infoButton}
                    >
                        <InfoRoundIcon className={classes.infoIcon} />
                    </IconButton>
                </>
            )}

            {nodeAfter}
        </label>
    )
}

export default CustomFormLabel
