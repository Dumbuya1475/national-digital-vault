"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockOrganizations } from "@/lib/mock-data/organizations"
import { Search, Building2, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ManageOrganizationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrgs = mockOrganizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = typeFilter === "all" || org.type === typeFilter
    const matchesStatus = statusFilter === "all" || org.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleApprove = (orgId: string, orgName: string) => {
    toast.success(`Organization ${orgName} has been approved`)
  }

  const handleReject = (orgId: string, orgName: string) => {
    toast.error(`Organization ${orgName} has been rejected`)
  }

  const handleSuspend = (orgId: string, orgName: string) => {
    toast.warning(`Organization ${orgName} has been suspended`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Organizations</h1>
          <p className="text-muted-foreground mt-1">View and manage all registered organizations</p>
        </div>
        <Link href="/super-admin/create-organization">
          <Button>
            <Building2 className="mr-2 h-4 w-4" />
            Create Organization
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Organization Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredOrgs.length} of {mockOrganizations.length} organizations
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organizations ({filteredOrgs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredOrgs.map((org) => (
              <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4 flex-1">
                  <img src={org.logo || "/placeholder.svg"} alt={org.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="font-medium">{org.name}</p>
                    <p className="text-sm text-muted-foreground">{org.contactEmail}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {org.type}
                  </Badge>
                  <Badge
                    variant={
                      org.status === "active" ? "default" : org.status === "pending" ? "secondary" : "destructive"
                    }
                  >
                    {org.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {org.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleApprove(org.id, org.name)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleReject(org.id, org.name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  {org.status === "active" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSuspend(org.id, org.name)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      Suspend
                    </Button>
                  )}
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
