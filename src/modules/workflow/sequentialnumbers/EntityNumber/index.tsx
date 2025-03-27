"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { Grid, IconButton, Typography } from "@mui/material"
import { useLayoutContext } from "hooks"
import { PenEditIcon } from "icons"
import { nanoid } from "nanoid"
import { CustomFormLabelProps, FieldHandles } from "types"
import { CustomDialog, CustomFormLabel, Loading, TextInputField } from "core"
import { EntityType, getEntityNumberClass, getEntityNumberTitle, getFreeEntityNumber } from "modules/workflow/sequentialnumbers"
import useStyles from "./styles"

interface EntityNumberProps extends CustomFormLabelProps {
    entityType: EntityType
    entityPrefix: string
    entityNumber: string
    setEntityNumber: (value: React.SetStateAction<string>) => void
    formIntent: "create" | "edit"
    occupiedNumbers?: string[]
}

const EntityNumberComponent: React.FC<EntityNumberProps> = ({
    entityType,
    entityPrefix,
    entityNumber,
    setEntityNumber,
    formIntent,
    occupiedNumbers,

    // CustomFormLabelProps
    info,
    infoContent,
    infoTitle,
    description,
    id = nanoid(5),
    showRequiredSymbol,
    nodeBefore,
    nodeAfter,
}) => {
    const { classes } = useStyles()
    const { notify } = useLayoutContext()

    const [suggestedEntityNumber, setSuggestedEntityNumber] = useState<string>("")
    const [currentEntityNumber, setCurrentEntityNumber] = useState<string>("")
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
    const [isLoadingFreeEntityNumber, setIsLoadingFreeEntityNumber] = useState<boolean>(true)
    const [isLoadingCustomFreeEntityNumber, setIsLoadingCustomFreeEntityNumber] = useState<boolean>(false)
    const [inputStatus, setInputStatus] = useState<"success" | "error" | "default">("default")

    const currentEntityNumberInputRef = useRef<FieldHandles>(null)

    const initEntityNumber = useCallback(async () => {
        if (formIntent === "edit") {
            setSuggestedEntityNumber(entityNumber)
            setCurrentEntityNumber(entityNumber)
            setIsLoadingFreeEntityNumber(false)
            return
        }

        if (entityPrefix === "") {
            return
        }

        setIsLoadingFreeEntityNumber(true)

        console.log("occupiedNumbers: ", occupiedNumbers)
        console.log("entityType: ", entityType)
        console.log("entityPrefix: ", entityPrefix)

        const freeEntityNumber = await getFreeEntityNumber(entityType, entityPrefix, occupiedNumbers)

        console.log("freeEntityNumber: ", freeEntityNumber)

        setEntityNumber(freeEntityNumber)
        setCurrentEntityNumber(freeEntityNumber)
        setSuggestedEntityNumber(freeEntityNumber)

        setIsLoadingFreeEntityNumber(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [occupiedNumbers, entityPrefix, entityType])

    useEffect(() => {
        initEntityNumber()
    }, [initEntityNumber])

    const entityNumberTitle = getEntityNumberTitle(entityType)

    const submitCustomFreeEntityNumber = async () => {
        if (currentEntityNumber.trim() === "") {
            notify("Bitte gib die " + entityNumberTitle + " ein!")
            setInputStatus("error")
            currentEntityNumberInputRef.current?.highlight(false)
            return
        }

        setIsLoadingCustomFreeEntityNumber(true)

        const entityNumberClass = getEntityNumberClass(entityType)

        const entityNumberIsFree = await entityNumberClass.isEntityNumberFree(currentEntityNumber.trim())

        if (!entityNumberIsFree) {
            notify("Eine " + entityNumberTitle + " mit dieser Nummer existiert bereits. Bitte gib eine andere Nummer ein!")
            setInputStatus("error")
            currentEntityNumberInputRef.current?.highlight(false)
            setIsLoadingCustomFreeEntityNumber(false)
            return
        }

        setEntityNumber(currentEntityNumber.trim())

        setIsLoadingCustomFreeEntityNumber(false)
        setEditDialogOpen(false)
    }

    return (
        <>
            <CustomFormLabel
                info={info}
                infoContent={infoContent}
                infoTitle={infoTitle}
                label={entityNumberTitle}
                description={description}
                id={id}
                showRequiredSymbol={showRequiredSymbol}
                nodeBefore={nodeBefore}
                nodeAfter={nodeAfter}
                errorLabel={inputStatus === "error"}
            />
            {isLoadingFreeEntityNumber ? (
                <Loading size="25px" align="left" style={{ margin: 0 }} description={entityNumberTitle + " wird generiert..."} />
            ) : (
                <Grid container direction="row">
                    <Grid item>
                        <Typography fontWeight={500}>{entityNumber}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton onClick={() => setEditDialogOpen(true)} className={classes.editButton}>
                            <PenEditIcon className={classes.editIcon} />
                        </IconButton>
                    </Grid>
                </Grid>
            )}

            <CustomDialog
                confirmText="Speichern"
                dialogOpen={editDialogOpen}
                titleText={entityNumberTitle + " bearbeiten"}
                setDialogOpen={setEditDialogOpen}
                confirmAction={() => submitCustomFreeEntityNumber()}
                showConfirm={true}
                showDecline={true}
                confirmButtonLoading={isLoadingCustomFreeEntityNumber}
                declineAction={() => {
                    setInputStatus("default")
                    setEditDialogOpen(false)
                }}
            >
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Typography className={classes.description}>
                            {(formIntent === "edit" ? "Vorherige" : "Vorgeschlagene") + " fortlaufende Nummer:"}
                            <br />
                            <strong>{suggestedEntityNumber}</strong>
                        </Typography>
                    </Grid>

                    <Grid item>
                        <TextInputField
                            label={entityNumberTitle}
                            value={currentEntityNumber}
                            onChange={(e) => setCurrentEntityNumber(e.target.value)}
                            ref={currentEntityNumberInputRef}
                            validate={(value) => value.trim() !== ""}
                            autoFocus={true}
                            required={true}
                        />
                    </Grid>
                </Grid>
            </CustomDialog>
        </>
    )
}

export default React.memo(EntityNumberComponent)
