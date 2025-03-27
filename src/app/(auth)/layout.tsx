// import { AuthLayout } from "@/layout"

import { minHeight } from "@mui/system"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <div style={{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>{children}</div>
}
