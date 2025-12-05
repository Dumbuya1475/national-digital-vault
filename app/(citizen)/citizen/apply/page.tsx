"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FileText, Clock, CheckCircle2, XCircle, Upload, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUser } from "@/lib/user-context"
import { mockApplications } from "@/lib/mock-data/applications"
import { formatDate } from "@/lib/utils/dateFormatter"

const documentTypes = [
  { value: "passport", label: "Passport", org: "Ministry of Home Affairs" },
  { value: "national_id", label: "National ID", org: "Ministry of Home Affairs" },
  { value: "drivers_license", label: "Driver's License", org: "Ministry of Home Affairs" },
  { value: "birth_certificate", label: "Birth Certificate", org: "Ministry of Home Affairs" },
  { value: "marriage_certificate", label: "Marriage Certificate", org: "Ministry of Home Affairs" },
  { value: "property_deed", label: "Property Deed", org: "National Land Registry" },
  { value: "land_title", label: "Land Title", org: "National Land Registry" },
  { value: "degree", label: "University Degree", org: "Ministry of Education" },
  { value: "transcript", label: "Academic Transcript", org: "Ministry of Education" },
]

const applicationReasons = [
  { value: "first_time", label: "First Time Application" },
  { value: "renewal", label: "Renewal (Expired/Expiring)" },
  { value: "replacement_lost", label: "Replacement (Lost)" },
  { value: "replacement_stolen", label: "Replacement (Stolen)" },
  { value: "replacement_damaged", label: "Replacement (Damaged)" },
  { value: "name_change", label: "Name Change" },
  { value: "address_change", label: "Address Change" },
  { value: "correction", label: "Correction of Details" },
]

export default function ApplyPage() {
  const { user } = useUser()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("new")

  // New application form state
  const [selectedType, setSelectedType] = useState("")
  const [reason, setReason] = useState("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [files, setFiles] = useState<File[]>([])

  // Filter user's applications
  const userApplications = mockApplications.filter((app) => app.applicantId === user?.id)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "submitted":
      case "under_review":
        return <Clock className="h-4 w-4" />
      case "approved":
      case "issued":
        return <CheckCircle2 className="h-4 w-4" />
      case "rejected":
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
      case "under_review":
        return "default"
      case "additional_info_required":
        return "secondary"
      case "approved":
      case "issued":
        return "default"
      case "rejected":
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmitApplication = () => {
    if (!selectedType || !reason) {
      toast.error("Please select document type and reason")
      return
    }

    // Simulate application submission
    toast.success("Application submitted successfully")
    setSelectedType("")
    setReason("")
    setFormData({})
    setFiles([])
    setActiveTab("existing")
  }

  const handleViewApplication = (appId: string) => {
    router.push(`/citizen/apply/${appId}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Apply for Documents</h1>
        <p className="text-muted-foreground mt-2">Submit new applications or track existing ones</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="new">New Application</TabsTrigger>
          <TabsTrigger value="existing">
            My Applications
            {userApplications.length > 0 && (
              <Badge className="ml-2" variant="secondary">
                {userApplications.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Application</CardTitle>
              <CardDescription>Apply for a new document or replacement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Document Type *</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex flex-col">
                          <span>{type.label}</span>
                          <span className="text-xs text-muted-foreground">{type.org}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Application Reason *</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {applicationReasons.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedType && reason && (
                <>
                  <div className="space-y-2">
                    <Label>Additional Information</Label>
                    <Textarea
                      placeholder="Provide any additional details relevant to your application..."
                      value={formData.additionalInfo || ""}
                      onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Supporting Documents</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Upload supporting documents (ID, proof of residence, etc.)
                      </p>
                      <Input type="file" multiple onChange={handleFileUpload} className="max-w-xs mx-auto" />
                    </div>

                    {files.length > 0 && (
                      <div className="space-y-2 mt-4">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">{file.name}</span>
                              <span className="text-xs text-muted-foreground">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedType("")
                        setReason("")
                        setFormData({})
                        setFiles([])
                      }}
                    >
                      Clear Form
                    </Button>
                    <Button onClick={handleSubmitApplication}>
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Application
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="existing" className="space-y-4">
          {userApplications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No Applications Yet</p>
                <p className="text-sm text-muted-foreground">Start by submitting a new application</p>
                <Button className="mt-4" onClick={() => setActiveTab("new")}>
                  Create Application
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {userApplications.map((app) => (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">
                            {documentTypes.find((t) => t.value === app.type)?.label || app.type}
                          </h3>
                          <Badge variant={getStatusColor(app.status)} className="flex items-center gap-1">
                            {getStatusIcon(app.status)}
                            {app.status.replace(/_/g, " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Application ID: {app.id}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewApplication(app.id)}>
                        View Details
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Reason</p>
                        <p className="font-medium">{applicationReasons.find((r) => r.value === app.reason)?.label}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="font-medium">{formatDate(app.submissionDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Organization</p>
                        <p className="font-medium">{app.organizationName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Priority</p>
                        <Badge variant="outline">{app.priority}</Badge>
                      </div>
                    </div>

                    {app.comments.length > 0 && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Latest Update</p>
                        <p className="text-sm">{app.comments[app.comments.length - 1].comment}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
