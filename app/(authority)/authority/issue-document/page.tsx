"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, FileText, User, CheckCircle2, Send } from "lucide-react"
import { toast } from "sonner"

export default function IssueDocumentPage() {
  const router = useRouter()
  const [citizenSearch, setCitizenSearch] = useState("")
  const [selectedCitizen, setSelectedCitizen] = useState<any>(null)
  const [documentType, setDocumentType] = useState("")
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSearchCitizen = () => {
    // Simulate citizen lookup
    if (citizenSearch) {
      setSelectedCitizen({
        id: "user-1",
        name: "John Citizen",
        email: "john.citizen@email.com",
        nationalId: "NAT-2024-001234",
        photo: "/professional-male-portrait.png",
      })
      toast.success("Citizen found!")
    }
  }

  const handleIssueDocument = () => {
    if (!selectedCitizen || !documentType) {
      toast.error("Please complete all required fields")
      return
    }

    toast.success("Document issued successfully!")
    router.push("/authority/dashboard")
  }

  const renderDocumentFields = () => {
    switch (documentType) {
      case "degree":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="institution">Institution *</Label>
              <Input
                id="institution"
                placeholder="University Name"
                value={formData.institution || ""}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="degreeType">Degree Type *</Label>
                <Select
                  value={formData.degreeType}
                  onValueChange={(value) => setFormData({ ...formData, degreeType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">Bachelor's</SelectItem>
                    <SelectItem value="master">Master's</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="major">Major *</Label>
                <Input
                  id="major"
                  placeholder="e.g., Computer Science"
                  value={formData.major || ""}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="graduationDate">Graduation Date *</Label>
                <Input
                  id="graduationDate"
                  type="date"
                  value={formData.graduationDate || ""}
                  onChange={(e) => setFormData({ ...formData, graduationDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="honors">Honors</Label>
                <Input
                  id="honors"
                  placeholder="e.g., Cum Laude"
                  value={formData.honors || ""}
                  onChange={(e) => setFormData({ ...formData, honors: e.target.value })}
                />
              </div>
            </div>
          </div>
        )
      case "transcript":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="institution">Institution *</Label>
              <Input id="institution" placeholder="University Name" />
            </div>
            <div>
              <Label htmlFor="program">Program *</Label>
              <Input id="program" placeholder="Program Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input id="startDate" type="date" />
              </div>
              <div>
                <Label htmlFor="endDate">End Date *</Label>
                <Input id="endDate" type="date" />
              </div>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center py-8 text-muted-foreground">Select a document type to see specific fields</div>
        )
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Issue Document</h1>
        <p className="text-muted-foreground mt-1">Issue an official document to a citizen</p>
      </div>

      {/* Step 1: Citizen Lookup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Step 1: Find Citizen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by National ID, Email, or Phone"
                value={citizenSearch}
                onChange={(e) => setCitizenSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearchCitizen}>Search</Button>
          </div>

          {selectedCitizen && (
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
              <Avatar className="h-16 w-16">
                <AvatarImage src={selectedCitizen.photo || "/placeholder.svg"} />
                <AvatarFallback>{selectedCitizen.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedCitizen.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedCitizen.email}</p>
                <p className="text-sm text-muted-foreground">ID: {selectedCitizen.nationalId}</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Select Document Type */}
      {selectedCitizen && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Step 2: Select Document Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose document type to issue" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="degree">Academic Degree</SelectItem>
                <SelectItem value="transcript">Academic Transcript</SelectItem>
                <SelectItem value="certificate">Certificate</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Document Details */}
      {selectedCitizen && documentType && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Document Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="documentNumber">Document Number *</Label>
              <Input
                id="documentNumber"
                placeholder="Auto-generated or manual entry"
                value={formData.documentNumber || `DOC-${Date.now()}`}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="issueDate">Issue Date *</Label>
                <Input
                  id="issueDate"
                  type="date"
                  value={formData.issueDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate || ""}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </div>
            </div>

            <Separator />

            {renderDocumentFields()}

            <Separator />

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information..."
                value={formData.notes || ""}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Digital Signature & Issue */}
      {selectedCitizen && documentType && (
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Review & Issue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 border rounded-lg p-4">
              <h4 className="font-semibold mb-3">Document Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recipient:</span>
                  <span className="font-medium">{selectedCitizen.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document Type:</span>
                  <span className="font-medium capitalize">{documentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Document Number:</span>
                  <span className="font-medium">{formData.documentNumber || "Auto-generated"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issue Date:</span>
                  <span className="font-medium">{formData.issueDate || new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Blockchain Verification</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    This document will be recorded on the blockchain for permanent verification
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleIssueDocument} className="flex-1">
                <Send className="mr-2 h-4 w-4" />
                Issue Document
              </Button>
              <Button variant="outline" onClick={() => router.back()} className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
