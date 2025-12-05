"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Eye, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export default function VerificationHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const verificationHistory = [
    {
      id: "VER-001",
      documentType: "Degree",
      documentNumber: "DEG-2020-12345",
      ownerName: "John Citizen",
      status: "verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "VER-002",
      documentType: "Birth Certificate",
      documentNumber: "BC-1995-67890",
      ownerName: "Sarah Williams",
      status: "verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: "VER-003",
      documentType: "Property Deed",
      documentNumber: "PD-2022-11223",
      ownerName: "Michael Brown",
      status: "verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
    },
    {
      id: "VER-004",
      documentType: "Transcript",
      documentNumber: "TR-2019-33445",
      ownerName: "Emily Johnson",
      status: "invalid",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: "VER-005",
      documentType: "Tax Clearance",
      documentNumber: "TC-2024-55667",
      ownerName: "David Miller",
      status: "verified",
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
    },
    {
      id: "VER-006",
      documentType: "Passport",
      documentNumber: "PP-2023-88990",
      ownerName: "Lisa Anderson",
      status: "expired",
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
    },
  ]

  const filteredHistory = verificationHistory.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.documentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.documentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "verified":
        return "default"
      case "invalid":
        return "destructive"
      case "expired":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Verification History</h1>
        <p className="text-muted-foreground mt-1">View all your past verifications</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle>All Verifications</CardTitle>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export History
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by document type, number, or owner..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="invalid">Invalid</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Verification ID</TableHead>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Document Number</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-sm">{item.id}</TableCell>
                    <TableCell>{item.documentType}</TableCell>
                    <TableCell className="font-mono text-sm">{item.documentNumber}</TableCell>
                    <TableCell>{item.ownerName}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                    </TableCell>
                    <TableCell>{format(item.timestamp, "PPp")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredHistory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No verifications found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
