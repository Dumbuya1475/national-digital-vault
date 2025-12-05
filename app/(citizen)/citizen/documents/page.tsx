"use client"

import { useState } from "react"
import { useUser } from "@/lib/user-context"
import { mockDocuments } from "@/lib/mock-data/documents"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DocumentCard } from "@/components/documents/document-card"
import { DocumentDetailModal } from "@/components/documents/document-detail-modal"
import { Grid3x3, List, Search, SlidersHorizontal, Download } from "lucide-react"
import type { Document } from "@/types/document"
import { toast } from "sonner"

export default function DocumentsPage() {
  const { currentUser } = useUser()

  const userDocuments = mockDocuments.filter((d) => d.ownerId === currentUser?.id)

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredDocuments = userDocuments.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesType = typeFilter === "all" || doc.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleView = (doc: Document) => {
    setSelectedDocument(doc)
  }

  const handleDownload = (doc: Document) => {
    toast.success(`Downloading ${doc.name}`)
  }

  const handleShare = (doc: Document) => {
    toast.success(`Opening share dialog for ${doc.name}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Documents</h1>
          <p className="text-muted-foreground mt-1">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""} in your vault
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Bulk Download
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal className="h-4 w-4" />
          </Button>

          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="grid gap-4 sm:grid-cols-3 p-4 border rounded-lg bg-card">
          <div>
            <label className="text-sm font-medium mb-2 block">Document Type</label>
            <Select onValueChange={setTypeFilter} value={typeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                <SelectItem value="national_id">National ID</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="drivers_license">Driver's License</SelectItem>
                <SelectItem value="degree">Degree</SelectItem>
                <SelectItem value="property_deed">Property Deed</SelectItem>
                <SelectItem value="tax_clearance">Tax Clearance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="revoked">Revoked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Documents Grid/List */}
      {filteredDocuments.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-card">
          <p className="text-muted-foreground">No documents found</p>
          <Button className="mt-4">Upload Your First Document</Button>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "space-y-4"}>
          {filteredDocuments.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onView={handleView}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          ))}
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && (
        <DocumentDetailModal document={selectedDocument} onClose={() => setSelectedDocument(null)} />
      )}
    </div>
  )
}
