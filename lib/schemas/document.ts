import { z } from "zod"

export const uploadDocumentSchema = z.object({
  type: z.string().min(1, "Document type is required"),
  documentNumber: z.string().min(1, "Document number is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  issuingAuthority: z.string().min(1, "Issuing authority is required"),
  expiryDate: z.string().optional(),
  notes: z.string().optional(),
})

export const shareDocumentSchema = z.object({
  documentId: z.string().min(1, "Document is required"),
  recipientEmail: z.string().email("Invalid email address"),
  purpose: z.string().min(1, "Purpose is required"),
  duration: z.enum(["1h", "24h", "7d", "custom"]),
  customDuration: z.string().optional(),
  permissions: z.array(z.enum(["view", "download", "verify"])).min(1, "At least one permission is required"),
})

export const issueDocumentSchema = z.object({
  citizenId: z.string().min(1, "Citizen ID is required"),
  documentType: z.string().min(1, "Document type is required"),
  documentNumber: z.string().min(1, "Document number is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  metadata: z.record(z.any()).optional(),
})

export type UploadDocumentInput = z.infer<typeof uploadDocumentSchema>
export type ShareDocumentInput = z.infer<typeof shareDocumentSchema>
export type IssueDocumentInput = z.infer<typeof issueDocumentSchema>
