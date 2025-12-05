"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Building2, FileText, Shield, AlertCircle } from "lucide-react"
import Link from "next/link"
import { mockUsers } from "@/lib/mock-data/users"
import { mockOrganizations } from "@/lib/mock-data/organizations"
import { mockDocuments } from "@/lib/mock-data/documents"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function SuperAdminDashboard() {
  const totalUsers = mockUsers.length
  const totalOrganizations = mockOrganizations.length
  const activeOrganizations = mockOrganizations.filter((o) => o.status === "active").length
  const pendingOrganizations = mockOrganizations.filter((o) => o.status === "pending").length
  const totalDocuments = mockDocuments.length

  const usersByRole = [
    { role: "Citizens", count: mockUsers.filter((u) => u.role === "citizen").length, color: "#3b82f6" },
    { role: "Org Admins", count: mockUsers.filter((u) => u.role === "organization_admin").length, color: "#10b981" },
    { role: "Verifiers", count: mockUsers.filter((u) => u.role === "verifier").length, color: "#f59e0b" },
    { role: "Admins", count: mockUsers.filter((u) => u.role === "admin").length, color: "#ef4444" },
  ]

  const systemGrowth = [
    { month: "Jul", users: 1250, orgs: 8 },
    { month: "Aug", users: 1420, orgs: 10 },
    { month: "Sep", users: 1680, orgs: 12 },
    { month: "Oct", users: 1950, orgs: 15 },
    { month: "Nov", users: 2240, orgs: 18 },
    { month: "Dec", users: 2580, orgs: 20 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">System-wide management and oversight</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeOrganizations}</div>
            <p className="text-xs text-muted-foreground">{pendingOrganizations} pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Across all organizations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/super-admin/create-user">
            <Button className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </Link>
          <Link href="/super-admin/create-organization">
            <Button variant="outline" className="w-full bg-transparent">
              <Building2 className="mr-2 h-4 w-4" />
              Create Organization
            </Button>
          </Link>
          <Link href="/super-admin/organizations">
            <Button variant="outline" className="w-full bg-transparent">
              <Shield className="mr-2 h-4 w-4" />
              Manage Organizations
            </Button>
          </Link>
          <Link href="/super-admin/users">
            <Button variant="outline" className="w-full bg-transparent">
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Pending Organizations Alert */}
      {pendingOrganizations > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-900 dark:text-orange-100">
              <AlertCircle className="mr-2 h-5 w-5" />
              Pending Organization Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
              {pendingOrganizations} organization{pendingOrganizations > 1 ? "s" : ""} awaiting approval
            </p>
            <Link href="/super-admin/organizations">
              <Button size="sm">Review Organizations</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users by Role */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usersByRole}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Growth */}
        <Card>
          <CardHeader>
            <CardTitle>System Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" name="Users" />
                <Line type="monotone" dataKey="orgs" stroke="#10b981" name="Organizations" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Organizations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockOrganizations.slice(0, 5).map((org) => (
              <div key={org.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={org.logo || "/placeholder.svg"} alt={org.name} className="h-10 w-10 rounded" />
                  <div>
                    <p className="font-medium text-sm">{org.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{org.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      org.status === "active" ? "default" : org.status === "pending" ? "secondary" : "destructive"
                    }
                  >
                    {org.status}
                  </Badge>
                  <Link href={`/super-admin/organizations/${org.id}`}>
                    <Button size="sm" variant="ghost">
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
