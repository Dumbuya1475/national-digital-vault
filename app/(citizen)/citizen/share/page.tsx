"use client"

import { useEffect, useState } from "react"
import { useUser } from "@/lib/user-context"
import { mockDocuments } from "@/lib/mock-data/documents"
import { mockShares } from "@/lib/mock-data/sharing"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Share2, Link2, QrCode, Clock, Eye, Download, Shield, X } from "lucide-react"
import { formatTimeAgo } from "@/lib/utils/dateFormatter"
import type { SharePermission, ShareDuration } from "@/types/sharing"
import toast from "react-hot-toast"

export default function ShareDocumentPage() {
  const { currentUser } = useUser()

  const documents = mockDocuments.filter((d) => d.ownerId === currentUser?.id)
  const shares = mockShares.filter((s) => s.sharedBy === currentUser?.id)

  const [showDialog, setShowDialog] = useState(false)
  const [shareForm, setShareForm] = useState({
    documentId: "",
    sharedWith: "",
    purpose: "",
    duration: "7d" as ShareDuration,
    permissions: [] as SharePermission[],
  })

  useEffect(() => {
    // Simulate fetching documents and shares for the current user
    console.log("Documents fetched for user:", currentUser?.id)
    console.log("Shares fetched for user:", currentUser?.id)
  }, [currentUser])

  const handlePermissionChange = (permission: SharePermission, checked: boolean) => {
    setShareForm((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, permission] : prev.permissions.filter((p) => p !== permission),
    }))
  }

  const handleCreateShare = async () => {
    if (!shareForm.documentId || !shareForm.sharedWith || !shareForm.purpose) {
      toast.error("Please fill in all required fields")
      return
    }

    if (shareForm.permissions.length === 0) {
      toast.error("Please select at least one permission")
      return
    }

    toast.success("Document shared successfully!")
    setShowDialog(false)
    setShareForm({
      documentId: "",
      sharedWith: "",
      purpose: "",
      duration: "7d",
      permissions: [],
    })
  }

  const handleRevokeShare = async (shareId: string) => {
    toast.success("Share revoked successfully")
  }

  const copyShareLink = (token: string) => {
    const link = `${window.location.origin}/verify/${token}`
    navigator.clipboard.writeText(link)
    toast.success("Share link copied to clipboard")
  }

  const activeShares = shares.filter((s) => s.status === "active")
  const expiredShares = shares.filter((s) => s.status === "expired" || s.status === "revoked")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Share Documents</h1>
          <p className="text-muted-foreground mt-1">Securely share your documents with others</p>
        </div>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button>
              <Share2 className="mr-2 h-4 w-4" />
              Create New Share
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Share Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Select Document *</Label>
                <Select
                  value={shareForm.documentId}
                  onValueChange={(value) => setShareForm({ ...shareForm, documentId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a document to share" />
                  </SelectTrigger>
                  <SelectContent>
                    {documents.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id}>
                        {doc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Share With (Email or Organization) *</Label>
                <Input
                  placeholder="email@example.com or Company Name"
                  value={shareForm.sharedWith}
                  onChange={(e) => setShareForm({ ...shareForm, sharedWith: e.target.value })}
                />
              </div>

              <div>
                <Label>Purpose of Sharing *</Label>
                <Select
                  value={shareForm.purpose}
                  onValueChange={(value) => setShareForm({ ...shareForm, purpose: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employment Verification">Employment Verification</SelectItem>
                    <SelectItem value="Loan Application">Loan Application</SelectItem>
                    <SelectItem value="Background Check">Background Check</SelectItem>
                    <SelectItem value="Rental Application">Rental Application</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Access Duration *</Label>
                <Select
                  value={shareForm.duration}
                  onValueChange={(value) => setShareForm({ ...shareForm, duration: value as ShareDuration })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="24h">24 Hours</SelectItem>
                    <SelectItem value="7d">7 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-3 block">Permissions *</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="view"
                      checked={shareForm.permissions.includes("view")}
                      onCheckedChange={(checked) => handlePermissionChange("view", checked as boolean)}
                    />
                    <Label htmlFor="view" className="cursor-pointer flex items-center">
                      <Eye className="mr-2 h-4 w-4" />
                      View Only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="download"
                      checked={shareForm.permissions.includes("download")}
                      onCheckedChange={(checked) => handlePermissionChange("download", checked as boolean)}
                    />
                    <Label htmlFor="download" className="cursor-pointer flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="verify"
                      checked={shareForm.permissions.includes("verify")}
                      onCheckedChange={(checked) => handlePermissionChange("verify", checked as boolean)}
                    />
                    <Label htmlFor="verify" className="cursor-pointer flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Verify Authenticity
                    </Label>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 border rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">Share Preview</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Document: {documents.find((d) => d.id === shareForm.documentId)?.name || "Not selected"}</p>
                  <p>Recipient: {shareForm.sharedWith || "Not specified"}</p>
                  <p>
                    Expires:{" "}
                    {shareForm.duration === "1h" ? "1 hour" : shareForm.duration === "24h" ? "24 hours" : "7 days"} from
                    now
                  </p>
                  <p>Permissions: {shareForm.permissions.join(", ") || "None selected"}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateShare} className="flex-1">
                  Create Share Link
                </Button>
                <Button variant="outline" onClick={() => setShowDialog(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Shares */}
      <Card>
        <CardHeader>
          <CardTitle>Active Shares ({activeShares.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {activeShares.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No active shares. Create one to get started.</div>
          ) : (
            <div className="space-y-3">
              {activeShares.map((share) => (
                <div key={share.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">{share.documentName}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {share.purpose}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Shared with: {share.sharedWith}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="flex items-center text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        Expires {formatTimeAgo(share.expiresAt)}
                      </span>
                      <span className="text-muted-foreground">
                        Accessed {share.accessCount} time{share.accessCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => copyShareLink(share.accessToken)}>
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleRevokeShare(share.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Share History */}
      {expiredShares.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Share History ({expiredShares.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expiredShares.map((share) => (
                <div key={share.id} className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-sm truncate">{share.documentName}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {share.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Shared with: {share.sharedWith} • {formatTimeAgo(share.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
