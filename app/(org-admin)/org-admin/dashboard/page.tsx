"use client"

import { useUser } from "@/lib/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, CheckCircle, Clock, TrendingUp, FileCheck, AlertCircle } from "lucide-react"
import Link from "next/link"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { mockApplications } from "@/lib/mock-data/applications"
import { mockUsers } from "@/lib/mock-data/users"
import { mockDocuments } from "@/lib/mock-data/documents"

export default function OrgAdminDashboard() {
  const { currentUser } = useUser()

  // Filter data for this organization
  const orgApplications = mockApplications.filter((app) => app.authorityId === currentUser?.organizationId)
  const pendingApplications = orgApplications.filter((app) => app.status === "pending")
  const approvedApplications = orgApplications.filter((app) => app.status === "approved")
  const orgUsers = mockUsers.filter((user) => user.organizationId === currentUser?.organizationId)
  const orgDocuments = mockDocuments.filter((doc) => doc.issuingAuthority.id === currentUser?.organizationId)

  const applicationTrend = [
    { month: "Jul", applications: 45 },
    { month: "Aug", applications: 62 },
    { month: "Sep", applications: 58 },
    { month: "Oct", applications: 78 },
    { month: "Nov", applications: 85 },
    { month: "Dec", applications: 92 },
  ]

  const processingTime = [
    { range: "0-24h", count: 25 },
    { range: "1-3d", count: 42 },
    { range: "3-7d", count: 18 },
    { range: "7d+", count: 8 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your organization's document processing and team</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApplications.length}</div>
            <p className="text-xs text-muted-foreground">Require action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Processed This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedApplications.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Documents Issued</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgDocuments.length}</div>
            <p className="text-xs text-muted-foreground">Total issued</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgUsers.length}</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/org-admin/applications">
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Review Applications
            </Button>
          </Link>
          <Link href="/org-admin/users">
            <Button variant="outline" className="w-full bg-transparent">
              <Users className="mr-2 h-4 w-4" />
              Manage Team
            </Button>
          </Link>
          <Link href="/org-admin/issued-documents">
            <Button variant="outline" className="w-full bg-transparent">
              <FileCheck className="mr-2 h-4 w-4" />
              View Documents
            </Button>
          </Link>
          <Link href="/org-admin/analytics">
            <Button variant="outline" className="w-full bg-transparent">
              <TrendingUp className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Pending Applications Alert */}
      {pendingApplications.length > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/20">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-900 dark:text-orange-100">
              <AlertCircle className="mr-2 h-5 w-5" />
              Pending Applications Require Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
              {pendingApplications.length} application{pendingApplications.length > 1 ? "s" : ""} awaiting review
            </p>
            <Link href="/org-admin/applications">
              <Button size="sm">Review Applications</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Application Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Application Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={applicationTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Processing Time */}
        <Card>
          <CardHeader>
            <CardTitle>Processing Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processingTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orgApplications.slice(0, 5).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{app.citizenName}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {app.documentType.replace("_", " ")} • {app.reason}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      app.status === "approved"
                        ? "default"
                        : app.status === "pending"
                          ? "secondary"
                          : app.status === "rejected"
                            ? "destructive"
                            : "outline"
                    }
                  >
                    {app.status}
                  </Badge>
                  <Link href="/org-admin/applications">
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
