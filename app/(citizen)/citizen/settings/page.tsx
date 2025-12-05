"use client"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { mockDocuments } from "@/lib/mock-data/documents"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Bell, Lock, Database, Download, Trash2, LogOut, Smartphone } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { currentUser, logout } = useUser()

  const documents = mockDocuments.filter((d) => d.ownerId === currentUser?.id)

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(currentUser?.twoFactorEnabled || false)
  const [biometricEnabled, setBiometricEnabled] = useState(currentUser?.biometricEnabled || false)

  const totalStorage = documents.reduce((acc, doc) => acc + doc.fileSize, 0)
  const storageUsedGB = (totalStorage / (1024 * 1024 * 1024)).toFixed(2)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully")
  }

  const handleChangePassword = () => {
    toast.success("Password changed successfully")
  }

  const handleDownloadData = () => {
    toast.success("Preparing your data export...")
  }

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.success("Account deletion request submitted")
    }
  }

  if (!currentUser) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="mr-2 h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="storage">
            <Database className="mr-2 h-4 w-4" />
            Storage
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={currentUser.profilePicture || "/placeholder.svg"} />
                  <AvatarFallback>
                    {currentUser.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1">JPG, PNG max 2MB</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue={currentUser.fullName} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={currentUser.email} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={currentUser.phone} />
                </div>
                <div>
                  <Label htmlFor="nationalId">National ID</Label>
                  <Input id="nationalId" defaultValue={currentUser.nationalId} disabled />
                </div>
                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue={currentUser.dateOfBirth} disabled />
                </div>
                <div>
                  <Label>Account Status</Label>
                  <div className="mt-2">
                    <Badge variant={currentUser.isVerified ? "default" : "secondary"}>
                      {currentUser.isVerified ? "Verified" : "Pending Verification"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button onClick={handleChangePassword}>Update Password</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Add an extra layer of security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Email/SMS Verification</div>
                  <div className="text-xs text-muted-foreground">Require a verification code when signing in</div>
                </div>
                <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
              </div>
              {twoFactorEnabled && (
                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                  <p className="text-sm text-green-900 dark:text-green-100">Two-factor authentication is enabled</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Biometric Authentication</CardTitle>
              <CardDescription>Use fingerprint or face recognition</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium flex items-center">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Biometric Login
                  </div>
                  <div className="text-xs text-muted-foreground">Enable fingerprint or face recognition</div>
                </div>
                <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your logged-in devices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Current Device</p>
                    <p className="text-xs text-muted-foreground">Last accessed: Just now</p>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage email notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Document Verified</div>
                  <div className="text-xs text-muted-foreground">Get notified when documents are verified</div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Share Requests</div>
                  <div className="text-xs text-muted-foreground">Get notified about document share requests</div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Document Expiry Reminders</div>
                  <div className="text-xs text-muted-foreground">Receive reminders before documents expire</div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>Manage SMS notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Security Alerts</div>
                  <div className="text-xs text-muted-foreground">Critical security notifications via SMS</div>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push Notifications</CardTitle>
              <CardDescription>Manage push notification preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Enable Push Notifications</div>
                  <div className="text-xs text-muted-foreground">Receive notifications on your device</div>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and privacy settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Download Your Data</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Request a copy of all your data stored in the vault
                  </p>
                  <Button variant="outline" onClick={handleDownloadData}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Data
                  </Button>
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium mb-2 text-destructive">Delete Account</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage Tab */}
        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>Monitor your document storage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Used Storage</span>
                  <span className="text-2xl font-bold">{storageUsedGB} GB</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{ width: `${(Number.parseFloat(storageUsedGB) / 5) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {(5 - Number.parseFloat(storageUsedGB)).toFixed(2)} GB of 5 GB available
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium mb-3">Storage by Document Type</h4>
                <div className="space-y-2">
                  {["degree", "birth_certificate", "property_deed"].map((type) => {
                    const typeStorage = documents.filter((d) => d.type === type).reduce((acc, d) => acc + d.fileSize, 0)
                    const typeMB = (typeStorage / (1024 * 1024)).toFixed(2)

                    return (
                      <div key={type} className="flex items-center justify-between text-sm">
                        <span className="capitalize">{type.replace("_", " ")}</span>
                        <span className="text-muted-foreground">{typeMB} MB</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout Section */}
      <Card className="border-destructive/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Sign Out</h3>
              <p className="text-sm text-muted-foreground">Sign out of your account</p>
            </div>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
