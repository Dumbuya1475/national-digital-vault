export interface Organization {
  id: string
  name: string
  type: "ministry" | "department" | "agency" | "university" | "hospital" | "registry"
  logo: string
  description: string
  contactEmail: string
  contactPhone: string
  address: string
  website: string
  status: "active" | "pending" | "suspended"
  registrationDate: string
  documentsIssued: number
  verificationRate: number
  digitalSignature: DigitalSignature
  administrators: OrganizationAdmin[]
  allowedDocumentTypes: string[]
}

export interface OrganizationAdmin {
  id: string
  userId: string
  name: string
  email: string
  position: string
  permissions: AdminPermission[]
  canSign: boolean
  signatureUrl?: string
  addedDate: string
  status: "active" | "suspended"
}

export type AdminPermission =
  | "issue_documents"
  | "approve_documents"
  | "sign_documents"
  | "manage_users"
  | "view_analytics"
  | "bulk_upload"
  | "revoke_documents"

export interface DigitalSignature {
  publicKey: string
  algorithm: string
  issuedDate: string
  expiryDate: string
  certificateUrl: string
  status: "active" | "expired" | "revoked"
}
