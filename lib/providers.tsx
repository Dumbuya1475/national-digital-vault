"use client"

import type React from "react"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { Toaster } from "sonner"
import { UserProvider } from "./user-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <UserProvider>
        {children}
        <Toaster position="top-right" richColors />
      </UserProvider>
    </ThemeProvider>
  )
}
