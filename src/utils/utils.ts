import { createServerRunner } from "@aws-amplify/adapter-nextjs"
import { getCurrentUser } from "aws-amplify/auth/server"
import { cookies } from "next/headers"

let outputs: any = {}

try {
    outputs = require("../../amplify_outputs.json")
} catch (error) {
    console.warn("⚠ amplify_outputs.json не найден во время сборки. Это может быть нормально на CI до генерации.")
}

export const { runWithAmplifyServerContext } = createServerRunner({
    config: outputs,
})

export async function GetAuthCurrentUserServer() {
    try {
        const currentUser = await runWithAmplifyServerContext({
            nextServerContext: { cookies },
            operation: (context) => getCurrentUser(context),
        })
        return currentUser
    } catch (err) {
        console.log(err)
    }
}
