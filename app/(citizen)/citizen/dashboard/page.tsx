"use client"

import { useUser } from "@/lib/user-context"
import { mockDocuments } from "@/lib/mock-data/documents"
import { mockShares } from "@/lib/mock-data/sharing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Clock,
  Share2,
  HardDrive,
  Upload,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { formatTimeAgo, getDaysUntilExpiry } from "@/lib/utils/dateFormatter"
import { getDocumentTypeLabel } from "@/lib/utils/fileHelper"

export default function CitizenDashboard() {
  const { currentUser } = useUser()

  // Filter documents and shares for current user
  const documents = mockDocuments.filter((d) => d.ownerId === currentUser?.id)
  const shares = mockShares.filter((s) => s.sharedBy === currentUser?.id)

  const verifiedDocs = documents.filter((d) => d.status === "verified").length
  const pendingDocs = documents.filter((d) => d.status === "pending").length
  const activeShares = shares.filter((s) => s.status === "active").length

  const totalStorage = documents.reduce((acc, doc) => acc + doc.fileSize, 0)
  const storageUsedMB = (totalStorage / (1024 * 1024)).toFixed(2)
  const storagePercentage = (Number.parseFloat(storageUsedMB) / 1000) * 100

  const documentsByType = documents.reduce(
    (acc, doc) => {
      acc[doc.type] = (acc[doc.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const expiringDocs = documents.filter((doc) => {
    if (!doc.expiryDate) return false
    const daysUntil = getDaysUntilExpiry(doc.expiryDate)
    return daysUntil > 0 && daysUntil <= 30
  })

  const recentActivity = [
    ...documents.slice(0, 3).map((doc) => ({
      id: doc.id,
      type: "upload" as const,
      message: `Uploaded ${doc.name}`,
      timestamp: doc.uploadDate,
    })),
    ...shares.slice(0, 2).map((share) => ({
      id: share.id,
      type: "share" as const,
      message: `Shared document with ${share.sharedWith}`,
      timestamp: share.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Welcome back, {currentUser?.fullName.split(" ")[0]}!</h1>
        <p className="text-muted-foreground mt-1">Manage your documents securely with blockchain verification</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documents.length}</div>
            <p className="text-xs text-muted-foreground">
              {verifiedDocs} verified, {pendingDocs} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingDocs}</div>
            <p className="text-xs text-muted-foreground">Awaiting authority approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeShares}</div>
            <p className="text-xs text-muted-foreground">Documents currently shared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageUsedMB} MB</div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(storagePercentage, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/citizen/upload">
            <Button className="w-full" variant="default">
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </Link>
          <Link href="/citizen/share">
            <Button className="w-full bg-transparent" variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share Document
            </Button>
          </Link>
          <Link href="/citizen/documents">
            <Button className="w-full bg-transparent" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View All Documents
            </Button>
          </Link>
          <Button className="w-full bg-transparent" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Request Document
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Document Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Document Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(documentsByType).map(([type, count]) => (
                <div
                  key={type}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{getDocumentTypeLabel(type)}</p>
                    <p className="text-xs text-muted-foreground">
                      {count} document{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <Badge variant="secondary">{count}</Badge>
                </div>
              ))}
              {Object.keys(documentsByType).length === 0 && (
                <div className="col-span-2 text-center py-8 text-muted-foreground">
                  No documents yet. Upload your first document to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">No recent activity</div>
              ) : (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {activity.type === "upload" ? (
                        <Upload className="h-4 w-4 text-primary" />
                      ) : (
                        <Share2 className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expiring Documents Alert */}
      {expiringDocs.length > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-900 dark:text-orange-100">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Documents Expiring Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expiringDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-card rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Expires in {getDaysUntilExpiry(doc.expiryDate!)} days
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Renew
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Status */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center text-green-900 dark:text-green-100">
            <Shield className="mr-2 h-5 w-5" />
            Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Active and protecting your account</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-sm">Biometric Login</p>
                <p className="text-xs text-muted-foreground">Fingerprint authentication enabled</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-sm">Blockchain Verification</p>
                <p className="text-xs text-muted-foreground">{verifiedDocs} documents verified on blockchain</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
