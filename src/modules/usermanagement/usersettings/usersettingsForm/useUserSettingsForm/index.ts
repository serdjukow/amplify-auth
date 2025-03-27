"use client"

import { useEffect, useState } from "react"
import { useAuthContext } from "hooks"
import { S3Resource, Salutation, SelectOption, TableHeaderColor, TableSpacing, TableTheme, User } from "types"
import { PREFIXES_TYPE } from "utils/phone"
import utils from "utils"

const useUserSettingsForm = () => {
    const authContext = useAuthContext()

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [salutation, setSalutation] = useState<Salutation | null>(null)
    const [avatar, setAvatar] = useState<S3Resource | null>(null)
    const [phone, setPhone] = useState<string>("")
    const [phonePrefix, setPhonePrefix] = useState<PREFIXES_TYPE>({
        value: "Deutschland",
        prefix: "+49",
        label: "Deutschland +49",
    })
    const [fax, setFax] = useState<string>("")
    const [faxPrefix, setFaxPrefix] = useState<PREFIXES_TYPE>({
        value: "Deutschland",
        prefix: "+49",
        label: "Deutschland +49",
    })

    const [tableTheme, setTableTheme] = useState<TableTheme | null>(null)
    const [tableHeaderColor, setTableHeaderColor] = useState<TableHeaderColor | null>(null)
    const [tableSpacing, setTableSpacing] = useState<TableSpacing | null>(null)
    const [tableSticky, setTableSticky] = useState<boolean>(false)

    const [unitType, setUnitType] = useState<SelectOption>({
        value: "kg",
        label: "Kilogramm (kg)",
    })

    const [uploading, setUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(10)

    const loadUserAvatar = async (user: User) => {
        if (!user.avatar) {
            return
        }
        const imagePreview = await utils.images.getImage(user.avatar, 500, 500)

        console.log("imagePreview is: ", imagePreview)

        const userAvatar: S3Resource = {
            ...user.avatar,
            preview: imagePreview,
            fromDatabase: true,
        }

        setAvatar(userAvatar)
    }

    useEffect(() => {
        const user = authContext.userData

        if (!user) {
            return
        }

        setFirstName(user.firstName)
        setLastName(user.lastName)

        setSalutation(user.salutation ? (user.salutation as Salutation) : null)

        if (user.phone) {
            const { prefix, phoneNumber } = utils.phone.getPhoneAndPrefix(user.phone)

            setPhonePrefix(prefix)
            setPhone(phoneNumber)
        }

        if (user.fax) {
            const { prefix, phoneNumber } = utils.phone.getPhoneAndPrefix(user.fax)

            setFaxPrefix(prefix)
            setFax(phoneNumber)
        }

        setTableTheme(user.userSettings.tableTheme)
        setTableHeaderColor(user.userSettings.tableHeaderColor)
        setTableSpacing(user.userSettings.tableSpacing)
        setTableSticky(user.userSettings.tableSticky)

        const unitTypeOption = utils.constants.WEIGHT_OPTIONS.find(
            (unitTypeOptionItem) => unitTypeOptionItem.value === user.userSettings.unitType
        )
        if (unitTypeOption) {
            setUnitType(unitTypeOption)
        }

        loadUserAvatar(user)
    }, [authContext.userData])

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        salutation,
        setSalutation,
        avatar,
        setAvatar,
        phone,
        setPhone,
        phonePrefix,
        setPhonePrefix,
        fax,
        setFax,
        faxPrefix,
        setFaxPrefix,
        tableTheme,
        setTableTheme,
        tableHeaderColor,
        setTableHeaderColor,
        tableSpacing,
        setTableSpacing,
        tableSticky,
        setTableSticky,
        unitType,
        setUnitType,
        uploading,
        setUploading,
        uploadProgress,
        setUploadProgress,
    }
}

export default useUserSettingsForm
