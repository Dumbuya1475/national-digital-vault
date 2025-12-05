export type ShareDuration = "1h" | "24h" | "7d" | "custom"
export type SharePermission = "view" | "download" | "verify"

export interface ShareRequest {
  id: string
  documentId: string
  documentName: string
  sharedBy: string
  sharedWith: string
  purpose: string
  permissions: SharePermission[]
  duration: ShareDuration
  expiresAt: string
  status: "active" | "expired" | "revoked"
  accessToken: string
  createdAt: string
  accessCount: number
}
