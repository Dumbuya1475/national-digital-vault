"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Eye, Edit, Ban, Trash2, Download, UserPlus } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export default function UsersManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("citizens")

  const users = {
    citizens: [
      {
        id: "USR-001",
        name: "John Citizen",
        email: "john.citizen@email.com",
        nationalId: "NID-1990-12345",
        status: "active",
        registrationDate: new Date(2024, 0, 15),
        lastLogin: new Date(Date.now() - 1000 * 60 * 30),
        documents: 5,
      },
      {
        id: "USR-002",
        name: "Sarah Williams",
        email: "sarah.w@email.com",
        nationalId: "NID-1988-67890",
        status: "active",
        registrationDate: new Date(2024, 1, 20),
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2),
        documents: 8,
      },
      {
        id: "USR-003",
        name: "Michael Brown",
        email: "mbrown@email.com",
        nationalId: "NID-1995-11223",
        status: "suspended",
        registrationDate: new Date(2024, 2, 10),
        lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        documents: 3,
      },
    ],
    authorities: [
      {
        id: "AUTH-001",
        name: "University Admin",
        email: "admin@university.edu",
        organization: "National University",
        status: "active",
        registrationDate: new Date(2023, 11, 1),
        lastLogin: new Date(Date.now() - 1000 * 60 * 45),
        documentsIssued: 1250,
      },
      {
        id: "AUTH-002",
        name: "Ministry Clerk",
        email: "clerk@ministry.gov",
        organization: "Ministry of Home Affairs",
        status: "active",
        registrationDate: new Date(2024, 0, 5),
        lastLogin: new Date(Date.now() - 1000 * 60 * 60),
        documentsIssued: 3420,
      },
    ],
    verifiers: [
      {
        id: "VER-001",
        name: "Bank Verifier",
        email: "verifier@bank.com",
        organization: "National Bank",
        status: "active",
        registrationDate: new Date(2024, 1, 15),
        lastLogin: new Date(Date.now() - 1000 * 60 * 20),
        verificationsCount: 487,
      },
    ],
    admins: [
      {
        id: "ADM-001",
        name: "System Administrator",
        email: "admin@vault.gov",
        status: "active",
        registrationDate: new Date(2023, 10, 1),
        lastLogin: new Date(Date.now() - 1000 * 60 * 5),
      },
    ],
  }

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage all system users</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle>All Users</CardTitle>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Users
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="citizens">Citizens ({users.citizens.length})</TabsTrigger>
              <TabsTrigger value="authorities">Authorities ({users.authorities.length})</TabsTrigger>
              <TabsTrigger value="verifiers">Verifiers ({users.verifiers.length})</TabsTrigger>
              <TabsTrigger value="admins">Admins ({users.admins.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="citizens" className="mt-6">
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>National ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Documents</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.citizens.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="font-mono text-sm">{user.nationalId}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{format(user.registrationDate, "PP")}</TableCell>
                        <TableCell>{format(user.lastLogin, "PP")}</TableCell>
                        <TableCell>{user.documents}</TableCell>
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
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="mr-2 h-4 w-4" />
                                {user.status === "active" ? "Suspend" : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="authorities" className="mt-6">
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Documents Issued</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.authorities.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{format(user.registrationDate, "PP")}</TableCell>
                        <TableCell>{user.documentsIssued}</TableCell>
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
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="verifiers" className="mt-6">
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Verifications</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.verifiers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.organization}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{format(user.registrationDate, "PP")}</TableCell>
                        <TableCell>{user.verificationsCount}</TableCell>
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
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="admins" className="mt-6">
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registration</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.admins.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{format(user.registrationDate, "PP")}</TableCell>
                        <TableCell>{format(user.lastLogin, "PP")}</TableCell>
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
                                Edit User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
