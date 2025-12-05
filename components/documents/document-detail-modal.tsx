"use client"

import type { Document } from "@/types/document"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Share2, AlertTriangle, Copy, Shield, ExternalLink, History } from "lucide-react"
import { formatDate, formatDateTime } from "@/lib/utils/dateFormatter"
import { getStatusColor, getDocumentTypeLabel, formatFileSize } from "@/lib/utils/fileHelper"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

interface DocumentDetailModalProps {
  document: Document
  onClose: () => void
}

export function DocumentDetailModal({ document, onClose }: DocumentDetailModalProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard")
  }

  return (
    <Dialog open={!!document} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{document.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Preview */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={document.fileUrl || "/placeholder.svg"}
              alt={document.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <Button className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full
            </Button>
          </div>

          {/* Document Metadata */}
          <div className="space-y-4">
            <h3 className="font-semibold">Document Information</h3>

            <div className="grid gap-3">
              <div className="flex justify-between py-2">
                <span className="text-sm text-muted-foreground">Document ID</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono">{document.documentNumber}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(document.documentNumber)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="text-sm font-medium">{getDocumentTypeLabel(document.type)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className={cn("text-xs", getStatusColor(document.status))}>{document.status}</Badge>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-sm text-muted-foreground">Issuing Authority</span>
                <div className="flex items-center gap-2">
                  <img
                    src={document.issuingAuthority.logo || "/placeholder.svg"}
                    alt={document.issuingAuthority.name}
                    className="h-6 w-6 rounded"
                  />
                  <span className="text-sm font-medium">{document.issuingAuthority.name}</span>
                </div>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-sm text-muted-foreground">Issue Date</span>
                <span className="text-sm font-medium">{formatDate(document.issueDate)}</span>
              </div>

              {document.expiryDate && (
                <div className="flex justify-between py-2">
                  <span className="text-sm text-muted-foreground">Expiry Date</span>
                  <span className="text-sm font-medium">{formatDate(document.expiryDate)}</span>
                </div>
              )}

              <div className="flex justify-between py-2">
                <span className="text-sm text-muted-foreground">File Size</span>
                <span className="text-sm font-medium">{formatFileSize(document.fileSize)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Blockchain Verification */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Blockchain Verification
            </h3>

            <div
              className={cn(
                "p-4 rounded-lg border",
                document.blockchainVerified
                  ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                  : "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-800",
              )}
            >
              <div className="flex items-start gap-3">
                {document.blockchainVerified ? (
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-sm">
                    {document.blockchainVerified ? "Verified on Blockchain" : "Pending Blockchain Verification"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last verified: {formatDateTime(document.lastVerifiedDate)}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-current/10">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Blockchain Hash</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => copyToClipboard(document.blockchainHash)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs font-mono mt-1 break-all">{document.blockchainHash}</p>
              </div>
            </div>
          </div>

          {/* Access History */}
          {document.accessHistory.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <History className="mr-2 h-5 w-5" />
                  Access History
                </h3>

                <div className="space-y-2">
                  {document.accessHistory.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{log.accessedByName}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.accessType} • {formatDateTime(log.timestamp)}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {log.accessType}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Additional Metadata */}
          {Object.keys(document.metadata).length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold">Additional Information</h3>

                <div className="grid gap-2">
                  {Object.entries(document.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2">
                      <span className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-sm font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
