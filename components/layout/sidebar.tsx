"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/lib/user-context"
import {
  Shield,
  LayoutDashboard,
  FileText,
  Upload,
  Share2,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  FileCheck,
  Users,
  Building2,
  Search,
  BarChart3,
  FileUp,
  Activity,
} from "lucide-react"
import { toast } from "sonner"

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
}

const citizenNav: NavItem[] = [
  { href: "/citizen/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/citizen/documents", label: "My Documents", icon: FileText },
  { href: "/citizen/upload", label: "Upload Document", icon: Upload },
  { href: "/citizen/share", label: "Share Document", icon: Share2 },
  { href: "/citizen/audit-log", label: "Audit Log", icon: History },
  { href: "/citizen/settings", label: "Settings", icon: Settings },
]

const authorityNav: NavItem[] = [
  { href: "/authority/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/authority/applications", label: "Document Applications", icon: FileText },
  { href: "/authority/issue-document", label: "Issue Document", icon: FileCheck },
  { href: "/authority/users", label: "Manage Users", icon: Users },
  { href: "/authority/bulk-upload", label: "Bulk Upload", icon: FileUp },
  { href: "/authority/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/authority/settings", label: "Settings", icon: Settings },
]

const verifierNav: NavItem[] = [
  { href: "/verifier/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/verifier/verify-document", label: "Verify Document", icon: Search },
  { href: "/verifier/history", label: "Verification History", icon: History },
  { href: "/verifier/settings", label: "Settings", icon: Settings },
]

const adminNav: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/authorities", label: "Authorities", icon: Building2 },
  { href: "/admin/system-logs", label: "System Logs", icon: Activity },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

const superAdminNav: NavItem[] = [
  { href: "/super-admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/super-admin/create-user", label: "Create User", icon: Users },
  { href: "/super-admin/users", label: "Manage Users", icon: Users },
  { href: "/super-admin/create-organization", label: "Create Organization", icon: Building2 },
  { href: "/super-admin/organizations", label: "Manage Organizations", icon: Building2 },
  { href: "/super-admin/system-logs", label: "System Logs", icon: Activity },
  { href: "/super-admin/settings", label: "Settings", icon: Settings },
]

const organizationAdminNav: NavItem[] = [
  { href: "/org-admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/org-admin/users", label: "Manage Users", icon: Users },
  { href: "/org-admin/applications", label: "Applications", icon: FileText },
  { href: "/org-admin/issued-documents", label: "Issued Documents", icon: FileCheck },
  { href: "/org-admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/org-admin/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { currentUser, logout } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  if (!currentUser) return null

  const navItems =
    {
      citizen: citizenNav,
      authority: authorityNav,
      verifier: verifierNav,
      admin: adminNav,
      super_admin: superAdminNav,
      organization_admin: organizationAdminNav,
    }[currentUser.role] || authorityNav

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/login")
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">Vault</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User profile */}
          <div className="border-t p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar>
                <AvatarImage src={currentUser.profilePicture || "/placeholder.svg"} />
                <AvatarFallback>
                  {currentUser.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{currentUser.fullName}</p>
                <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden lg:block w-64" />
    </>
  )
}
