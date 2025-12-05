"use client"

import { useUser } from "@/lib/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileCheck, Clock, XCircle, TrendingUp, Users, AlertCircle } from "lucide-react"
import Link from "next/link"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { mockVerificationRequests } from "@/lib/mock-data/verifications"

export default function AuthorityDashboard() {
  const { currentUser } = useUser()

  const pendingRequests = mockVerificationRequests.filter((r) => r.status === "pending").length
  const approvedThisMonth = mockVerificationRequests.filter((r) => r.status === "approved").length
  const rejectedRequests = mockVerificationRequests.filter((r) => r.status === "rejected").length

  // Mock data for charts
  const issuanceData = [
    { month: "Jan", documents: 120 },
    { month: "Feb", documents: 145 },
    { month: "Mar", documents: 132 },
    { month: "Apr", documents: 168 },
    { month: "May", documents: 195 },
    { month: "Jun", documents: 210 },
  ]

  const documentTypes = [
    { name: "Degrees", value: 450, color: "#3b82f6" },
    { name: "Transcripts", value: 320, color: "#10b981" },
    { name: "Certificates", value: 280, color: "#f59e0b" },
  ]

  const verificationVolume = [
    { day: "Mon", requests: 24 },
    { day: "Tue", requests: 31 },
    { day: "Wed", requests: 28 },
    { day: "Thu", requests: 35 },
    { day: "Fri", requests: 42 },
    { day: "Sat", requests: 18 },
    { day: "Sun", requests: 12 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Authority Dashboard</h1>
        <p className="text-muted-foreground mt-1">Monitor document issuance and verification requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Documents Issued</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Documents Revoked</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedRequests}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">Total registered</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/authority/issue-document">
            <Button className="w-full">
              <FileCheck className="mr-2 h-4 w-4" />
              Issue Document
            </Button>
          </Link>
          <Link href="/authority/verification-requests">
            <Button variant="outline" className="w-full bg-transparent">
              <Clock className="mr-2 h-4 w-4" />
              Review Requests
            </Button>
          </Link>
          <Link href="/authority/bulk-upload">
            <Button variant="outline" className="w-full bg-transparent">
              <TrendingUp className="mr-2 h-4 w-4" />
              Bulk Upload
            </Button>
          </Link>
          <Link href="/authority/analytics">
            <Button variant="outline" className="w-full bg-transparent">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Document Issuance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Document Issuance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={issuanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="documents" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Document Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Document Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {documentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Verification Request Volume */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Request Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={verificationVolume}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="requests" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pending Verification Requests */}
      {pendingRequests > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-orange-600" />
              Pending Verification Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockVerificationRequests
                .filter((r) => r.status === "pending")
                .slice(0, 5)
                .map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{request.citizenName}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {request.documentType.replace("_", " ")} • Submitted{" "}
                        {new Date(request.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className={
                          request.priority === "high"
                            ? "border-red-600 text-red-600"
                            : request.priority === "medium"
                              ? "border-orange-600 text-orange-600"
                              : "border-blue-600 text-blue-600"
                        }
                      >
                        {request.priority}
                      </Badge>
                      <Link href="/authority/verification-requests">
                        <Button size="sm">Review</Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Issuance Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockVerificationRequests
              .filter((r) => r.status === "approved")
              .slice(0, 5)
              .map((request) => (
                <div key={request.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center flex-shrink-0">
                    <FileCheck className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      Approved {request.documentType.replace("_", " ")} for {request.citizenName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {request.reviewedDate && new Date(request.reviewedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
