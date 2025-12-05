"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react"
import { format } from "date-fns"

const mockLogs = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: "info",
    category: "auth",
    message: "User john.citizen@email.com logged in successfully",
    userId: "user-1",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    level: "warning",
    category: "security",
    message: "Failed login attempt detected from IP 203.45.67.89",
    userId: null,
    ipAddress: "203.45.67.89",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    level: "success",
    category: "blockchain",
    message: "Document DOC-2024-001 verified on blockchain",
    userId: "user-5",
    ipAddress: "192.168.1.105",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    level: "error",
    category: "api",
    message: "API rate limit exceeded for endpoint /documents/upload",
    userId: "user-8",
    ipAddress: "10.0.0.50",
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    level: "info",
    category: "system",
    message: "Database backup completed successfully",
    userId: null,
    ipAddress: "system",
  },
]

export default function SystemLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) || log.ipAddress.includes(searchQuery)

    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter

    return matchesSearch && matchesLevel && matchesCategory
  })

  const getLogIcon = (level: string) => {
    switch (level) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-amber-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Info className="h-5 w-5 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Logs</h1>
        <p className="text-muted-foreground mt-1">Monitor system events and activities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">Showing {filteredLogs.length} logs</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-muted/50">
                {getLogIcon(log.level)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="capitalize">
                      {log.category}
                    </Badge>
                    <Badge
                      variant={
                        log.level === "success"
                          ? "default"
                          : log.level === "warning"
                            ? "secondary"
                            : log.level === "error"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {log.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{format(log.timestamp, "PPp")}</span>
                  </div>
                  <p className="text-sm font-medium">{log.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">IP: {log.ipAddress}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
