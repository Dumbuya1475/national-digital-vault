"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/lib/user-context"
import { mockDocuments } from "@/lib/mock-data/documents"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Eye, DownloadIcon, Share2, Shield } from "lucide-react"
import { formatDateTime } from "@/lib/utils/dateFormatter"
import type { AccessLog } from "@/types/document"

export default function AuditLogPage() {
  const { currentUser } = useUser()

  const documents = mockDocuments.filter((d) => d.ownerId === currentUser?.id)

  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState("all") // Updated default value
  const [dateRange, setDateRange] = useState("all")

  useEffect(() => {
    // No need to dispatch fetchDocuments as we are using mock data
  }, [currentUser])

  // Collect all access logs from all documents
  const allLogs: (AccessLog & { documentName: string })[] = documents.flatMap((doc) =>
    doc.accessHistory.map((log) => ({
      ...log,
      documentName: doc.name,
    })),
  )

  // Apply filters
  const filteredLogs = allLogs.filter((log) => {
    const matchesSearch =
      log.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.accessedByName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = actionFilter === "all" || log.accessType === actionFilter

    // Simple date range filter
    if (dateRange !== "all") {
      const logDate = new Date(log.timestamp)
      const now = new Date()
      const daysDiff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24))

      if (dateRange === "7d" && daysDiff > 7) return false
      if (dateRange === "30d" && daysDiff > 30) return false
      if (dateRange === "90d" && daysDiff > 90) return false
    }

    return matchesSearch && matchesAction
  })

  // Sort by most recent first
  const sortedLogs = [...filteredLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const getActionIcon = (action: string) => {
    switch (action) {
      case "view":
        return <Eye className="h-4 w-4" />
      case "download":
        return <DownloadIcon className="h-4 w-4" />
      case "share":
        return <Share2 className="h-4 w-4" />
      case "verify":
        return <Shield className="h-4 w-4" />
      default:
        return null
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "view":
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
      case "download":
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      case "share":
        return "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
      case "verify":
        return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Audit Log</h1>
          <p className="text-muted-foreground mt-1">Track all activities related to your documents</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Log
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents or users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="download">Download</SelectItem>
                <SelectItem value="share">Share</SelectItem>
                <SelectItem value="verify">Verify</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Log ({sortedLogs.length} entries)</CardTitle>
        </CardHeader>
        <CardContent>
          {sortedLogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">No activity logs found</div>
          ) : (
            <div className="space-y-2">
              {sortedLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActionColor(log.accessType)}`}
                    >
                      {getActionIcon(log.accessType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{log.documentName}</h4>
                        <Badge variant="outline" className="text-xs capitalize">
                          {log.accessType}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">{log.accessedByName}</span>
                        {" • "}
                        {formatDateTime(log.timestamp)}
                        {" • "}
                        IP: {log.ipAddress}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
