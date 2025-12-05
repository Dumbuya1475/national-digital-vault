export type NotificationType = "success" | "error" | "warning" | "info"

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}
