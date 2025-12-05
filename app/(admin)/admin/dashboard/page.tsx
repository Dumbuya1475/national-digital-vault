"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Activity, Database, CheckCircle2, AlertCircle } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { format } from "date-fns"

export default function AdminDashboardPage() {
  const stats = {
    totalUsers: 15247,
    totalDocuments: 48392,
    systemUptime: "99.8%",
    activeSessions: 324,
  }

  const userGrowthData = [
    { month: "Jan", citizens: 1200, authorities: 45, verifiers: 32 },
    { month: "Feb", citizens: 1850, authorities: 52, verifiers: 38 },
    { month: "Mar", citizens: 2400, authorities: 58, verifiers: 42 },
    { month: "Apr", citizens: 3100, authorities: 61, verifiers: 48 },
    { month: "May", citizens: 3850, authorities: 68, verifiers: 53 },
    { month: "Jun", citizens: 4520, authorities: 72, verifiers: 58 },
  ]

  const documentTypesData = [
    { type: "Birth Cert", count: 8520 },
    { type: "Degrees", count: 12450 },
    { type: "Property", count: 6890 },
    { type: "ID Cards", count: 15230 },
    { type: "Tax Docs", count: 3202 },
    { type: "Other", count: 2100 },
  ]

  const systemEvents = [
    {
      id: 1,
      type: "info",
      message: "System backup completed successfully",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: 2,
      type: "warning",
      message: "High API usage detected from IP 192.168.1.100",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: 3,
      type: "success",
      message: 'New authority "City Hospital" approved',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
    },
    {
      id: 4,
      type: "info",
      message: "Database optimization completed",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: 5,
      type: "error",
      message: "Failed login attempt from user admin@test.com",
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
    },
  ]

  const systemHealth = [
    { component: "API Server", status: "healthy", uptime: 99.9 },
    { component: "Database", status: "healthy", uptime: 99.8 },
    { component: "Blockchain Node", status: "healthy", uptime: 99.7 },
    { component: "Storage", status: "warning", uptime: 98.5 },
    { component: "Email Service", status: "healthy", uptime: 99.6 },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Activity className="h-5 w-5 text-blue-600" />
    }
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500"
      case "warning":
        return "bg-amber-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and monitoring</p>
      </div>

      {/* Top-level Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold mt-1">{stats.totalDocuments.toLocaleString()}</p>
              </div>
              <FileText className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+15.4% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold mt-1">{stats.systemUptime}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold mt-1">{stats.activeSessions}</p>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Current active users</p>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealth.map((item) => (
              <div key={item.component} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${getHealthColor(item.status)}`} />
                  <span className="font-medium">{item.component}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{item.uptime}% uptime</span>
                  <Badge variant={item.status === "healthy" ? "default" : "secondary"}>{item.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="citizens" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="authorities" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="verifiers" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Document Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Document Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={documentTypesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent System Events */}
        <Card>
          <CardHeader>
            <CardTitle>Recent System Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getEventIcon(event.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{event.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{format(event.timestamp, "PPp")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
