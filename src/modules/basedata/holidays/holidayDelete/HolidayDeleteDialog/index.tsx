"use client"

import React, { useState } from "react"
import { useHolidayDelete, useHolidayRoutes } from "hooks"
import { Holiday } from "types"
import { DeleteDialog } from "components"

type HolidayDeleteDialogProps = {
    dialogOpen: boolean
    setDialogOpen: (value: React.SetStateAction<boolean>) => void
    holiday: Holiday | undefined
}

const HolidayDeleteDialog: React.FC<HolidayDeleteDialogProps> = ({ holiday, dialogOpen, setDialogOpen }) => {
    const deleteHolidayMutation = useHolidayDelete()
    const { navigateToHolidayListPage } = useHolidayRoutes()

    const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

    if (!dialogOpen || holiday === undefined) {
        return null
    }

    const deleteHolidayRequest = async () => {
        setDeleteLoading(true)

        const deletedHoliday = await deleteHolidayMutation.mutateAsync(holiday)

        console.log("deletedHoliday: ", deletedHoliday)
        setDeleteLoading(false)
        setDialogOpen(false)

        navigateToHolidayListPage()
    }

    return (
        <DeleteDialog
            deleteLoading={deleteLoading}
            deleteRequest={deleteHolidayRequest}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            dialogTitle="Feiertags-Jahr Löschen"
            itemName={holiday.year}
            itemDeleteDescription="das Feiertags-Jahr"
        />
    )
}

export default HolidayDeleteDialog
