"use client"

import { useEffect, useState } from "react"
import { usePersistedState } from "hooks"
import { CognitoUser, S3Resource, Salutation, SelectOption, TableHeaderColor, TableSpacing, TableTheme, User } from "types"
import { PREFIXES_TYPE } from "utils/phone"
import utils from "utils"

const useUserForm = (formIntent: "create" | "edit", user: User | null, cognitoUser: CognitoUser | null) => {
    const [username, setUsername] = usePersistedState<string>("user_username", "", formIntent)
    const [firstName, setFirstName] = usePersistedState<string>("user_firstName", "", formIntent)
    const [lastName, setLastName] = usePersistedState<string>("user_lastName", "", formIntent)
    const [salutation, setSalutation] = usePersistedState<Salutation | null>("user_salutation", null, formIntent)
    const [email, setEmail] = usePersistedState<string>("user_email", "", formIntent)
    const [phone, setPhone] = usePersistedState<string>("user_phone", "", formIntent)
    const [phonePrefix, setPhonePrefix] = usePersistedState<PREFIXES_TYPE>(
        "user_phonePrefix",
        {
            value: "Deutschland",
            prefix: "+49",
            label: "Deutschland +49",
        },
        formIntent
    )
    const [fax, setFax] = usePersistedState<string>("user_fax", "", formIntent)
    const [faxPrefix, setFaxPrefix] = usePersistedState<PREFIXES_TYPE>(
        "user_faxPrefix",
        {
            value: "Deutschland",
            prefix: "+49",
            label: "Deutschland +49",
        },
        formIntent
    )
    const [avatar, setAvatar] = usePersistedState<S3Resource | null>("user_avatar", null, formIntent)

    const [tableTheme, setTableTheme] = useState<TableTheme | null>(null)
    const [tableHeaderColor, setTableHeaderColor] = useState<TableHeaderColor | null>(null)
    const [tableSpacing, setTableSpacing] = useState<TableSpacing | null>(null)
    const [tableSticky, setTableSticky] = useState<boolean>(false)

    const [unitType, setUnitType] = usePersistedState<SelectOption | null>(
        "user_unitType",
        {
            value: "kg",
            label: "Kilogramm (kg)",
        },
        formIntent
    )

    const [userRoles, setUserRoles] = useState<SelectOption[]>([])
    const [password, setPassword] = useState<string>("")
    const [confirmedPassword, setConfirmedPassword] = useState<string>("")
    const [uploading, setUploading] = usePersistedState<boolean>("user_uploading", false, formIntent)
    const [uploadProgress, setUploadProgress] = usePersistedState<number>("user_uploadProgress", 0, formIntent)
    const loadUserAvatar = async (user: User) => {
        if (!user.avatar) {
            return
        }
        const imagePreview = await utils.images.getImage(user.avatar, 500)

        console.log("imagePreview is: ", imagePreview)

        const userAvatar: S3Resource = {
            ...user.avatar,
            preview: imagePreview,
            fromDatabase: true,
        }

        setAvatar(userAvatar)
    }
    const resetUserForm = () => {
        localStorage.removeItem("user_username")
        localStorage.removeItem("user_userSUB")
        localStorage.removeItem("user_firstName")
        localStorage.removeItem("user_lastName")
        localStorage.removeItem("user_salutation")
        localStorage.removeItem("user_email")
        localStorage.removeItem("user_phone")
        localStorage.removeItem("user_phonePrefix")
        localStorage.removeItem("user_fax")
        localStorage.removeItem("user_faxPrefix")
        localStorage.removeItem("user_avatar")
        localStorage.removeItem("user_unitType")
        localStorage.removeItem("user_userRoles")
        localStorage.removeItem("user_password")
        localStorage.removeItem("user_confirmedPassword")
        localStorage.removeItem("user_uploading")
        localStorage.removeItem("user_uploadProgress")
    }

    useEffect(() => {
        if (!cognitoUser) {
            return
        }

        const roles = utils.constants.USER_GROUPS_OPTIONS.filter((userGroupOption) =>
            cognitoUser.groups.some((group) => group.GroupName === userGroupOption.value)
        )

        console.log("roles are: ", roles)

        setUserRoles(roles)
    }, [cognitoUser])

    useEffect(() => {
        if (!user) {
            return
        }

        setEmail(user.email)

        setUsername(user.username)

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    return {
        username,
        setUsername,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        salutation,
        setSalutation,
        email,
        setEmail,
        phone,
        setPhone,
        phonePrefix,
        setPhonePrefix,
        fax,
        setFax,
        faxPrefix,
        setFaxPrefix,
        avatar,
        setAvatar,
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
        userRoles,
        setUserRoles,
        password,
        setPassword,
        confirmedPassword,
        setConfirmedPassword,
        uploading,
        setUploading,
        uploadProgress,
        setUploadProgress,
        resetUserForm,
    }
}

export default useUserForm
