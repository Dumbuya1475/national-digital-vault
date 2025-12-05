"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, TrendingDown } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsPage() {
  const issuanceData = [
    { month: "Jan", degrees: 45, transcripts: 32, certificates: 28 },
    { month: "Feb", degrees: 52, transcripts: 38, certificates: 31 },
    { month: "Mar", degrees: 48, transcripts: 35, certificates: 29 },
    { month: "Apr", degrees: 61, transcripts: 42, certificates: 35 },
    { month: "May", degrees: 68, transcripts: 48, certificates: 39 },
    { month: "Jun", degrees: 75, transcripts: 53, certificates: 42 },
  ]

  const verificationStats = [
    { day: "Mon", approved: 18, rejected: 3, pending: 5 },
    { day: "Tue", approved: 22, rejected: 2, pending: 7 },
    { day: "Wed", approved: 20, rejected: 4, pending: 4 },
    { day: "Thu", approved: 25, rejected: 1, pending: 9 },
    { day: "Fri", approved: 30, rejected: 2, pending: 10 },
    { day: "Sat", approved: 12, rejected: 1, pending: 5 },
    { day: "Sun", approved: 8, rejected: 0, pending: 4 },
  ]

  const turnaroundTime = [
    { range: "0-24h", count: 45 },
    { range: "1-2d", count: 32 },
    { range: "3-5d", count: 18 },
    { range: "5-7d", count: 8 },
    { range: "7d+", count: 3 },
  ]

  const documentTypes = [
    { name: "Degrees", value: 450, color: "#3b82f6" },
    { name: "Transcripts", value: 320, color: "#10b981" },
    { name: "Certificates", value: 280, color: "#f59e0b" },
    { name: "Diplomas", value: 150, color: "#8b5cf6" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-1">Comprehensive analytics and insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Issued</p>
                <p className="text-2xl font-bold mt-1">1,250</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verification Rate</p>
                <p className="text-2xl font-bold mt-1">98.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">+2.3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Processing Time</p>
                <p className="text-2xl font-bold mt-1">1.8 days</p>
              </div>
              <TrendingDown className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">-0.5 days from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold mt-1">23</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
            <p className="text-xs text-amber-600 mt-2">+5 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Issuance Trend */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Document Issuance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={issuanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="degrees" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="transcripts" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="certificates" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Document Types Distribution */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Document Types Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={documentTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
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

        {/* Turnaround Time */}
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Verification Turnaround Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={turnaroundTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Verification Stats */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Weekly Verification Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={verificationStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="approved" fill="#10b981" />
              <Bar dataKey="pending" fill="#f59e0b" />
              <Bar dataKey="rejected" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
