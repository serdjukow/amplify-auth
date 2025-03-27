// stores/layoutStore.ts
import { ReactNode } from "react"
import { ToastOptions, toast } from "react-toastify"
import { create } from "zustand"

type LayoutState = {
    menuOpen: boolean
    setMenuOpen: (open: boolean) => void
    menuLocked: boolean
    setMenuLocked: (locked: boolean) => void
    subMenuOpen: boolean
    setSubMenuOpen: (open: boolean) => void
    activeView: string
    setActiveView: (view: string) => void
    notify: (message: ReactNode, options?: ToastOptions) => void
}

export const useLayoutStore = create<LayoutState>((set) => ({
    menuOpen: false,
    setMenuOpen: (open) => set({ menuOpen: open }),

    menuLocked: false,
    setMenuLocked: (locked) => set({ menuLocked: locked }),

    subMenuOpen: false,
    setSubMenuOpen: (open) => set({ subMenuOpen: open }),

    activeView: "contactInfo",
    setActiveView: (view) => set({ activeView: view }),

    notify: (message, options) =>
        toast(message, {
            type: "error",
            theme: options?.type === "success" ? "light" : "colored",
            ...(options ?? {}),
        }),
}))
