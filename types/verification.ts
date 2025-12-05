import type { DocumentType } from "./document"

export interface VerificationRequest {
  id: string
  documentId: string
  citizenId: string
  citizenName: string
  authorityId: string
  documentType: DocumentType
  status: "pending" | "approved" | "rejected" | "more_info_needed"
  submittedDate: string
  reviewedDate?: string
  reviewedBy?: string
  comments?: string
  priority: "low" | "medium" | "high"
}

export interface VerificationResult {
  id: string
  documentId: string
  verifiedBy: string
  verificationDate: string
  isValid: boolean
  blockchainMatch: boolean
  warningFlags: string[]
  receiptUrl: string
}
