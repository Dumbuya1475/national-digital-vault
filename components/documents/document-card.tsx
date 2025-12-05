"use client"

import type { Document } from "@/types/document"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Eye, Download, Share2, Shield, AlertCircle } from "lucide-react"
import { formatDate } from "@/lib/utils/dateFormatter"
import { getStatusColor, getDocumentTypeLabel } from "@/lib/utils/fileHelper"
import { cn } from "@/lib/utils"

interface DocumentCardProps {
  document: Document
  onView: (doc: Document) => void
  onDownload: (doc: Document) => void
  onShare: (doc: Document) => void
}

export function DocumentCard({ document, onView, onDownload, onShare }: DocumentCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{document.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{getDocumentTypeLabel(document.type)}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(document)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDownload(document)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onShare(document)}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="aspect-[4/3] bg-muted rounded-lg mb-3 overflow-hidden">
          <img
            src={document.fileUrl || "/placeholder.svg"}
            alt={document.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Issued by</span>
            <span className="font-medium">{document.issuingAuthority.name}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Issue Date</span>
            <span className="font-medium">{formatDate(document.issueDate)}</span>
          </div>

          <div className="flex items-center justify-between">
            <Badge className={cn("text-xs", getStatusColor(document.status))}>{document.status}</Badge>
            {document.blockchainVerified ? (
              <div className="flex items-center space-x-1 text-xs text-green-600">
                <Shield className="h-3 w-3" />
                <span>Verified</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-xs text-orange-600">
                <AlertCircle className="h-3 w-3" />
                <span>Pending</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
