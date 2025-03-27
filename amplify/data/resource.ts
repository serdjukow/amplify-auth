import { type ClientSchema, a, defineData } from "@aws-amplify/backend"
import { listCognitoUsers } from "../functions/auth/list-cognito-users/resource"
import { blockCognitoUser } from "../functions/auth/block-cognito-user/resource"

const schema = a.schema({
    Todo: a
        .model({
            content: a.string(),
            completed: a.boolean(),
        })
        .authorization((allow) => [allow.owner()]),

    listCognitoUsers: a
        .query()
        .returns(a.ref("CognitoUser").required().array().required())
        .authorization((allow) => [allow.groups(["Admin"])])
        .handler(a.handler.function(listCognitoUsers)),
    User: a
        .model({
            id: a.id().required(),
            isUserActive: a.boolean().required(),
            username: a.string().required(),
            userSUB: a.string().required(),
            firstName: a.string().required(),
            lastName: a.string().required(),
            salutation: a.ref("Salutation"),
            email: a.string().required(),
            lastActive: a.timestamp().required(),
            phone: a.string(),
            fax: a.string(),
            avatar: a.ref("S3Resource"),
            select: a.ref("SelectOption"),
            userSettings: a.ref("UserSettings").required(),
            comments: a.hasMany("Comment", "userID"),
            documents: a.hasMany("Document", "userID"),
            cognitoUser: a.ref("CognitoUser"),
            cognitoUserGroup: a.ref("CognitoUserGroup"),
            sentTimesheets: a.hasMany("SentTimesheet", "userID"),
            sentInvoices: a.hasMany("SentInvoice", "userID"),
        })
        .secondaryIndexes((index) => [index("username").queryField("usersByUsername")])
        .authorization((allow) => [allow.owner(), allow.groups(["Admin"])]),

    blockCognitoUser: a
        .query()
        .arguments({
            blocked: a.boolean().required(),
            username: a.string().required(),
        })
        .returns(a.ref("CognitoUser"))
        .authorization((allow) => [allow.groups(["Admin"])])
        .handler(a.handler.function(blockCognitoUser)),

    Salutation: a.enum(["Mr", "Mrs"]),

    SalutationCompany: a.enum(["Mr", "Mrs", "Company"]),

    TableTheme: a.enum(["default", "bordered", "striped"]),
    TableHeaderColor: a.enum(["default", "grey"]),
    TableSpacing: a.enum(["xsmall", "small", "medium", "large"]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "userPool",
    },
})
