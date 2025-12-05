"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, AlertCircle, Info, AlertTriangle, XCircle } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export default function SystemLogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const systemLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      level: "info",
      category: "API",
      message: "Document verification request completed successfully",
      user: "verifier@bank.com",
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      level: "warning",
      category: "Security",
      message: "Multiple failed login attempts detected",
      user: "unknown",
      ipAddress: "203.0.113.42",
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      level: "info",
      category: "Blockchain",
      message: "Document hash successfully recorded on blockchain",
      user: "admin@university.edu",
      ipAddress: "192.168.1.105",
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      level: "error",
      category: "API",
      message: "Failed to connect to external verification service",
      user: "system",
      ipAddress: "N/A",
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      level: "info",
      category: "Security",
      message: "User password successfully updated",
      user: "john.citizen@email.com",
      ipAddress: "192.168.1.50",
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 1000 * 60 * 75),
      level: "warning",
      category: "API",
      message: "High API request rate detected from single IP",
      user: "N/A",
      ipAddress: "203.0.113.89",
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      level: "info",
      category: "Blockchain",
      message: "Blockchain node sync completed",
      user: "system",
      ipAddress: "N/A",
    },
    {
      id: 8,
      timestamp: new Date(Date.now() - 1000 * 60 * 105),
      level: "error",
      category: "Security",
      message: "Invalid authentication token provided",
      user: "unknown",
      ipAddress: "198.51.100.23",
    },
  ]

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "info":
        return "default"
      case "warning":
        return "secondary"
      case "error":
        return "destructive"
      default:
        return "outline"
    }
  }

  const filteredLogs = systemLogs.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter

    return matchesSearch && matchesLevel && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Logs</h1>
          <p className="text-muted-foreground mt-1">Monitor system activity and events</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Log Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="API">API</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Blockchain">Blockchain</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">{format(log.timestamp, "PP p")}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getLevelIcon(log.level)}
                        <Badge variant={getLevelBadgeVariant(log.level)}>{log.level}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm">{log.message}</p>
                    </TableCell>
                    <TableCell className="text-sm">{log.user}</TableCell>
                    <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No logs found matching your filters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
