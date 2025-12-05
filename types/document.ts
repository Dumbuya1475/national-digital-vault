export type DocumentType =
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

export type DocumentStatus = "verified" | "pending" | "expired" | "revoked"

export interface AccessLog {
  id: string
  documentId: string
  accessedBy: string
  accessedByName: string
  accessType: "view" | "download" | "verify" | "share"
  timestamp: string
  ipAddress: string
}

export interface DigitalSignatureRecord {
  id: string
  signerId: string
  signerName: string
  signerPosition: string
  organizationId: string
  signatureHash: string
  timestamp: string
  signatureImageUrl?: string
}

export interface Document {
  id: string
  ownerId: string
  type: DocumentType
  name: string
  documentNumber: string
  issuingAuthority: {
    id: string
    name: string
    logo: string
  }
  issueDate: string
  expiryDate?: string
  status: DocumentStatus
  blockchainHash: string
  blockchainVerified: boolean
  lastVerifiedDate: string
  fileUrl: string
  fileSize: number
  uploadDate: string
  metadata: Record<string, any>
  accessHistory: AccessLog[]
  digitalSignatures: DigitalSignatureRecord[]
  requiresSignatures: number
  signedBy: number
}
