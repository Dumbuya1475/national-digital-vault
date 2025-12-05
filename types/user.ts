export type UserRole = "citizen" | "authority" | "verifier" | "admin" | "super_admin" | "organization_admin"

export interface User {
  id: string
  role: UserRole
  email: string
  fullName: string
  nationalId: string
  phone: string
  dateOfBirth: string
  profilePicture?: string
  isVerified: boolean
  createdAt: string
  lastLogin: string
  twoFactorEnabled: boolean
  biometricEnabled: boolean
  organizationId?: string
  permissions?: string[]
}

export interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
  otpRequired: boolean
}
