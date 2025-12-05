"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { mockUsers } from "@/lib/mock-data/users"
import { mockOrganizations } from "@/lib/mock-data/organizations"
import { Users, UserPlus, Search, Mail, Phone, Shield, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

export default function AuthorityUsersPage() {
  const { currentUser } = useUser()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Get current user's organization
  const userOrg = mockOrganizations.find((org) => org.id === currentUser?.organizationId)

  // Get users from this organization
  const orgUsers = mockUsers.filter((user) => user.organizationId === currentUser?.organizationId)

  // Filter users based on search
  const filteredUsers = orgUsers.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nationalId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success("User created successfully")
    setIsCreateDialogOpen(false)
  }

  const handleEditUser = (userId: string) => {
    toast.info("Edit user functionality")
    console.log("[v0] Edit user:", userId)
  }

  const handleDeleteUser = (userId: string) => {
    toast.error("User deleted")
    console.log("[v0] Delete user:", userId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground mt-1">Manage users for {userOrg?.name || "your organization"}</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalId">National ID *</Label>
                  <Input id="nationalId" placeholder="NAT-2024-001234" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+1-555-0101" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select required>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document_officer">Document Officer</SelectItem>
                      <SelectItem value="approver">Approver</SelectItem>
                      <SelectItem value="signer">Digital Signer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input id="dateOfBirth" type="date" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="grid grid-cols-2 gap-3">
                  {["issue_documents", "approve_documents", "sign_documents", "view_analytics"].map((perm) => (
                    <label key={perm} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm capitalize">{perm.replace(/_/g, " ")}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create User</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgUsers.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgUsers.filter((u) => u.role === "organization_admin").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Officers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orgUsers.filter((u) => u.role === "authority").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(orgUsers.length * 0.7)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {user.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.fullName}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </span>
                      <span className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {user.phone}
                      </span>
                    </div>
                    {user.permissions && user.permissions.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {user.permissions.slice(0, 3).map((perm) => (
                          <Badge key={perm} variant="secondary" className="text-xs">
                            {perm.replace(/_/g, " ")}
                          </Badge>
                        ))}
                        {user.permissions.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{user.permissions.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {user.role.replace(/_/g, " ")}
                  </Badge>
                  <Button size="sm" variant="ghost" onClick={() => handleEditUser(user.id)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteUser(user.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && <div className="text-center py-8 text-muted-foreground">No users found</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
