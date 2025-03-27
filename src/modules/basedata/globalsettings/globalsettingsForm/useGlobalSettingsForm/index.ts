"use client"

import { useEffect, useState } from "react"
import { GlobalSettings } from "types"

const useGlobalSettingsForm = (globalSettings: GlobalSettings) => {
    const [currentVersion, setCurrentVersion] = useState<string>("")
    const [versicherungssumme, setVersicherungssumme] = useState<number | "">("")

    useEffect(() => {
        setCurrentVersion(globalSettings.currentVersion)
        setVersicherungssumme(globalSettings.versicherungssumme)
    }, [globalSettings])

    return {
        currentVersion,
        setCurrentVersion,
        versicherungssumme,
        setVersicherungssumme,
    }
}

export default useGlobalSettingsForm
