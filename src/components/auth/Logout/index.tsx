"use client"

import { signOut } from "aws-amplify/auth"
import { useRouter } from "next/navigation"

import { FC, useEffect, useCallback } from "react"
import { Container, Typography } from "@mui/material"
import styles from "./styles.module.css"

const Logout: FC = () => {
    const router = useRouter()

    const logoutHandler = useCallback(async () => {
        await signOut()
        router.push("/login")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        logoutHandler()
    }, [logoutHandler])

    return (
        <section>
            <Container maxWidth={"lg"}>
                <div className={styles.content}>
                    <div className={styles.heading}>
                        <Typography variant="h1" className={styles.title}>
                            Ausloggen...
                        </Typography>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Logout
