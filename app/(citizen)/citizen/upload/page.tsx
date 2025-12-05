"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/lib/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"

type Step = 1 | 2 | 3 | 4 | 5

export default function UploadDocumentPage() {
  const router = useRouter()
  const { currentUser } = useUser()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    type: "",
    documentNumber: "",
    issueDate: "",
    expiryDate: "",
    authorityId: "",
    authorityName: "",
    notes: "",
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
        toast.success("File selected successfully")
      }
    },
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0]
      if (error?.code === "file-too-large") {
        toast.error("File is too large. Max size is 10MB")
      } else {
        toast.error("Invalid file type. Please upload PDF, JPG, or PNG")
      }
    },
  })

  const progress = (currentStep / 5) * 100

  const handleNext = () => {
    if (currentStep === 1 && !formData.type) {
      toast.error("Please select a document type")
      return
    }
    if (currentStep === 2 && !file) {
      toast.error("Please upload a file")
      return
    }
    if (currentStep === 3) {
      if (!formData.documentNumber || !formData.issueDate || !formData.authorityId) {
        toast.error("Please fill in all required fields")
        return
      }
    }

    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as Step)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as Step)
    }
  }

  const handleSubmit = async () => {
    if (!currentUser || !file) return

    toast.success("Document uploaded successfully!")
    setCurrentStep(5)
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Select Document Type"
      case 2:
        return "Upload File"
      case 3:
        return "Document Details"
      case 4:
        return "Review & Submit"
      case 5:
        return "Upload Complete"
      default:
        return ""
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Upload Document</h1>
          <p className="text-muted-foreground mt-1">Add a new document to your vault</p>
        </div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{getStepTitle()}</CardTitle>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span className={currentStep >= 1 ? "text-primary font-medium" : ""}>Type</span>
              <span className={currentStep >= 2 ? "text-primary font-medium" : ""}>Upload</span>
              <span className={currentStep >= 3 ? "text-primary font-medium" : ""}>Details</span>
              <span className={currentStep >= 4 ? "text-primary font-medium" : ""}>Review</span>
              <span className={currentStep >= 5 ? "text-primary font-medium" : ""}>Complete</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Step 1: Select Document Type */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <Label>Document Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="birth_certificate">Birth Certificate</SelectItem>
                  <SelectItem value="national_id">National ID</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                  <SelectItem value="drivers_license">Driver's License</SelectItem>
                  <SelectItem value="degree">Academic Degree</SelectItem>
                  <SelectItem value="transcript">Academic Transcript</SelectItem>
                  <SelectItem value="property_deed">Property Deed</SelectItem>
                  <SelectItem value="land_title">Land Title</SelectItem>
                  <SelectItem value="marriage_certificate">Marriage Certificate</SelectItem>
                  <SelectItem value="tax_clearance">Tax Clearance</SelectItem>
                  <SelectItem value="business_license">Business License</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Step 2: Upload File */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div
                {...getRootProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
                  isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                )}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                {file ? (
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium mb-1">
                      {isDragActive ? "Drop the file here" : "Drag & drop your document here"}
                    </p>
                    <p className="text-xs text-muted-foreground">or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                )}
              </div>
              {file && (
                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
                    Remove
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Document Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="documentNumber">Document Number *</Label>
                <Input
                  id="documentNumber"
                  placeholder="e.g., DOC-2024-001234"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="issueDate">Issue Date *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="authority">Issuing Authority *</Label>
                <Select
                  value={formData.authorityId}
                  onValueChange={(value) => setFormData({ ...formData, authorityId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issuing authority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auth-1">National University</SelectItem>
                    <SelectItem value="auth-2">Ministry of Health</SelectItem>
                    <SelectItem value="auth-3">Department of Motor Vehicles</SelectItem>
                    <SelectItem value="auth-4">Land Registry Office</SelectItem>
                    <SelectItem value="auth-5">National Tax Authority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional information about this document..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-muted/50 border rounded-lg p-4">
                <h3 className="font-semibold mb-4">Review Your Document</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Document Type</span>
                    <span className="text-sm font-medium capitalize">{formData.type.replace("_", " ")}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">File Name</span>
                    <span className="text-sm font-medium">{file?.name}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">File Size</span>
                    <span className="text-sm font-medium">{file && (file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Document Number</span>
                    <span className="text-sm font-medium">{formData.documentNumber}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Issue Date</span>
                    <span className="text-sm font-medium">{formData.issueDate}</span>
                  </div>
                  {formData.expiryDate && (
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-muted-foreground">Expiry Date</span>
                      <span className="text-sm font-medium">{formData.expiryDate}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-muted-foreground">Issuing Authority</span>
                    <span className="text-sm font-medium">{formData.authorityName || "Selected Authority"}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Verification Request</p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      After upload, your document will be sent to the issuing authority for verification. This process
                      typically takes 2-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Success */}
          {currentStep === 5 && (
            <div className="text-center py-8 space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Document Uploaded Successfully!</h3>
                <p className="text-muted-foreground">
                  Your document has been uploaded and a verification request has been sent to the issuing authority.
                </p>
              </div>
              <div className="flex gap-3 justify-center pt-4">
                <Button onClick={() => router.push("/citizen/documents")}>View Documents</Button>
                <Button variant="outline" onClick={() => router.push("/citizen/dashboard")}>
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </CardContent>

        {currentStep < 5 && (
          <div className="px-6 pb-6 flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Document</Button>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
