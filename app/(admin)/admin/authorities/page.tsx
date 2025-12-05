"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Eye, Edit, Ban, CheckCircle, Building2, Plus } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export default function AuthoritiesManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const authorities = [
    {
      id: "AUTH-001",
      name: "National University",
      type: "education",
      logo: "/placeholder.svg?key=oc3v9",
      contactEmail: "admin@university.edu",
      contactPhone: "+1-555-0101",
      status: "active",
      registrationDate: new Date(2023, 11, 1),
      documentsIssued: 1250,
      verificationRate: 98.5,
    },
    {
      id: "AUTH-002",
      name: "Ministry of Home Affairs",
      type: "government",
      logo: "/placeholder.svg?key=oc3v8",
      contactEmail: "contact@ministry.gov",
      contactPhone: "+1-555-0102",
      status: "active",
      registrationDate: new Date(2024, 0, 5),
      documentsIssued: 3420,
      verificationRate: 99.2,
    },
    {
      id: "AUTH-003",
      name: "City Hospital",
      type: "healthcare",
      logo: "/placeholder.svg?key=oc3v7",
      contactEmail: "records@cityhospital.com",
      contactPhone: "+1-555-0103",
      status: "pending",
      registrationDate: new Date(2024, 5, 15),
      documentsIssued: 0,
      verificationRate: 0,
    },
    {
      id: "AUTH-004",
      name: "State Land Registry",
      type: "government",
      logo: "/placeholder.svg?key=oc3v6",
      contactEmail: "info@landregistry.gov",
      contactPhone: "+1-555-0104",
      status: "active",
      registrationDate: new Date(2024, 1, 20),
      documentsIssued: 856,
      verificationRate: 97.8,
    },
  ]

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "suspended":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "government":
        return "bg-blue-100 text-blue-800"
      case "education":
        return "bg-purple-100 text-purple-800"
      case "healthcare":
        return "bg-green-100 text-green-800"
      case "financial":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAuthorities = authorities.filter(
    (auth) =>
      searchQuery === "" ||
      auth.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auth.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Authority Management</h1>
          <p className="text-muted-foreground mt-1">Manage issuing authorities</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Authority
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Authorities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Authority</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead className="text-right">Documents Issued</TableHead>
                  <TableHead className="text-right">Verification Rate</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAuthorities.map((authority) => (
                  <TableRow key={authority.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={authority.logo || "/placeholder.svg"}
                          alt={authority.name}
                          className="h-10 w-10 rounded"
                        />
                        <div>
                          <p className="font-medium">{authority.name}</p>
                          <p className="text-sm text-muted-foreground">{authority.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadgeColor(authority.type)} variant="secondary">
                        {authority.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{authority.contactEmail}</p>
                        <p className="text-sm text-muted-foreground">{authority.contactPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(authority.status)}>{authority.status}</Badge>
                    </TableCell>
                    <TableCell>{format(authority.registrationDate, "PP")}</TableCell>
                    <TableCell className="text-right font-medium">
                      {authority.documentsIssued.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {authority.verificationRate > 0 ? `${authority.verificationRate}%` : "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Authority
                          </DropdownMenuItem>
                          {authority.status === "pending" && (
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Ban className="mr-2 h-4 w-4" />
                            {authority.status === "active" ? "Suspend" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAuthorities.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No authorities found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
