export type AuthorityType = "government" | "education" | "healthcare" | "financial" | "legal"

export interface AuthorizedOfficer {
  id: string
  name: string
  email: string
  position: string
  canIssue: string[]
  addedDate: string
}

export interface Authority {
  id: string
  name: string
  type: AuthorityType
  logo: string
  description: string
  contactEmail: string
  contactPhone: string
  website: string
  status: "active" | "pending" | "suspended"
  registrationDate: string
  documentsIssued: number
  verificationRate: number
  authorizedOfficers: AuthorizedOfficer[]
}
