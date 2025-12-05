export type ApplicationType =
  | "birth_certificate"
  | "national_id"
  | "passport"
  | "drivers_license"
  | "degree"
  | "transcript"
  | "property_deed"
  | "land_title"
  | "marriage_certificate"
  | "tax_clearance"
  | "business_license"

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "additional_info_required"
  | "approved"
  | "rejected"
  | "issued"
  | "cancelled"

export type ApplicationReason =
  | "first_time"
  | "renewal"
  | "replacement_lost"
  | "replacement_stolen"
  | "replacement_damaged"
  | "name_change"
  | "address_change"
  | "correction"

export interface ApplicationDocument {
  id: string
  name: string
  fileUrl: string
  fileSize: number
  uploadDate: string
  type: "proof_of_identity" | "proof_of_residence" | "birth_certificate" | "marriage_certificate" | "other"
}

export interface ApplicationComment {
  id: string
  authorId: string
  authorName: string
  authorRole: string
  comment: string
  timestamp: string
  isInternal: boolean
}

export interface Application {
  id: string
  applicantId: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  type: ApplicationType
  reason: ApplicationReason
  status: ApplicationStatus
  submissionDate: string
  lastUpdated: string
  assignedTo?: string
  assignedToName?: string
  organizationId: string
  organizationName: string

  // Application specific data
  formData: Record<string, any>
  supportingDocuments: ApplicationDocument[]

  // Workflow tracking
  reviewedBy?: string
  reviewedByName?: string
  reviewDate?: string
  approvedBy?: string
  approvedByName?: string
  approvalDate?: string
  rejectionReason?: string

  // Comments and communication
  comments: ApplicationComment[]

  // Priority and categorization
  priority: "low" | "medium" | "high" | "urgent"
  estimatedProcessingDays: number

  // Issued document reference
  issuedDocumentId?: string
}
