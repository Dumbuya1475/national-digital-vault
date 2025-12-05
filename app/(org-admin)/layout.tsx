import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default function OrgAdminLayout({ children }: { children: React.Node }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-0">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
